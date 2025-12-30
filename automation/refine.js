const { chromium } = require("playwright");
const axios = require("axios");
require("dotenv").config();

// ================= CONFIG =================
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
            timeout: 15000
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

          console.log(`\n📄 Extracted from: ${link}`);
          console.log("--------------------------------------------------");
          console.log(content.slice(0, 800));
          console.log("--------------------------------------------------");

        } catch {
          console.log(`⚠️ Failed to scrape: ${link}`);
        }
      }

    } catch (err) {
      console.error(`❌ Error processing "${article.title}":`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\n🏁 Phase-2 Reference Extraction Completed");
}

// ================= RUN =================
refineArticles();
