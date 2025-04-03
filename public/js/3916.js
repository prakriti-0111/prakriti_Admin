"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3916],{20511:function(t,e,r){r.d(e,{Z:function(){return w}});var n=r(30808),o=r(25773),a=r(27378),i=r(89090),s=r(12658),c=r(82267),l=r(67018),u=r(76112),d=r(28730),f=r(95287),p=r(6749);function h(t){return(0,p.Z)("MuiLoadingButton",t)}var g=(0,r(44124).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),m=r(24246);const y=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],v=(0,l.ZP)(d.Z,{shouldForwardProp:t=>(t=>"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t)(t)||"classes"===t,name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,e)=>[e.root,e.startIconLoadingStart&&{[`& .${g.startIconLoadingStart}`]:e.startIconLoadingStart},e.endIconLoadingEnd&&{[`& .${g.endIconLoadingEnd}`]:e.endIconLoadingEnd}]})((({ownerState:t,theme:e})=>(0,o.Z)({[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0}},"center"===t.loadingPosition&&{transition:e.transitions.create(["background-color","box-shadow","border-color"],{duration:e.transitions.duration.short}),[`&.${g.loading}`]:{color:"transparent"}},"start"===t.loadingPosition&&t.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===t.loadingPosition&&t.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0,marginLeft:-8}}))),b=(0,l.ZP)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.loadingIndicator,e[`loadingIndicator${(0,i.Z)(r.loadingPosition)}`]]}})((({theme:t,ownerState:e})=>(0,o.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===e.loadingPosition&&("outlined"===e.variant||"contained"===e.variant)&&{left:"small"===e.size?10:14},"start"===e.loadingPosition&&"text"===e.variant&&{left:6},"center"===e.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===e.loadingPosition&&("outlined"===e.variant||"contained"===e.variant)&&{right:"small"===e.size?10:14},"end"===e.loadingPosition&&"text"===e.variant&&{right:6},"start"===e.loadingPosition&&e.fullWidth&&{position:"relative",left:-10},"end"===e.loadingPosition&&e.fullWidth&&{position:"relative",right:-10})));var w=a.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiLoadingButton"}),{children:a,disabled:l=!1,id:d,loading:p=!1,loadingIndicator:g,loadingPosition:w="center",variant:P="text"}=r,S=(0,n.Z)(r,y),x=(0,s.Z)(d),Z=null!=g?g:(0,m.jsx)(f.Z,{"aria-labelledby":x,color:"inherit",size:16}),j=(0,o.Z)({},r,{disabled:l,loading:p,loadingIndicator:Z,loadingPosition:w,variant:P}),k=(t=>{const{loading:e,loadingPosition:r,classes:n}=t,a={root:["root",e&&"loading"],startIcon:[e&&`startIconLoading${(0,i.Z)(r)}`],endIcon:[e&&`endIconLoading${(0,i.Z)(r)}`],loadingIndicator:["loadingIndicator",e&&`loadingIndicator${(0,i.Z)(r)}`]},s=(0,c.Z)(a,h,n);return(0,o.Z)({},n,s)})(j),C=p?(0,m.jsx)(b,{className:k.loadingIndicator,ownerState:j,children:Z}):null;return(0,m.jsxs)(v,(0,o.Z)({disabled:l||p,id:x,ref:e},S,{variant:P,classes:k,ownerState:j,children:["end"===j.loadingPosition?a:C,"end"===j.loadingPosition?C:a]}))}))},95287:function(t,e,r){r.d(e,{Z:function(){return k}});var n=r(30808),o=r(25773),a=r(27378),i=r(38944),s=r(82267),c=r(10043),l=r(89090),u=r(76112),d=r(67018),f=r(6749);function p(t){return(0,f.Z)("MuiCircularProgress",t)}(0,r(44124).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h=r(24246);const g=["className","color","disableShrink","size","style","thickness","value","variant"];let m,y,v,b,w=t=>t;const P=(0,c.F4)(m||(m=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),S=(0,c.F4)(y||(y=w`
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
`)),x=(0,d.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],e[`color${(0,l.Z)(r.color)}`]]}})((({ownerState:t,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:e.transitions.create("transform")},"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,c.iv)(v||(v=w`
      animation: ${0} 1.4s linear infinite;
    `),P))),Z=(0,d.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),j=(0,d.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.circle,e[`circle${(0,l.Z)(r.variant)}`],r.disableShrink&&e.circleDisableShrink]}})((({ownerState:t,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,c.iv)(b||(b=w`
      animation: ${0} 1.4s ease-in-out infinite;
    `),S)));var k=a.forwardRef((function(t,e){const r=(0,u.Z)({props:t,name:"MuiCircularProgress"}),{className:a,color:c="primary",disableShrink:d=!1,size:f=40,style:m,thickness:y=3.6,value:v=0,variant:b="indeterminate"}=r,w=(0,n.Z)(r,g),P=(0,o.Z)({},r,{color:c,disableShrink:d,size:f,thickness:y,value:v,variant:b}),S=(t=>{const{classes:e,variant:r,color:n,disableShrink:o}=t,a={root:["root",r,`color${(0,l.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(r)}`,o&&"circleDisableShrink"]};return(0,s.Z)(a,p,e)})(P),k={},C={},_={};if("determinate"===b){const t=2*Math.PI*((44-y)/2);k.strokeDasharray=t.toFixed(3),_["aria-valuenow"]=Math.round(v),k.strokeDashoffset=`${((100-v)/100*t).toFixed(3)}px`,C.transform="rotate(-90deg)"}return(0,h.jsx)(x,(0,o.Z)({className:(0,i.Z)(S.root,a),style:(0,o.Z)({width:f,height:f},C,m),ownerState:P,ref:e,role:"progressbar"},_,w,{children:(0,h.jsx)(Z,{className:S.svg,ownerState:P,viewBox:"22 22 44 44",children:(0,h.jsx)(j,{className:S.circle,style:k,ownerState:P,cx:44,cy:44,r:(44-y)/2,fill:"none",strokeWidth:y})})}))}))},99866:function(t,e,r){r.d(e,{C6:function(){return c},Cp:function(){return i},e8:function(){return s}});var n=r(69222),o=r(36611),a=r(57446),i=function(t){return function(e){n.Z.post("/sales-executive/change-password",t).then((function(t){e({type:o.Gt,payload:t.data})})).catch((function(t){}))}},s=function(t){return t=(0,a.B7)(t,!0),n.Z.get("/sales-executive/attendence".concat(t))},c=function(t){return n.Z.post("/sales-executive/attendence-update",t)}},83916:function(t,e,r){r.r(e),r.d(e,{default:function(){return $}});var n=r(27378),o=r(23884),a=r(9647),i=r(43564),s=r(23434),c=r(10418),l=r(78153),u=r(28730),d=r(57446),f=r(10755),p=r(99866),h=r(72897),g=r(20511),m=r(13040),y=r(36611),v=r(24246);function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function P(t,e){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},P(t,e)}function S(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return x(t)}function x(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Z(t){return Z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Z(t)}function j(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&P(t,e)}(p,t);var e,r,n,o,a,f=(o=p,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Z(o);if(a){var r=Z(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return S(this,t)});function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),j(x(e=f.call(this,t)),"handleDefaultChange",(function(t,r){e.updateFormValues(t.target.value,r)})),j(x(e),"updateFormValues",(function(t,r){var n=e.state.formValues;n[r]=t,e.setState({formValues:n})})),j(x(e),"handleSubmit",(function(){e.formValidate()||(e.setState({submitting:!0}),e.props.actions.changePassword(e.state.formValues))})),j(x(e),"formValidate",(function(){var t=e.state.formErros,r=e.state.formValues,n=!1;return(0,d.xb)(r.old_password)?(t.old_password=!0,n=!0):t.old_password=!1,(0,d.xb)(r.password)?(t.password=!0,n=!0):t.password=!1,(0,d.xb)(r.confirm_password)?(t.confirm_password=!0,n=!0):t.confirm_password=!1,e.setState({formErros:t}),n})),e.state={auth:e.props.auth,submitting:!1,formValues:{confirm_password:"",old_password:"",password:""},formErros:{confirm_password:!1,old_password:!1,password:!1},actionCalled:e.props.actionCalled,changePasswordSuccess:e.props.changePasswordSuccess,successMessage:e.props.successMessage,errorMessage:e.props.errorMessage},e}return e=p,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.actionCalled!==e.actionCalled&&(r.actionCalled=t.actionCalled),t.changePasswordSuccess!==e.changePasswordSuccess&&(r.changePasswordSuccess=t.changePasswordSuccess),t.successMessage!==e.successMessage&&(r.successMessage=t.successMessage),t.errorMessage!==e.errorMessage&&(r.errorMessage=t.errorMessage),r}}],(r=[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){this.state.actionCalled&&(this.state.changePasswordSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({formValues:{confirm_password:"",old_password:"",password:""}})):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:y.HP}),this.setState({submitting:!1}))}},{key:"render",value:function(){var t=this,e=this.state,r=e.formValues,n=e.formErros,o=e.submitting;return(0,v.jsx)(i.Z,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,v.jsxs)(s.ZP,{container:!0,spacing:2,columnSpacing:{xs:1,sm:2,md:2},className:"tax-input loans_view p_view ",children:[(0,v.jsx)(s.ZP,{item:!0,xs:12,className:"create-input",children:(0,v.jsx)(c.Z,{label:"Current Password",variant:"outlined",fullWidth:!0,value:r.old_password,type:"password",onChange:function(e){return t.handleDefaultChange(e,"old_password")},error:n.old_password})}),(0,v.jsx)(s.ZP,{item:!0,xs:12,className:"create-input",children:(0,v.jsx)(c.Z,{label:"New Password",variant:"outlined",fullWidth:!0,value:r.password,type:"password",onChange:function(e){return t.handleDefaultChange(e,"password")},error:n.password})}),(0,v.jsx)(s.ZP,{item:!0,xs:12,className:"create-input",children:(0,v.jsx)(c.Z,{label:"Confirm New Password",variant:"outlined",fullWidth:!0,value:r.confirm_password,type:"password",onChange:function(e){return t.handleDefaultChange(e,"confirm_password")},error:n.confirm_password})}),(0,v.jsx)(s.ZP,{item:!0,xs:12,children:(0,v.jsxs)(l.Z,{spacing:1,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,v.jsx)(g.Z,{className:"conf-button",variant:"contained",type:"button",loading:o,disabled:o,onClick:this.handleSubmit,children:"Update"}),o?null:(0,v.jsx)(u.Z,{variant:"outlined",className:"close-button",onClick:function(){return t.props.navigate((0,d.ZA)((0,d.O2)(t.state.auth))+"/dashboard")},children:"Cancel"})]})})]})})}}])&&w(e.prototype,r),n&&w(e,n),Object.defineProperty(e,"prototype",{writable:!1}),p}(n.Component),C=(0,m.Z)((0,h.RM)((0,o.connect)((function(t){return{auth:t.auth,actionCalled:t.se.profile.actionCalled,changePasswordSuccess:t.se.profile.changePasswordSuccess,successMessage:t.se.profile.successMessage,errorMessage:t.se.profile.errorMessage}}),(function(t){return{dispatch:t,actions:(0,f.bindActionCreators)({changePassword:p.Cp},t)}}))((0,a.sx)({form:"ChangePasswordForm"})(k)))),_=r(8971);function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function M(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function R(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(i,t);var e,r,n,o,a=(n=i,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(n);if(o){var r=L(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return R(this,t)});function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=a.call(this,t)).state={},e}return e=i,(r=[{key:"render",value:function(){return(0,v.jsx)(_.Z,{title:"Change Password",children:(0,v.jsx)("div",{children:(0,v.jsx)(C,{})})})}}])&&M(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),i}(n.Component),$=(0,h.RM)((0,m.Z)((0,o.connect)((function(t){return{}}),(function(t){return{dispatch:t}}))(E)))}}]);