const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const SIZES = [
  ['horiz-bar', 800, 200],

];

const OUT = path.join(__dirname, 'screenshots');
const URL = 'http://127.0.0.1:9876/';

function waitEnter() {
  return new Promise(r => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      r();
    });
  });
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  console.log(`\n📸 Будет ${SIZES.length} скриншотов.`);
  console.log('⏸️  После каждого скриншота переключи трек и нажми любую клавишу.\n');

  for (let i = 0; i < SIZES.length; i++) {
    const [name, ww, hh] = SIZES[i];
    console.log(`\n📐 ${name}  ${ww}×${hh}  (${i+1}/${SIZES.length})`);
    console.log('   Переключи трек и нажми клавишу...');
    await waitEnter();
    process.stdout.write('   ...');

    const page = await browser.newPage();
    await page.setViewportSize({ width: ww, height: hh });
    await page.goto(URL);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log(' ✅');
    await page.close();
  }

  await browser.close();
  console.log(`\n📁 Готово: ${OUT}/\n`);
})();
