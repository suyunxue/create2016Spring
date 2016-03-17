清除浮动兼容要低版本浏览器
`.container:after {
  content:"";
  display:block;
  clear:both;
}

.box-set:before,
.box-set:after {
  content: "";
  display: table;
}
.box-set:after {
  clear: both;
}
.box-set {
  *zoom: 1;
}
`
##CSS中margin边界叠加问题及解决方案(1)
触发bfc(Box、Formatting Context)
https://www.zhihu.com/question/19823139
https://www.w3.org/TR/CSS2/box.html#collapsing-margins
http://www.smallni.com/haslayout-block-formatting-contexts/q

要想设置元素的100%，就必须设置他的上一级元素的宽高,body是html的一个节点必须都设置100%才能解决浏览器兼容问题，
http://www.zhangxinxu.com/wordpress/2009/09/%E5%AF%B9html%E4%B8%8Ebody%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6%E4%B8%8E%E7%90%86%E8%A7%A3/
