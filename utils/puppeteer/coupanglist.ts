import init from "./init";

export default async function (category) {
  try {
    const page = await init();
    await page.goto(`https://www.coupang.com/np/categories/${category}`);
  } catch {}
}
