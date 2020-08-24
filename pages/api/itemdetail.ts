import getReviews from "../../utils/puppeteer/reviews";

export default async (req, res) => {
  try {
    const productId = req.query.productId;
    const productUrl = `https://www.coupang.com/vp/products/${productId}`;
    const { reviews, productTitle, productThumSrc } = await getReviews(
      productUrl
    );
    
    res.json({
      returnMessage: "성공",
      returnCode: 0,
      productTitle,
      reviews,
      productThumSrc,
    });

  } catch (e) {
    console.log("catch 에러 입니다.", e);
    res
      .status(200)
      .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
  }
};
