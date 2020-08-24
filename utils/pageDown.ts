export default async function (page) {
  const scrollHeight = "document.body.scrollHeight";
  let previousHeight = await page.evaluate(scrollHeight);
  await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
  await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
    timeout: 30000,
  });
}
