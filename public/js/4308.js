"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4308],{95287:function(t,e,r){r.d(e,{Z:function(){return Z}});var n=r(30808),o=r(25773),i=r(27378),a=r(38944),c=r(82267),s=r(10043),u=r(89090),l=r(76112),f=r(67018),p=r(6749);function d(t){return(0,p.Z)("MuiCircularProgress",t)}(0,r(44124).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var b=r(24246);const y=["className","color","disableShrink","size","style","thickness","value","variant"];let h,m,v,x,j=t=>t;const S=(0,s.F4)(h||(h=j`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),g=(0,s.F4)(m||(m=j`
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
`)),O=(0,f.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],e[`color${(0,u.Z)(r.color)}`]]}})((({ownerState:t,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:e.transitions.create("transform")},"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,s.iv)(v||(v=j`
      animation: ${0} 1.4s linear infinite;
    `),S))),w=(0,f.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),P=(0,f.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.circle,e[`circle${(0,u.Z)(r.variant)}`],r.disableShrink&&e.circleDisableShrink]}})((({ownerState:t,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,s.iv)(x||(x=j`
      animation: ${0} 1.4s ease-in-out infinite;
    `),g)));var Z=i.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiCircularProgress"}),{className:i,color:s="primary",disableShrink:f=!1,size:p=40,style:h,thickness:m=3.6,value:v=0,variant:x="indeterminate"}=r,j=(0,n.Z)(r,y),S=(0,o.Z)({},r,{color:s,disableShrink:f,size:p,thickness:m,value:v,variant:x}),g=(t=>{const{classes:e,variant:r,color:n,disableShrink:o}=t,i={root:["root",r,`color${(0,u.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,u.Z)(r)}`,o&&"circleDisableShrink"]};return(0,c.Z)(i,d,e)})(S),Z={},k={},D={};if("determinate"===x){const t=2*Math.PI*((44-m)/2);Z.strokeDasharray=t.toFixed(3),D["aria-valuenow"]=Math.round(v),Z.strokeDashoffset=`${((100-v)/100*t).toFixed(3)}px`,k.transform="rotate(-90deg)"}return(0,b.jsx)(O,(0,o.Z)({className:(0,a.Z)(g.root,i),style:(0,o.Z)({width:p,height:p},k,h),ownerState:S,ref:e,role:"progressbar"},D,j,{children:(0,b.jsx)(w,{className:g.svg,ownerState:S,viewBox:"22 22 44 44",children:(0,b.jsx)(P,{className:g.circle,style:Z,ownerState:S,cx:44,cy:44,r:(44-m)/2,fill:"none",strokeWidth:m})})}))}))},65422:function(t,e,r){r.d(e,{NX:function(){return c},Ss:function(){return l},c8:function(){return s},fr:function(){return a},ld:function(){return u}});var n=r(69222),o=r(62499),i=r(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/tax-slab".concat(t)).then((function(t){t.data.success&&e({type:o.qD,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){n.Z.post("/superadmin/tax-slab/store",t).then((function(t){t.data.success&&e({type:o.a5,payload:t.data.data})})).catch((function(t){}))}},s=function(t){return function(e){n.Z.get("/superadmin/tax-slab/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.SN,payload:t.data.data})})).catch((function(t){}))}},u=function(t,e){return function(r){n.Z.post("/superadmin/tax-slab/update/".concat(t),e).then((function(t){t.data.success&&r({type:o.CJ,payload:!0})})).catch((function(t){}))}},l=function(t,e){return function(r){n.Z.delete("/superadmin/tax-slab/delete/".concat(t),e).then((function(t){t.data.success&&r({type:o.f$,payload:!0})})).catch((function(t){}))}}},73483:function(t,e,r){var n=r(27378),o=r(9647),i=r(10418),a=r(43564),c=r(23434),s=r(78153),u=r(28730),l=r(13040),f=r(24246);function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}var d=["input","label","meta"];function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){S(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function h(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function v(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return x(t)}function x(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}function S(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(b,t);var e,r,n,l,p=(n=b,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(n);if(l){var r=j(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return v(this,t)});function b(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,b),S(x(e=p.call(this,t)),"renderTextField",(function(t){var e=t.input,r=t.label,n=t.meta,o=n.touched,a=n.error,c=function(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(t,d);return(0,f.jsx)(i.Z,y(y({label:r,fullWidth:!0,error:!(!o||!a),helperText:o&&a?a:""},e),c))})),e.state={formData:"formData"in e.props?e.props.formData:null},e}return e=b,(r=[{key:"componentDidMount",value:function(){this.state.formData&&this.props.initialize(this.state.formData)}},{key:"render",value:function(){var t=this,e=this.props,r=e.handleSubmit;return e.pristine,e.submitting,(0,f.jsx)("form",{onSubmit:r,children:(0,f.jsxs)(a.Z,{sx:{flexGrow:1},children:[(0,f.jsx)(c.ZP,{container:!0,spacing:2,children:(0,f.jsx)(c.ZP,{item:!0,xs:6,children:(0,f.jsx)(o.gN,{name:"name",required:!0,component:this.renderTextField,label:"Slab Name"})})}),(0,f.jsx)(c.ZP,{container:!0,spacing:1,mt:1,children:(0,f.jsx)(c.ZP,{item:!0,xs:6,children:(0,f.jsx)(o.gN,{name:"cgst",required:!0,component:this.renderTextField,label:"C-GST"})})}),(0,f.jsx)(c.ZP,{container:!0,spacing:1,mt:1,children:(0,f.jsx)(c.ZP,{item:!0,xs:6,children:(0,f.jsx)(o.gN,{name:"sgst",required:!0,component:this.renderTextField,label:"S-GST"})})}),(0,f.jsx)(c.ZP,{container:!0,spacing:1,mt:1,children:(0,f.jsx)(c.ZP,{item:!0,xs:6,children:(0,f.jsx)(o.gN,{name:"igst",required:!0,component:this.renderTextField,label:"I-GST"})})}),(0,f.jsxs)(s.Z,{spacing:1,direction:"row",children:[(0,f.jsx)(u.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,f.jsx)(u.Z,{variant:"outlined",onClick:function(){return t.props.navigate("/super-admin/tax-slab")},children:"Cancel"})]})]})})}}])&&h(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),b}(n.Component);e.Z=(0,l.Z)((0,o.sx)({form:"TaxSlabForm",validate:function(t){var e={};return["name"].forEach((function(r){t[r]||(e[r]="Required")})),e}})(g))},74308:function(t,e,r){r.r(e);var n=r(27378),o=r(23884),i=r(23434),a=r(95287),c=r(73483),s=r(10755),u=r(8971),l=r(13040),f=r(65422),p=r(62499),d=r(24246);function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function m(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return v(t)}function v(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(f,t);var e,r,n,o,s,l=(o=f,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=x(o);if(s){var r=x(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return m(this,t)});function f(t){var e,r,n,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),o=function(t){e.props.actions.taxSlabUpdate(e.state.id,t)},(n="submit")in(r=v(e=l.call(this,t)))?Object.defineProperty(r,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[n]=o,e.state={success:e.props.success,item:e.props.item,id:e.props.params.id},e}return e=f,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.editSuccess!==e.editSuccess&&(r.editSuccess=t.editSuccess),t.item!==e.item&&(r.item=t.item),r}}],(r=[{key:"componentDidMount",value:function(){this.props.actions.taxSlabFetch(this.state.id)}},{key:"componentDidUpdate",value:function(){this.state.editSuccess&&(this.props.dispatch({type:p.CJ,payload:!1}),this.props.navigate("/super-admin/tax-slab"))}},{key:"render",value:function(){return(0,d.jsx)(u.Z,{title:"Tax Slab Edit",children:(0,d.jsx)("div",{children:this.state.item?(0,d.jsx)(c.Z,{onSubmit:this.submit,formData:this.state.item}):(0,d.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,d.jsx)(a.Z,{})})})})}}])&&y(e.prototype,r),n&&y(e,n),Object.defineProperty(e,"prototype",{writable:!1}),f}(n.Component);e.default=(0,l.Z)((0,o.connect)((function(t){return{item:t.taxSlab.item||null,editSuccess:t.taxSlab.editSuccess||!1}}),(function(t){return{dispatch:t,actions:(0,s.bindActionCreators)({taxSlabFetch:f.c8,taxSlabUpdate:f.ld},t)}}))(j))}}]);