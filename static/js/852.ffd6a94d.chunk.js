(self.webpackChunkclient=self.webpackChunkclient||[]).push([[852,136],{1599:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var i=n(885),s=n(2791),r=n(3504),a=n(6871),d=n(8890),o=n.n(d),l=n(184),c=function(){return(0,l.jsx)("div",{id:"adminAuth"})},u=function(){return(0,l.jsx)("div",{id:"dashboard",children:"dash"})},m=n(4569),h=n.n(m),p=n(7551),x=n(2443),b=n.n(x),g=n(74),j=n(6854),f=function(){var e=(0,s.useState)("none"),t=(0,i.Z)(e,2),n=t[0],r=t[1],a=(0,s.useState)(""),d=(0,i.Z)(a,2),c=d[0],u=d[1],m=(0,s.useState)(""),x=(0,i.Z)(m,2),f=x[0],v=x[1],w=(0,s.useState)(""),C=(0,i.Z)(w,2),N=C[0],y=C[1],S=(0,s.useState)(!1),A=(0,i.Z)(S,2),k=A[0],D=A[1];return(0,l.jsxs)("div",{id:"addNews",children:[(0,l.jsxs)("form",{children:[(0,l.jsx)("label",{htmlFor:"newsCategory",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f:"}),(0,l.jsxs)("select",{onChange:function(e){r(e.target.value)},defaultValue:"none",name:"newsCategory",id:"newsCategory",children:[(0,l.jsx)("option",{value:"none",disabled:!0,children:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u0430"}),(0,l.jsx)("option",{value:"rpl",children:"\u0420\u041f\u041b"}),(0,l.jsx)("option",{value:"epl",children:"\u0410\u041f\u041b"}),(0,l.jsx)("option",{value:"laliga",children:"\u041b\u0430 \u041b\u0438\u0433\u0430"}),(0,l.jsx)("option",{value:"seriea",children:"\u0421\u0435\u0440\u0438\u044f \u0410"}),(0,l.jsx)("option",{value:"bundesliga",children:"\u0411\u0443\u043d\u0434\u0435\u0441\u043b\u0438\u0433\u0430"}),(0,l.jsx)("option",{value:"ligue1",children:"\u041b\u0438\u0433\u0430 1"}),(0,l.jsx)("option",{value:"ucl",children:"\u041b\u0427"}),(0,l.jsx)("option",{value:"uel",children:"\u041b\u0415"}),(0,l.jsx)("option",{value:"uecl",children:"\u041b\u041a"}),(0,l.jsx)("option",{value:"unl",children:"\u041b\u041d"}),(0,l.jsx)("option",{value:"wc",children:"\u0427\u041c"}),(0,l.jsx)("option",{value:"ec",children:"\u0427\u0415"}),(0,l.jsx)("option",{value:"other",children:"\u0420\u0430\u0437\u043d\u043e\u0435"}),(0,l.jsx)("option",{value:"blog",children:"\u0411\u043b\u043e\u0433\u0438"}),(0,l.jsx)("option",{value:"video",children:"\u0412\u0438\u0434\u0435\u043e"}),(0,l.jsx)("option",{value:"transfer",children:"\u0422\u0440\u0430\u043d\u0441\u0444\u0435\u0440\u044b"})]}),(0,l.jsx)("label",{htmlFor:"newsTitle",children:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a:"}),(0,l.jsx)("input",{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",onChange:function(e){u(e.target.value)},type:"text",id:"newsTitle",name:"newsTitle"}),(0,l.jsx)("label",{htmlFor:"newsImg",children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435:"}),(0,l.jsx)("input",{placeholder:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",onChange:function(e){v(e.target.value)},type:"text",name:"newsImg",id:"newsImg"}),(0,l.jsx)("label",{id:"newsContentLabel",htmlFor:"newsContent",children:"\u041a\u043e\u043d\u0442\u0435\u043d\u0442:"}),(0,l.jsx)(p.CKEditor,{config:{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438",mediaEmbed:{previewsInData:!0}},data:N,disabled:k,id:"newsContent",editor:b(),onChange:function(e,t){y(t.getData())}}),(0,l.jsx)("button",{title:"\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440",type:"submit",id:"newsSubmit",onClick:function(e){e.preventDefault(),"none"===n?alert("\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"):""===c?alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"):""===f?alert("\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"):""===N?alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0441\u0442\u0438"):(o()(".preview").fadeIn(),o()("body").css({overflow:"hidden"}))},children:"+"})]}),(0,l.jsxs)("div",{className:"preview",children:[(0,l.jsx)("p",{className:"popupTitle",children:"\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440"}),(0,l.jsx)("section",{children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsx)("p",{className:"pageName",children:c}),(0,l.jsx)("span",{className:"date",children:"\u0414\u0414-\u041c\u041c-\u0413\u0413\u0413\u0413 | \u0427\u0427:\u041c\u041c"}),(0,l.jsx)(g.Z,{offset:800,children:(0,l.jsx)("img",{id:"mainImg",src:f,alt:"newsImg"})}),(0,l.jsx)("div",{className:"textWrap",children:j(N)})]})}),(0,l.jsx)("button",{title:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c",type:"submit",className:"acceptBtn",onClick:function(){h().post("https://legfootball.herokuapp.com/admin/addNews",{category:n,title:c,img:f,content:N}).catch((function(e){if(e)throw e})),o()("select").prop({selectedIndex:"0"}),document.querySelector("#newsSubmit").innerHTML="\u2713",document.querySelector("#newsSubmit").setAttribute("disabled","disabled"),document.querySelector("#newsCategory").setAttribute("disabled","disabled"),document.querySelector("#newsTitle").setAttribute("disabled","disabled"),document.querySelector("#newsImg").setAttribute("disabled","disabled"),document.querySelector("#newsSubmit").style.background="#18ba20",o()(".preview").fadeOut(),o()("body").css({overflow:"auto"}),D(!0),v(""),u(""),y(""),r("none"),o()("input").val(""),setTimeout((function(){document.querySelector("#newsSubmit").innerHTML="+",document.querySelector("#newsSubmit").removeAttribute("disabled"),document.querySelector("#newsCategory").removeAttribute("disabled"),document.querySelector("#newsTitle").removeAttribute("disabled"),document.querySelector("#newsImg").removeAttribute("disabled"),document.querySelector("#newsSubmit").style.background="rgba(204, 135, 45, 0.9)",D(!1)}),1e4)},children:"\u2713"}),(0,l.jsx)("button",{title:"\u041e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u044c",type:"submit",className:"rejectBtn",onClick:function(){o()(".preview").fadeOut(),o()("body").css({overflow:"auto"})},children:"\u2a2f"})]})]})},v=n(4165),w=n(5861),C=function(){var e=(0,s.useState)(),t=(0,i.Z)(e,2),n=t[0],a=t[1],d=(0,s.useState)(""),c=(0,i.Z)(d,2),u=c[0],m=c[1],x=(0,s.useState)(),j=(0,i.Z)(x,2),f=j[0],C=j[1],N=(0,s.useState)("wqdwq"),y=(0,i.Z)(N,2),S=y[0],A=y[1],k=(0,s.useState)(""),D=(0,i.Z)(k,2),W=D[0],Z=D[1],I=(0,s.useState)(""),T=(0,i.Z)(I,2),F=T[0],q=T[1],M=(0,s.useState)(""),O=(0,i.Z)(M,2),E=O[0],L=O[1];return(0,s.useEffect)((function(){var e=function(){var e=(0,w.Z)((0,v.Z)().mark((function e(){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h().get("/news/allNews").then((function(e){a(e.data&&e.data.reverse().map((function(e){var n=new Date(e.date),i=String(n.getDate()).length<2?"0"+String(n.getDate()):String(n.getDate()),s=String(n.getMonth()).length<2?"0"+String(n.getMonth()+1):String(n.getMonth()+1),a=n.getFullYear(),d=String(n.getHours()).length<2?"0"+String(n.getHours()):String(n.getHours()),c=String(n.getMinutes()).length<2?"0"+String(n.getMinutes()):String(n.getMinutes());return(0,l.jsxs)("div",{className:"newsCart",children:[(0,l.jsx)(r.rU,{to:"/news/read/"+e.id,children:(0,l.jsxs)("div",{className:"hover",children:[(0,l.jsx)(g.Z,{offset:800,children:(0,l.jsx)("img",{src:e.img,alt:"newsimg"})}),(0,l.jsx)("p",{children:e.title})]})}),(0,l.jsxs)("div",{className:"editDelWrap",children:[(0,l.jsx)("button",{id:"edit"+e.id,title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",onClick:t,children:"\u270e"}),(0,l.jsx)("button",{id:"del"+e.id,title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",onClick:function(e){m(e.target.id.match(/\d+/)[0]),o()("#delConfirm").fadeIn(),o()("body").css({overflow:"hidden"})},children:"\ud83d\uddd1"})]}),(0,l.jsxs)("div",{className:"bottom",children:[(0,l.jsxs)("span",{className:"newsId",children:["ID: ",e.id]}),(0,l.jsx)("span",{className:"newsDate",children:i+"-"+s+"-"+a+" | "+d+":"+c}),(0,l.jsx)("span",{className:"newsCategory",children:"#".concat(e.category)})]}),(0,l.jsx)("div",{id:"delConfirm",children:(0,l.jsxs)("div",{id:"forCenter",children:[(0,l.jsx)("p",{children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u0443 \u043d\u043e\u0432\u043e\u0441\u0442\u044c?"}),(0,l.jsxs)("div",{id:"btnWrap",children:[(0,l.jsx)("button",{onClick:function(){m(""),o()("#delConfirm").fadeOut(),o()("body").css({overflow:"auto"}),h().post("/admin/delNews",{id:u&&u}).catch((function(e){if(e)throw e})),o()("#editDeleteNews .newsCart .editDelWrap button").attr("disabled","disabled"),o()("#editDeleteNews .newsCart .editDelWrap button").css({background:"silver"}),setTimeout((function(){o()("#editDeleteNews .newsCart .editDelWrap button").removeAttr("disabled"),o()("#editDeleteNews .newsCart .editDelWrap button").css({background:"#fff"})}),1e4)},children:"\u0414\u0410"}),(0,l.jsx)("button",{onClick:function(){m(""),o()("#delConfirm").fadeOut(),o()("body").css({overflow:"auto"})},children:"\u041d\u0415\u0422"})]})]})})]},"news"+e.id)})))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e();var t=function(e){o()(".editPopup").fadeIn(),o()("body").css({overflow:"hidden"}),h().post("https://legfootball.herokuapp.com/admin/findEditedNews",{id:e.target.id.match(/\d+/)[0]}).then((function(t){L(e.target.id.match(/\d+/)[0]),C(t.data[0].category),A(t.data[0].title),Z(t.data[0].img),q(t.data[0].content)})).catch((function(e){console.log(e)}))}}),[u,f,S,W,F,E]),(0,l.jsxs)("div",{id:"editDeleteNews",children:[n,(0,l.jsxs)("div",{className:"editPopup",children:[(0,l.jsx)("p",{className:"popupTitle",children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}),(0,l.jsx)("div",{className:"container",children:(0,l.jsxs)("form",{children:[(0,l.jsx)("label",{htmlFor:"editNewsCategory",children:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f:"}),(0,l.jsxs)("select",{onChange:function(e){C(e.target.value)},value:f,name:"editNewsCategory",id:"editNewsCategory",children:[(0,l.jsx)("option",{value:"none",disabled:!0,children:"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u0430"}),(0,l.jsx)("option",{value:"rpl",children:"\u0420\u041f\u041b"}),(0,l.jsx)("option",{value:"epl",children:"\u0410\u041f\u041b"}),(0,l.jsx)("option",{value:"laliga",children:"\u041b\u0430 \u041b\u0438\u0433\u0430"}),(0,l.jsx)("option",{value:"seriea",children:"\u0421\u0435\u0440\u0438\u044f \u0410"}),(0,l.jsx)("option",{value:"bundesliga",children:"\u0411\u0443\u043d\u0434\u0435\u0441\u043b\u0438\u0433\u0430"}),(0,l.jsx)("option",{value:"ligue1",children:"\u041b\u0438\u0433\u0430 1"}),(0,l.jsx)("option",{value:"ucl",children:"\u041b\u0427"}),(0,l.jsx)("option",{value:"uel",children:"\u041b\u0415"}),(0,l.jsx)("option",{value:"uecl",children:"\u041b\u041a"}),(0,l.jsx)("option",{value:"unl",children:"\u041b\u041d"}),(0,l.jsx)("option",{value:"wc",children:"\u0427\u041c"}),(0,l.jsx)("option",{value:"ec",children:"\u0427\u0415"}),(0,l.jsx)("option",{value:"other",children:"\u0420\u0430\u0437\u043d\u043e\u0435"}),(0,l.jsx)("option",{value:"blog",children:"\u0411\u043b\u043e\u0433\u0438"}),(0,l.jsx)("option",{value:"video",children:"\u0412\u0438\u0434\u0435\u043e"}),(0,l.jsx)("option",{value:"transfer",children:"\u0422\u0440\u0430\u043d\u0441\u0444\u0435\u0440\u044b"})]}),(0,l.jsx)("label",{htmlFor:"editNewsTitle",children:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a:"}),(0,l.jsx)("input",{onChange:function(e){A(e.target.value)},type:"text",id:"editNewsTitle",name:"editNewsTitle",value:S}),(0,l.jsx)("label",{htmlFor:"editImg",children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435:"}),(0,l.jsx)("input",{onChange:function(e){Z(e.target.value)},type:"text",name:"editImg",id:"editImg",value:W}),(0,l.jsx)("label",{id:"editNewsContentLabel",htmlFor:"editNewsContent",children:"\u041a\u043e\u043d\u0442\u0435\u043d\u0442:"}),(0,l.jsx)(p.CKEditor,{id:"editNewsContent",data:F,editor:b(),onChange:function(e,t){q(t.getData())}})]})}),(0,l.jsx)("button",{title:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c",type:"submit",className:"acceptBtn",onClick:function(e){e.preventDefault(),"none"===f?alert("\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"):""===S?alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"):""===W?alert("\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"):""===F?alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0441\u0442\u0438"):(L(""),Z(""),A(""),q(""),C("none"),o()(".editPopup").fadeOut(),o()("body").css({overflow:"auto"}),o()("#editDeleteNews .newsCart .editDelWrap button").attr("disabled","disabled"),o()("#editDeleteNews .newsCart .editDelWrap button").css({background:"silver"}),h().post("/admin/editNews",{id:E&&E,category:f,title:S,img:W,content:F}).catch((function(e){console.log(e)})),setTimeout((function(){o()("#editDeleteNews .newsCart .editDelWrap button").removeAttr("disabled"),o()("#editDeleteNews .newsCart .editDelWrap button").css({background:"#fff"})}),1e4))},children:"\u2713"}),(0,l.jsx)("button",{title:"\u041e\u0442\u043a\u043b\u043e\u043d\u0438\u0442\u044c",type:"submit",className:"rejectBtn",onClick:function(){L(""),Z(""),A(""),q(""),C("none"),o()(".editPopup").fadeOut(),o()("body").css({overflow:"auto"})},children:"\u2a2f"})]})]})},N=n(2136),y=n.p+"static/media/homeIco.524ceaca1ca99f1349fd.webp",S=n(6092),A=n.p+"static/media/add.0f43574470b30d4aa6ce.webp",k=function(){var e=(0,s.useState)(!0),t=(0,i.Z)(e,2),n=t[0],d=t[1];return(0,s.useEffect)((function(){o()(window).width()<=1024&&o()("#adminNav a").click((function(){d(!0),o()("#adminNav").slideUp(),o()(".bar1Admin").css({transform:"rotate(0deg) translate(0px, 0px)"}),o()(".bar2Admin").css({opacity:"1"}),o()(".bar3Admin").css({transform:"rotate(0deg) translate(0px, 0px)"}),o()(".bar1Admin").css({backgroundColor:"rgb(145, 99, 40)"}),o()(".bar2Admin").css({backgroundColor:"rgb(145, 99, 40)"}),o()(".bar3Admin").css({backgroundColor:"rgb(145, 99, 40)"})}))}),[]),(0,l.jsxs)("div",{id:"adminMain",children:[(0,l.jsx)("div",{id:"menuToggleAdminWrap",children:(0,l.jsxs)("div",{id:"menuToggleAdmin",onClick:function(){o()(window).width()<=1024&&(d(!n),n?(o()(".bar1Admin").css({transform:"rotate(-45deg) translate(-8px, 7px)"}),o()(".bar2Admin").css({opacity:"0"}),o()(".bar3Admin").css({transform:"rotate(45deg) translate(-8px, -8px)"}),o()(".bar1Admin").css({backgroundColor:"#000"}),o()(".bar2Admin").css({backgroundColor:"#000"}),o()(".bar3Admin").css({backgroundColor:"#000"}),o()("#adminNav").slideDown()):(o()(".bar1Admin").css({transform:"rotate(0deg) translate(0px, 0px)"}),o()(".bar2Admin").css({opacity:"1"}),o()(".bar3Admin").css({transform:"rotate(0deg) translate(0px, 0px)"}),o()(".bar1Admin").css({backgroundColor:"rgb(145, 99, 40)"}),o()(".bar2Admin").css({backgroundColor:"rgb(145, 99, 40)"}),o()(".bar3Admin").css({backgroundColor:"rgb(145, 99, 40)"}),o()("#adminNav").slideUp()))},children:[(0,l.jsx)("div",{className:"bar1Admin"}),(0,l.jsx)("div",{className:"bar2Admin"}),(0,l.jsx)("div",{className:"bar3Admin"})]})}),(0,l.jsx)("div",{id:"adminNav",children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:(0,l.jsxs)(r.rU,{to:"/Website-LF-Frontend/admin/dashboard",children:[(0,l.jsx)("img",{src:y,alt:"ico"})," \u0413\u043b\u0430\u0432\u043d\u0430\u044f \u043f\u0430\u043d\u0435\u043b\u044c"]})}),(0,l.jsx)("li",{children:(0,l.jsxs)(r.rU,{to:"/Website-LF-Frontend/admin/news",children:[(0,l.jsx)("img",{src:S,alt:"ico"})," \u0412\u0441\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438"]})}),(0,l.jsx)("li",{children:(0,l.jsxs)(r.rU,{to:"/Website-LF-Frontend/admin/addnews",children:[(0,l.jsx)("img",{src:A,alt:"ico"})," \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0441\u0442\u044c"]})})]})}),(0,l.jsxs)(a.Z5,{children:[(0,l.jsx)(a.AW,{path:"/",element:(0,l.jsx)(c,{})}),(0,l.jsx)(a.AW,{path:"dashboard",element:(0,l.jsx)(u,{})}),(0,l.jsx)(a.AW,{path:"news",element:(0,l.jsx)(C,{})}),(0,l.jsx)(a.AW,{path:"addnews",element:(0,l.jsx)(f,{})}),(0,l.jsx)(a.AW,{path:"*",element:(0,l.jsx)(N.default,{})})]})]})}},2136:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r}});n(2791);var i=n(74),s=n(184),r=function(e){return(0,s.jsx)("div",{id:"error",children:(0,s.jsx)(i.Z,{offset:800,children:(0,s.jsx)("img",{src:n(9882)("./error404".concat(Math.ceil(4*Math.random()),".jpg")),alt:""})})})}},9882:function(e,t,n){var i={"./error4041.jpg":9721,"./error4042.jpg":6599,"./error4043.jpg":6453,"./error4044.jpg":3277};function s(e){var t=r(e);return n(t)}function r(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}s.keys=function(){return Object.keys(i)},s.resolve=r,e.exports=s,s.id=9882},9721:function(e,t,n){"use strict";e.exports=n.p+"static/media/error4041.e6c75dca2dfb5f05a442.jpg"},6599:function(e,t,n){"use strict";e.exports=n.p+"static/media/error4042.72f83658e98513c8f8ea.jpg"},6453:function(e,t,n){"use strict";e.exports=n.p+"static/media/error4043.4abf11b05d3545d3a70d.jpg"},3277:function(e,t,n){"use strict";e.exports=n.p+"static/media/error4044.d105dcfa6b06f48743f1.jpg"}}]);
//# sourceMappingURL=852.ffd6a94d.chunk.js.map