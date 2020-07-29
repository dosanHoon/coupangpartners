import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const paramCategory = req.query.category;
    console.log("paramCategory", paramCategory);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(`https://www.itemscout.io/category`);

    const categoryBtn = await page.$(
      "#container > div.main-container > table:nth-child(1) > tr > td.options > div > div.dropdown-container > div:nth-child(1) > span"
    );

    await categoryBtn.click();
    await page.waitFor(1000);

    const categorys = await page.$$eval(
      "label.itemscout-dropdown-item",
      (labels) => {
        console.log("labels", labels);
        return labels.map((label, i) => {
          return {
            label: label.innerText,
            i,
          };
        });
      }
    );

    console.log("categorys", categorys);

    const currentCategory = categorys.find(
      ({ label }) => paramCategory === label
    );
    let keywords = [];
    if (currentCategory) {
      const selectLabel = await page.$$("label.itemscout-dropdown-item");
      console.log("selectLabel",selectLabel)
      console.log("currentCategory",currentCategory.i)
      selectLabel[currentCategory.i].click();

      keywords = await page.$$eval(
        "#keyword-table-scroll-wrapper > table > tbody > tr",
        (keywords) =>
          keywords.map((keyword, i) => ({
            keyword: keyword.querySelector("td:nth-child(3) > a > label")
              .innerText,
          }))
      );
    } else {
      keywords = [];
    }

    await page.waitFor(2000);
    await browser.close();

    res.json({ returnMessage: "성공", returnCode: 0, data: keywords });
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};
