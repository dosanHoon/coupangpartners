export default function(productTitle,sUrl,reviews,imgSurl){
return ` <h1>${productTitle}</h1>

<p>안녕하세요. 생활 밀창형 리뷰어 데인 입니다.</p>

<p>오늘 소개 할 제품은 바로 ${productTitle} 입니다.</p>

<a href="${sUrl}"><h1> >> ${productTitle} 바로 가기<< </h1></a>

<img src="${imgSurl}"/>

${reviews && reviews.map(({imgs,text})=>{
return `<div>${imgs}</div>
<div>${text}</div>`
})}

<a href="${sUrl}"><h1> >> ${productTitle} 바로 가기<< </h1></a>

파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
`
}