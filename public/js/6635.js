"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6635],{34989:function(e,t,r){var n=r(73203);t.Z=void 0;var o=n(r(19124)),a=r(24246),s=(0,o.default)((0,a.jsx)("path",{d:"M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z"}),"Diamond");t.Z=s},90665:function(e,t,r){var n=r(73203);t.Z=void 0;var o=n(r(19124)),a=r(24246),s=(0,o.default)((0,a.jsx)("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}),"Group");t.Z=s},12788:function(e,t,r){var n=r(73203);t.Z=void 0;var o=n(r(19124)),a=r(24246),s=(0,o.default)((0,a.jsx)("path",{d:"M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"}),"LocalMall");t.Z=s},95287:function(e,t,r){r.d(t,{Z:function(){return C}});var n=r(30808),o=r(25773),a=r(27378),s=r(38944),i=r(82267),c=r(10043),l=r(89090),d=r(76112),u=r(67018),f=r(6749);function h(e){return(0,f.Z)("MuiCircularProgress",e)}(0,r(44124).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=r(24246);const m=["className","color","disableShrink","size","style","thickness","value","variant"];let x,b,v,y,j=e=>e;const Z=(0,c.F4)(x||(x=j`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),g=(0,c.F4)(b||(b=j`
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
`)),k=(0,u.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`color${(0,l.Z)(r.color)}`]]}})((({ownerState:e,theme:t})=>(0,o.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.iv)(v||(v=j`
      animation: ${0} 1.4s linear infinite;
    `),Z))),S=(0,u.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),w=(0,u.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.circle,t[`circle${(0,l.Z)(r.variant)}`],r.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,o.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.iv)(y||(y=j`
      animation: ${0} 1.4s ease-in-out infinite;
    `),g)));var C=a.forwardRef((function(e,t){const r=(0,d.Z)({props:e,name:"MuiCircularProgress"}),{className:a,color:c="primary",disableShrink:u=!1,size:f=40,style:x,thickness:b=3.6,value:v=0,variant:y="indeterminate"}=r,j=(0,n.Z)(r,m),Z=(0,o.Z)({},r,{color:c,disableShrink:u,size:f,thickness:b,value:v,variant:y}),g=(e=>{const{classes:t,variant:r,color:n,disableShrink:o}=e,a={root:["root",r,`color${(0,l.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(r)}`,o&&"circleDisableShrink"]};return(0,i.Z)(a,h,t)})(Z),C={},_={},P={};if("determinate"===y){const e=2*Math.PI*((44-b)/2);C.strokeDasharray=e.toFixed(3),P["aria-valuenow"]=Math.round(v),C.strokeDashoffset=`${((100-v)/100*e).toFixed(3)}px`,_.transform="rotate(-90deg)"}return(0,p.jsx)(k,(0,o.Z)({className:(0,s.Z)(g.root,a),style:(0,o.Z)({width:f,height:f},_,x),ownerState:Z,ref:t,role:"progressbar"},P,j,{children:(0,p.jsx)(S,{className:g.svg,ownerState:Z,viewBox:"22 22 44 44",children:(0,p.jsx)(w,{className:g.circle,style:C,ownerState:Z,cx:44,cy:44,r:(44-b)/2,fill:"none",strokeWidth:b})})}))}))},56635:function(e,t,r){r.r(t),r.d(t,{default:function(){return w}});var n=r(27378),o=r(23884),a=r(10498),s=r(59860),i=r(90813),c=r(95287),l=r(69222),d=r(63390),u=function(e){return function(e){l.Z.get("/distributor/dashboard").then((function(t){e({type:d.P3,payload:t.data.data})})).catch((function(e){}))}},f=r(10755),h=r(13040),p=r(90665),m=r(34989),x=r(12788),b=r(24246);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function Z(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return g(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(u,e);var t,r,n,o,l,d=(o=u,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(o);if(l){var r=k(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return Z(this,e)});function u(e){var t,r,n,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),o=function(e){t.props.navigate("/distributor/"+e)},(n="handleClick")in(r=g(t=d.call(this,e)))?Object.defineProperty(r,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[n]=o,t.state={dashboard:t.props.dashboard},t}return t=u,n=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.dashboard!==t.dashboard&&(r.dashboard=e.dashboard),r}}],(r=[{key:"componentDidMount",value:function(){this.props.actions.getDashboardData()}},{key:"render",value:function(){var e=this,t=this.state.dashboard;return(0,b.jsxs)(a.Z,{className:"dashboard_card",children:[(0,b.jsxs)(s.Z,{onClick:function(){return e.handleClick("sales-executive")},className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)(i.Z,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,b.jsx)("h1",{children:"Total Sales Executive "}),(0,b.jsx)("h2",{children:t?t.total_sale_executive:(0,b.jsx)(c.Z,{})})]}),(0,b.jsx)("div",{className:"card-icon",children:(0,b.jsx)(p.Z,{})})]}),(0,b.jsxs)(s.Z,{className:"dashboard_card_content bg-color-2",sx:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)(i.Z,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,b.jsx)("h1",{children:"Total Retailer "}),(0,b.jsx)("h2",{children:t?t.total_retailer:(0,b.jsx)(c.Z,{})})]}),(0,b.jsx)("div",{className:"card-icon",children:(0,b.jsx)(p.Z,{})})]}),(0,b.jsxs)(s.Z,{onClick:function(){return e.handleClick("customers")},className:"dashboard_card_content bg-color-3",sx:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)(i.Z,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,b.jsx)("h1",{children:"Total Customer "}),(0,b.jsx)("h2",{children:t?t.total_customer:(0,b.jsx)(c.Z,{})})]}),(0,b.jsx)("div",{className:"card-icon",children:(0,b.jsx)(p.Z,{})})]}),(0,b.jsxs)(s.Z,{onClick:function(){return e.handleClick("stocks")},className:"dashboard_card_content bg-color-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)(i.Z,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,b.jsx)("h1",{children:"Total Stock "}),(0,b.jsx)("h2",{children:t?t.total_stock:(0,b.jsx)(c.Z,{})})]}),(0,b.jsx)("div",{className:"card-icon",children:(0,b.jsx)(m.Z,{})})]}),(0,b.jsxs)(s.Z,{onClick:function(){return e.handleClick("orders?status=pending")},className:"dashboard_card_content bg-color-5",sx:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)(i.Z,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,b.jsx)("h1",{children:"Pending Orders "}),(0,b.jsx)("h2",{children:t?t.total_pending_orders:(0,b.jsx)(c.Z,{})})]}),(0,b.jsx)("div",{className:"card-icon",children:(0,b.jsx)(x.Z,{})})]})]})}}])&&y(t.prototype,r),n&&y(t,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(n.Component),w=(0,h.Z)((0,o.connect)((function(e){return{dashboard:e.distributor.profile.dashboard}}),(function(e){return{dispatch:e,actions:(0,f.bindActionCreators)({getDashboardData:u},e)}}))(S))}}]);