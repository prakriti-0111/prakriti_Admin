/*! For license information please see 3186.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3186],{95287:function(t,e,r){r.d(e,{Z:function(){return P}});var n=r(30808),o=r(25773),i=r(27378),a=r(38944),c=r(82267),s=r(10043),l=r(89090),u=r(76112),h=r(67018),f=r(6749);function d(t){return(0,f.Z)("MuiCircularProgress",t)}(0,r(44124).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=r(24246);const y=["className","color","disableShrink","size","style","thickness","value","variant"];let m,v,g,x,w=t=>t;const b=(0,s.F4)(m||(m=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),j=(0,s.F4)(v||(v=w`
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
`)),Z=(0,h.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],e[`color${(0,l.Z)(r.color)}`]]}})((({ownerState:t,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:e.transitions.create("transform")},"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,s.iv)(g||(g=w`
      animation: ${0} 1.4s linear infinite;
    `),b))),k=(0,h.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),S=(0,h.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.circle,e[`circle${(0,l.Z)(r.variant)}`],r.disableShrink&&e.circleDisableShrink]}})((({ownerState:t,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,s.iv)(x||(x=w`
      animation: ${0} 1.4s ease-in-out infinite;
    `),j)));var P=i.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiCircularProgress"}),{className:i,color:s="primary",disableShrink:h=!1,size:f=40,style:m,thickness:v=3.6,value:g=0,variant:x="indeterminate"}=r,w=(0,n.Z)(r,y),b=(0,o.Z)({},r,{color:s,disableShrink:h,size:f,thickness:v,value:g,variant:x}),j=(t=>{const{classes:e,variant:r,color:n,disableShrink:o}=t,i={root:["root",r,`color${(0,l.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(r)}`,o&&"circleDisableShrink"]};return(0,c.Z)(i,d,e)})(b),P={},L={},_={};if("determinate"===x){const t=2*Math.PI*((44-v)/2);P.strokeDasharray=t.toFixed(3),_["aria-valuenow"]=Math.round(g),P.strokeDashoffset=`${((100-g)/100*t).toFixed(3)}px`,L.transform="rotate(-90deg)"}return(0,p.jsx)(Z,(0,o.Z)({className:(0,a.Z)(j.root,i),style:(0,o.Z)({width:f,height:f},L,m),ownerState:b,ref:e,role:"progressbar"},_,w,{children:(0,p.jsx)(k,{className:j.svg,ownerState:b,viewBox:"22 22 44 44",children:(0,p.jsx)(S,{className:j.circle,style:P,ownerState:b,cx:44,cy:44,r:(44-v)/2,fill:"none",strokeWidth:v})})}))}))},43547:function(t,e,r){r.d(e,{Z:function(){return g}});var n=r(30808),o=r(25773),i=r(82267),a=r(38944),c=r(27378),s=(r(33230),r(99340)),l=r(67018),u=r(76112),h=r(20502),f=r(6749);function d(t){return(0,f.Z)("MuiImageListItem",t)}var p=(0,r(44124).Z)("MuiImageListItem",["root","img","standard","woven","masonry","quilted"]),y=r(24246);const m=["children","className","cols","component","rows","style"],v=(0,l.ZP)("li",{name:"MuiImageListItem",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[{[`& .${p.img}`]:e.img},e.root,e[r.variant]]}})((({ownerState:t})=>(0,o.Z)({display:"block",position:"relative"},"standard"===t.variant&&{display:"flex",flexDirection:"column"},"woven"===t.variant&&{height:"100%",alignSelf:"center","&:nth-of-type(even)":{height:"70%"}},{[`& .${p.img}`]:(0,o.Z)({objectFit:"cover",width:"100%",height:"100%",display:"block"},"standard"===t.variant&&{height:"auto",flexGrow:1})})));var g=c.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiImageListItem"}),{children:l,className:f,cols:p=1,component:g="li",rows:x=1,style:w}=r,b=(0,n.Z)(r,m),{rowHeight:j="auto",gap:Z,variant:k}=c.useContext(s.Z);let S="auto";"woven"===k?S=void 0:"auto"!==j&&(S=j*x+Z*(x-1));const P=(0,o.Z)({},r,{cols:p,component:g,gap:Z,rowHeight:j,rows:x,variant:k}),L=(t=>{const{classes:e,variant:r}=t,n={root:["root",r],img:["img"]};return(0,i.Z)(n,d,e)})(P);return(0,y.jsx)(v,(0,o.Z)({as:g,className:(0,a.Z)(L.root,L[k],f),ref:e,style:(0,o.Z)({height:S,gridColumnEnd:"masonry"!==k?`span ${p}`:void 0,gridRowEnd:"masonry"!==k?`span ${x}`:void 0,marginBottom:"masonry"===k?Z:void 0},w),ownerState:P},b,{children:c.Children.map(l,(t=>c.isValidElement(t)?"img"===t.type||(0,h.Z)(t,["Image"])?c.cloneElement(t,{className:(0,a.Z)(L.img,t.props.className)}):t:null))}))}))},21345:function(t,e,r){r.d(e,{Z:function(){return m}});var n=r(30808),o=r(25773),i=r(82267),a=r(38944),c=r(27378),s=r(67018),l=r(76112),u=r(6749);function h(t){return(0,u.Z)("MuiImageList",t)}(0,r(44124).Z)("MuiImageList",["root","masonry","quilted","standard","woven"]);var f=r(99340),d=r(24246);const p=["children","className","cols","component","rowHeight","gap","style","variant"],y=(0,s.ZP)("ul",{name:"MuiImageList",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant]]}})((({ownerState:t})=>(0,o.Z)({display:"grid",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"},"masonry"===t.variant&&{display:"block"})));var m=c.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiImageList"}),{children:s,className:u,cols:m=2,component:v="ul",rowHeight:g="auto",gap:x=4,style:w,variant:b="standard"}=r,j=(0,n.Z)(r,p),Z=c.useMemo((()=>({rowHeight:g,gap:x,variant:b})),[g,x,b]);c.useEffect((()=>{}),[]);const k="masonry"===b?(0,o.Z)({columnCount:m,columnGap:x},w):(0,o.Z)({gridTemplateColumns:`repeat(${m}, 1fr)`,gap:x},w),S=(0,o.Z)({},r,{component:v,gap:x,rowHeight:g,variant:b}),P=(t=>{const{classes:e,variant:r}=t,n={root:["root",r]};return(0,i.Z)(n,h,e)})(S);return(0,d.jsx)(y,(0,o.Z)({as:v,className:(0,a.Z)(P.root,P[b],u),ref:e,style:k,ownerState:S},j,{children:(0,d.jsx)(f.Z.Provider,{value:Z,children:s})}))}))},99340:function(t,e,r){const n=r(27378).createContext({});e.Z=n},7895:function(t,e,r){r.d(e,{Db:function(){return u},Fc:function(){return d},Nn:function(){return f},gR:function(){return l},i7:function(){return h}});var n=r(69222),o=r(56409),i=r(57446);function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function c(){c=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",s=n.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=j(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=h(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function d(){}function p(){}function y(){}var m={};l(m,o,(function(){return this}));var v=Object.getPrototypeOf,g=v&&v(v(P([])));g&&g!==e&&r.call(g,o)&&(m=g);var x=y.prototype=d.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,i,c,s){var l=h(t[o],t,i);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==a(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,c,s)}),(function(t){n("throw",t,c,s)})):e.resolve(f).then((function(t){u.value=t,c(u)}),(function(t){return n("throw",t,c,s)}))}s(l.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function j(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=h(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function Z(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(Z,this),this.reset(!0)}function P(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return p.prototype=y,l(x,"constructor",y),l(y,"constructor",p),p.displayName=l(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},w(b.prototype),l(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(x),l(x,s,"Generator"),l(x,o,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function s(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}var l=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/admin/stocks".concat(t)).then((function(t){t.data.success&&e({type:o.nc,payload:t.data.data})})).catch((function(t){}))}},u=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/admin/stocks/products".concat(t)).then((function(t){t.data.success&&e({type:o.gr,payload:t.data.data})})).catch((function(t){}))}},h=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/admin/stocks/product-details".concat(t)).then((function(t){t.data.success&&e({type:o.$j,payload:t.data.data})})).catch((function(t){}))}},f=function(t){return function(e){n.Z.get("/admin/stocks/view/".concat(t)).then((function(t){t.data.success&&e({type:o.$H,payload:t.data.data})})).catch((function(t){}))}},d=function(){var t,e=(t=c().mark((function t(){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.Z.get("/admin/stocks/stock-price-by-category");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){s(i,n,o,a,c,"next",t)}function c(t){s(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(){return e.apply(this,arguments)}}()},13186:function(t,e,r){r.r(e);var n=r(27378),o=r(23884),i=r(23434),a=r(95287),c=r(21345),s=r(43547),l=r(74154),u=r(8971),h=r(13040),f=r(72897),d=r(7895),p=r(10755),y=r(97722),m=r(49444),v=r(92146),g=r(47265),x=r(96616),w=r(68456),b=r(19265),j=r(24246);function Z(t){return Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Z(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function P(t,e){if(e&&("object"===Z(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return L(t)}function L(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(p,t);var e,r,o,h,f,d=(h=p,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(h);if(f){var r=_(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return P(this,t)});function p(t){var e,r,o,i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),i=function(){e.props.actions.stocksView(e.props.params.id)},(o="loadViewData")in(r=L(e=d.call(this,t)))?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i,e.state={stock:e.props.stock},e.existingVideoRef=n.createRef(),e}return e=p,o=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.stock!==e.stock&&(r.stock=t.stock),r}}],(r=[{key:"componentDidMount",value:function(){var t=this;this.loadViewData(),setTimeout((function(){var e;t.existingVideoRef&&(null===(e=t.existingVideoRef.current)||void 0===e||e.load())}),2e3)}},{key:"render",value:function(){var t=this.state.stock;return(0,j.jsx)(u.Z,{title:"Stock Details",children:(0,j.jsx)("div",{className:"ratn-dialog-wrapper",children:(0,j.jsx)(i.ZP,{container:!0,spacing:l.dv,className:"details-header",children:t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(i.ZP,{item:!0,xs:2,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Product Name: "})," ",(0,j.jsx)("br",{}),t.name]})}),(0,j.jsx)(i.ZP,{item:!0,xs:2,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Product Type: "})," ",(0,j.jsx)("br",{})," ",t.type_diplay]})}),(0,j.jsx)(i.ZP,{item:!0,xs:2,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"category: "})," ",(0,j.jsx)("br",{})," ",t.category]})}),(0,j.jsx)(i.ZP,{item:!0,xs:2,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Sub Category: "}),"  ",(0,j.jsx)("br",{}),t.sub_category]})}),(0,j.jsx)(i.ZP,{item:!0,xs:2,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Licence Number: "})," ",(0,j.jsx)("br",{})," ",t.licence_no]})}),(0,j.jsx)(i.ZP,{item:!0,xs:1,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Certified: "})," ",(0,j.jsx)("br",{})," ",t.certified_display]})}),(0,j.jsx)(i.ZP,{item:!0,xs:1,children:(0,j.jsxs)("p",{children:[(0,j.jsx)("span",{children:"Status: "})," ",(0,j.jsx)("br",{})," ",t.status_display]})}),(0,j.jsxs)(i.ZP,{item:!0,xs:12,children:[t.images.length?(0,j.jsx)(c.Z,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:t.images.map((function(t,e){return(0,j.jsx)(s.Z,{style:{height:"100px",width:"100px"},children:(0,j.jsx)("div",{style:{position:"relative",width:"100px"},children:(0,j.jsx)("img",{src:t.path,loading:"lazy",style:{height:"100px",width:"100px"}})})},e)}))}):null,t.video?(0,j.jsx)(c.Z,{sx:{width:"100%",height:150},cols:3,rowHeight:150,children:(0,j.jsx)(s.Z,{children:(0,j.jsx)("div",{style:{position:"relative",width:"220px"},children:(0,j.jsx)("video",{width:"200",height:"150",style:{height:"143px",objectFit:"contain"},loop:!0,controls:!0,ref:this.existingVideoRef,children:(0,j.jsx)("source",{src:t.video})})})})}):null]}),(0,j.jsx)(i.ZP,{item:!0,xs:12,children:(0,j.jsx)(x.Z,{component:b.Z,className:"ratn-table-wrapper table-wrapper-heading",children:(0,j.jsxs)(y.Z,{"aria-label":"collapsible table",children:[(0,j.jsx)(m.Z,{className:"ratn-table-header",children:(0,j.jsxs)(w.Z,{children:[(0,j.jsx)(g.Z,{children:"Material Name"}),(0,j.jsx)(g.Z,{children:"Purity"}),(0,j.jsx)(g.Z,{children:"Weight"}),(0,j.jsx)(g.Z,{children:"Unit"}),(0,j.jsx)(g.Z,{children:"Quantity"})]})}),(0,j.jsx)(v.Z,{children:t.stock_materials.map((function(t,e){return(0,j.jsxs)(w.Z,{children:[(0,j.jsx)(g.Z,{children:t.material_name}),(0,j.jsx)(g.Z,{children:t.purity_name}),(0,j.jsx)(g.Z,{children:t.weight}),(0,j.jsx)(g.Z,{children:t.unit_name}),(0,j.jsx)(g.Z,{children:t.quantity})]},e)}))})]})})})]}):(0,j.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,j.jsx)(a.Z,{})})})})})}}])&&k(e.prototype,r),o&&k(e,o),Object.defineProperty(e,"prototype",{writable:!1}),p}(n.Component);e.default=(0,f.RM)((0,h.Z)((0,o.connect)((function(t){return{stock:t.admin.stocks.stock}}),(function(t){return{dispatch:t,actions:(0,p.bindActionCreators)({stocksView:d.Nn},t)}}))(E)))}}]);