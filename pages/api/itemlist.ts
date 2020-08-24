import coupanglist from "../../utils/puppeteer/coupanglist";

export default async (req, res) => {
  try {
    const category = req.query.category;

    await coupanglist(category);

    res.json({
      returnMessage: "성공",
      returnCode: 0,
    });
  } catch (e) {
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};
