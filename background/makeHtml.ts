export default function (productTitle, sUrl, reviews, imgSurl) {
  return `
<h1>" ${productTitle} 추천" </h1>
<p></p>
<br/>
<br/>
<br/>
<p>안녕하세요. 생활 밀착형 리뷰어 데인 입니다.</p>
<p>오늘 소개 할 제품은 바로 ${productTitle} 입니다.</p>
<br/>
<br/>
<br/>
<h4 style="text-align:center;">
  더 많은 리뷰와 쿠팡 최저가 확인 하러 가기
</h4>
<br/>
<br/>
<h3  style="text-align:center;">
    <a href="${sUrl}" target="_blank"> >> ${productTitle} 바로 가기 << </a>
</h3>    
<br/>
<br/>
<br/>
<br/>
<br/>
<img src="${imgSurl}" alt="${productTitle}"/>
<br/>
<h2>${productTitle} 리뷰</h2>
<br/>
${
  reviews &&
  reviews.map(({ imgs, text, title, stars, name }) => {
    return `
<div style="margin:10px auto;">
    <h3>${title}</h3>
    <p>쿠팡 리뷰</p>
    <p>${name} 님</p>
    <div style="display: inline-block;
    width: 89px;
    height: 15px;
    background: url(//img1a.coupangcdn.com/image/productreview/web/pdp/average/star_all_v2.png) 0 -271px no-repeat;">
      <div style="${stars}
      height: 15px;
      background: url(//img1a.coupangcdn.com/image/productreview/web/pdp/average/star_all_v2.png) 0 -246px no-repeat;">
      </div>
    </div>
    <br/>
        ${imgs}
    <br/>
    <div>
        <p>${text}</p>
        <br/>
    </div>
<div>`;
  })
}
<br/>
<br/>
<br/>
<h2>
    <a href="${sUrl}" target="_blank"> >> ${productTitle} 바로 가기<< </a>
</h2>    
<br/>
<br/>
<br/>
파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
<br/>
<br/>
`;
}
