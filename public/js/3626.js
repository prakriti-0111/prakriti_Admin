"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3626],{27218:(e,t,a)=>{a.d(t,{A:()=>y});var i=a(49257),s=a(68102),o=a(63696),r=a(28362),n=a(99484),l=a(81023),d=a(2512),c=a(90013),u=a(49746),h=a(36213),m=a(46733);function p(e){return(0,m.A)("MuiLoadingButton",e)}const g=(0,a(29009).A)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var f=a(62540);const v=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],b=(0,d.Ay)(u.A,{shouldForwardProp:e=>(e=>"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e&&"classes"!==e)(e)||"classes"===e,name:"MuiLoadingButton",slot:"Root",overridesResolver:(e,t)=>[t.root,t.startIconLoadingStart&&{[`& .${g.startIconLoadingStart}`]:t.startIconLoadingStart},t.endIconLoadingEnd&&{[`& .${g.endIconLoadingEnd}`]:t.endIconLoadingEnd}]})((({ownerState:e,theme:t})=>(0,s.A)({[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},"center"===e.loadingPosition&&{transition:t.transitions.create(["background-color","box-shadow","border-color"],{duration:t.transitions.duration.short}),[`&.${g.loading}`]:{color:"transparent"}},"start"===e.loadingPosition&&e.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===e.loadingPosition&&e.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginLeft:-8}}))),A=(0,d.Ay)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.loadingIndicator,t[`loadingIndicator${(0,r.A)(a.loadingPosition)}`]]}})((({theme:e,ownerState:t})=>(0,s.A)({position:"absolute",visibility:"visible",display:"flex"},"start"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{left:"small"===t.size?10:14},"start"===t.loadingPosition&&"text"===t.variant&&{left:6},"center"===t.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{right:"small"===t.size?10:14},"end"===t.loadingPosition&&"text"===t.variant&&{right:6},"start"===t.loadingPosition&&t.fullWidth&&{position:"relative",left:-10},"end"===t.loadingPosition&&t.fullWidth&&{position:"relative",right:-10}))),y=o.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiLoadingButton"}),{children:o,disabled:d=!1,id:u,loading:m=!1,loadingIndicator:g,loadingPosition:y="center",variant:S="text"}=a,x=(0,i.A)(a,v),P=(0,n.A)(u),k=null!=g?g:(0,f.jsx)(h.A,{"aria-labelledby":P,color:"inherit",size:16}),I=(0,s.A)({},a,{disabled:d,loading:m,loadingIndicator:k,loadingPosition:y,variant:S}),C=(e=>{const{loading:t,loadingPosition:a,classes:i}=e,o={root:["root",t&&"loading"],startIcon:[t&&`startIconLoading${(0,r.A)(a)}`],endIcon:[t&&`endIconLoading${(0,r.A)(a)}`],loadingIndicator:["loadingIndicator",t&&`loadingIndicator${(0,r.A)(a)}`]},n=(0,l.A)(o,p,i);return(0,s.A)({},i,n)})(I),M=m?(0,f.jsx)(A,{className:C.loadingIndicator,ownerState:I,children:k}):null;return(0,f.jsxs)(b,(0,s.A)({disabled:d||m,id:P,ref:t},x,{variant:S,classes:C,ownerState:I,children:["end"===I.loadingPosition?o:M,"end"===I.loadingPosition?M:o]}))}))},36213:(e,t,a)=>{a.d(t,{A:()=>C});var i=a(49257),s=a(68102),o=a(63696),r=a(68017),n=a(81023),l=a(91785),d=a(28362),c=a(90013),u=a(2512),h=a(46733);function m(e){return(0,h.A)("MuiCircularProgress",e)}(0,a(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=a(62540);const g=["className","color","disableShrink","size","style","thickness","value","variant"];let f,v,b,A,y=e=>e;const S=(0,l.i7)(f||(f=y`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),x=(0,l.i7)(v||(v=y`
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
`)),P=(0,u.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t[`color${(0,d.A)(a.color)}`]]}})((({ownerState:e,theme:t})=>(0,s.A)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,l.AH)(b||(b=y`
      animation: ${0} 1.4s linear infinite;
    `),S))),k=(0,u.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),I=(0,u.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.circle,t[`circle${(0,d.A)(a.variant)}`],a.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,s.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.AH)(A||(A=y`
      animation: ${0} 1.4s ease-in-out infinite;
    `),x))),C=o.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiCircularProgress"}),{className:o,color:l="primary",disableShrink:u=!1,size:h=40,style:f,thickness:v=3.6,value:b=0,variant:A="indeterminate"}=a,y=(0,i.A)(a,g),S=(0,s.A)({},a,{color:l,disableShrink:u,size:h,thickness:v,value:b,variant:A}),x=(e=>{const{classes:t,variant:a,color:i,disableShrink:s}=e,o={root:["root",a,`color${(0,d.A)(i)}`],svg:["svg"],circle:["circle",`circle${(0,d.A)(a)}`,s&&"circleDisableShrink"]};return(0,n.A)(o,m,t)})(S),C={},M={},w={};if("determinate"===A){const e=2*Math.PI*((44-v)/2);C.strokeDasharray=e.toFixed(3),w["aria-valuenow"]=Math.round(b),C.strokeDashoffset=`${((100-b)/100*e).toFixed(3)}px`,M.transform="rotate(-90deg)"}return(0,p.jsx)(P,(0,s.A)({className:(0,r.A)(x.root,o),style:(0,s.A)({width:h,height:h},M,f),ownerState:S,ref:t,role:"progressbar"},w,y,{children:(0,p.jsx)(k,{className:x.svg,ownerState:S,viewBox:"22 22 44 44",children:(0,p.jsx)(I,{className:x.circle,style:C,ownerState:S,cx:44,cy:44,r:(44-v)/2,fill:"none",strokeWidth:v})})}))}))},51273:(e,t,a)=>{a.d(t,{b9:()=>o,ec:()=>r,tO:()=>n});var i=a(80325),s=a(52847);const o=e=>t=>{i.A.post("/employee/edit-profile",e).then((e=>{t({type:s.Lf,payload:e.data})})).catch((e=>{}))},r=e=>t=>{i.A.post("/employee/change-password",e).then((e=>{t({type:s.fp,payload:e.data})})).catch((e=>{}))},n=e=>e=>{i.A.get("/employee/dashboard").then((t=>{e({type:s.y5,payload:t.data.data})})).catch((e=>{}))}},33626:(e,t,a)=>{a.r(t),a.d(t,{default:()=>I});var i=a(63696),s=a(52821),o=a(55482),r=a(61095),n=a(45271),l=a(36122),d=a(72839),c=a(49746),u=a(45892),h=a(88441),m=a(51273),p=a(51449),g=a(27218),f=a(50977),v=a(52847),b=a(42722),A=a(62540);function y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class S extends i.Component{constructor(e){super(e),y(this,"handleDefaultChange",((e,t)=>{this.updateFormValues(e.target.value,t)})),y(this,"updateFormValues",((e,t)=>{let a=this.state.formValues;a[t]=e,this.setState({formValues:a})})),y(this,"handleSubmit",(()=>{this.formValidate()||(this.setState({submitting:!0}),this.props.actions.updateEditProfile(this.state.formValues))})),y(this,"formValidate",(()=>{let e=this.state.formErros,t=this.state.formValues,a=!1;return(0,u.Im)(t.name)?(e.name=!0,a=!0):e.name=!1,(0,u.Im)(t.mobile)?(e.mobile=!0,a=!0):e.mobile=!1,this.setState({formErros:e}),a})),this.state={auth:this.props.auth,submitting:!1,formValues:{name:this.props.auth.user.name,mobile:this.props.auth.user.mobile,email:this.props.auth.user.email},formErros:{name:!1,mobile:!1,email:!1},actionCalled:this.props.actionCalled,editProfileSuccess:this.props.editProfileSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage}}componentDidMount(){this.props.auth&&this.props.auth.user&&this.setState({formValues:{...this.state.formValues,name:this.props.auth.user.name,mobile:this.props.auth.user.mobile,email:this.props.auth.user.email}})}static getDerivedStateFromProps(e,t){let a={};return e.actionCalled!==t.actionCalled&&(a.actionCalled=e.actionCalled),e.editProfileSuccess!==t.editProfileSuccess&&(a.editProfileSuccess=e.editProfileSuccess),e.successMessage!==t.successMessage&&(a.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(a.errorMessage=e.errorMessage),a}componentDidUpdate(){this.state.actionCalled&&(this.state.editProfileSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:b.Rq,payload:{name:this.state.formValues.name,mobile:this.state.formValues.mobile,email:this.state.formValues.email}})):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:v.tJ}),this.setState({submitting:!1}))}render(){const{formValues:e,formErros:t,submitting:a}=this.state;return(0,A.jsx)(r.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,A.jsxs)(n.Ay,{container:!0,spacing:2,className:"tax-input loans_view p_view ",children:[(0,A.jsx)(n.Ay,{item:!0,xs:6,className:"create-input",children:(0,A.jsx)(l.A,{label:"Name",variant:"outlined",fullWidth:!0,value:e.name,onChange:e=>this.handleDefaultChange(e,"name"),error:t.name})}),(0,A.jsx)(n.Ay,{item:!0,xs:6,className:"create-input",children:(0,A.jsx)(l.A,{label:"Mobile",variant:"outlined",fullWidth:!0,value:e.mobile,onChange:e=>this.handleDefaultChange(e,"mobile"),error:t.mobile})}),(0,A.jsx)(n.Ay,{item:!0,xs:6,className:"create-input",children:(0,A.jsx)(l.A,{label:"Email",variant:"outlined",fullWidth:!0,value:e.email,onChange:e=>this.handleDefaultChange(e,"email"),error:t.email})}),(0,A.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,A.jsxs)(d.A,{spacing:1,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,A.jsx)(g.A,{className:"conf-button",variant:"contained",type:"button",loading:a,disabled:a,onClick:this.handleSubmit,children:"Update"}),a?null:(0,A.jsx)(c.A,{variant:"outlined",className:"close-button",onClick:()=>this.props.navigate("/employee/dashboard"),children:"Cancel"})]})})]})})}}const x=(0,f.A)((0,p.Gh)((0,s.connect)((e=>({auth:e.auth,actionCalled:e.employee.profile.actionCalled,editProfileSuccess:e.employee.profile.editProfileSuccess,successMessage:e.employee.profile.successMessage,errorMessage:e.employee.profile.errorMessage,auth:e.auth})),(e=>({dispatch:e,actions:(0,h.bindActionCreators)({updateEditProfile:m.b9},e)})))((0,o.zW)({form:"EditProfileForm"})(S))));var P=a(66098);class k extends i.Component{constructor(e){super(e),this.state={}}render(){return(0,A.jsx)(P.A,{title:"Edit Profile",children:(0,A.jsx)("div",{children:(0,A.jsx)(x,{})})})}}const I=(0,p.Gh)((0,f.A)((0,s.connect)((e=>({})),(e=>({dispatch:e})))(k)))}}]);