const puppeteer = require('puppeteer');

const scrapeTripAdvisor = async () => {
  const url = 'https://www.tripadvisor.com/Attractions-g297672-Activities-Ibadan_Oyo_State.html';

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const results = await page.evaluate(() => {
    const data = [];
    const cards = document.querySelectorAll('.RfBGI span a');

    cards.forEach((card) => {
      const name = card.querySelector('div')?.innerText || 'No name';
      const link = 'https://www.tripadvisor.com.ng' + card.getAttribute('href');
      data.push({ name, link });
    });

    return data;
  });

  console.log(results);
  await browser.close();
};

scrapeTripAdvisor();
