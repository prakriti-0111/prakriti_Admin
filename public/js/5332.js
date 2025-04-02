/*! For license information please see 5332.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5332],{95287:function(t,e,r){r.d(e,{Z:function(){return N}});var n=r(30808),o=r(25773),i=r(27378),a=r(38944),s=r(82267),c=r(10043),u=r(89090),l=r(76112),f=r(67018),h=r(6749);function d(t){return(0,h.Z)("MuiCircularProgress",t)}(0,r(44124).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=r(24246);const m=["className","color","disableShrink","size","style","thickness","value","variant"];let v,y,g,x,w=t=>t;const b=(0,c.F4)(v||(v=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),j=(0,c.F4)(y||(y=w`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Z=(0,f.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],e[`color${(0,u.Z)(r.color)}`]]}})((({ownerState:t,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:e.transitions.create("transform")},"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,c.iv)(g||(g=w`
      animation: ${0} 1.4s linear infinite;
    `),b))),k=(0,f.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),S=(0,f.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.circle,e[`circle${(0,u.Z)(r.variant)}`],r.disableShrink&&e.circleDisableShrink]}})((({ownerState:t,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,c.iv)(x||(x=w`
      animation: ${0} 1.4s ease-in-out infinite;
    `),j)));var N=i.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiCircularProgress"}),{className:i,color:c="primary",disableShrink:f=!1,size:h=40,style:v,thickness:y=3.6,value:g=0,variant:x="indeterminate"}=r,w=(0,n.Z)(r,m),b=(0,o.Z)({},r,{color:c,disableShrink:f,size:h,thickness:y,value:g,variant:x}),j=(t=>{const{classes:e,variant:r,color:n,disableShrink:o}=t,i={root:["root",r,`color${(0,u.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,u.Z)(r)}`,o&&"circleDisableShrink"]};return(0,s.Z)(i,d,e)})(b),N={},P={},L={};if("determinate"===x){const t=2*Math.PI*((44-y)/2);N.strokeDasharray=t.toFixed(3),L["aria-valuenow"]=Math.round(g),N.strokeDashoffset=`${((100-g)/100*t).toFixed(3)}px`,P.transform="rotate(-90deg)"}return(0,p.jsx)(Z,(0,o.Z)({className:(0,a.Z)(j.root,i),style:(0,o.Z)({width:h,height:h},P,v),ownerState:b,ref:e,role:"progressbar"},L,w,{children:(0,p.jsx)(k,{className:j.svg,ownerState:b,viewBox:"22 22 44 44",children:(0,p.jsx)(S,{className:j.circle,style:N,ownerState:b,cx:44,cy:44,r:(44-y)/2,fill:"none",strokeWidth:y})})}))}))},43547:function(t,e,r){r.d(e,{Z:function(){return g}});var n=r(30808),o=r(25773),i=r(82267),a=r(38944),s=r(27378),c=(r(33230),r(99340)),u=r(67018),l=r(76112),f=r(20502),h=r(6749);function d(t){return(0,h.Z)("MuiImageListItem",t)}var p=(0,r(44124).Z)("MuiImageListItem",["root","img","standard","woven","masonry","quilted"]),m=r(24246);const v=["children","className","cols","component","rows","style"],y=(0,u.ZP)("li",{name:"MuiImageListItem",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[{[`& .${p.img}`]:e.img},e.root,e[r.variant]]}})((({ownerState:t})=>(0,o.Z)({display:"block",position:"relative"},"standard"===t.variant&&{display:"flex",flexDirection:"column"},"woven"===t.variant&&{height:"100%",alignSelf:"center","&:nth-of-type(even)":{height:"70%"}},{[`& .${p.img}`]:(0,o.Z)({objectFit:"cover",width:"100%",height:"100%",display:"block"},"standard"===t.variant&&{height:"auto",flexGrow:1})})));var g=s.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiImageListItem"}),{children:u,className:h,cols:p=1,component:g="li",rows:x=1,style:w}=r,b=(0,n.Z)(r,v),{rowHeight:j="auto",gap:Z,variant:k}=s.useContext(c.Z);let S="auto";"woven"===k?S=void 0:"auto"!==j&&(S=j*x+Z*(x-1));const N=(0,o.Z)({},r,{cols:p,component:g,gap:Z,rowHeight:j,rows:x,variant:k}),P=(t=>{const{classes:e,variant:r}=t,n={root:["root",r],img:["img"]};return(0,i.Z)(n,d,e)})(N);return(0,m.jsx)(y,(0,o.Z)({as:g,className:(0,a.Z)(P.root,P[k],h),ref:e,style:(0,o.Z)({height:S,gridColumnEnd:"masonry"!==k?`span ${p}`:void 0,gridRowEnd:"masonry"!==k?`span ${x}`:void 0,marginBottom:"masonry"===k?Z:void 0},w),ownerState:N},b,{children:s.Children.map(u,(t=>s.isValidElement(t)?"img"===t.type||(0,f.Z)(t,["Image"])?s.cloneElement(t,{className:(0,a.Z)(P.img,t.props.className)}):t:null))}))}))},21345:function(t,e,r){r.d(e,{Z:function(){return v}});var n=r(30808),o=r(25773),i=r(82267),a=r(38944),s=r(27378),c=r(67018),u=r(76112),l=r(6749);function f(t){return(0,l.Z)("MuiImageList",t)}(0,r(44124).Z)("MuiImageList",["root","masonry","quilted","standard","woven"]);var h=r(99340),d=r(24246);const p=["children","className","cols","component","rowHeight","gap","style","variant"],m=(0,c.ZP)("ul",{name:"MuiImageList",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant]]}})((({ownerState:t})=>(0,o.Z)({display:"grid",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"},"masonry"===t.variant&&{display:"block"})));var v=s.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiImageList"}),{children:c,className:l,cols:v=2,component:y="ul",rowHeight:g="auto",gap:x=4,style:w,variant:b="standard"}=r,j=(0,n.Z)(r,p),Z=s.useMemo((()=>({rowHeight:g,gap:x,variant:b})),[g,x,b]);s.useEffect((()=>{}),[]);const k="masonry"===b?(0,o.Z)({columnCount:v,columnGap:x},w):(0,o.Z)({gridTemplateColumns:`repeat(${v}, 1fr)`,gap:x},w),S=(0,o.Z)({},r,{component:y,gap:x,rowHeight:g,variant:b}),N=(t=>{const{classes:e,variant:r}=t,n={root:["root",r]};return(0,i.Z)(n,f,e)})(S);return(0,d.jsx)(m,(0,o.Z)({as:y,className:(0,a.Z)(N.root,N[b],l),ref:e,style:k,ownerState:S},j,{children:(0,d.jsx)(h.Z.Provider,{value:Z,children:c})}))}))},99340:function(t,e,r){const n=r(27378).createContext({});e.Z=n},62386:function(t,e,r){r.d(e,{Db:function(){return h},Fc:function(){return m},GF:function(){return d},Nn:function(){return f},fF:function(){return p},gR:function(){return l},i7:function(){return v},zr:function(){return y}});var n=r(69222),o=r(17937),i=r(57446);function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(){s=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=j(a,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=f(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h={};function d(){}function p(){}function m(){}var v={};u(v,o,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(N([])));g&&g!==e&&r.call(g,o)&&(v=g);var x=m.prototype=d.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,i,s,c){var u=f(t[o],t,i);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==a(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,s,c)}),(function(t){n("throw",t,s,c)})):e.resolve(h).then((function(t){l.value=t,s(l)}),(function(t){return n("throw",t,s,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function j(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function Z(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(Z,this),this.reset(!0)}function N(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return p.prototype=m,u(x,"constructor",m),u(m,"constructor",p),p.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(b.prototype),u(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(x),u(x,c,"Generator"),u(x,o,(function(){return this})),u(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=N,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function c(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function u(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,s,"next",t)}function s(t){c(i,n,o,a,s,"throw",t)}a(void 0)}))}}var l=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/stocks".concat(t)).then((function(t){t.data.success&&e({type:o.VR,payload:t.data.data})})).catch((function(t){}))}},f=function(t){return function(e){n.Z.get("/superadmin/stocks/view/".concat(t)).then((function(t){t.data.success&&e({type:o.Uy,payload:t.data.data})})).catch((function(t){}))}},h=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/stocks/products".concat(t)).then((function(t){t.data.success&&e({type:o.FR,payload:t.data.data})})).catch((function(t){}))}},d=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/stocks/product-details".concat(t)).then((function(t){t.data.success&&e({type:o.W4,payload:t.data.data})})).catch((function(t){}))}},p=function(){var t=u(s().mark((function t(e){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.Z.post("/superadmin/stocks/check-certificate-exist",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=u(s().mark((function t(e){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(0,i.B7)(e,!0),t.next=3,n.Z.get("/superadmin/stocks/stock-price-by-category".concat(e));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=u(s().mark((function t(e){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(0,i.B7)(e,!0),t.next=3,n.Z.get("/superadmin/cart/checkdetail".concat(e));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=function(){var t=u(s().mark((function t(e){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.Z.post("/superadmin/stocks/return-stock/move-to-stock",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},85332:function(t,e,r){r.r(e);var n=r(27378),o=r(23884),i=r(23434),a=r(95287),s=r(21345),c=r(43547),u=r(74154),l=r(8971),f=r(13040),h=r(72897),d=r(62386),p=r(10755),m=r(97722),v=r(49444),y=r(92146),g=r(47265),x=r(96616),w=r(68456),b=r(19265),j=r(24246);function Z(t){return Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Z(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function N(t,e){if(e&&("object"===Z(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return P(t)}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(p,t);var e,r,o,f,h,d=(f=p,h=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(f);if(h){var r=L(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return N(this,t)});function p(t){var e,r,o,i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),i=function(){e.props.actions.stocksView(e.props.params.id)},(o="loadViewData")in(r=P(e=d.call(this,t)))?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i,e.state={stock:e.props.stock},e.existingVideoRef=n.createRef(),e}return e=p,o=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.stock!==e.stock&&(r.stock=t.stock),r}}],(r=[{key:"componentDidMount",value:function(){var t=this;this.loadViewData(),setTimeout((function(){var e;t.existingVideoRef&&(null===(e=t.existingVideoRef.current)||void 0===e||e.load())}),2e3)}},{key:"render",value:function(){var t=this.state.stock;return(0,j.jsx)(l.Z,{title:"Stock Details",children:(0,j.jsx)("div",{className:"ratn-dialog-wrapper",children:t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:"single-item-wrapper details-header",children:[(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Product Name: "})," ",(0,j.jsx)("br",{}),t.name]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Product Type: "})," ",(0,j.jsx)("br",{})," ",t.type_diplay]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Category: "})," ",(0,j.jsx)("br",{})," ",t.category]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Sub Category: "}),"  ",(0,j.jsx)("br",{}),t.sub_category]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Licence Number: "})," ",(0,j.jsx)("br",{})," ",t.licence_no]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Certified: "})," ",(0,j.jsx)("br",{})," ",t.certified_display]})}),(0,j.jsx)("div",{className:"single-item",children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Status: "})," ",(0,j.jsx)("br",{})," ",t.status_display]})})]}),(0,j.jsxs)("div",{className:"item-wrapper-images",children:[t.images.length?(0,j.jsx)(s.Z,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:t.images.map((function(t,e){return(0,j.jsx)(c.Z,{style:{height:"100px",width:"100px"},children:(0,j.jsx)("div",{style:{position:"relative",width:"100px"},children:(0,j.jsx)("img",{src:t.path,loading:"lazy",style:{height:"100px",width:"100px"}})})},e)}))}):null,t.video?(0,j.jsx)(s.Z,{sx:{width:"100%",height:150},cols:3,rowHeight:150,children:(0,j.jsx)(c.Z,{children:(0,j.jsx)("div",{style:{position:"relative",width:"220px"},children:(0,j.jsx)("video",{width:"200",height:"150",style:{height:"143px",objectFit:"contain"},loop:!0,controls:!0,ref:this.existingVideoRef,children:(0,j.jsx)("source",{src:t.video})})})})}):null]}),(0,j.jsx)(i.ZP,{container:!0,spacing:u.dv,className:"details-header",children:(0,j.jsx)(i.ZP,{item:!0,xs:12,children:(0,j.jsx)(x.Z,{component:b.Z,className:"ratn-table-wrapper table-wrapper-heading",children:(0,j.jsxs)(m.Z,{"aria-label":"collapsible table",children:[(0,j.jsx)(v.Z,{className:"ratn-table-header",children:(0,j.jsxs)(w.Z,{className:"",children:[(0,j.jsx)(g.Z,{children:"Material Name"}),(0,j.jsx)(g.Z,{children:"Purity"}),(0,j.jsx)(g.Z,{children:"Weight"}),(0,j.jsx)(g.Z,{children:"Unit"}),(0,j.jsx)(g.Z,{children:"Quantity"})]})}),(0,j.jsx)(y.Z,{children:t.stock_materials.map((function(t,e){return(0,j.jsxs)(w.Z,{children:[(0,j.jsx)(g.Z,{children:t.material_name}),(0,j.jsx)(g.Z,{children:t.purity_name}),(0,j.jsx)(g.Z,{children:t.weight}),(0,j.jsx)(g.Z,{children:t.unit_name}),(0,j.jsx)(g.Z,{children:t.quantity})]},e)}))})]})})})})]}):(0,j.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,j.jsx)(a.Z,{})})})})}}])&&k(e.prototype,r),o&&k(e,o),Object.defineProperty(e,"prototype",{writable:!1}),p}(n.Component);e.default=(0,h.RM)((0,f.Z)((0,o.connect)((function(t){return{stock:t.superadmin.stocks.stock}}),(function(t){return{dispatch:t,actions:(0,p.bindActionCreators)({stocksView:d.Nn},t)}}))(_)))}}]);