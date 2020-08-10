export default function (productTitle, sUrl, reviews, imgSurl) {
  return `

<h1>${productTitle}</h1>

<p>안녕하세요. 생활 밀창형 리뷰어 데인 입니다.</p>
<br/>
<br/>
<p>오늘 소개 할 제품은 바로 ${productTitle} 입니다.</p>
<br/>
<br/>
<a href="${sUrl}"><h2> >> ${productTitle} 바로 가기<< </h2></a>
<br/>
<br/>
<img src="${imgSurl}"/>
<br/>
<br/>
<h2>${productTitle} 리뷰</h2>
<br/>
<br/>
${
  reviews &&
  reviews.map(({ imgs, text, title }) => {
    return `
<div style="margin:10px auto;">
    <h3>${title}</h3>
    ${imgs}<br/>
    <div style="font-size:25px;line-height:31px;font-family:'nanum-gothic'">
    <p>${text}</p><br/>
    </div>
<div>`;
  })
}
<br/>
<br/>
<br/>
<a href="${sUrl}"><h2> >> ${productTitle} 바로 가기<< </h2></a>
<br/>
<br/>
<br/>
파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
`;
}
