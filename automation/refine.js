const { chromium } = require("playwright");
const axios = require("axios");
const { spawn } = require("child_process");
require("dotenv").config();


const SERPER_API_KEY = process.env.SERPER_API_KEY;
const BACKEND_URL = process.env.BACKEND_URL;

// Junk / low-value sources
const BLOCKED_DOMAINS = [
  "quora.com",
  "reddit.com",
  "medium.com",
  "youtube.com",
  "facebook.com",
  "twitter.com",
  "linkedin.com",
  "wikipedia.org",
  "amazon.",
  "pinterest.",
  ".pdf",
  "beyondchats.com"
];
function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in Gemini output");
  }

  return JSON.parse(text.slice(start, end));
}
function callGeminiPython(original, references) {
  return new Promise((resolve, reject) => {
    console.log("🧪 callGeminiPython invoked");

    const py = spawn("python", ["gemini_runner.py"], {
      env: process.env
    });

    let output = "";
    let error = "";

    py.stdout.on("data", data => {
      console.log("🐍 PY:", data.toString());
      output += data.toString();
    });

    py.stderr.on("data", data => {
      console.error("🐍 PY ERR:", data.toString());
      error += data.toString();
    });

    py.on("close", code => {
      if (code !== 0) {
        return reject(new Error(error || "Python exited with error"));
      }
      resolve(output.trim());
    });

    const payload = JSON.stringify({ original, references });
    py.stdin.write(payload);
    py.stdin.end(); // 🔥 REQUIRED
  });
}
// ================= MAIN =================
async function refineArticles() {
  console.log("🚀 Starting Phase 2: Reference Extraction (Clean Mode)");

  // 1️⃣ Fetch stored articles
  let articles = [];
  try {
    const res = await axios.get(BACKEND_URL);
    articles = res.data;


    console.log(`✅ Found ${articles.length} articles`);
  } catch {
    console.error("❌ Backend not reachable. Run `php artisan serve`");
    return;
  }

  const browser = await chromium.launch({ headless: false });

  for (const article of articles) {
    console.log(`\n🔍 Processing: ${article.title}`);
    const page = await browser.newPage();
    let referenceTexts = "";
    try {
      // 2️⃣ Google Search via Serper
      const searchRes = await axios.post(
        "https://google.serper.dev/search",
        { q: article.title },
        {
          headers: {
            "X-API-KEY": SERPER_API_KEY,
            "Content-Type": "application/json"
          }
        }
      );

      const externalLinks = (searchRes.data.organic || [])
        .map(r => r.link)
        .filter(
          link =>
            link.startsWith("http") &&
            !BLOCKED_DOMAINS.some(domain => link.includes(domain))
        )
        .slice(0, 2);

      if (externalLinks.length === 0) {
        console.log("⚠️ No valid reference links found");
        continue;
      }

      console.log("🔗 References:");
      externalLinks.forEach(l => console.log("  •", l));

      // 3️⃣ Visit & extract content precisely
      for (const link of externalLinks) {
        try {
          await page.goto(link, {
            waitUntil: "domcontentloaded",
            timeout: 35000
          });

          const content = await page.evaluate(() => {
            const SELECTOR_PRIORITY = [
              ".ft-sticky-nav__rich-text",   // Forethought
              ".paragraph--type--body-text", // BizTech (Drupal)
              "[itemprop='articleBody']",    // Schema.org
              "article .content",
              "article"
            ];

            let root = null;
            for (const sel of SELECTOR_PRIORITY) {
              root = document.querySelector(sel);
              if (root) break;
            }
            if (!root) return "";

            // Remove junk UI blocks
            root.querySelectorAll(
              "script, style, nav, footer, aside, form, iframe, svg, button," +
              ".share, .social, .cta, .subscribe, .related, .author, .byline"
            ).forEach(el => el.remove());

            // Extract only meaningful text
            const parts = [];
            root.querySelectorAll("p, li, h2, h3").forEach(el => {
              const text = el.innerText.trim();
              if (text.length > 40) parts.push(text);
            });

            return parts.join("\n\n").slice(0, 3000);
          });

          if (content.length < 500) {
            console.log(`⚠️ Skipped (content too thin): ${link}`);
            continue;
          }
          referenceTexts += `\n\n--- SOURCE: ${link} ---\n${content}`;
          console.log(`\n📄 Extracted from: ${link}`);
          console.log("--------------------------------------------------");
          console.log(content.slice(0, 200));
          
        } catch {
          console.log(`⚠️ Failed to scrape: ${link}`);
        }
      }

    if (!referenceTexts) {
        console.log("⚠️ No usable reference text, skipping article");
        continue;
      }

      // 4️⃣ Gemini Rewrite + Summary
       console.log("🤖 Gemini rewriting...");
      const aiRaw = await callGeminiPython(
        article.original_content,
        referenceTexts
      );

       let aiResult;
try {
  aiResult = extractJSON(aiRaw);
} catch (err) {
  console.error("RAW GEMINI OUTPUT:\n", aiRaw);
  throw err;
}


        if (!aiResult.updated_content) {
        throw new Error("Gemini returned empty content");
        }
      const finalContent =
        `${aiResult.updated_content}\n\n---\n` +
        `**References used for improvement:**\n${externalLinks.join("\n")}`;

      // 5️⃣ Update Laravel DB
      await axios.put(`${BACKEND_URL}/${article.id}`, {
        summary: aiResult.summary,
        updated_content: finalContent,
        references: JSON.stringify(externalLinks)
      });

      console.log(`✅ Successfully updated: ${article.title}`);

    } catch (err) {
      console.error(`❌ Failed processing ${article.title}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\n🏁 ALL ARTICLES REFINED!");
}

// ================= RUN =================
refineArticles();