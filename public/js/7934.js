"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7934],{60789:function(t,e,r){r.d(e,{Z:function(){return P}});var n=r(30808),i=r(25773),o=r(27378),s=r(38944),c=r(82267),a=r(7818),u=r(67018),l=r(76112),d=r(54350),p=r(3870),f=r(36609),b=r(50128),y=r(67462),m=r(54202),h=r(86365),v=r(6749);function j(t){return(0,v.Z)("MuiMenuItem",t)}var g=(0,r(44124).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),O=r(24246);const x=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],Z=(0,u.ZP)(p.Z,{shouldForwardProp:t=>(0,u.FO)(t)||"classes"===t,name:"MuiMenuItem",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.dense&&e.dense,r.divider&&e.divider,!r.disableGutters&&e.gutters]}})((({theme:t,ownerState:e})=>(0,i.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!e.disableGutters&&{paddingLeft:16,paddingRight:16},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,a.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${g.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:(0,a.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${g.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:(0,a.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,a.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${g.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${g.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},[`& + .${y.Z.root}`]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},[`& + .${y.Z.inset}`]:{marginLeft:52},[`& .${h.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${h.Z.inset}`]:{paddingLeft:36},[`& .${m.Z.root}`]:{minWidth:36}},!e.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},e.dense&&(0,i.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{[`& .${m.Z.root} svg`]:{fontSize:"1.25rem"}}))));var P=o.forwardRef((function(t,e){const r=(0,l.Z)({props:t,name:"MuiMenuItem"}),{autoFocus:a=!1,component:u="li",dense:p=!1,divider:y=!1,disableGutters:m=!1,focusVisibleClassName:h,role:v="menuitem",tabIndex:g}=r,P=(0,n.Z)(r,x),w=o.useContext(d.Z),S={dense:p||w.dense||!1,disableGutters:m},C=o.useRef(null);(0,f.Z)((()=>{a&&C.current&&C.current.focus()}),[a]);const D=(0,i.Z)({},r,{dense:S.dense,divider:y,disableGutters:m}),F=(t=>{const{disabled:e,dense:r,divider:n,disableGutters:o,selected:s,classes:a}=t,u={root:["root",r&&"dense",e&&"disabled",!o&&"gutters",n&&"divider",s&&"selected"]},l=(0,c.Z)(u,j,a);return(0,i.Z)({},a,l)})(r),k=(0,b.Z)(C,e);let T;return r.disabled||(T=void 0!==g?g:-1),(0,O.jsx)(d.Z.Provider,{value:S,children:(0,O.jsx)(Z,(0,i.Z)({ref:k,role:v,tabIndex:T,component:u,focusVisibleClassName:(0,s.Z)(F.focusVisible,h)},P,{ownerState:D,classes:F}))})}))},44988:function(t,e,r){r.d(e,{SG:function(){return c},zP:function(){return s}});var n=r(69222),i=r(75055),o=r(57446),s=function(t){return t=(0,o.B7)(t,!0),function(e){n.Z.get("/admin/distributors".concat(t)).then((function(t){t.data.success&&e({type:i.cW,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){n.Z.post("/admin/distributors/store",t).then((function(t){t.data.success&&e({type:i.F0,payload:t.data.data})})).catch((function(t){}))}}},77934:function(t,e,r){r.r(e),r.d(e,{default:function(){return Q}});var n=r(27378),i=r(23884),o=r(9647),s=r(10418),c=r(56793),a=r(66816),u=r(48684),l=r(60789),d=r(43564),p=r(23434),f=r(78153),b=r(28730),y=r(13040),m=r(24246);function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}var v=["input","label","meta"],j=["input","label","meta"],g=["input","label","meta"],O=["input","label","meta"];function x(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Z(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?x(Object(r),!0).forEach((function(e){k(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function C(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return D(t)}function D(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function F(t){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},F(t)}function k(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(x,t);var e,r,n,i,y,h=(i=x,y=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=F(i);if(y){var r=F(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return C(this,t)});function x(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,x),k(D(e=h.call(this,t)),"renderTextField",(function(t){var e=t.input,r=t.label,n=t.meta,i=n.touched,o=n.error,c=P(t,v);return(0,m.jsx)(s.Z,Z(Z({label:r,fullWidth:!0,error:!(!i||!o),helperText:i&&o?o:""},e),c))})),k(D(e),"renderCountryField",(function(t){var e=t.input,r=t.label,n=t.meta,i=n.touched,o=n.error,s=P(t,j);return(0,m.jsxs)(c.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(a.Z,{children:r}):null,(0,m.jsx)(u.Z,Z(Z(Z({label:r,fullWidth:!0},e),s),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select country"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),k(D(e),"renderStateField",(function(t){var e=t.input,r=t.label,n=t.meta,i=n.touched,o=n.error,s=P(t,g);return(0,m.jsxs)(c.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(a.Z,{children:r}):null,(0,m.jsx)(u.Z,Z(Z(Z({label:r,fullWidth:!0},e),s),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select state"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),k(D(e),"renderDistrictField",(function(t){var e=t.input,r=t.label,n=t.meta,i=n.touched,o=n.error,s=P(t,O);return(0,m.jsxs)(c.Z,{fullWidth:!0,error:!(!i||!o),children:[r?(0,m.jsx)(a.Z,{children:r}):null,(0,m.jsx)(u.Z,Z(Z(Z({label:r,fullWidth:!0},e),s),{},{children:(0,m.jsx)(l.Z,{value:"",children:"select district"})})),i&&o?(0,m.jsx)(FormHelperText,{children:o}):null]})})),e.state={formData:"formData"in e.props?e.props.formData:null,states:e.props.states,districts:e.props.districts,countries:e.props.countries},e}return e=x,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.states!==e.states&&(r.states=t.states),t.districts!==e.districts&&(r.districts=t.districts),t.countries!==e.countries&&(r.countries=t.countries),r}}],(r=[{key:"componentDidMount",value:function(){this.state.formData&&this.props.initialize(this.state.formData)}},{key:"render",value:function(){var t=this,e=this.props,r=e.handleSubmit;return e.pristine,e.submitting,(0,m.jsx)("form",{onSubmit:r,children:(0,m.jsxs)(d.Z,{sx:{flexGrow:1},children:[(0,m.jsxs)(p.ZP,{container:!0,spacing:2,children:[(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"name",required:!0,component:this.renderTextField,label:"Name"})}),(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"email",required:!0,component:this.renderTextField,label:"Email"})})]}),(0,m.jsxs)(p.ZP,{container:!0,spacing:2,mt:1,children:[(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"mobile",required:!0,component:this.renderTextField,label:"Mobile",type:"number"})}),(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"password",required:!0,component:this.renderTextField,label:"Password",type:"password"})})]}),(0,m.jsxs)(p.ZP,{container:!0,spacing:2,mt:1,children:[(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"country_id",component:this.renderCountryField,label:"Country",type:"select"})}),(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"state_id",component:this.renderStateField,label:"State",type:"select"})})]}),(0,m.jsx)(p.ZP,{container:!0,spacing:2,mt:1,children:(0,m.jsx)(p.ZP,{item:!0,xs:6,children:(0,m.jsx)(o.gN,{name:"district_id",component:this.renderDistrictField,label:"District",type:"select"})})}),(0,m.jsxs)(f.Z,{spacing:1,mt:2,direction:"row",children:[(0,m.jsx)(b.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,m.jsx)(b.Z,{variant:"outlined",onClick:function(){return t.props.navigate("/super-admin/distributors")},children:"Cancel"})]})]})})}}])&&w(e.prototype,r),n&&w(e,n),Object.defineProperty(e,"prototype",{writable:!1}),x}(n.Component),$=(0,y.Z)((0,o.sx)({form:"DistributorForm",validate:function(t){var e={};return["name"].forEach((function(r){t[r]||(e[r]="Required")})),e}})(T)),_=r(10755),R=r(8971),E=r(44988),B=r(69222),N=r(57446),I=function(t){return t=(0,N.B7)(t,!0),function(e){B.Z.get("/admin/states".concat(t)).then((function(t){t.data.success&&e({type:"LIST_STATE",payload:t.data.data})})).catch((function(t){}))}},L=function(t){return t=(0,N.B7)(t,!0),function(e){B.Z.get("/admin/countries".concat(t)).then((function(t){t.data.success&&e({type:"LIST_COUNTRY",payload:t.data.data})})).catch((function(t){}))}},G=r(58858),M=function(t){return t=(0,N.B7)(t,!0),function(e){B.Z.get("/superadmin/districts".concat(t)).then((function(t){t.data.success&&e({type:G.K7,payload:t.data.data})})).catch((function(t){}))}};function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function W(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function V(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?W(Object(r),!0).forEach((function(e){Y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):W(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function H(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function z(t,e){return z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},z(t,e)}function A(t,e){if(e&&("object"===q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return U(t)}function U(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function K(t){return K=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},K(t)}function Y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var J=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&z(t,e)}(c,t);var e,r,n,i,o,s=(i=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=K(i);if(o){var r=K(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return A(this,t)});function c(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),Y(U(e=s.call(this,t)),"submit",(function(t){e.props.actions.distributorCreate(t)})),e.state={success:"success"in e.props&&e.props.success,states:e.props.states,countries:e.props.countries,districts:e.props.districts},e}return e=c,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return"success"in t&&t.success!==e.success&&(r.success=t.success),t.states!==e.states&&(r.states=t.states),t.countries!==e.countries&&(r.countries=t.countries),t.districts!==e.districts&&(r.districts=t.districts),r}}],(r=[{key:"componentDidUpdate",value:function(){this.props.actions.stateList({all:1}),this.props.actions.countryList({all:1}),this.props.actions.districtList({all:1}),this.state.success&&this.props.navigate("/admin/distributors")}},{key:"render",value:function(){return(0,m.jsx)(R.Z,{title:"Distributor Create",children:(0,m.jsx)("div",{children:(0,m.jsx)($,{onSubmit:this.submit,states:this.state.states,countries:this.state.countries,districts:this.state.districts})})})}}])&&H(e.prototype,r),n&&H(e,n),Object.defineProperty(e,"prototype",{writable:!1}),c}(n.Component),Q=(0,y.Z)((0,i.connect)((function(t){return V(V({},t.admin.distributor),{},{states:t.admin.countryState.items||[],countries:t.admin.country.items||[],districts:t.admin.district.items||[]})}),(function(t){return{actions:(0,_.bindActionCreators)({distributorCreate:E.SG,stateList:I,countryList:L,districtList:M},t)}}))(J))}}]);