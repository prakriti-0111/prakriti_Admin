"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3859],{36213:(e,t,s)=>{s.d(t,{A:()=>N});var a=s(49257),r=s(68102),i=s(63696),n=s(68017),o=s(81023),c=s(91785),l=s(28362),d=s(90013),h=s(2512),m=s(46733);function p(e){return(0,m.A)("MuiCircularProgress",e)}(0,s(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var u=s(62540);const x=["className","color","disableShrink","size","style","thickness","value","variant"];let g,v,A,y,j=e=>e;const w=(0,c.i7)(g||(g=j`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),f=(0,c.i7)(v||(v=j`
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
`)),k=(0,h.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant],t[`color${(0,l.A)(s.color)}`]]}})((({ownerState:e,theme:t})=>(0,r.A)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.AH)(A||(A=j`
      animation: ${0} 1.4s linear infinite;
    `),w))),b=(0,h.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),S=(0,h.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.circle,t[`circle${(0,l.A)(s.variant)}`],s.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,r.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.AH)(y||(y=j`
      animation: ${0} 1.4s ease-in-out infinite;
    `),f))),N=i.forwardRef((function(e,t){const s=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:i,color:c="primary",disableShrink:h=!1,size:m=40,style:g,thickness:v=3.6,value:A=0,variant:y="indeterminate"}=s,j=(0,a.A)(s,x),w=(0,r.A)({},s,{color:c,disableShrink:h,size:m,thickness:v,value:A,variant:y}),f=(e=>{const{classes:t,variant:s,color:a,disableShrink:r}=e,i={root:["root",s,`color${(0,l.A)(a)}`],svg:["svg"],circle:["circle",`circle${(0,l.A)(s)}`,r&&"circleDisableShrink"]};return(0,o.A)(i,p,t)})(w),N={},C={},M={};if("determinate"===y){const e=2*Math.PI*((44-v)/2);N.strokeDasharray=e.toFixed(3),M["aria-valuenow"]=Math.round(A),N.strokeDashoffset=`${((100-A)/100*e).toFixed(3)}px`,C.transform="rotate(-90deg)"}return(0,u.jsx)(k,(0,r.A)({className:(0,n.A)(f.root,i),style:(0,r.A)({width:m,height:m},C,g),ownerState:w,ref:t,role:"progressbar"},M,j,{children:(0,u.jsx)(b,{className:f.svg,ownerState:w,viewBox:"22 22 44 44",children:(0,u.jsx)(S,{className:f.circle,style:N,ownerState:w,cx:44,cy:44,r:(44-v)/2,fill:"none",strokeWidth:v})})}))}))},3799:(e,t,s)=>{s.d(t,{A:()=>A});var a=s(49257),r=s(68102),i=s(81023),n=s(68017),o=s(63696),c=(s(66542),s(99216)),l=s(2512),d=s(90013),h=s(1267),m=s(46733);function p(e){return(0,m.A)("MuiImageListItem",e)}const u=(0,s(29009).A)("MuiImageListItem",["root","img","standard","woven","masonry","quilted"]);var x=s(62540);const g=["children","className","cols","component","rows","style"],v=(0,l.Ay)("li",{name:"MuiImageListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[{[`& .${u.img}`]:t.img},t.root,t[s.variant]]}})((({ownerState:e})=>(0,r.A)({display:"block",position:"relative"},"standard"===e.variant&&{display:"flex",flexDirection:"column"},"woven"===e.variant&&{height:"100%",alignSelf:"center","&:nth-of-type(even)":{height:"70%"}},{[`& .${u.img}`]:(0,r.A)({objectFit:"cover",width:"100%",height:"100%",display:"block"},"standard"===e.variant&&{height:"auto",flexGrow:1})}))),A=o.forwardRef((function(e,t){const s=(0,d.A)({props:e,name:"MuiImageListItem"}),{children:l,className:m,cols:u=1,component:A="li",rows:y=1,style:j}=s,w=(0,a.A)(s,g),{rowHeight:f="auto",gap:k,variant:b}=o.useContext(c.A);let S="auto";"woven"===b?S=void 0:"auto"!==f&&(S=f*y+k*(y-1));const N=(0,r.A)({},s,{cols:u,component:A,gap:k,rowHeight:f,rows:y,variant:b}),C=(e=>{const{classes:t,variant:s}=e,a={root:["root",s],img:["img"]};return(0,i.A)(a,p,t)})(N);return(0,x.jsx)(v,(0,r.A)({as:A,className:(0,n.A)(C.root,C[b],m),ref:t,style:(0,r.A)({height:S,gridColumnEnd:"masonry"!==b?`span ${u}`:void 0,gridRowEnd:"masonry"!==b?`span ${y}`:void 0,marginBottom:"masonry"===b?k:void 0},j),ownerState:N},w,{children:o.Children.map(l,(e=>o.isValidElement(e)?"img"===e.type||(0,h.A)(e,["Image"])?o.cloneElement(e,{className:(0,n.A)(C.img,e.props.className)}):e:null))}))}))},39487:(e,t,s)=>{s.d(t,{A:()=>g});var a=s(49257),r=s(68102),i=s(81023),n=s(68017),o=s(63696),c=s(2512),l=s(90013),d=s(46733);function h(e){return(0,d.A)("MuiImageList",e)}(0,s(29009).A)("MuiImageList",["root","masonry","quilted","standard","woven"]);var m=s(99216),p=s(62540);const u=["children","className","cols","component","rowHeight","gap","style","variant"],x=(0,c.Ay)("ul",{name:"MuiImageList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant]]}})((({ownerState:e})=>(0,r.A)({display:"grid",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"},"masonry"===e.variant&&{display:"block"}))),g=o.forwardRef((function(e,t){const s=(0,l.A)({props:e,name:"MuiImageList"}),{children:c,className:d,cols:g=2,component:v="ul",rowHeight:A="auto",gap:y=4,style:j,variant:w="standard"}=s,f=(0,a.A)(s,u),k=o.useMemo((()=>({rowHeight:A,gap:y,variant:w})),[A,y,w]);o.useEffect((()=>{}),[]);const b="masonry"===w?(0,r.A)({columnCount:g,columnGap:y},j):(0,r.A)({gridTemplateColumns:`repeat(${g}, 1fr)`,gap:y},j),S=(0,r.A)({},s,{component:v,gap:y,rowHeight:A,variant:w}),N=(e=>{const{classes:t,variant:s}=e,a={root:["root",s]};return(0,i.A)(a,h,t)})(S);return(0,p.jsx)(x,(0,r.A)({as:v,className:(0,n.A)(N.root,N[w],d),ref:t,style:b,ownerState:S},f,{children:(0,p.jsx)(m.A.Provider,{value:k,children:c})}))}))},99216:(e,t,s)=>{s.d(t,{A:()=>a});const a=s(63696).createContext({})},25917:(e,t,s)=>{s.d(t,{F6:()=>h,Ls:()=>o,ME:()=>n,Qi:()=>m,Rf:()=>p,VH:()=>l,pC:()=>c,xm:()=>d});var a=s(80325),r=s(11275),i=s(45892);const n=e=>(e=(0,i.x0)(e,!0),t=>{a.A.get("/superadmin/stocks".concat(e)).then((e=>{e.data.success&&t({type:r.GX,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{a.A.get("/superadmin/stocks/view/".concat(e)).then((e=>{e.data.success&&t({type:r.$N,payload:e.data.data})})).catch((e=>{}))},c=e=>(e=(0,i.x0)(e,!0),t=>{a.A.get("/superadmin/stocks/products".concat(e)).then((e=>{e.data.success&&t({type:r.XY,payload:e.data.data})})).catch((e=>{}))}),l=e=>(e=(0,i.x0)(e,!0),t=>{a.A.get("/superadmin/stocks/product-details".concat(e)).then((e=>{e.data.success&&t({type:r.xj,payload:e.data.data})})).catch((e=>{}))}),d=async e=>await a.A.post("/superadmin/stocks/check-certificate-exist",e),h=async e=>(e=(0,i.x0)(e,!0),await a.A.get("/superadmin/stocks/stock-price-by-category".concat(e))),m=async e=>(e=(0,i.x0)(e,!0),await a.A.get("/superadmin/cart/checkdetail".concat(e))),p=async e=>await a.A.post("/superadmin/stocks/return-stock/move-to-stock",e)},33859:(e,t,s)=>{s.r(t),s.d(t,{default:()=>b});var a=s(63696),r=s(52821),i=s(45271),n=s(36213),o=s(39487),c=s(3799),l=s(61176),d=s(66098),h=s(50977),m=s(51449),p=s(25917),u=s(88441),x=s(98993),g=s(73947),v=s(10228),A=s(45166),y=s(2598),j=s(25606),w=s(24019),f=s(62540);class k extends a.Component{constructor(e){var t,s;super(e),s=()=>{this.props.actions.stocksView(this.props.params.id)},(t="loadViewData")in this?Object.defineProperty(this,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[t]=s,this.state={stock:this.props.stock},this.existingVideoRef=a.createRef()}componentDidMount(){this.loadViewData(),setTimeout((()=>{var e;this.existingVideoRef&&(null===(e=this.existingVideoRef.current)||void 0===e||e.load())}),2e3)}static getDerivedStateFromProps(e,t){let s={};return e.stock!==t.stock&&(s.stock=e.stock),s}render(){const{stock:e}=this.state;return(0,f.jsx)(d.A,{title:"Stock Details",children:(0,f.jsx)("div",{className:"ratn-dialog-wrapper",children:e?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"single-item-wrapper details-header",children:[(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Product Name: "})," ",(0,f.jsx)("br",{}),e.name]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Product Type: "})," ",(0,f.jsx)("br",{})," ",e.type_diplay]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Category: "})," ",(0,f.jsx)("br",{})," ",e.category]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Sub Category: "}),"  ",(0,f.jsx)("br",{}),e.sub_category]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Licence Number: "})," ",(0,f.jsx)("br",{})," ",e.licence_no]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Certified: "})," ",(0,f.jsx)("br",{})," ",e.certified_display]})}),(0,f.jsx)("div",{className:"single-item",children:(0,f.jsxs)("p",{children:[(0,f.jsx)("span",{children:"Status: "})," ",(0,f.jsx)("br",{})," ",e.status_display]})})]}),(0,f.jsxs)("div",{className:"item-wrapper-images",children:[e.images.length?(0,f.jsx)(o.A,{sx:{width:"100%",height:110},cols:12,rowHeight:110,children:e.images.map(((e,t)=>(0,f.jsx)(c.A,{style:{height:"100px",width:"100px"},children:(0,f.jsx)("div",{style:{position:"relative",width:"100px"},children:(0,f.jsx)("img",{src:e.path,loading:"lazy",style:{height:"100px",width:"100px"}})})},t)))}):null,e.video?(0,f.jsx)(o.A,{sx:{width:"100%",height:150},cols:3,rowHeight:150,children:(0,f.jsx)(c.A,{children:(0,f.jsx)("div",{style:{position:"relative",width:"220px"},children:(0,f.jsx)("video",{width:"200",height:"150",style:{height:"143px",objectFit:"contain"},loop:!0,controls:!0,ref:this.existingVideoRef,children:(0,f.jsx)("source",{src:e.video})})})})}):null]}),(0,f.jsx)(i.Ay,{container:!0,spacing:l.iL,className:"details-header",children:(0,f.jsx)(i.Ay,{item:!0,xs:12,children:(0,f.jsx)(y.A,{component:w.A,className:"ratn-table-wrapper table-wrapper-heading",children:(0,f.jsxs)(x.A,{"aria-label":"collapsible table",children:[(0,f.jsx)(g.A,{className:"ratn-table-header",children:(0,f.jsxs)(j.A,{className:"",children:[(0,f.jsx)(A.A,{children:"Material Name"}),(0,f.jsx)(A.A,{children:"Purity"}),(0,f.jsx)(A.A,{children:"Weight"}),(0,f.jsx)(A.A,{children:"Unit"}),(0,f.jsx)(A.A,{children:"Quantity"})]})}),(0,f.jsx)(v.A,{children:e.stock_materials.map(((e,t)=>(0,f.jsxs)(j.A,{children:[(0,f.jsx)(A.A,{children:e.material_name}),(0,f.jsx)(A.A,{children:e.purity_name}),(0,f.jsx)(A.A,{children:e.weight}),(0,f.jsx)(A.A,{children:e.unit_name}),(0,f.jsx)(A.A,{children:e.quantity})]},t)))})]})})})})]}):(0,f.jsx)(i.Ay,{container:!0,justifyContent:"center",children:(0,f.jsx)(n.A,{})})})})}}const b=(0,m.Gh)((0,h.A)((0,r.connect)((e=>({stock:e.superadmin.stocks.stock})),(e=>({dispatch:e,actions:(0,u.bindActionCreators)({stocksView:p.Ls},e)})))(k)))}}]);