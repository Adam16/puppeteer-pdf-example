# Puppeteer PDF Playground

PDF Generation for Node.js using Puppeteer

## Rendering engine

Puppeteer is basically an automated Chromium instance for Node.js. It can be used for many things like automated UI testing, automated form submission and web browsing as well as automated screenshot and PDF generation.

### Generating a PDF with Puppeteer is simple:

```
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.github.com');
    await page.pdf({path: 'github.pdf', format: 'A4'});
    await browser.close();
})()
```

So, this basically launch a browser, open a page, print the page to a PDF file and close the browser.

Puppeteer supports a lot of (options)[https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pagepdfoptions] for generating PDFs.

## Convert a local HTML File to PDF

Puppeteer is not limited to loading web pages. You can also load local HTML file.
I will experiment with this option here.

### Sample

```
const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
  const htmlFile = path.resolve("./sample.html");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file://" + htmlFile);
  await page.pdf({ path: "./sample.pdf", format: "Letter" });
  await browser.close();
})();
```

## Helpful information from the internet

- Page break: https://github.com/puppeteer/puppeteer/issues/5277

## Running the code

Node version >= 18.x

`npm install`

Just for first preview. The code is not optimized for production.

### Build Astro SSR middleware

`npm run astro:build`

### Build Fastify Server

`npm run build:gen`

### Run Fastify Server with Astro SSR middleware and Puppeteer (pdf generation)

`npm run prod:start`

- http://localhost:8080 - Astro Page preview
- http://localhost:8080/pdf - PDF generation
