"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4344],{47269:(e,r,a)=>{var t=a(96784);r.A=void 0;var s=t(a(17044)),o=a(62540),i=(0,s.default)((0,o.jsx)("path",{d:"M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z"}),"Diamond");r.A=i},36213:(e,r,a)=>{a.d(r,{A:()=>D});var t=a(49257),s=a(68102),o=a(63696),i=a(68017),n=a(81023),c=a(91785),l=a(28362),d=a(90013),h=a(2512),p=a(46733);function m(e){return(0,p.A)("MuiCircularProgress",e)}(0,a(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var u=a(62540);const v=["className","color","disableShrink","size","style","thickness","value","variant"];let f,k,b,y,A=e=>e;const x=(0,c.i7)(f||(f=A`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),g=(0,c.i7)(k||(k=A`
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
`)),S=(0,h.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,r[a.variant],r[`color${(0,l.A)(a.color)}`]]}})((({ownerState:e,theme:r})=>(0,s.A)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.AH)(b||(b=A`
      animation: ${0} 1.4s linear infinite;
    `),x))),w=(0,h.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),C=(0,h.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.circle,r[`circle${(0,l.A)(a.variant)}`],a.disableShrink&&r.circleDisableShrink]}})((({ownerState:e,theme:r})=>(0,s.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.AH)(y||(y=A`
      animation: ${0} 1.4s ease-in-out infinite;
    `),g))),D=o.forwardRef((function(e,r){const a=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:o,color:c="primary",disableShrink:h=!1,size:p=40,style:f,thickness:k=3.6,value:b=0,variant:y="indeterminate"}=a,A=(0,t.A)(a,v),x=(0,s.A)({},a,{color:c,disableShrink:h,size:p,thickness:k,value:b,variant:y}),g=(e=>{const{classes:r,variant:a,color:t,disableShrink:s}=e,o={root:["root",a,`color${(0,l.A)(t)}`],svg:["svg"],circle:["circle",`circle${(0,l.A)(a)}`,s&&"circleDisableShrink"]};return(0,n.A)(o,m,r)})(x),D={},j={},M={};if("determinate"===y){const e=2*Math.PI*((44-k)/2);D.strokeDasharray=e.toFixed(3),M["aria-valuenow"]=Math.round(b),D.strokeDashoffset=`${((100-b)/100*e).toFixed(3)}px`,j.transform="rotate(-90deg)"}return(0,u.jsx)(S,(0,s.A)({className:(0,i.A)(g.root,o),style:(0,s.A)({width:p,height:p},j,f),ownerState:x,ref:r,role:"progressbar"},M,A,{children:(0,u.jsx)(w,{className:g.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,u.jsx)(C,{className:g.circle,style:D,ownerState:x,cx:44,cy:44,r:(44-k)/2,fill:"none",strokeWidth:k})})}))}))},51273:(e,r,a)=>{a.d(r,{b9:()=>o,ec:()=>i,tO:()=>n});var t=a(80325),s=a(52847);const o=e=>r=>{t.A.post("/employee/edit-profile",e).then((e=>{r({type:s.Lf,payload:e.data})})).catch((e=>{}))},i=e=>r=>{t.A.post("/employee/change-password",e).then((e=>{r({type:s.fp,payload:e.data})})).catch((e=>{}))},n=e=>e=>{t.A.get("/employee/dashboard").then((r=>{e({type:s.y5,payload:r.data.data})})).catch((e=>{}))}},24344:(e,r,a)=>{a.r(r),a.d(r,{default:()=>v});var t=a(63696),s=a(52821),o=a(3577),i=a(44748),n=a(66593),c=a(36213),l=a(51273),d=a(88441),h=a(50977),p=a(47269),m=a(62540);class u extends t.Component{constructor(e){var r,a;super(e),a=e=>{this.props.navigate("/employee/"+e)},(r="handleClick")in this?Object.defineProperty(this,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):this[r]=a,this.state={dashboard:this.props.dashboard}}componentDidMount(){this.props.actions.getDashboardData()}static getDerivedStateFromProps(e,r){let a={};return e.dashboard!==r.dashboard&&(a.dashboard=e.dashboard),a}render(){const e=this.state.dashboard;return(0,m.jsx)(o.A,{className:"dashboard_card",children:(0,m.jsxs)(i.A,{onClick:()=>this.handleClick("workers"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,m.jsxs)(n.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,m.jsx)("h1",{children:"Total Workers "}),(0,m.jsx)("h2",{children:e?e.total_workers:(0,m.jsx)(c.A,{})})]}),(0,m.jsx)("div",{className:"card-icon",children:(0,m.jsx)(p.A,{})})]})})}}const v=(0,h.A)((0,s.connect)((e=>({dashboard:e.employee.profile.dashboard})),(e=>({dispatch:e,actions:(0,d.bindActionCreators)({getDashboardData:l.tO},e)})))(u))}}]);