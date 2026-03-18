import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const coveragePath = path.resolve('coverage/index.html');
const reportDir = path.resolve('tests/report');

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

await page.goto(`file://${coveragePath}`);

await page.screenshot({
  path: path.join(reportDir, 'coverage.png'),
  fullPage: true,
});

await browser.close();
