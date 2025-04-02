"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8362],{36213:(e,t,a)=>{a.d(t,{A:()=>C});var s=a(49257),i=a(68102),r=a(63696),n=a(68017),o=a(81023),l=a(91785),d=a(28362),c=a(90013),u=a(2512),h=a(46733);function m(e){return(0,h.A)("MuiCircularProgress",e)}(0,a(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=a(62540);const x=["className","color","disableShrink","size","style","thickness","value","variant"];let g,A,v,y,f=e=>e;const j=(0,l.i7)(g||(g=f`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),b=(0,l.i7)(A||(A=f`
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
`)),_=(0,u.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t[`color${(0,d.A)(a.color)}`]]}})((({ownerState:e,theme:t})=>(0,i.A)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,l.AH)(v||(v=f`
      animation: ${0} 1.4s linear infinite;
    `),j))),S=(0,u.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),w=(0,u.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.circle,t[`circle${(0,d.A)(a.variant)}`],a.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,i.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.AH)(y||(y=f`
      animation: ${0} 1.4s ease-in-out infinite;
    `),b))),C=r.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiCircularProgress"}),{className:r,color:l="primary",disableShrink:u=!1,size:h=40,style:g,thickness:A=3.6,value:v=0,variant:y="indeterminate"}=a,f=(0,s.A)(a,x),j=(0,i.A)({},a,{color:l,disableShrink:u,size:h,thickness:A,value:v,variant:y}),b=(e=>{const{classes:t,variant:a,color:s,disableShrink:i}=e,r={root:["root",a,`color${(0,d.A)(s)}`],svg:["svg"],circle:["circle",`circle${(0,d.A)(a)}`,i&&"circleDisableShrink"]};return(0,o.A)(r,m,t)})(j),C={},k={},N={};if("determinate"===y){const e=2*Math.PI*((44-A)/2);C.strokeDasharray=e.toFixed(3),N["aria-valuenow"]=Math.round(v),C.strokeDashoffset=`${((100-v)/100*e).toFixed(3)}px`,k.transform="rotate(-90deg)"}return(0,p.jsx)(_,(0,i.A)({className:(0,n.A)(b.root,r),style:(0,i.A)({width:h,height:h},k,g),ownerState:j,ref:t,role:"progressbar"},N,f,{children:(0,p.jsx)(S,{className:b.svg,ownerState:j,viewBox:"22 22 44 44",children:(0,p.jsx)(w,{className:b.circle,style:C,ownerState:j,cx:44,cy:44,r:(44-A)/2,fill:"none",strokeWidth:A})})}))}))},3799:(e,t,a)=>{a.d(t,{A:()=>v});var s=a(49257),i=a(68102),r=a(81023),n=a(68017),o=a(63696),l=(a(66542),a(99216)),d=a(2512),c=a(90013),u=a(1267),h=a(46733);function m(e){return(0,h.A)("MuiImageListItem",e)}const p=(0,a(29009).A)("MuiImageListItem",["root","img","standard","woven","masonry","quilted"]);var x=a(62540);const g=["children","className","cols","component","rows","style"],A=(0,d.Ay)("li",{name:"MuiImageListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[{[`& .${p.img}`]:t.img},t.root,t[a.variant]]}})((({ownerState:e})=>(0,i.A)({display:"block",position:"relative"},"standard"===e.variant&&{display:"flex",flexDirection:"column"},"woven"===e.variant&&{height:"100%",alignSelf:"center","&:nth-of-type(even)":{height:"70%"}},{[`& .${p.img}`]:(0,i.A)({objectFit:"cover",width:"100%",height:"100%",display:"block"},"standard"===e.variant&&{height:"auto",flexGrow:1})}))),v=o.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiImageListItem"}),{children:d,className:h,cols:p=1,component:v="li",rows:y=1,style:f}=a,j=(0,s.A)(a,g),{rowHeight:b="auto",gap:_,variant:S}=o.useContext(l.A);let w="auto";"woven"===S?w=void 0:"auto"!==b&&(w=b*y+_*(y-1));const C=(0,i.A)({},a,{cols:p,component:v,gap:_,rowHeight:b,rows:y,variant:S}),k=(e=>{const{classes:t,variant:a}=e,s={root:["root",a],img:["img"]};return(0,r.A)(s,m,t)})(C);return(0,x.jsx)(A,(0,i.A)({as:v,className:(0,n.A)(k.root,k[S],h),ref:t,style:(0,i.A)({height:w,gridColumnEnd:"masonry"!==S?`span ${p}`:void 0,gridRowEnd:"masonry"!==S?`span ${y}`:void 0,marginBottom:"masonry"===S?_:void 0},f),ownerState:C},j,{children:o.Children.map(d,(e=>o.isValidElement(e)?"img"===e.type||(0,u.A)(e,["Image"])?o.cloneElement(e,{className:(0,n.A)(k.img,e.props.className)}):e:null))}))}))},39487:(e,t,a)=>{a.d(t,{A:()=>g});var s=a(49257),i=a(68102),r=a(81023),n=a(68017),o=a(63696),l=a(2512),d=a(90013),c=a(46733);function u(e){return(0,c.A)("MuiImageList",e)}(0,a(29009).A)("MuiImageList",["root","masonry","quilted","standard","woven"]);var h=a(99216),m=a(62540);const p=["children","className","cols","component","rowHeight","gap","style","variant"],x=(0,l.Ay)("ul",{name:"MuiImageList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant]]}})((({ownerState:e})=>(0,i.A)({display:"grid",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"},"masonry"===e.variant&&{display:"block"}))),g=o.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiImageList"}),{children:l,className:c,cols:g=2,component:A="ul",rowHeight:v="auto",gap:y=4,style:f,variant:j="standard"}=a,b=(0,s.A)(a,p),_=o.useMemo((()=>({rowHeight:v,gap:y,variant:j})),[v,y,j]);o.useEffect((()=>{}),[]);const S="masonry"===j?(0,i.A)({columnCount:g,columnGap:y},f):(0,i.A)({gridTemplateColumns:`repeat(${g}, 1fr)`,gap:y},f),w=(0,i.A)({},a,{component:A,gap:y,rowHeight:v,variant:j}),C=(e=>{const{classes:t,variant:a}=e,s={root:["root",a]};return(0,r.A)(s,u,t)})(w);return(0,m.jsx)(x,(0,i.A)({as:A,className:(0,n.A)(C.root,C[j],c),ref:t,style:S,ownerState:w},b,{children:(0,m.jsx)(h.A.Provider,{value:_,children:l})}))}))},99216:(e,t,a)=>{a.d(t,{A:()=>s});const s=a(63696).createContext({})},24143:(e,t,a)=>{a.d(t,{U0:()=>o,YC:()=>l,rY:()=>n});var s=a(80325),i=a(84998),r=a(45892);const n=e=>(e=(0,r.x0)(e,!0),t=>{s.A.get("/distributor/my-orders".concat(e)).then((e=>{e.data.success&&t({type:i.V8,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.get("/distributor/my-orders/fetch/".concat(e)).then((e=>{e.data.success&&t({type:i.bc,payload:e.data.data})})).catch((e=>{}))},l=(e,t)=>s.A.post("/distributor/my-orders/assign/"+e,t)},55028:(e,t,a)=>{a.d(t,{FQ:()=>l,K4:()=>c,TK:()=>o,kW:()=>d,xL:()=>n});var s=a(80325),i=a(26454),r=a(45892);const n=e=>(e=(0,r.x0)(e,!0),t=>{s.A.get("/superadmin/employees".concat(e)).then((e=>{e.data.success&&t({type:i.Do,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/employees/store",e).then((e=>{t({type:i.cy,payload:e.data})})).catch((e=>{}))},l=e=>t=>{s.A.get("/superadmin/employees/fetch/".concat(e,"?role_id=4")).then((e=>{e.data.success&&t({type:i.JN,payload:e.data.data})})).catch((e=>{}))},d=(e,t)=>a=>{s.A.post("/superadmin/employees/update/".concat(e),t).then((e=>{a({type:i.gX,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/employees/delete/".concat(e),t).then((e=>{a({type:i.oo,payload:e.data})})).catch((e=>{}))}},98362:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var s=a(63696),i=a(52821),r=a(49746),n=a(45271),o=a(36213),l=a(36122),d=a(39487),c=a(3799),u=a(61095),h=a(41795),m=a(66107),p=a(26365),x=a(78976),g=a(72839),A=a(61176),v=a(66098),y=a(50977),f=a(51449),j=a(24143),b=a(88441),_=a(45892),S=a(55028),w=a(89429),C=a(52805),k=a(79859),N=a(43191),D=a(27874),I=a(71558),P=a(37001),W=a(62540);function E(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class L extends s.Component{constructor(e){super(e),E(this,"loadViewData",(()=>{this.props.actions.orderView(this.props.params.id)})),E(this,"handleAssign",(()=>{this.setState({openDialog:!0})})),E(this,"handleDialogClose",((e,t)=>{t&&"backdropClick"==t||this.setState({openDialog:!1})})),E(this,"handleFormChange",((e,t)=>{this.setState({formValues:{...this.state.formValues,[t]:e.target.value}})})),E(this,"handleSubmit",(async()=>{if(!this.formValidate()){this.setState({processing:!0});let e=await(0,j.YC)(this.state.order.id,this.state.formValues),t=!1;e.data.success?(this.props.enqueueSnackbar(e.data.message,{variant:"success"}),this.loadViewData()):(this.props.enqueueSnackbar(e.data.message,{variant:"error"}),t=!0),this.setState({processing:!1,openDialog:t})}})),E(this,"formValidate",(()=>{let e=this.state.formValues,t=this.state.formErros,a=!1;return e.user_id?t.user_id=!1:(t.user_id=!0,a=!0),this.setState({formErros:t}),a})),E(this,"handleStatus",(()=>{this.setState({order_status:this.state.order.status,openStatusDialog:!0})})),E(this,"handleStatusDialogClose",((e,t)=>{t&&"backdropClick"==t||this.setState({openStatusDialog:!1})})),E(this,"handleStatusSubmit",(async()=>{this.setState({processing:!0});let e=await(0,I.KM)(this.state.order.id,{status:this.state.order_status}),t=!1;e.data.success?(this.props.enqueueSnackbar(e.data.message,{variant:"success"}),this.loadViewData()):(this.props.enqueueSnackbar(e.data.message,{variant:"error"}),t=!0),this.setState({processing:!1,openStatusDialog:t})})),E(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),E(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={order:this.props.order,auth:this.props.auth,saleExecutiveList:this.props.saleExecutiveList,formValues:{user_id:""},formErros:{user_id:!1},openDialog:!1,processing:!1,order_status:"",openStatusDialog:!1,imagePath:"",imageDialogOpen:!1},this.columns=[{name:"image",display_name:"Image",isImage:!0},{name:"product_name",display_name:"Product Name"},{name:"certificate_no",display_name:"Certificate No",width:"120px"},{name:"total_weight_display",display_name:"Total Wt.",width:"90px"},{name:"stock_material_display",display_name:"Materials Name",width:"165px"},{name:"weight_display",display_name:"Qty"},{name:"unit_display",display_name:"Unit"},{name:"product_code",display_name:"P Code"},{name:"size_name",display_name:"Size"},{name:"quantity",display_name:"Quantity"},{name:"rate",display_name:"Price"}]}componentDidMount(){this.loadViewData(),this.props.actions.salesExecutiveList({all:1,role_id:4})}static getDerivedStateFromProps(e,t){let a={};return e.order!==t.order&&(a.order=e.order),e.auth!==t.auth&&(a.auth=e.auth),e.saleExecutiveList!==t.saleExecutiveList&&(a.saleExecutiveList=e.saleExecutiveList),a}componentDidUpdate(e){e.params.id!=this.props.params.id&&this.loadViewData()}render(){const{order:e}=this.state;return(0,W.jsxs)(v.A,{title:"Order Details",secondary:(0,W.jsx)(r.A,{variant:"contained",onClick:()=>this.props.navigate((0,_.zr)((0,_.mA)(this.state.auth))+"/orders"),children:"Back"}),children:[e?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(n.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Order #",variant:"outlined",fullWidth:!0,value:e.order_no,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Order Date",variant:"outlined",fullWidth:!0,value:e.order_date,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Order From",variant:"outlined",fullWidth:!0,value:e.order_from,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Mobile",variant:"outlined",fullWidth:!0,value:e.mobile,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Total Amount",variant:"outlined",fullWidth:!0,value:e.total_amount,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Paid Amount",variant:"outlined",fullWidth:!0,value:e.paid_amount_display,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Status",variant:"outlined",fullWidth:!0,value:e.status_display,disabled:!0,InputProps:{className:"non_disable_text"},inputProps:{className:"cursor-pointer"},role:"button"})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,W.jsx)(l.A,{label:"Address",variant:"outlined",fullWidth:!0,value:e.formated_address,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(l.A,{label:"Assign To",variant:"outlined",fullWidth:!0,value:e.sale_executive_name,disabled:!0,InputProps:{className:"non_disable_text"}})}),"cancelled"==e.status&&e.cancel_reason?(0,W.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,W.jsx)(l.A,{label:"Cancel Reason",variant:"outlined",fullWidth:!0,value:e.cancel_reason,disabled:!0,InputProps:{className:"non_disable_text"}})}):null,(0,_.Im)(e.notes)?null:(0,W.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,W.jsx)(l.A,{label:"Notes",variant:"outlined",fullWidth:!0,value:e.notes,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,_.Im)(e.image)?null:(0,W.jsx)(n.Ay,{item:!0,xs:6,md:1,className:"create-input",children:(0,W.jsx)(d.A,{children:(0,W.jsx)(c.A,{onClick:()=>this.handleImageClick(e.image),className:"cursor-pointer",children:(0,W.jsx)("img",{src:e.image,srcSet:e.image,loading:"lazy"})})})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,W.jsx)(r.A,{variant:"contained",onClick:this.handleAssign,children:"Assign"})})]}),(0,W.jsx)(n.Ay,{container:!0,spacing:A.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,W.jsxs)(n.Ay,{item:!0,xs:12,className:"p-add-product create-input",children:[(0,W.jsx)("h3",{className:"p_heading_list",children:"Product List"}),(0,W.jsx)(D.A,{columns:this.columns,rows:e.products,page:1,limit:e.products.length,total:e.products.length,havePagination:!1})]})})]}):(0,W.jsx)(n.Ay,{container:!0,justifyContent:"center",children:(0,W.jsx)(o.A,{})}),(0,W.jsxs)(w.A,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"xs",children:[(0,W.jsx)(N.A,{children:"Order Assign"}),(0,W.jsxs)(C.A,{children:[(0,W.jsx)(k.A,{}),(0,W.jsx)(u.A,{sx:{flexGrow:1,m:.5},children:(0,W.jsxs)(n.Ay,{container:!0,spacing:2,children:[(0,W.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,W.jsxs)(h.A,{fullWidth:!0,error:this.state.formErros.user_id,children:[(0,W.jsx)(m.A,{children:"Sale Executive"}),(0,W.jsxs)(p.A,{className:"input-inner",value:this.state.formValues.user_id,fullWidth:!0,label:"Sale Executive",onChange:e=>this.handleFormChange(e,"user_id"),children:[(0,W.jsx)(x.A,{value:""}),this.state.saleExecutiveList.map(((e,t)=>(0,W.jsxs)(x.A,{value:e.id,children:[e.name," | ",e.mobile]},t)))]})]})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,children:(0,W.jsxs)(g.A,{spacing:1,direction:"row",justifyContent:"flex-end",children:[(0,W.jsx)(r.A,{variant:"contained",type:"button",disabled:this.state.processing,onClick:this.handleSubmit,children:this.state.processing?"Processing":"Submit"}),(0,W.jsx)(r.A,{variant:"outlined",onClick:this.handleDialogClose,children:"Cancel"})]})})]})})]})]}),(0,W.jsxs)(w.A,{className:"ratn-dialog-wrapper",open:this.state.openStatusDialog,onClose:this.handleStatusDialogClose,fullWidth:!0,maxWidth:"xs",children:[(0,W.jsx)(N.A,{children:"Order Status"}),(0,W.jsxs)(C.A,{children:[(0,W.jsx)(k.A,{}),(0,W.jsx)(u.A,{sx:{flexGrow:1,m:.5},children:(0,W.jsxs)(n.Ay,{container:!0,spacing:2,children:[(0,W.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,W.jsxs)(h.A,{fullWidth:!0,children:[(0,W.jsx)(m.A,{children:"Order Status"}),(0,W.jsxs)(p.A,{className:"input-inner",value:this.state.order_status,fullWidth:!0,label:"Order Status",onChange:e=>this.setState({order_status:e.target.value}),children:[(0,W.jsx)(x.A,{value:"pending",children:"Pending"}),(0,W.jsx)(x.A,{value:"accepted",children:"Accepted"}),(0,W.jsx)(x.A,{value:"shipped",children:"Shipped"}),(0,W.jsx)(x.A,{value:"out_for_delivery",children:"Out For Delivery"}),(0,W.jsx)(x.A,{value:"delivered",children:"Delivered"}),(0,W.jsx)(x.A,{value:"cancelled",children:"Cancelled"})]})]})}),(0,W.jsx)(n.Ay,{item:!0,xs:12,children:(0,W.jsxs)(g.A,{spacing:1,direction:"row",justifyContent:"flex-end",children:[(0,W.jsx)(r.A,{variant:"contained",type:"button",disabled:this.state.processing||this.state.order&&this.state.order.status==this.state.order_status,onClick:this.handleStatusSubmit,children:this.state.processing?"Processing":"Submit"}),(0,W.jsx)(r.A,{variant:"outlined",onClick:this.handleStatusDialogClose,children:"Cancel"})]})})]})})]})]}),(0,W.jsxs)(w.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,W.jsx)(N.A,{children:(0,W.jsx)(P.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,W.jsx)(C.A,{children:(0,W.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}const M=(0,f.Gh)((0,y.A)((0,i.connect)((e=>({order:e.distributor.orders.order,auth:e.auth,saleExecutiveList:e.superadmin.salesExecutive.items})),(e=>({dispatch:e,actions:(0,b.bindActionCreators)({orderView:j.U0,salesExecutiveList:S.xL},e)})))(L)))}}]);