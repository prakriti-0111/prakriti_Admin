"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3370],{60789:function(e,t,r){r.d(t,{Z:function(){return P}});var n=r(30808),i=r(25773),o=r(27378),a=r(38944),s=r(82267),c=r(7818),l=r(67018),u=r(76112),d=r(54350),p=r(3870),f=r(36609),b=r(50128),m=r(67462),h=r(54202),y=r(86365),v=r(6749);function x(e){return(0,v.Z)("MuiMenuItem",e)}var g=(0,r(44124).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),j=r(24246);const Z=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],O=(0,l.ZP)(p.Z,{shouldForwardProp:e=>(0,l.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,i.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${g.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,c.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${g.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,c.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${g.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${m.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${m.Z.inset}`]:{marginLeft:52},[`& .${y.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${y.Z.inset}`]:{paddingLeft:36},[`& .${h.Z.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,i.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${h.Z.root} svg`]:{fontSize:"1.25rem"}}))));var P=o.forwardRef((function(e,t){const r=(0,u.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:c=!1,component:l="li",dense:p=!1,divider:m=!1,disableGutters:h=!1,focusVisibleClassName:y,role:v="menuitem",tabIndex:g}=r,P=(0,n.Z)(r,Z),w=o.useContext(d.Z),C={dense:p||w.dense||!1,disableGutters:h},F=o.useRef(null);(0,f.Z)((()=>{c&&F.current&&F.current.focus()}),[c]);const S=(0,i.Z)({},r,{dense:C.dense,divider:m,disableGutters:h}),$=(e=>{const{disabled:t,dense:r,divider:n,disableGutters:o,selected:a,classes:c}=e,l={root:["root",r&&"dense",t&&"disabled",!o&&"gutters",n&&"divider",a&&"selected"]},u=(0,s.Z)(l,x,c);return(0,i.Z)({},c,u)})(r),k=(0,b.Z)(F,t);let D;return r.disabled||(D=void 0!==g?g:-1),(0,j.jsx)(d.Z.Provider,{value:C,children:(0,j.jsx)(O,(0,i.Z)({ref:k,role:v,tabIndex:D,component:l,focusVisibleClassName:(0,a.Z)($.focusVisible,y)},P,{ownerState:S,classes:$}))})}))},24761:function(e,t,r){r.d(t,{SG:function(){return s},Wr:function(){return u},gy:function(){return c},pi:function(){return l},zP:function(){return a}});var n=r(69222),i=r(53743),o=r(57446),a=function(e){return e=(0,o.B7)(e,!0),function(t){n.Z.get("/superadmin/distributors".concat(e)).then((function(e){e.data.success&&t({type:i.cW,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){n.Z.post("/superadmin/distributors/store",e).then((function(e){e.data.success&&t({type:i.F0,payload:e.data.data})})).catch((function(e){}))}},c=function(e){return function(t){n.Z.get("/superadmin/distributors/fetch/".concat(e)).then((function(e){e.data.success&&t({type:i.j6,payload:e.data.data})})).catch((function(e){}))}},l=function(e,t){return function(r){n.Z.post("/superadmin/distributors/update/".concat(e),t).then((function(e){e.data.success&&r({type:i.Ce,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(r){n.Z.delete("/superadmin/distributors/delete/".concat(e),t).then((function(e){e.data.success&&r({type:i.Wh,payload:!0})})).catch((function(e){}))}}},23233:function(e,t,r){var n=r(27378),i=(r(23884),r(9647)),o=r(10418),a=r(56793),s=r(66816),c=r(48684),l=r(60789),u=r(43564),d=r(23434),p=r(78153),f=r(28730),b=r(13040),m=r(24246);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}var y=["input","label","meta"],v=["input","label","meta"],x=["input","label","meta"],g=["input","label","meta"];function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){$(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function O(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}function P(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function C(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return F(e)}function F(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}function $(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(k,e);var t,r,n,b,h,j=(b=k,h=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(b);if(h){var r=S(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return C(this,e)});function k(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,k),$(F(t=j.call(this,e)),"renderTextField",(function(e){var t=e.input,r=e.label,n=e.meta,i=n.touched,a=n.error,s=O(e,y);return(0,m.jsx)(o.Z,Z(Z({label:r,fullWidth:!0,error:!(!i||!a),helperText:i&&a?a:""},t),s))})),$(F(t),"renderCountryField",(function(e){var t=e.input,r=e.label,n=e.meta,i=n.touched,o=n.error,u=O(e,v);return(0,m.jsxs)(a.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(s.Z,{children:r}):null,(0,m.jsx)(c.Z,Z(Z(Z({label:r,fullWidth:!0},t),u),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select country"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),$(F(t),"renderStateField",(function(e){var t=e.input,r=e.label,n=e.meta,i=n.touched,o=n.error,u=O(e,x);return(0,m.jsxs)(a.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(s.Z,{children:r}):null,(0,m.jsx)(c.Z,Z(Z(Z({label:r,fullWidth:!0},t),u),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select state"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),$(F(t),"renderDistrictField",(function(e){var t=e.input,r=e.label,n=e.meta,i=n.touched,o=n.error,u=O(e,g);return(0,m.jsxs)(a.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(s.Z,{children:r}):null,(0,m.jsx)(c.Z,Z(Z(Z({label:r,fullWidth:!0},t),u),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select district"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),t.state={formData:"formData"in t.props?t.props.formData:null,states:t.props.states,districts:t.props.districts,countries:t.props.countries},t}return t=k,n=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.states!==t.states&&(r.states=e.states),e.districts!==t.districts&&(r.districts=e.districts),e.countries!==t.countries&&(r.countries=e.countries),r}}],(r=[{key:"componentDidMount",value:function(){this.state.formData&&this.props.initialize(this.state.formData)}},{key:"render",value:function(){var e=this,t=this.props,r=t.handleSubmit;return t.pristine,t.submitting,(0,m.jsx)("form",{onSubmit:r,children:(0,m.jsxs)(u.Z,{sx:{flexGrow:1},children:[(0,m.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"name",required:!0,component:this.renderTextField,label:"Name"})}),(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"email",required:!0,component:this.renderTextField,label:"Email"})})]}),(0,m.jsxs)(d.ZP,{container:!0,spacing:2,mt:1,children:[(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"mobile",required:!0,component:this.renderTextField,label:"Mobile",type:"number"})}),(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"password",required:!0,component:this.renderTextField,label:"Password",type:"password"})})]}),(0,m.jsxs)(d.ZP,{container:!0,spacing:2,mt:1,children:[(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"country_id",component:this.renderCountryField,label:"Country",type:"select"})}),(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"state_id",component:this.renderStateField,label:"State",type:"select"})})]}),(0,m.jsx)(d.ZP,{container:!0,spacing:2,mt:1,children:(0,m.jsx)(d.ZP,{item:!0,xs:6,children:(0,m.jsx)(i.gN,{name:"district_id",component:this.renderDistrictField,label:"District",type:"select"})})}),(0,m.jsxs)(p.Z,{spacing:1,mt:2,direction:"row",children:[(0,m.jsx)(f.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,m.jsx)(f.Z,{variant:"outlined",onClick:function(){return e.props.navigate("/super-admin/distributors")},children:"Cancel"})]})]})})}}])&&P(t.prototype,r),n&&P(t,n),Object.defineProperty(t,"prototype",{writable:!1}),k}(n.Component);t.Z=(0,b.Z)((0,i.sx)({form:"DistributorForm",validate:function(e){var t={};return["name"].forEach((function(r){e[r]||(t[r]="Required")})),t}})(k))}}]);