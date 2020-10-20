const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x') 
//读取当前网站下的x
const xObject = JSON.parse(x)  
//重新把字符串变成对象
const hashMap = xObject || [
  //parcel会默认在代码外面加作用域
  {logo:'A',url:'https://www.acfun.cn'},
  {logo:'B',url:'https://www.bilibili.com'}

]
const simplifyUrl = (url)=>{
  return url.replace('https://','')
     .replace('http://','')
     .replace('www.','') 
     .replace(/\/.*/,'')
     //正则表达式，，删除/开头得内容
    }
const render = ()=>{
  $siteList.find('li:not(.last)').remove()
  //唯独不要最后一个
  hashMap.forEach((node,index)=>{
    //foreach('','')有2个参数
  const $li = $(`<li> 
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='close'>
                <svg class="icon">
                  <use xlink:href="#icon-baseline-close-px"></use>
                </svg>
              </div>
            </div>
         </li>`).insertBefore($lastLi)
         //a标签不能让关闭X起作用
         $li.on('click',()=>{
           window.open(node.url)
         })
         $li.on('click','.close',(e)=>{
           e.stopPropagation()
           //阻止冒泡
           console.log(hashMap)
           hashMap.splice(index,1)
           //删除数组
           render()
         })
       })
      }

render()
$('.addButton')
  .on('click',()=>{
      let url = window.prompt('请问你要添加的网址是啥')
      console.log(url)
      if(url.indexOf('http')!=0){
        // alert('请输入https开头的网址')
        url='https://'+url
      }
      console.log(url)
      hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        //toUpperCase()把一个小写变成大写
        url:url
      })
     render()
   })

window.onbeforeunload = ()=>{
   // console.log('页面要关闭了')
   const string = JSON.stringify(hashMap) 
   //把hashMap对象变成字符串
   localStorage.setItem('x',string)  
}

$(document).on('keypress',(e)=>{
  console.log(e.key)
  const{key} = e
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }
  }
})


  //  console.log(typeof hashMap)
  //  console.log(hashMap) //对象
  //  console.log(typeof string)
  //  console.log(string)  //字符串
//          <li> 
//              <a href="https:www.acfun.cn">
//                 <!-- 内联元素可以包裹块级元素，a标签特殊允许 -->
//                 <div class="site">
//                     <div class="logo">A</div>
//                     <div class="link">acfun.cn</div>
//                 </div>
//              </a>
//          </li>
//         <li>
//             <a href="https://www.bilibili.com/">
//                 <div class="site">
//                     <div class="logo">
//                     <img src="./images/bilibili.png" alt="">
//                     </div>
//                     <div class="link">bilibili.com</div>
//                 </div>
//             </a>
//        </li>
