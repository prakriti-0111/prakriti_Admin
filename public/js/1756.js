"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1756],{49701:(e,t,s)=>{s.d(t,{bQ:()=>i,e9:()=>l,fu:()=>c,jV:()=>o,qY:()=>d});var a=s(80325),r=s(69363),n=s(45892);const i=e=>(e=(0,n.x0)(e,!0),t=>{a.A.get("/manager/workers".concat(e)).then((e=>{e.data.success&&t({type:r.AR,payload:e.data.data})})).catch((e=>{}))}),c=e=>t=>{a.A.post("/manager/workers/store",e).then((e=>{e.data.success&&t({type:r.l5,payload:e.data.data})})).catch((e=>{}))},o=e=>t=>{a.A.get("/manager/workers/fetch/".concat(e)).then((e=>{e.data.success&&t({type:r.ev,payload:e.data.data})})).catch((e=>{}))},l=(e,t)=>s=>{a.A.post("/manager/workers/update/".concat(e),t).then((e=>{e.data.success&&s({type:r.bi,payload:e.data.data})})).catch((e=>{}))},d=(e,t)=>s=>{a.A.delete("/manager/workers/delete/".concat(e),t).then((e=>{e.data.success&&s({type:r.NW,payload:!0})})).catch((e=>{}))}},37586:(e,t,s)=>{s.d(t,{A:()=>h});var a=s(63696),r=(s(52821),s(55482)),n=s(36122),i=s(61095),c=s(45271),o=s(72839),l=s(49746),d=s(50977),u=s(62540);class p extends a.Component{constructor(e){var t,s;super(e),s=e=>{let{input:t,label:s,meta:{touched:a,error:r},...i}=e;return(0,u.jsx)(n.A,{label:s,fullWidth:!0,error:!(!a||!r),helperText:a&&r?r:"",...t,...i})},(t="renderTextField")in this?Object.defineProperty(this,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[t]=s,this.state={formData:"formData"in this.props?this.props.formData:null}}componentDidMount(){this.state.formData&&this.props.initialize(this.state.formData)}static getDerivedStateFromProps(e,t){return{}}render(){const{handleSubmit:e,pristine:t,submitting:s}=this.props;return(0,u.jsx)("form",{onSubmit:e,children:(0,u.jsx)(i.A,{sx:{flexGrow:1},className:"ratn-dialog-inner",children:(0,u.jsxs)(c.Ay,{container:!0,spacing:2,className:"details-header ratn-pur-wrapper loans_view p_view",children:[(0,u.jsx)(c.Ay,{item:!0,xs:6,children:(0,u.jsx)(r.D0,{name:"name",required:!0,component:this.renderTextField,label:"Name"})}),(0,u.jsx)(c.Ay,{item:!0,xs:6,children:(0,u.jsx)(r.D0,{name:"email",component:this.renderTextField,label:"Email"})}),(0,u.jsx)(c.Ay,{item:!0,xs:6,children:(0,u.jsx)(r.D0,{name:"mobile",required:!0,component:this.renderTextField,label:"Mobile"})}),(0,u.jsx)(c.Ay,{item:!0,xs:12,children:(0,u.jsxs)(o.A,{spacing:1,mt:2,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,u.jsx)(l.A,{variant:"contained",type:"submit",className:"conf-button",children:"Submit"}),(0,u.jsx)(l.A,{variant:"outlined",onClick:()=>this.props.navigate("/employee/workers"),className:"close-button",children:"Cancel"})]})})]})})})}}const h=(0,d.A)((0,r.zW)({form:"WorkerForm",validate:e=>{const t={};return["name"].forEach((s=>{e[s]||(t[s]="Required")})),t}})(p))},21756:(e,t,s)=>{s.r(t),s.d(t,{default:()=>p});var a=s(63696),r=s(52821),n=s(37586),i=s(88441),c=s(66098),o=s(50977),l=s(49701),d=s(62540);class u extends a.Component{constructor(e){var t,s;super(e),s=e=>{this.props.actions.workerCreate(e)},(t="submit")in this?Object.defineProperty(this,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[t]=s,this.state={success:"success"in this.props&&this.props.success}}static getDerivedStateFromProps(e,t){let s={};return"success"in e&&e.success!==t.success&&(s.success=e.success),s}componentDidUpdate(){this.state.success&&this.props.navigate("/manager/workers")}render(){return(0,d.jsx)(c.A,{title:"Worker Create",children:(0,d.jsx)("div",{children:(0,d.jsx)(n.A,{onSubmit:this.submit})})})}}const p=(0,o.A)((0,r.connect)((e=>({...e.manager.worker})),(e=>({actions:(0,i.bindActionCreators)({workerCreate:l.fu},e)})))(u))}}]);