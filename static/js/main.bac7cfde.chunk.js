(this["webpackJsonpbook-search"]=this["webpackJsonpbook-search"]||[]).push([[0],{2:function(e,t,o){e.exports={overlay:"Modal_overlay__1TgzI",show:"Modal_show__1k4KI",closeModalBtn:"Modal_closeModalBtn__3ingD",bookData:"Modal_bookData__2rRut",bookData__cover:"Modal_bookData__cover__1HcMf",bookData__cover_placeholder:"Modal_bookData__cover_placeholder__3M3nF",bookData__info_title:"Modal_bookData__info_title__20AKR",bookData__info_author:"Modal_bookData__info_author__2AY8b",bookData__info_additional:"Modal_bookData__info_additional__2QYKT",bookData__info_addTitle:"Modal_bookData__info_addTitle__3TwEa",bookData__info_addValue:"Modal_bookData__info_addValue__31WWg"}},34:function(e,t,o){},35:function(e,t,o){},36:function(e,t,o){"use strict";o.r(t);var a=o(1),c=o.n(a),n=o(9),s=o.n(n),r=o(4),i=o(7),l=o(17),_=o(18),b=o(14),u=o(3),d={offset:0,limit:10,books:[],showLoader:!1,booksNotFound:!1,selectedBook:null,lastSearch:"",error:null},j="SET_OFFSET",h="STORE_REQUEST",f="FETCH_BOOKS_START",p="FETCH_BOOKS_SUCCESS",O="FETCH_BOOKS_FAILURE",k="CLEAR_BOOKS",m="BOOKS_NOT_FOUND",v="SELECT_BOOK",x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:return Object(u.a)(Object(u.a)({},e),{},{offset:t.payload});case f:return Object(u.a)(Object(u.a)({},e),{},{booksNotFound:!1,showLoader:!0,error:null});case m:return Object(u.a)(Object(u.a)({},e),{},{booksNotFound:!0,showLoader:!1});case p:return 0===e.offset?Object(u.a)(Object(u.a)({},e),{},{books:t.payload,showLoader:!1}):Object(u.a)(Object(u.a)({},e),{},{books:[].concat(Object(b.a)(e.books),Object(b.a)(t.payload)),showLoader:!1});case O:return Object(u.a)(Object(u.a)({},e),{},{showLoader:!1,error:t.payload});case k:return Object(u.a)(Object(u.a)({},e),{},{booksNotFound:!1,showLoader:!1,books:[]});case v:return Object(u.a)(Object(u.a)({},e),{},{selectedBook:t.payload});case h:return Object(u.a)(Object(u.a)({},e),{},{lastSearch:t.payload});default:return e}},N=Object(i.createStore)(x,Object(l.composeWithDevTools)(Object(i.applyMiddleware)(_.a))),g=o(13),y=o.n(g),D=o(19),E=function e(){if(document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+1){var t=N.getState().offset,o=N.getState().limit;N.dispatch(w(t+o)),document.removeEventListener("scroll",e)}},w=function(e){return{type:j,payload:e}},B=function(e){return{type:v,payload:e}},S=function(e){return function(){var t=Object(D.a)(y.a.mark((function t(o,a){var c,n,s,r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=e.split(" ").join("+"),n=a().offset,s=a().lastSearch,t.prev=3,!e.trim()||e===s&&0===n){t.next=13;break}return o({type:f}),t.next=8,fetch("https://openlibrary.org/search.json?title=".concat(c,"&limit=10&offset=").concat(n)).then((function(e){return e.json()}));case 8:0===(r=t.sent).docs.length&&0===a().books.length?o({type:m,payload:!0}):o((l=r.docs,{type:p,payload:l})),r.docs.length>0&&document.addEventListener("scroll",E),t.next=18;break;case 13:if(e.trim()){t.next=17;break}o({type:k}),t.next=18;break;case 17:return t.abrupt("return");case 18:t.next=23;break;case 20:t.prev=20,t.t0=t.catch(3),o((i=t.t0,{type:O,payload:i}));case 23:o({type:h,payload:e});case 24:case"end":return t.stop()}var i,l}),t,null,[[3,20]])})));return function(e,o){return t.apply(this,arguments)}}()},T=o(6),L=o.n(T),M=o(0),F=function(e){var t=e.book,o=Object(r.b)(),a=function(e){" "!==e.key&&"Enter"!==e.key||e.target.click()};return Object(M.jsxs)("div",{className:L.a.book,onClick:function(){return o(B(t))},tabIndex:"0",onFocus:function(e){e.target.addEventListener("keypress",a)},onBlur:function(e){e.target.removeEventListener("keypress",a)},children:[t.cover_i&&-1!==t.cover_i?Object(M.jsx)("img",{className:L.a.book__cover,src:"https://covers.openlibrary.org/b/id/".concat(t.cover_i,"-M.jpg"),alt:"".concat(t.title," cover")}):Object(M.jsx)("div",{className:"".concat(L.a.book__cover_placeholder," ").concat(L.a.book__cover)}),Object(M.jsxs)("div",{className:L.a.book__info,children:[Object(M.jsx)("h2",{className:L.a.book__info_title,children:t.title}),Object(M.jsx)("hr",{}),Object(M.jsx)("h4",{className:L.a.book__info_authors,children:Array.isArray(t.author_name)?t.author_name.join(", "):t.author_name})]})]})},A=o(2),C=o.n(A),I=function(){var e,t=Object(r.c)((function(e){return e.selectedBook})),o=Object(r.b)(),c=Object(a.useRef)(),n=Object(a.useRef)(),s=function(){c.current.classList.remove(C.a.show),setTimeout((function(){return o(B(null))}),600)};return Object(a.useEffect)((function(){c.current.classList.add(C.a.show),n.current.focus()}),[]),Object(M.jsx)("div",{ref:c,className:C.a.overlay,onClick:s,children:Object(M.jsxs)("main",{ref:n,className:C.a.bookData,onClick:function(e){return e.stopPropagation()},tabIndex:"1",children:[Object(M.jsx)("button",{className:C.a.closeModalBtn,onClick:s,tabIndex:"1",children:"\xd7"}),t.cover_i&&-1!==t.cover_i?Object(M.jsx)("img",{className:C.a.bookData__cover,src:"https://covers.openlibrary.org/b/id/".concat(t.cover_i,"-L.jpg"),alt:"".concat(t.title," cover")}):Object(M.jsx)("div",{className:"".concat(C.a.bookData__cover_placeholder," ").concat(C.a.bookData__cover)}),Object(M.jsxs)("div",{className:C.a.bookData__info,children:[Object(M.jsx)("h2",{className:C.a.bookData__info_title,children:t.title}),Object(M.jsx)("p",{className:C.a.bookData__info_author,children:t.author_name.length>1?Object(M.jsxs)(M.Fragment,{children:["\u0410\u0432\u0442\u043e\u0440\u044b: ",Object(M.jsx)("b",{children:t.author_name.join(", ")})]}):Object(M.jsxs)(M.Fragment,{children:["\u0410\u0432\u0442\u043e\u0440: ",Object(M.jsx)("b",{children:t.author_name})]})}),Object(M.jsxs)("div",{className:C.a.bookData__info_additional,children:[Object(M.jsx)("b",{className:C.a.bookData__info_addTitle,children:"\u0414\u0430\u0442\u0430 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438:"}),Object(M.jsx)("span",{className:C.a.bookData__info_addValue,children:t.publish_date[0]})]}),Object(M.jsxs)("div",{className:C.a.bookData__info_additional,children:[Object(M.jsx)("b",{className:C.a.bookData__info_addTitle,children:"\u0418\u0437\u0434\u0430\u0442\u0435\u043b\u044c:"}),Object(M.jsx)("span",{className:C.a.bookData__info_addValue,children:t.publisher[0]})]}),Object(M.jsxs)("div",{className:C.a.bookData__info_additional,children:[Object(M.jsx)("b",{className:C.a.bookData__info_addTitle,children:"ISBN:"}),Object(M.jsx)("span",{className:C.a.bookData__info_addValue,children:t.isbn?(e=t.isbn[0],13===e.length?"".concat(e.slice(0,3),"-").concat(e[3],"-").concat(e.slice(4,8),"-").concat(e.slice(8,12),"-").concat(e[12]):10===e.length?"".concat(e[0],"-").concat(e.slice(1,5),"-").concat(e.slice(5,9),"-").concat(e[9]):e):"ISBN \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"})]})]})]})})},R=o(8),K=o.n(R),P=function(){var e=Object(a.useRef)();Object(a.useEffect)((function(){e.current.classList.add(K.a.show),setTimeout((function(){e.current.classList.remove(K.a.show)}),3e3)}),[]);var t=Object(r.c)((function(e){var t;return null!==(t=e.error.message)&&void 0!==t?t:"\u041d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443, \u0438\u043b\u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435..."}));return Object(M.jsx)("div",{className:K.a.popup,ref:e,children:Object(M.jsx)("strong",{className:K.a.message,children:t})})},V=(o(34),function(){return Object(M.jsxs)("div",{className:"lds-ring",children:[Object(M.jsx)("div",{}),Object(M.jsx)("div",{}),Object(M.jsx)("div",{}),Object(M.jsx)("div",{})]})});var H=function(e,t){var o=setTimeout(e,t);this.stop=function(){return o&&(clearTimeout(o),o=null),this},this.start=function(){return o||(this.stop(),o=setTimeout(e,t)),this},this.reset=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t;return t=e,this.stop().start()}},Y=o(5),z=o.n(Y),U=function(){var e=Object(r.c)((function(e){return e.offset})),t=Object(r.c)((function(e){return e.books})),o=Object(r.c)((function(e){return e.lastSearch})),c=Object(r.c)((function(e){return e.showLoader})),n=Object(r.c)((function(e){var t;return null!==(t=e.error)&&void 0!==t&&t})),s=Object(r.c)((function(e){return e.booksNotFound})),i=Object(r.c)((function(e){return e.selectedBook})),l=Object(r.b)(),_=Object(a.useRef)(),b=Object(a.useRef)(),u=new H((function(){l(S(_.current.value))}),1e3);u.stop();var d=Object(a.useCallback)((function(){0===e&&_.current.value.trim()===o||u.reset()}),[e,o]);return Object(a.useEffect)((function(){document.removeEventListener("scroll",E),d()}),[e,d]),Object(a.useEffect)((function(){0===t.length&&b.current.classList.add("".concat(z.a.show))}),[t]),Object(M.jsxs)("div",{className:z.a.app,children:[n&&Object(M.jsx)(P,{}),i&&Object(M.jsx)(I,{}),Object(M.jsx)("h1",{className:z.a.title,children:"\u041a\u043d\u0438\u0433\u0438"}),Object(M.jsxs)("div",{className:z.a.search,children:[Object(M.jsx)("input",{className:z.a.search__input,type:"text",onChange:function(t){0!==e&&l(w(0)),u.reset()},placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043d\u0438\u0433\u0438",ref:_}),Object(M.jsx)("button",{className:z.a.search__button,onClick:function(){u.stop(),l(S(_.current.value))},children:"\u041d\u0430\u0439\u0442\u0438"})]}),0===t.length&&Object(M.jsxs)("small",{id:"disclaimer",className:z.a.disclaimer,ref:b,children:["\u0422\u0430\u043a \u043a\u0430\u043a API \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0440\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a, \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430 \u043a\u043d\u0438\u0433\u0438 \u0432\u0432\u043e\u0434\u0438\u0442\u0435 \u0435\u0451 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0442\u0440\u0430\u043d\u0441\u043b\u0438\u0442\u043e\u043c, \u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440 ",Object(M.jsx)("b",{children:'"Ponedel\'nik nachinaetsya v subbotu"'})]}),c&&0===t.length&&Object(M.jsx)(V,{}),s?Object(M.jsx)("p",{className:z.a.noBooks,children:"\u041a \u0441\u043e\u0436\u0430\u043b\u0435\u043d\u0438\u044e, \u043f\u043e \u0432\u0430\u0448\u0435\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0430\u0439\u0442\u0438 \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c"}):Object(M.jsx)("div",{className:"books",children:t.map((function(e){return Object(M.jsx)(F,{book:e},e.key)}))})]})};o(35);s.a.render(Object(M.jsx)(c.a.StrictMode,{children:Object(M.jsx)(r.a,{store:N,children:Object(M.jsx)(U,{})})}),document.getElementById("root"))},5:function(e,t,o){e.exports={app:"App_app__3BT4Y",title:"App_title__2C-7r",search:"App_search__2Y1TS",search__input:"App_search__input__8eVFo",search__button:"App_search__button__1HI-h",disclaimer:"App_disclaimer__2Szu9",show:"App_show__3q8px",noBooks:"App_noBooks__2fhmZ"}},6:function(e,t,o){e.exports={book:"BookItem_book__1P0te",book__cover:"BookItem_book__cover__YGfPK",book__cover_placeholder:"BookItem_book__cover_placeholder__3RQcP",book__info_title:"BookItem_book__info_title__1GSOz",book__info_authors:"BookItem_book__info_authors__8_lfg"}},8:function(e,t,o){e.exports={popup:"ErrPopup_popup__3Vo8r",message:"ErrPopup_message__29wVz",show:"ErrPopup_show__3KE3M"}}},[[36,1,2]]]);
//# sourceMappingURL=main.bac7cfde.chunk.js.map