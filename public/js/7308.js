"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7308],{27218:(t,a,s)=>{s.d(a,{A:()=>b});var e=s(49257),r=s(68102),o=s(63696),i=s(28362),n=s(99484),d=s(81023),c=s(2512),l=s(90013),u=s(49746),h=s(36213),g=s(46733);function p(t){return(0,g.A)("MuiLoadingButton",t)}const m=(0,s(29009).A)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var f=s(62540);const v=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],w=(0,c.Ay)(u.A,{shouldForwardProp:t=>(t=>"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t)(t)||"classes"===t,name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,a)=>[a.root,a.startIconLoadingStart&&{[`& .${m.startIconLoadingStart}`]:a.startIconLoadingStart},a.endIconLoadingEnd&&{[`& .${m.endIconLoadingEnd}`]:a.endIconLoadingEnd}]})((({ownerState:t,theme:a})=>(0,r.A)({[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:a.transitions.create(["opacity"],{duration:a.transitions.duration.short}),opacity:0}},"center"===t.loadingPosition&&{transition:a.transitions.create(["background-color","box-shadow","border-color"],{duration:a.transitions.duration.short}),[`&.${m.loading}`]:{color:"transparent"}},"start"===t.loadingPosition&&t.fullWidth&&{[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:a.transitions.create(["opacity"],{duration:a.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===t.loadingPosition&&t.fullWidth&&{[`& .${m.startIconLoadingStart}, & .${m.endIconLoadingEnd}`]:{transition:a.transitions.create(["opacity"],{duration:a.transitions.duration.short}),opacity:0,marginLeft:-8}}))),A=(0,c.Ay)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,a)=>{const{ownerState:s}=t;return[a.loadingIndicator,a[`loadingIndicator${(0,i.A)(s.loadingPosition)}`]]}})((({theme:t,ownerState:a})=>(0,r.A)({position:"absolute",visibility:"visible",display:"flex"},"start"===a.loadingPosition&&("outlined"===a.variant||"contained"===a.variant)&&{left:"small"===a.size?10:14},"start"===a.loadingPosition&&"text"===a.variant&&{left:6},"center"===a.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===a.loadingPosition&&("outlined"===a.variant||"contained"===a.variant)&&{right:"small"===a.size?10:14},"end"===a.loadingPosition&&"text"===a.variant&&{right:6},"start"===a.loadingPosition&&a.fullWidth&&{position:"relative",left:-10},"end"===a.loadingPosition&&a.fullWidth&&{position:"relative",right:-10}))),b=o.forwardRef((function(t,a){const s=(0,l.A)({props:t,name:"MuiLoadingButton"}),{children:o,disabled:c=!1,id:u,loading:g=!1,loadingIndicator:m,loadingPosition:b="center",variant:S="text"}=s,x=(0,e.A)(s,v),y=(0,n.A)(u),P=null!=m?m:(0,f.jsx)(h.A,{"aria-labelledby":y,color:"inherit",size:16}),k=(0,r.A)({},s,{disabled:c,loading:g,loadingIndicator:P,loadingPosition:b,variant:S}),I=(t=>{const{loading:a,loadingPosition:s,classes:e}=t,o={root:["root",a&&"loading"],startIcon:[a&&`startIconLoading${(0,i.A)(s)}`],endIcon:[a&&`endIconLoading${(0,i.A)(s)}`],loadingIndicator:["loadingIndicator",a&&`loadingIndicator${(0,i.A)(s)}`]},n=(0,d.A)(o,p,e);return(0,r.A)({},e,n)})(k),C=g?(0,f.jsx)(A,{className:I.loadingIndicator,ownerState:k,children:P}):null;return(0,f.jsxs)(w,(0,r.A)({disabled:c||g,id:y,ref:a},x,{variant:S,classes:I,ownerState:k,children:["end"===k.loadingPosition?o:C,"end"===k.loadingPosition?C:o]}))}))},36213:(t,a,s)=>{s.d(a,{A:()=>I});var e=s(49257),r=s(68102),o=s(63696),i=s(68017),n=s(81023),d=s(91785),c=s(28362),l=s(90013),u=s(2512),h=s(46733);function g(t){return(0,h.A)("MuiCircularProgress",t)}(0,s(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=s(62540);const m=["className","color","disableShrink","size","style","thickness","value","variant"];let f,v,w,A,b=t=>t;const S=(0,d.i7)(f||(f=b`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),x=(0,d.i7)(v||(v=b`
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
`)),y=(0,u.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:s}=t;return[a.root,a[s.variant],a[`color${(0,c.A)(s.color)}`]]}})((({ownerState:t,theme:a})=>(0,r.A)({display:"inline-block"},"determinate"===t.variant&&{transition:a.transitions.create("transform")},"inherit"!==t.color&&{color:(a.vars||a).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,d.AH)(w||(w=b`
      animation: ${0} 1.4s linear infinite;
    `),S))),P=(0,u.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,a)=>a.svg})({display:"block"}),k=(0,u.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,a)=>{const{ownerState:s}=t;return[a.circle,a[`circle${(0,c.A)(s.variant)}`],s.disableShrink&&a.circleDisableShrink]}})((({ownerState:t,theme:a})=>(0,r.A)({stroke:"currentColor"},"determinate"===t.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,d.AH)(A||(A=b`
      animation: ${0} 1.4s ease-in-out infinite;
    `),x))),I=o.forwardRef((function(t,a){const s=(0,l.A)({props:t,name:"MuiCircularProgress"}),{className:o,color:d="primary",disableShrink:u=!1,size:h=40,style:f,thickness:v=3.6,value:w=0,variant:A="indeterminate"}=s,b=(0,e.A)(s,m),S=(0,r.A)({},s,{color:d,disableShrink:u,size:h,thickness:v,value:w,variant:A}),x=(t=>{const{classes:a,variant:s,color:e,disableShrink:r}=t,o={root:["root",s,`color${(0,c.A)(e)}`],svg:["svg"],circle:["circle",`circle${(0,c.A)(s)}`,r&&"circleDisableShrink"]};return(0,n.A)(o,g,a)})(S),I={},C={},M={};if("determinate"===A){const t=2*Math.PI*((44-v)/2);I.strokeDasharray=t.toFixed(3),M["aria-valuenow"]=Math.round(w),I.strokeDashoffset=`${((100-w)/100*t).toFixed(3)}px`,C.transform="rotate(-90deg)"}return(0,p.jsx)(y,(0,r.A)({className:(0,i.A)(x.root,o),style:(0,r.A)({width:h,height:h},C,f),ownerState:S,ref:a,role:"progressbar"},M,b,{children:(0,p.jsx)(P,{className:x.svg,ownerState:S,viewBox:"22 22 44 44",children:(0,p.jsx)(k,{className:x.circle,style:I,ownerState:S,cx:44,cy:44,r:(44-v)/2,fill:"none",strokeWidth:v})})}))}))},51046:(t,a,s)=>{s.d(a,{b9:()=>o,ec:()=>i});var e=s(80325),r=s(35908);const o=t=>a=>{e.A.post("/distributor/edit-profile",t).then((t=>{a({type:r.i8,payload:t.data})})).catch((t=>{}))},i=t=>a=>{e.A.post("/distributor/change-password",t).then((t=>{a({type:r.Am,payload:t.data})})).catch((t=>{}))}},47308:(t,a,s)=>{s.r(a),s.d(a,{default:()=>P});var e=s(63696),r=s(52821),o=s(55482),i=s(61095),n=s(45271),d=s(36122),c=s(72839),l=s(49746),u=s(45892),h=s(88441),g=s(51046),p=s(51449),m=s(27218),f=s(50977),v=s(35908),w=s(62540);function A(t,a,s){return a in t?Object.defineProperty(t,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[a]=s,t}class b extends e.Component{constructor(t){super(t),A(this,"handleDefaultChange",((t,a)=>{this.updateFormValues(t.target.value,a)})),A(this,"updateFormValues",((t,a)=>{let s=this.state.formValues;s[a]=t,this.setState({formValues:s})})),A(this,"handleSubmit",(()=>{this.formValidate()||(this.setState({submitting:!0}),this.props.actions.changePassword(this.state.formValues))})),A(this,"formValidate",(()=>{let t=this.state.formErros,a=this.state.formValues,s=!1;return(0,u.Im)(a.password)?(t.password=!0,s=!0):t.password=!1,(0,u.Im)(a.confirm_password)?(t.confirm_password=!0,s=!0):t.confirm_password=!1,this.setState({formErros:t}),s})),this.state={auth:this.props.auth,submitting:!1,formValues:{confirm_password:"",old_password:"",password:""},formErros:{confirm_password:!1,old_password:!1,password:!1},actionCalled:this.props.actionCalled,changePasswordSuccess:this.props.changePasswordSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage}}componentDidMount(){}static getDerivedStateFromProps(t,a){let s={};return t.actionCalled!==a.actionCalled&&(s.actionCalled=t.actionCalled),t.changePasswordSuccess!==a.changePasswordSuccess&&(s.changePasswordSuccess=t.changePasswordSuccess),t.successMessage!==a.successMessage&&(s.successMessage=t.successMessage),t.errorMessage!==a.errorMessage&&(s.errorMessage=t.errorMessage),s}componentDidUpdate(){this.state.actionCalled&&(this.state.changePasswordSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({formValues:{confirm_password:"",old_password:"",password:""}})):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:v.A$}),this.setState({submitting:!1}))}render(){const{formValues:t,formErros:a,submitting:s}=this.state;return(0,w.jsx)(i.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,w.jsxs)(n.Ay,{container:!0,spacing:2,columnSpacing:{xs:1,sm:2,md:2},className:"tax-input loans_view p_view ",children:[(0,w.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,w.jsx)(d.A,{label:"New Password",variant:"outlined",fullWidth:!0,value:t.password,type:"password",onChange:t=>this.handleDefaultChange(t,"password"),error:a.password})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,w.jsx)(d.A,{label:"Confirm New Password",variant:"outlined",fullWidth:!0,value:t.confirm_password,type:"password",onChange:t=>this.handleDefaultChange(t,"confirm_password"),error:a.confirm_password})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,children:(0,w.jsxs)(c.A,{spacing:1,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,w.jsx)(m.A,{className:"conf-button",variant:"contained",type:"button",loading:s,disabled:s,onClick:this.handleSubmit,children:"Update"}),s?null:(0,w.jsx)(l.A,{variant:"outlined",className:"close-button",onClick:()=>this.props.navigate((0,u.zr)((0,u.mA)(this.state.auth))+"/dashboard"),children:"Cancel"})]})})]})})}}const S=(0,f.A)((0,p.Gh)((0,r.connect)((t=>({auth:t.auth,actionCalled:t.distributor.profile.actionCalled,changePasswordSuccess:t.distributor.profile.changePasswordSuccess,successMessage:t.distributor.profile.successMessage,errorMessage:t.distributor.profile.errorMessage,auth:t.auth})),(t=>({dispatch:t,actions:(0,h.bindActionCreators)({changePassword:g.ec},t)})))((0,o.zW)({form:"ChangePasswordForm"})(b))));var x=s(66098);class y extends e.Component{constructor(t){super(t),this.state={}}render(){return(0,w.jsx)(x.A,{title:"Change Password",children:(0,w.jsx)("div",{children:(0,w.jsx)(S,{})})})}}const P=(0,p.Gh)((0,f.A)((0,r.connect)((t=>({})),(t=>({dispatch:t})))(y)))}}]);