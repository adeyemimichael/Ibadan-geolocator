// server/index.js
const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/places", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.tripadvisor.com/Search?q=ibadan", {
      waitUntil: "domcontentloaded",
    });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll(".result-title");
      return Array.from(items).map(item => ({
        name: item.textContent,
        link: item.href,
      }));
    });

    await browser.close();
    res.json(results);
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
