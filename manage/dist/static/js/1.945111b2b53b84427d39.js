webpackJsonp([1],{"2n/w":function(t,e){},"8SQj":function(t,e){},Cz8s:function(t,e,a){"use strict";var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header-box"},[e("header",{staticClass:"header container"},[e("div",{staticClass:"logo"},[this._v("奔跑的蜗牛")]),this._v(" "),e("ul",{staticClass:"nav"},[e("li",{staticClass:"bread"},[e("router-link",{attrs:{to:"/index/main"}},[this._v("\n\t\t\t\t首页\n\t\t\t\t")])],1)])])])},staticRenderFns:[]};var i=a("VU/8")({name:"theader",data:function(){return{}},methods:{},components:{}},n,!1,function(t){a("2n/w")},"data-v-295bef31",null);e.a=i.exports},Zzt0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("NYxO"),i=a("5reh"),s=a("Cz8s"),r={name:"readPage",data:function(){return{cur_article:{content:"",title:"",date:"",time:""}}},computed:Object(n.b)({article:function(t){return t.article}}),mounted:function(){this.initData()},methods:{initData:function(){var t=this,e=this.$route.params.id;this.$store.dispatch("article/"+i.m,{id:e}).then(function(e){t.cur_article=e})}},components:{bheader:s.a}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("bheader"),t._v(" "),a("div",{staticClass:"content-box"},[a("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.cur_article.title)}}),t._v(" "),a("div",{staticClass:"author"},[a("img",{staticClass:"head-img",attrs:{src:t.cur_article.photo,width:"38",height:"38"}}),t._v(" "),a("span",{domProps:{textContent:t._s("作者："+t.cur_article.author)}})]),t._v(" "),a("article",{staticClass:"content",domProps:{innerHTML:t._s(t.cur_article.content)}})])],1)},staticRenderFns:[]};var o=a("VU/8")(r,c,!1,function(t){a("8SQj")},"data-v-b005a502",null);e.default=o.exports}});
//# sourceMappingURL=1.945111b2b53b84427d39.js.map