import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/Adam16/puppeteer-pdf-example', {waitUntil: 'networkidle0'});
  await page.pdf({path: './dist/github.pdf', printBackground: true});

  await browser.close();
})();
