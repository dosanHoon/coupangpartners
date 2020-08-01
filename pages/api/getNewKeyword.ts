import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const paramCategory = req.query.category;
    console.log("paramCategory", paramCategory);
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    const CATEGORYDROPDOWN =
      "#container > div.main-container > table > tr > td.options > div > div.dropdown-container > div:nth-child(1)";
    const CATEGORYTRIGER =
      "#container > div.main-container > table > tr > td.options > div > div.dropdown-container > div.bp-dropdown.itemscout-category-dropdown";
    const CATEGORYLABEL = `${CATEGORYDROPDOWN} > div label`;

    await page.goto(`https://www.itemscout.io/category`);

    await page.waitFor(`${CATEGORYTRIGER}`);
    const categoryBtn = await page.$(`${CATEGORYTRIGER}`);
    await categoryBtn.click();

    await page.waitFor(1000);
    await page.waitFor(`${CATEGORYDROPDOWN} > div`);

    const categorys = await page.$$eval(CATEGORYLABEL, (labels) => {
      console.log("labels", labels);
      return labels.map((label, i) => {
        return {
          label: label.innerText,
          i,
        };
      });
    });

    const currentCategory = categorys.find(({ label }) => {
      return paramCategory === label;
    });
    let keywords = [];
    console.log("currentCategory", currentCategory);
    if (currentCategory) {
      const selectLabel = await page.$$(CATEGORYLABEL);

      await selectLabel[currentCategory.i].click();

      await page.waitFor(
        "#keyword-table-scroll-wrapper > table > tbody > tr td:nth-child(3) > a > label"
      );

      const sortBtnSelector =
        "#keyword-table-header-scroll-wrapper > table > thead > tr > th:nth-child(7) > div.sort-buttons-container > div.sort-button.sort-asc";

      await page.waitFor(sortBtnSelector);
      const sortBtn = await page.$(sortBtnSelector);
      console.log("sortBtn", sortBtn);
      if (sortBtn) {
        await sortBtn.click();
        await page.waitFor(1000);
        await sortBtn.click();
      }
      await page.waitFor(2000);

      keywords = await page.$$eval(
        "#keyword-table-scroll-wrapper > table > tbody > tr",
        (keywords) =>
          keywords.map((keyword, i) => ({
            keyword: keyword.querySelector("td:nth-child(3) > a > label")
              .innerText,
            searchcount: keyword.querySelector("td:nth-child(4) > a > label")
              .innerText,
            clickcount: keyword.querySelector("td:nth-child(7) > a").innerText,
            compition: keyword.querySelector("td:nth-child(6) > a").innerText,
          }))
      );
      // console.log("keywords", keywords);
    } else {
      keywords = [];
    }

    await page.waitFor(1000);
    await browser.close();

    res.json({ returnMessage: "성공", returnCode: 0, data: keywords });
    return { keywords };
  } catch (e) {
    await browser.close();
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};
