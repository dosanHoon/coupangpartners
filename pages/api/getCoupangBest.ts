import coupang from "./coupang";
const GET = "GET";
export default async (req, res) => {
  try {
    const { data } = await coupang(
      GET,
      "/products/bestcategories/1016?subId=autotest"
    );
    res.status(200).json({ returnMessage: "성공", returnCode: 0, data });
  } catch (e) {
    console.log("catch 에러 입니다.");
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};
