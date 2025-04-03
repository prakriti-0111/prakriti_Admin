"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4285],{66095:(e,t,a)=>{var s=a(96784);t.A=void 0;var n=s(a(17044)),i=a(62540),r=(0,n.default)((0,i.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");t.A=r},66282:(e,t,a)=>{var s=a(96784);t.A=void 0;var n=s(a(17044)),i=a(62540),r=(0,n.default)((0,i.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");t.A=r},36213:(e,t,a)=>{a.d(t,{A:()=>S});var s=a(49257),n=a(68102),i=a(63696),r=a(68017),l=a(81023),o=a(91785),c=a(28362),d=a(90013),h=a(2512),u=a(46733);function p(e){return(0,u.A)("MuiCircularProgress",e)}(0,a(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=a(62540);const g=["className","color","disableShrink","size","style","thickness","value","variant"];let A,x,j,v,y=e=>e;const b=(0,o.i7)(A||(A=y`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),f=(0,o.i7)(x||(x=y`
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
`)),C=(0,h.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t[`color${(0,c.A)(a.color)}`]]}})((({ownerState:e,theme:t})=>(0,n.A)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,o.AH)(j||(j=y`
      animation: ${0} 1.4s linear infinite;
    `),b))),_=(0,h.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),w=(0,h.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.circle,t[`circle${(0,c.A)(a.variant)}`],a.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,n.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,o.AH)(v||(v=y`
      animation: ${0} 1.4s ease-in-out infinite;
    `),f))),S=i.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:i,color:o="primary",disableShrink:h=!1,size:u=40,style:A,thickness:x=3.6,value:j=0,variant:v="indeterminate"}=a,y=(0,s.A)(a,g),b=(0,n.A)({},a,{color:o,disableShrink:h,size:u,thickness:x,value:j,variant:v}),f=(e=>{const{classes:t,variant:a,color:s,disableShrink:n}=e,i={root:["root",a,`color${(0,c.A)(s)}`],svg:["svg"],circle:["circle",`circle${(0,c.A)(a)}`,n&&"circleDisableShrink"]};return(0,l.A)(i,p,t)})(b),S={},k={},N={};if("determinate"===v){const e=2*Math.PI*((44-x)/2);S.strokeDasharray=e.toFixed(3),N["aria-valuenow"]=Math.round(j),S.strokeDashoffset=`${((100-j)/100*e).toFixed(3)}px`,k.transform="rotate(-90deg)"}return(0,m.jsx)(C,(0,n.A)({className:(0,r.A)(f.root,i),style:(0,n.A)({width:u,height:u},k,A),ownerState:b,ref:t,role:"progressbar"},N,y,{children:(0,m.jsx)(_,{className:f.svg,ownerState:b,viewBox:"22 22 44 44",children:(0,m.jsx)(w,{className:f.circle,style:S,ownerState:b,cx:44,cy:44,r:(44-x)/2,fill:"none",strokeWidth:x})})}))}))},11505:(e,t,a)=>{a.d(t,{A:()=>v});var s=a(49257),n=a(68102),i=a(63696),r=a(68017),l=a(81023),o=a(39195),c=a(2512),d=a(90013),h=a(87034),u=a(28362),p=a(46733);function m(e){return(0,p.A)("MuiIconButton",e)}const g=(0,a(29009).A)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var A=a(62540);const x=["edge","children","className","color","disabled","disableFocusRipple","size"],j=(0,c.Ay)(h.A,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,"default"!==a.color&&t[`color${(0,u.A)(a.color)}`],a.edge&&t[`edge${(0,u.A)(a.edge)}`],t[`size${(0,u.A)(a.size)}`]]}})((({theme:e,ownerState:t})=>(0,n.A)({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,o.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})),(({theme:e,ownerState:t})=>(0,n.A)({},"inherit"===t.color&&{color:"inherit"},"inherit"!==t.color&&"default"!==t.color&&(0,n.A)({color:(e.vars||e).palette[t.color].main},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,o.X4)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),"small"===t.size&&{padding:5,fontSize:e.typography.pxToRem(18)},"large"===t.size&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${g.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}}))),v=i.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiIconButton"}),{edge:i=!1,children:o,className:c,color:h="default",disabled:p=!1,disableFocusRipple:g=!1,size:v="medium"}=a,y=(0,s.A)(a,x),b=(0,n.A)({},a,{edge:i,color:h,disabled:p,disableFocusRipple:g,size:v}),f=(e=>{const{classes:t,disabled:a,color:s,edge:n,size:i}=e,r={root:["root",a&&"disabled","default"!==s&&`color${(0,u.A)(s)}`,n&&`edge${(0,u.A)(n)}`,`size${(0,u.A)(i)}`]};return(0,l.A)(r,m,t)})(b);return(0,A.jsx)(j,(0,n.A)({className:(0,r.A)(f.root,c),centerRipple:!0,focusRipple:!g,disabled:p,ref:t,ownerState:b},y,{children:o}))}))},91875:(e,t,a)=>{a.d(t,{bV:()=>o,jf:()=>l,k$:()=>r,ld:()=>c});var s=a(80325),n=a(84805),i=a(45892);const r=e=>(e=(0,i.x0)(e,!0),t=>{s.A.get("/superadmin/return-sales".concat(e)).then((e=>{e.data.success&&t({type:n.g,payload:e.data.data})})).catch((e=>{}))}),l=e=>t=>{s.A.get("/superadmin/return-sales/view/".concat(e)).then((e=>{e.data.success&&t({type:n.C,payload:e.data.data})})).catch((e=>{}))},o=e=>s.A.get("/superadmin/return-sales/view/".concat(e)),c=(e,t)=>s.A.post("/superadmin/return-sales/update-status/"+e,t)},84285:(e,t,a)=>{a.r(t),a.d(t,{default:()=>$});var s=a(63696),n=a(52821),i=a(36846),r=a(49746),l=a(45271),o=a(36213),c=a(36122),d=a(72839),h=a(11505),u=a(95624),p=a(61095),m=a(66593),g=a(61176),A=a(66098),x=a(50977),j=(a(27874),a(51449)),v=a(91875),y=a(88441),b=a(98993),f=a(73947),C=a(10228),_=a(45166),w=a(2598),S=a(25606),k=a(24019),N=a(66095),D=a(66282),P=a(89429),F=a(52805),R=a(79859),z=a(43191),I=a(29443),V=a(45892),O=a(62540);function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class B extends s.Component{constructor(e){super(e),M(this,"loadViewData",(()=>{this.props.actions.returnSaleView(this.props.params.id)})),M(this,"handleStatusChange",(async e=>{this.setState({status_changing:e,confirmDialog:!0})})),M(this,"handleConfirmSubmit",(async()=>{let e={status:this.state.status_changing},t=await(0,v.ld)(this.props.params.id,e);1==t.data.success?(this.props.enqueueSnackbar(t.data.message,{variant:"success"}),this.setState({confirmDialog:!1}),this.loadViewData(),"complete"==this.state.status_changing&&this.props.navigate((0,V.zr)((0,V.mA)(this.state.auth))+"/purchases/create?return_sale="+this.props.params.id)):this.props.enqueueSnackbar(t.data.message,{variant:"error"})})),M(this,"handleConfirmDialogClose",(()=>{this.setState({confirmDialog:!1})})),this.state={returnSale:this.props.returnSale,confirmDialog:!1,status_changing:"",auth:this.props.auth},this.isSuperAdmin=(0,V.jm)(),this.isAdmin=(0,V.qc)(),this.isDistributor=(0,V.mb)(),this.isSalesExecutive=(0,V.$S)()}componentDidMount(){this.loadViewData()}static getDerivedStateFromProps(e,t){let a={};return e.returnSale!==t.returnSale&&(a.returnSale=e.returnSale),e.auth!==t.auth&&(a.auth=e.auth),a}componentDidUpdate(e){this.props.params.id!=e.params.id&&this.loadViewData()}render(){const{returnSale:e}=this.state;return(0,O.jsxs)(A.A,{title:"Return Sale Details",secondary:(0,O.jsxs)(O.Fragment,{children:[e?(0,O.jsx)(O.Fragment,{children:"pending"==e.status?(0,O.jsx)(i.A,{label:e.status_display,color:"primary",className:"approved_status"}):(0,O.jsx)(O.Fragment,{children:"accepted"==e.status||"declined"!=e.status?(0,O.jsx)(i.A,{label:e.status_display,color:"success",className:"approved_status"}):(0,O.jsx)(i.A,{label:e.status_display,color:"error",className:"approved_status"})})}):null,"  ",(0,O.jsx)(r.A,{variant:"contained",onClick:()=>this.props.navigate(-1),children:"Back"})]}),children:[e?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(l.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Owner",variant:"outlined",fullWidth:!0,value:"".concat(e.user_name,", ").concat(e.user_mobile),disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Invoice Number",variant:"outlined",fullWidth:!0,value:e.invoice_number,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Invoice Date",variant:"outlined",fullWidth:!0,value:e.invoice_date,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Return Date",variant:"outlined",fullWidth:!0,value:e.return_date,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Bill Amount",variant:"outlined",fullWidth:!0,value:e.bill_amount,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,O.jsx)(c.A,{label:"Total Return",variant:"outlined",fullWidth:!0,value:e.return_amount,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:9,className:"create-input"}),(0,O.jsx)(l.Ay,{item:!0,xs:12,md:3,className:"create-input",children:(0,O.jsx)("div",{className:"sale-view-button",children:this.isSalesExecutive||this.isDistributor?(0,O.jsx)(O.Fragment,{children:"pending"==e.status?(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("send_to_superadmin"),children:"Send to Superadmin"}):(0,O.jsx)(O.Fragment,{children:"superadmin_declined"==e.status?(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("declined_accept"),children:"Declined Accept"}):(0,O.jsx)(O.Fragment,{children:"declined_accept"==e.status?(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("send_to_customer"),children:"Send to Customer"}):null})})}):(0,O.jsx)(O.Fragment,{children:this.isSuperAdmin?(0,O.jsx)(O.Fragment,{children:e.from_retailer_customer?(0,O.jsx)(O.Fragment,{children:"send_to_superadmin"==e.status?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("superadmin_accepted"),children:"Accept"}),(0,O.jsx)(r.A,{variant:"contained",className:"danger decline",onClick:()=>this.handleStatusChange("superadmin_declined"),children:"Decline"})]}):(0,O.jsx)(O.Fragment,{children:"superadmin_accepted"==e.status?(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("complete"),children:"Purchase"}):null})}):(0,O.jsx)(O.Fragment,{children:"pending"==e.status?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("accepted"),children:"Accept"}),(0,O.jsx)(r.A,{variant:"contained",className:"danger decline",onClick:()=>this.handleStatusChange("declined"),children:"Decline"})]}):null})}):(0,O.jsx)(O.Fragment,{children:"pending"==e.status?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(r.A,{variant:"contained",className:"primary accept",onClick:()=>this.handleStatusChange("accepted"),children:"Accept"}),(0,O.jsx)(r.A,{variant:"contained",className:"danger decline",onClick:()=>this.handleStatusChange("declined"),children:"Decline"})]}):null})})})})]}),(0,O.jsx)(l.Ay,{container:!0,spacing:g.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,O.jsxs)(l.Ay,{item:!0,xs:12,className:"p-add-product create-input",children:[(0,O.jsx)("h3",{className:"p_heading_list",children:"Return Products"}),(0,O.jsx)(w.A,{component:k.A,children:(0,O.jsx)("div",{className:"ratn-table-purchase-wrapper",children:(0,O.jsxs)(b.A,{"aria-label":"collapsible table",children:[(0,O.jsx)(f.A,{className:"ratn-table-header",children:(0,O.jsxs)(S.A,{children:[(0,O.jsx)(_.A,{}),(0,O.jsx)(_.A,{children:"#"}),(0,O.jsx)(_.A,{children:"Product Name"}),(0,O.jsx)(_.A,{children:"Category Name"}),(0,O.jsx)(_.A,{children:"Certificate Number"}),(0,O.jsx)(_.A,{children:"Size"}),(0,O.jsx)(_.A,{children:"Amount"})]})}),(0,O.jsx)(C.A,{children:e.products.map(((e,t)=>(0,O.jsx)(W,{row:e,index:t},t)))})]})})})]})})]}):(0,O.jsx)(l.Ay,{container:!0,justifyContent:"center",children:(0,O.jsx)(o.A,{})}),(0,O.jsxs)(P.A,{open:this.state.confirmDialog,onClose:this.handleConfirmDialogClose,fullWidth:!0,maxWidth:"xs",className:"ratn-dialog-wrapper",children:[(0,O.jsx)(z.A,{children:(0,V.sK)(this.state.status_changing.split("_").join(" "))}),(0,O.jsx)(F.A,{children:e?(0,O.jsx)(R.A,{id:"alert-dialog-slide-description",children:"accepted"==this.state.status_changing?"Are you sure want to accept this return? Request ".concat(e.return_amount_from_wallet," amount to ").concat(e.payment_type," by payment mode ").concat(e.return_payment_mode,"."):(0,O.jsx)(O.Fragment,{children:"declined"==this.state.status_changing?"Are you sure want to decline this return? Request ".concat(e.return_amount_from_wallet," amount to ").concat(e.payment_type,"."):"Are you sure want to ".concat((0,V.sK)(this.state.status_changing.split("_").join(" "))," this return?")})}):null}),(0,O.jsx)(I.A,{children:(0,O.jsxs)(d.A,{spacing:2,direction:"row",justifyContent:"flex-end",children:[(0,O.jsx)(r.A,{variant:"outlined",onClick:this.handleConfirmDialogClose,children:"Cancel"}),(0,O.jsx)(r.A,{variant:"contained",type:"button",onClick:this.handleConfirmSubmit,children:"Yes, Confirm"})]})})]})]})}}const $=(0,j.Gh)((0,x.A)((0,n.connect)((e=>({returnSale:e.superadmin.returnSale.returnSale,auth:e.auth})),(e=>({dispatch:e,actions:(0,y.bindActionCreators)({returnSaleView:v.jf},e)})))(B)));function W(e){const{row:t,index:a}=e,[n,i]=s.useState(!1),r=a+1,l=r%2==0?"even":"odd";return(0,O.jsxs)(s.Fragment,{children:[(0,O.jsxs)(S.A,{sx:{"& > *":{borderBottom:"unset"}},className:l,children:[(0,O.jsx)(_.A,{children:(0,O.jsx)(h.A,{"aria-label":"expand row",size:"small",onClick:()=>i(!n),children:n?(0,O.jsx)(D.A,{}):(0,O.jsx)(N.A,{})})}),(0,O.jsx)(_.A,{component:"th",scope:"row",children:r<=9?"0"+r:r}),(0,O.jsx)(_.A,{component:"th",scope:"row",children:t.product_name}),(0,O.jsx)(_.A,{children:t.category_name}),(0,O.jsx)(_.A,{children:t.certificate_no}),(0,O.jsx)(_.A,{children:t.size_name}),(0,O.jsx)(_.A,{children:t.sub_total})]}),(0,O.jsx)(S.A,{className:"table-inner-row sub_table "+l,children:(0,O.jsx)(_.A,{style:{paddingBottom:0,paddingTop:0},colSpan:11,children:(0,O.jsx)(u.A,{in:n,timeout:"auto",unmountOnExit:!0,children:(0,O.jsxs)(p.A,{sx:{margin:1},children:[(0,O.jsx)(m.A,{variant:"h6",gutterBottom:!0,component:"div"}),(0,O.jsxs)(b.A,{size:"medium","aria-label":"purchases",children:[(0,O.jsx)(f.A,{children:(0,O.jsxs)(S.A,{className:"pur-details-inner-table",children:[(0,O.jsx)(_.A,{children:"Material Name"}),(0,O.jsx)(_.A,{children:"Purity"}),(0,O.jsx)(_.A,{children:"Quantity"}),(0,O.jsx)(_.A,{children:"Weight"}),(0,O.jsx)(_.A,{children:"Unit"})]})}),(0,O.jsx)(C.A,{className:"pur-details-table-body",children:t.materials.map(((e,t)=>(0,O.jsxs)(S.A,{children:[(0,O.jsx)(_.A,{component:"th",scope:"row",children:e.material_name}),(0,O.jsx)(_.A,{children:e.purity_name}),(0,O.jsx)(_.A,{children:e.quantity}),(0,O.jsx)(_.A,{children:e.weight}),(0,O.jsx)(_.A,{children:e.unit_name})]},t)))})]})]})})})})]})}},27874:(e,t,a)=>{a.d(t,{A:()=>q});var s=a(63696),n=a(36846),i=a(46133),r=a(72839),l=a(49746),o=a(45271),c=a(41795),d=a(26365),h=a(78976),u=a(2626),p=a(98993),m=a(73947),g=a(10228),A=a(45166),x=a(2598),j=a(55186),v=a(25606),y=a(24019),b=a(62688),f=a.n(b),C=a(89429),_=a(29443),w=a(52805),S=a(79859),k=a(43191),N=a(45892),D=a(16638),P=a(97217),F=a(60669),R=a(86074),z=a(35008),I=a(78061),V=a(81117),O=a(51223),M=a(37001),B=a(37086),$=a(55063),W=a(71086),H=a(62540);function L(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class T extends s.Component{constructor(e){super(e),L(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),L(this,"getArrayComponent",((e,t)=>(0,H.jsx)(H.Fragment,{children:e.map(((e,a)=>(0,H.jsxs)(s.Fragment,{children:[e,!1!==t?(0,H.jsx)(H.Fragment,{children:" "}):""]},a)))}))),L(this,"getData",(e=>{let t=[];for(let a of this.state.columns){let s=a.name in e?e[a.name]:"";if(Array.isArray(s))if("show_tag"in a){let e=[];for(let t=0;t<s.length;t++)e.push((0,H.jsx)(n.A,{label:s[t][a.array_key],color:"primary"}));s=this.getArrayComponent(e)}else{let e=[];if("array_key"in a){for(let t=0;t<s.length;t++)e.push(s[t][a.array_key]);s=e}s=(0,N.Gp)(s.join("\n"))}else{if("show_tag"in a){let t="primary";if("color_conditions"in a){for(let s=0;s<a.color_conditions.length;s++)if(a.color_conditions[s].value==e[a.color_conditions[s].key]){t=a.color_conditions[s].color;break}}else"Status"==a.display_name&&(t=(0,N.qY)(s));if(s=s?(0,H.jsx)(n.A,{label:s,color:t}):"","showAttendenceAddress"in a&&a.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),s=[s].concat(t),s=this.getArrayComponent(s,!1)}if("redirectToMap"in a&&a.redirectToMap){let t=[(0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:s})];s=this.getArrayComponent(t,!1)}}"isBold"in a&&a.isBold&&(s=this.getArrayComponent([(0,H.jsx)("b",{children:s})]))}if("isImage"in a&&a.isImage){let e={width:"isBanner"in a&&a.isBanner?"200px":"60px"};"isBanner"in a&&a.isBanner||(e.height="40px"),t.push((0,H.jsx)("img",{src:s,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(s)}))}else if("isRating"in a&&a.isRating)t.push((0,H.jsx)(i.A,{name:"read-only",value:s,readOnly:!0}));else{let n="";if("class_conditions"in a)for(let t=0;t<a.class_conditions.length;t++)if(a.class_conditions[t].value==e[a.class_conditions[t].key]){n=a.class_conditions[t].class_name;break}"isHtml"in a&&a.isHtml&&(s=this.getArrayComponent([(0,H.jsx)("span",{dangerouslySetInnerHTML:{__html:s}})])),n&&(s=this.getArrayComponent([(0,H.jsx)("span",{className:n,children:s})])),t.push(s)}}return t})),L(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,H.jsx)(P.A,{});case"Delete":return(0,H.jsx)(D.A,{});case"View":return(0,H.jsx)(F.A,{});case"+":return(0,H.jsx)(R.A,{});case"Download":return(0,H.jsx)(z.A,{});case"green_tick":return(0,H.jsx)(I.A,{});case"Accept":return(0,H.jsx)(V.A,{});case"Decline":return(0,H.jsx)(O.A,{});case"Close":return(0,H.jsx)(M.A,{});case"Return":return(0,H.jsx)(B.A,{});case"Assign":return(0,H.jsx)($.A,{});case"Permissions":return(0,H.jsx)(W.A,{})}})),L(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),L(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),L(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),L(this,"checkActionBtnCondtion",((e,t)=>{let a=[];for(let s=0;s<e.length;s++)"con_type"in e[s]?t[e[s].key]!=e[s].value&&a.push(!0):t[e[s].key]==e[s].value&&a.push(!0);return a.length==e.length})),L(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),L(this,"getActionValueStyle",(e=>{let t="";for(let a=0;a<this.state.actionValueColorConditions.length;a++)if(this.state.actionValueColorConditions[a].value==e){t=this.state.actionValueColorConditions[a].color;break}return t?{color:t}:{}})),L(this,"getSerialNo",((e,t,a)=>{let s=(t-1)*a+e+1;return s<10?"0"+s:s})),L(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),L(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),L(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let a={};return e.rows!==t.rows&&(a.rows=e.rows),e.page!==t.page&&(a.page=e.page),e.total!==t.total&&(a.total=e.total),e.actions!==t.actions&&(a.actions=e.actions),a}render(){const{rows:e,columnAlign:t,rowAlign:a,total:n,limit:i,page:b,columns:f,actions:N,havePagination:D,haveAllOption:P,showAll:F,stickyHeader:R}=this.state,z=F?1:Math.ceil(n/i);return(0,H.jsxs)(x.A,{component:y.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,H.jsxs)(p.A,{sx:{minWidth:500},stickyHeader:R,children:[(0,H.jsx)(m.A,{className:"ratn-table-header",children:(0,H.jsxs)(v.A,{children:[this.state.showSerialNo?(0,H.jsx)(A.A,{align:t,children:"#"}):null,f.map(((e,a)=>(0,H.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,H.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},a))),N.length||""!=this.state.actionValue?(0,H.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,H.jsxs)(g.A,{children:[e.map(((e,t)=>(0,H.jsxs)(v.A,{children:[this.state.showSerialNo?(0,H.jsx)(A.A,{align:a,children:this.getSerialNo(t,b,i)}):null,this.getData(e).map(((e,s)=>(0,H.jsx)(A.A,{align:a,children:e},t+s))),N.length||""!=this.state.actionValue?(0,H.jsxs)(A.A,{align:a,className:"action_btn",children:[N.length?(0,H.jsx)(r.A,{spacing:1,direction:"row",justifyContent:a,alignItems:a,children:N.map(((t,a)=>(0,H.jsx)(s.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,H.jsx)(l.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+a)},a)))}):null,""!=this.state.actionValue?(0,H.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,H.jsx)(v.A,{children:(0,H.jsx)(A.A,{align:"center",colSpan:f.length+N.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,H.jsx)(j.A,{children:(0,H.jsx)(v.A,{})})]}),n>0&&D?(0,H.jsxs)(o.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[P?(0,H.jsx)(o.Ay,{item:!0,xs:2,children:(0,H.jsx)(c.A,{size:"small",children:(0,H.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,H.jsx)(h.A,{value:i,children:i}),(0,H.jsx)(h.A,{value:"all",children:"All"})]})})}):null,(0,H.jsx)(o.Ay,{item:!0,xs:P?10:12,children:(0,H.jsx)(u.A,{count:z,page:b,onChange:this.handleChangePage})})]}):null,(0,H.jsxs)(C.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,H.jsx)(k.A,{children:"Delete"}),(0,H.jsx)(w.A,{children:(0,H.jsx)(S.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,H.jsx)(_.A,{children:(0,H.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,H.jsx)(l.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,H.jsx)(l.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,H.jsxs)(C.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,H.jsx)(k.A,{children:(0,H.jsx)(M.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,H.jsx)(w.A,{children:(0,H.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}T.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},T.propTypes={minWidth:f().number,columns:f().array,actionValueColorConditions:f().array,rows:f().array,page:f().number,limit:f().number,total:f().number,columnAlign:f().string,actionValue:f().string,rowAlign:f().string,haveAction:f().bool,actions:f().array,havePagination:f().bool,showSerialNo:f().bool,loading:f().bool,stickyHeader:f().bool};const q=T}}]);