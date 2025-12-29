const { chromium } = require("playwright");
const axios = require("axios");

async function scrapeAndStore() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log("🚀 Navigating to BeyondChats...");
    await page.goto("https://beyondchats.com/blogs/");
    await page.waitForSelector("article");

    console.log("📂 Moving to last page...");
    const paginationLinks = await page.$$(".page-numbers");
    if (paginationLinks.length > 0) {
        const lastPageBtn = paginationLinks[paginationLinks.length - 2];
        await lastPageBtn.click();
        await page.waitForSelector("article");
    }

    const collectedArticles = [];

    
    // STEP 1: Collect oldest 5 (with Prev pagination)
    
    while (collectedArticles.length < 5) {
        const articles = await page.$$("article");

        for (let i = articles.length - 1; i >= 0; i--) {
            const article = articles[i];
            const titleEl = await article.$("h2 a");
            if (!titleEl) continue;

            const title = (await titleEl.innerText()).trim();
            const url = await titleEl.getAttribute("href");

            if (!collectedArticles.some(a => a.url === url)) {
                collectedArticles.push({ title, url, original_content: null });
            }

            if (collectedArticles.length === 5) break;
        }

        if (collectedArticles.length < 5) {
            const prevBtn = await page.$(".prev.page-numbers");
            if (!prevBtn) break;

            await prevBtn.click();
            await page.waitForSelector("article");
        }
    }

    
    // STEP 2: Scrape full content
   
    for (const article of collectedArticles) {
        console.log(`📝 Scraping content: ${article.title}`);

        try {
            await page.goto(article.url);
            await page.waitForSelector(
                "#content .elementor-widget-theme-post-content",
                { timeout: 15000 }
            );

            const contentEl = await page.$(
                "#content .elementor-widget-theme-post-content"
            );

            article.original_content = contentEl
                ? (await contentEl.innerText()).trim()
                : "";

        } catch (err) {
            console.error(`Failed to scrape ${article.title}:`, err.message);
            article.original_content = "";
        }
    }

    
    // STEP 3: SEND TO LARAVEL API
    
    console.log("📡 Sending articles to Laravel API...");

    for (const article of collectedArticles) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/articles",
                article
            );
            console.log(`✅ Stored: ${response.data.data.title}`);
        } catch (error) {
            console.error(
                `API error for ${article.title}:`,
                error.response?.data || error.message
            );
        }
    }

    await browser.close();
    console.log("🏁 Phase 1 Complete!");
}

scrapeAndStore();
