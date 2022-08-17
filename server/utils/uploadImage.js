const puppeteer = require("puppeteer");

const ITEM_URL = "https://removal.ai/";

const getImage = async (path) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(ITEM_URL);
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("[for='rm_free_upload_file']"),
  ]);

  await fileChooser.accept([path]);
  await page.waitForTimeout(45000);
  const images = await page.$eval(".rm-bg-result img", (node) => node.src);
  await browser.close();
  return images;

  //   console.log(page);
};

module.exports = getImage;
