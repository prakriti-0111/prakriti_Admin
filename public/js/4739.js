"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4739],{36213:(e,a,t)=>{t.d(a,{A:()=>S});var s=t(49257),i=t(68102),n=t(63696),r=t(68017),o=t(81023),l=t(91785),c=t(28362),d=t(90013),h=t(2512),p=t(46733);function u(e){return(0,p.A)("MuiCircularProgress",e)}(0,t(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(62540);const y=["className","color","disableShrink","size","style","thickness","value","variant"];let x,A,g,_,v=e=>e;const j=(0,l.i7)(x||(x=v`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),b=(0,l.i7)(A||(A=v`
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
`)),f=(0,h.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,a[t.variant],a[`color${(0,c.A)(t.color)}`]]}})((({ownerState:e,theme:a})=>(0,i.A)({display:"inline-block"},"determinate"===e.variant&&{transition:a.transitions.create("transform")},"inherit"!==e.color&&{color:(a.vars||a).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,l.AH)(g||(g=v`
      animation: ${0} 1.4s linear infinite;
    `),j))),k=(0,h.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,a)=>a.svg})({display:"block"}),P=(0,h.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.circle,a[`circle${(0,c.A)(t.variant)}`],t.disableShrink&&a.circleDisableShrink]}})((({ownerState:e,theme:a})=>(0,i.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.AH)(_||(_=v`
      animation: ${0} 1.4s ease-in-out infinite;
    `),b))),S=n.forwardRef((function(e,a){const t=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:n,color:l="primary",disableShrink:h=!1,size:p=40,style:x,thickness:A=3.6,value:g=0,variant:_="indeterminate"}=t,v=(0,s.A)(t,y),j=(0,i.A)({},t,{color:l,disableShrink:h,size:p,thickness:A,value:g,variant:_}),b=(e=>{const{classes:a,variant:t,color:s,disableShrink:i}=e,n={root:["root",t,`color${(0,c.A)(s)}`],svg:["svg"],circle:["circle",`circle${(0,c.A)(t)}`,i&&"circleDisableShrink"]};return(0,o.A)(n,u,a)})(j),S={},C={},N={};if("determinate"===_){const e=2*Math.PI*((44-A)/2);S.strokeDasharray=e.toFixed(3),N["aria-valuenow"]=Math.round(g),S.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,C.transform="rotate(-90deg)"}return(0,m.jsx)(f,(0,i.A)({className:(0,r.A)(b.root,n),style:(0,i.A)({width:p,height:p},C,x),ownerState:j,ref:a,role:"progressbar"},N,v,{children:(0,m.jsx)(k,{className:b.svg,ownerState:j,viewBox:"22 22 44 44",children:(0,m.jsx)(P,{className:b.circle,style:S,ownerState:j,cx:44,cy:44,r:(44-A)/2,fill:"none",strokeWidth:A})})}))}))},45862:(e,a,t)=>{t.d(a,{Px:()=>o,gN:()=>l,jv:()=>r,k0:()=>c});var s=t(80325),i=t(47092),n=t(45892);const r=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/categories".concat(e)).then((e=>{e.data.success&&a({type:i.YE,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{s.A.post("/superadmin/categories/store",e).then((e=>{a({type:i.tU,payload:e.data})})).catch((e=>{}))},l=(e,a)=>t=>{s.A.post("/superadmin/categories/update/".concat(e),a).then((e=>{t({type:i.x4,payload:e.data})})).catch((e=>{}))},c=(e,a)=>t=>{s.A.delete("/superadmin/categories/delete/".concat(e),a).then((e=>{t({type:i.RD,payload:e.data})})).catch((e=>{}))}},87903:(e,a,t)=>{t.d(a,{FD:()=>c,IU:()=>r,Lv:()=>d,QM:()=>l,ed:()=>o});var s=t(80325),i=t(59017),n=t(45892);const r=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/distributors".concat(e)).then((e=>{e.data.success&&a({type:i.wq,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{s.A.post("/superadmin/distributors/store",e).then((e=>{a({type:i.PF,payload:e.data})})).catch((e=>{}))},l=e=>a=>{s.A.get("/superadmin/distributors/fetch/".concat(e)).then((e=>{e.data.success&&a({type:i.o_,payload:e.data.data})})).catch((e=>{}))},c=(e,a)=>t=>{s.A.post("/superadmin/distributors/update/".concat(e),a).then((e=>{t({type:i.fC,payload:e.data})})).catch((e=>{}))},d=(e,a)=>t=>{s.A.delete("/superadmin/distributors/delete/".concat(e),a).then((e=>{t({type:i.bt,payload:e.data})})).catch((e=>{}))}},71475:(e,a,t)=>{t.d(a,{E$:()=>n,b9:()=>r,ec:()=>o,kY:()=>d,qO:()=>c,tO:()=>l});var s=t(80325),i=t(29941);const n=()=>s.A.get("/superadmin/profile"),r=e=>a=>{s.A.post("/superadmin/edit-profile",e).then((e=>{a({type:i.bW,payload:e.data})})).catch((e=>{}))},o=e=>a=>{s.A.post("/superadmin/change-password",e).then((e=>{a({type:i.P8,payload:e.data})})).catch((e=>{}))},l=e=>e=>{s.A.get("/superadmin/dashboard").then((a=>{e({type:i.WG,payload:a.data.data})})).catch((e=>{}))},c=e=>e=>{s.A.get("/superadmin/auto-notifications").then((e=>{})).catch((e=>{}))},d=e=>s.A.get("/superadmin/next-user-name?role=".concat(e))},26118:(e,a,t)=>{t.d(a,{Ox:()=>h,SI:()=>y,Uf:()=>p,Z$:()=>r,Zi:()=>c,_B:()=>A,il:()=>x,kA:()=>l,qn:()=>u,sd:()=>m,wp:()=>o,zK:()=>d});var s=t(80325),i=t(68212),n=t(45892);const r=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/sales".concat(e)).then((e=>{e.data.success&&a({type:i.go,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{s.A.post("/superadmin/sales/store",e).then((e=>{a({type:i.x3,payload:e.data})})).catch((e=>{}))},l=e=>a=>{s.A.get("/superadmin/sales/view/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&a({type:i.gN,payload:e.data.data})})).catch((e=>{}))},c=(e,a)=>s.A.post("/superadmin/sales-on-approve/status/".concat(e),a),d=e=>a=>{s.A.get("/superadmin/sales/edit/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&a({type:i.gN,payload:e.data.data})})).catch((e=>{}))},h=(e,a)=>t=>{s.A.post("/superadmin/sales/update/".concat(e),a).then((e=>{t({type:i.hF,payload:e.data})})).catch((e=>{}))},p=(e,a)=>t=>{s.A.delete("/superadmin/sales/delete/".concat(e),a).then((e=>{t({type:i.VW,payload:e.data})})).catch((e=>{}))},u=e=>s.A.post("/superadmin/sales/download-invoice/".concat(e)),m=e=>s.A.get("/superadmin/sales/view/".concat(e)),y=(e,a)=>s.A.post("/superadmin/sales/return/".concat(e),a),x=e=>s.A.post("/superadmin/sales/return-stock-transfer",e),A=e=>(e=(0,n.x0)(e,!0),s.A.get("/superadmin/sales-products".concat(e)))},25917:(e,a,t)=>{t.d(a,{F6:()=>h,Ls:()=>o,ME:()=>r,Qi:()=>p,Rf:()=>u,VH:()=>c,pC:()=>l,xm:()=>d});var s=t(80325),i=t(11275),n=t(45892);const r=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/stocks".concat(e)).then((e=>{e.data.success&&a({type:i.GX,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{s.A.get("/superadmin/stocks/view/".concat(e)).then((e=>{e.data.success&&a({type:i.$N,payload:e.data.data})})).catch((e=>{}))},l=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/stocks/products".concat(e)).then((e=>{e.data.success&&a({type:i.XY,payload:e.data.data})})).catch((e=>{}))}),c=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/stocks/product-details".concat(e)).then((e=>{e.data.success&&a({type:i.xj,payload:e.data.data})})).catch((e=>{}))}),d=async e=>await s.A.post("/superadmin/stocks/check-certificate-exist",e),h=async e=>(e=(0,n.x0)(e,!0),await s.A.get("/superadmin/stocks/stock-price-by-category".concat(e))),p=async e=>(e=(0,n.x0)(e,!0),await s.A.get("/superadmin/cart/checkdetail".concat(e))),u=async e=>await s.A.post("/superadmin/stocks/return-stock/move-to-stock",e)},12027:(e,a,t)=>{t.d(a,{G4:()=>l,KL:()=>c,RG:()=>d,x6:()=>o,xi:()=>r});var s=t(80325),i=t(55250),n=t(45892);const r=e=>(e=(0,n.x0)(e,!0),a=>{s.A.get("/superadmin/sub-categories".concat(e)).then((e=>{e.data.success&&a({type:i.po,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{s.A.post("/superadmin/sub-categories/store",e).then((e=>{a({type:i.qP,payload:e.data})})).catch((e=>{}))},l=(e,a)=>t=>{s.A.post("/superadmin/sub-categories/update/".concat(e),a).then((e=>{t({type:i.qz,payload:e.data})})).catch((e=>{}))},c=(e,a)=>t=>{s.A.delete("/superadmin/sub-categories/delete/".concat(e),a).then((e=>{t({type:i.wn,payload:e.data})})).catch((e=>{}))},d=e=>(e=(0,n.x0)(e,!0),s.A.get("/superadmin/sub-categories".concat(e)))},64739:(e,a,t)=>{t.r(a),t.d(a,{default:()=>oe});var s=t(63696),i=t(52821),n=t(49746),r=t(45271),o=t(36213),l=t(61095),c=t(36122),d=t(13007),h=t(3577),p=t(44748),u=t(66593),m=t(41795),y=t(66107),x=t(26365),A=t(78976),g=t(69945),_=t(11505),v=t(2626),j=t(65469),b=t(72839),f=t(61176),k=t(66098),P=t(50977),S=t(27874),C=t(51449),N=t(88441),w=t(98993),D=t(73947),M=t(10228),I=t(45166),q=t(2598),V=t(25606),F=t(24019),W=t(60669),Q=t(15164),L=t(79731),R=t(37046),$=t(42689),T=t.n($),Y=t(89429),z=t(52805),B=t(79859),E=t(43191),G=t(45892),O=t(43303),U=t(78342),H=t(26118),K=t(35008),Z=t(27893),X=t(87903),J=t(30069),ee=t(71475),ae=t(25917),te=t(12027),se=t(45862),ie=t(62540);function ne(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}class re extends s.Component{constructor(e){super(e),ne(this,"loadAllData",(()=>{this.loadViewData(),this.loadSalesData(),this.loadProfile(),this.loadStockData(),this.loadPriceByCategory(),this.props.actions.categoryList({all:1})})),ne(this,"loadProfile",(()=>{(0,ee.E$)().then((e=>{e.data.success&&this.setState({profile:e.data.data})}))})),ne(this,"loadViewData",(()=>{this.props.actions.distributorFetch(this.props.params.id)})),ne(this,"loadSalesData",(()=>{let e={...this.state.queryParams};e.user_id=this.props.params.id,this.props.actions.salesList(e)})),ne(this,"loadStockData",(()=>{this.props.actions.stocksList({...this.state.stockQueryParams,user_id:this.props.params.id})})),ne(this,"loadPriceByCategory",(async()=>{let e=await(0,ae.F6)({user_id:this.props.params.id});e.data.success&&this.setState({price_by_categories:e.data.data})})),ne(this,"handlePagination",((e,a)=>{this.setState({queryParams:{...this.state.queryParams,page:a}},(()=>{this.loadPurchaseData()}))})),ne(this,"handleInvoiceView",(e=>{this.props.navigate((0,G.zr)((0,G.mA)(this.state.auth))+"/sales/view/"+e.id)})),ne(this,"handleInvoiceDownload",(async e=>{let a=await(0,H.qn)(e.id);a.data.success&&window.open(a.data.data.url,"_blank").focus()})),ne(this,"handleInvoicePay",(e=>{this.setState({pay_by_invoice:e,openDialog:!0,...this.defaultFormValues()})})),ne(this,"handlePayNow",(()=>{this.setState({openDialog:!0,pay_by_invoice:null,...this.defaultFormValues()})})),ne(this,"handleDialogClose",((e,a)=>{a&&"backdropClick"==a||this.setState({openDialog:!1})})),ne(this,"updateFormValue",((e,a)=>{this.setState({formValues:{...this.state.formValues,[a]:e}})})),ne(this,"defaultFormValues",(()=>({formValues:{user_id:"",payment_mode:"",payment_date:T()().format("MM/DD/YYYY"),amount:"",notes:"",cheque_no:"",txn_id:"",table_type:"sale",payment_type:"invoice"},formErros:{user_id:!1,payment_mode:!1,payment_date:!1,amount:!1,notes:!1,cheque_no:!1,txn_id:!1}}))),ne(this,"handleSubmit",(()=>{if(!this.formValidate()){this.setState({processing:!0});let e={...this.state.formValues,user_id:this.props.params.id};this.state.pay_by_invoice&&(e.table_id=this.state.pay_by_invoice.id),this.props.actions.paymentStore(e)}})),ne(this,"formValidate",(()=>{let e=this.state.formValues,a=this.state.formErros,t=!1;return(0,G.Im)(e.amount)?(a.amount=!0,t=!0):a.amount=!1,(0,G.Im)(e.payment_mode)?(a.payment_mode=!0,t=!0):a.payment_mode=!1,(0,G.Im)(e.payment_date)?(a.payment_date=!0,t=!0):a.payment_date=!1,this.setState({formErros:a}),t})),ne(this,"handleSearch",(()=>{this.setState({queryParams:{...this.state.queryParams,page:1}},(()=>{this.loadPurchaseData()}))})),ne(this,"handleStockPagination",((e,a)=>{this.setState({stockQueryParams:{...this.state.stockQueryParams,page:e,all:a?1:0}},(()=>{this.loadStockData()}))})),ne(this,"handleCategoryChange",(e=>{let a=e.target.value;this.props.actions.subCategoryList({all:1,category_id:a}),this.setState({stockQueryParams:{...this.state.stockQueryParams,category_id:a}})})),ne(this,"handleSubCategoryChange",(e=>{this.setState({stockQueryParams:{...this.state.stockQueryParams,sub_category_id:e.target.value}})})),ne(this,"handleSearchChange",(e=>{this.setState({stockQueryParams:{...this.state.stockQueryParams,search:e.target.value}})})),ne(this,"handleStockSearch",(()=>{this.loadStockData()})),ne(this,"handleCardClick",(e=>{this.props.actions.subCategoryList({all:1,category_id:e}),this.setState({stockQueryParams:{...this.state.stockQueryParams,category_id:e}},(()=>{this.handleStockSearch()}))})),this.state={auth:this.props.auth,item:this.props.item,queryParams:{page:1,limit:50,search:""},sales:this.props.sales,total:this.props.total,openDialog:!1,...this.defaultFormValues(),actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,processing:!1,pay_by_invoice:null,profile:null,stock_items:this.props.stock_items,stock_total:this.props.stock_total,stockQueryParams:{page:1,limit:50,category_id:"",sub_category_id:"",search:"",all:0},categories:this.props.categories,sub_categories:this.props.sub_categories,price_by_categories:[]},this.columns=[{name:"invoice_number",display_name:"Invoice Number"},{name:"invoice_date",display_name:"Invoice Date"},{name:"total_payable",display_name:"Total Amount"},{name:"paid_amount",display_name:"Paid Amount"},{name:"due_amount_display",display_name:"Due Amount"},{name:"status_display",display_name:"Status"}]}componentDidMount(){this.loadAllData()}static getDerivedStateFromProps(e,a){let t={};return e.item!==a.item&&(t.item=e.item),e.sales!==a.sales&&(t.sales=e.sales),e.total!==a.total&&(t.total=e.total),e.actionCalled!==a.actionCalled&&(t.actionCalled=e.actionCalled),e.createSuccess!==a.createSuccess&&(t.createSuccess=e.createSuccess),e.successMessage!==a.successMessage&&(t.successMessage=e.successMessage),e.errorMessage!==a.errorMessage&&(t.errorMessage=e.errorMessage),e.auth!==a.auth&&(t.auth=e.auth),e.stock_items!==a.stock_items&&(t.stock_items=e.stock_items),e.stock_total!==a.stock_total&&(t.stock_total=e.stock_total),e.categories!==a.categories&&(t.categories=e.categories),e.sub_categories!==a.sub_categories&&(t.sub_categories=e.sub_categories),t}componentDidUpdate(e){e.params.id!=this.props.params.id&&(this.loadViewData(),this.loadSalesData(),this.loadStockData(),this.loadPriceByCategory()),this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({processing:!1,openDialog:!1,queryParams:{...this.state.queryParams,page:1},...this.defaultFormValues()}),this.loadAllData(),this.props.actions.getNotifiactions()):(this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.setState({processing:!1})),this.props.dispatch({type:U.Kl}))}render(){const e=this.state.item,{formValues:a,formErros:t}=this.state,s=Math.ceil(this.state.total/this.state.queryParams.limit);return(0,ie.jsxs)(k.A,{title:"Distributor Details",secondary:(0,ie.jsx)(n.A,{variant:"contained",onClick:()=>this.props.navigate(-1),children:"Back"}),children:[e?(0,ie.jsxs)(ie.Fragment,{children:[(0,ie.jsx)(l.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-wrapper",children:(0,ie.jsx)("div",{autoComplete:"off",className:"ratn-dialog-inner",children:(0,ie.jsxs)(r.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Company Name",variant:"outlined",fullWidth:!0,value:e.company_name,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Owner Name",variant:"outlined",fullWidth:!0,value:e.name,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"GST Number",variant:"outlined",fullWidth:!0,value:e.gst,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"City",variant:"outlined",fullWidth:!0,value:e.city,disabled:!0,InputProps:{className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Total Amount",variant:"outlined",fullWidth:!0,value:e.total_amount,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Total Payable",variant:"outlined",fullWidth:!0,value:e.total_payable_amount,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Total Return",variant:"outlined",fullWidth:!0,value:e.total_return,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Total Paid",variant:"outlined",fullWidth:!0,value:e.paid_amount,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Total Dues",variant:"outlined",fullWidth:!0,value:e.due_amount,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Advance",variant:"outlined",fullWidth:!0,value:e.advance_amount,disabled:!0,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"}),className:"non_disable_text"}})})]})})}),this.state.profile?(0,ie.jsx)(ie.Fragment,{children:this.state.profile.own&&e.own?(0,ie.jsxs)(ie.Fragment,{children:[this.state.price_by_categories.length?(0,ie.jsx)(h.A,{className:"dashboard_card",style:{marginBottom:"4px"},children:this.state.price_by_categories.map(((e,a)=>(0,ie.jsxs)(p.A,{className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},onClick:()=>this.handleCardClick(e.category_id),children:[(0,ie.jsxs)(u.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,ie.jsx)("h1",{children:e.category_name}),(0,ie.jsx)("h2",{children:(0,G.Pt)(e.total_amount)}),(0,ie.jsxs)("h3",{children:[e.quantity," Piece(s)"]})]}),(0,ie.jsx)("div",{className:"card-icon"})]},a)))}):null,(0,ie.jsx)(l.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,ie.jsxs)(r.Ay,{container:!0,spacing:2,className:"tax-input loans_view p_view",columnSpacing:{xs:1,sm:2,md:2},children:[(0,ie.jsx)(r.Ay,{item:!0,xs:6,md:3,className:"create-input",children:(0,ie.jsxs)(m.A,{fullWidth:!0,children:[(0,ie.jsx)(y.A,{children:"Category"}),(0,ie.jsxs)(x.A,{value:this.state.stockQueryParams.category_id,label:"Category",onChange:this.handleCategoryChange,className:"input-inner",defaultValue:"",children:[(0,ie.jsx)(A.A,{value:"",children:"All"}),this.state.categories.map(((e,a)=>(0,ie.jsx)(A.A,{value:e.id,children:e.name},a)))]})]})}),(0,ie.jsx)(r.Ay,{item:!0,xs:6,md:3,className:"create-input",children:(0,ie.jsxs)(m.A,{fullWidth:!0,children:[(0,ie.jsx)(y.A,{children:"Sub Category"}),(0,ie.jsxs)(x.A,{value:this.state.stockQueryParams.sub_category_id,label:"Sub Category",onChange:this.handleSubCategoryChange,className:"input-inner",defaultValue:"",children:[(0,ie.jsx)(A.A,{value:"",children:"All"}),this.state.sub_categories.map(((e,a)=>(0,ie.jsx)(A.A,{value:e.id,children:e.name},a)))]})]})}),(0,ie.jsx)(r.Ay,{item:!0,xs:6,md:3,className:"create-input",children:(0,ie.jsx)(m.A,{fullWidth:!0,children:(0,ie.jsx)(c.A,{label:"Search",variant:"outlined",value:this.state.stockQueryParams.search,onChange:this.handleSearchChange})})}),(0,ie.jsx)(r.Ay,{item:!0,xs:6,md:3,className:"create-input order-input button-right",children:(0,ie.jsx)(n.A,{variant:"contained",className:"search-btn",onClick:this.handleStockSearch,children:"Search"})})]})}),(0,ie.jsx)(r.Ay,{container:!0,spacing:f.iL,className:"orders-sale-button",children:(0,ie.jsx)(S.A,{columns:[{name:"image",display_name:"Image",isImage:!0},{name:"name",display_name:"Product Name"},{name:"certificate_no",display_name:"Certificate No",width:"120px"},{name:"total_weight_display",display_name:"Total Wt.",width:"90px"},{name:"stock_material_display",display_name:"Materials Name",width:"165px"},{name:"purity_display",display_name:"Purity Name",width:"165px"},{name:"weight_display",display_name:"Qty"},{name:"unit_display",display_name:"Unit"},{name:"product_code",display_name:"P Code"},{name:"size_name",display_name:"Size"},{name:"mrp_display",display_name:"Price"}],rows:this.state.stock_items,page:this.state.stockQueryParams.page,limit:this.state.stockQueryParams.limit,total:this.state.stock_total,handlePagination:this.handleStockPagination,actions:[],haveAllOption:!0})})]}):(0,ie.jsx)(r.Ay,{container:!0,spacing:f.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,ie.jsxs)(r.Ay,{item:!0,xs:12,className:"p-add-product create-input",children:[(0,ie.jsx)("div",{children:(0,ie.jsxs)(r.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,ie.jsx)(m.A,{fullWidth:!0,children:(0,ie.jsx)(g.A,{value:this.state.queryParams.search,onChange:e=>this.setState({queryParams:{...this.state.queryParams,search:e.target.value}}),endAdornment:(0,ie.jsx)(d.A,{position:"end",children:(0,ie.jsx)(_.A,{onClick:this.handleSearch,edge:"end",children:(0,ie.jsx)(Z.A,{})})}),sx:{borderRadius:"25px"}})})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:2,className:"create-input button-right",children:(0,ie.jsx)(n.A,{variant:"contained",className:"add-button",onClick:()=>this.handlePayNow(),children:"Pay"})})]})}),(0,ie.jsx)(q.A,{component:F.A,children:(0,ie.jsxs)("div",{className:"ratn-table-purchase-wrapper",children:[(0,ie.jsxs)(w.A,{"aria-label":"collapsible table",children:[(0,ie.jsx)(D.A,{className:"ratn-table-header",children:(0,ie.jsxs)(V.A,{children:[(0,ie.jsx)(I.A,{children:"#"}),(0,ie.jsx)(I.A,{children:"Date"}),(0,ie.jsx)(I.A,{children:"Invoice No"}),(0,ie.jsx)(I.A,{children:"Bill Amount"}),(0,ie.jsx)(I.A,{children:"Return"}),(0,ie.jsx)(I.A,{children:"Paid"}),(0,ie.jsx)(I.A,{children:"Dues"}),(0,ie.jsx)(I.A,{children:"Status"}),(0,ie.jsx)(I.A,{sx:{width:"50px"},children:"Action"})]})}),(0,ie.jsx)(M.A,{children:this.state.sales.map(((e,a)=>(0,ie.jsx)(le,{row:e,page:this.state.queryParams.page,limit:this.state.queryParams.limit,index:a,viewAction:this.handleInvoiceView,downloadAction:this.handleInvoiceDownload,payAction:this.handleInvoicePay},a)))})]}),this.state.total>0?(0,ie.jsx)(r.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:(0,ie.jsx)(r.Ay,{item:!0,children:(0,ie.jsx)(v.A,{count:s,page:this.state.queryParams.page,onChange:this.handlePagination})})}):null]})})]})})}):null]}):(0,ie.jsx)(r.Ay,{container:!0,justifyContent:"center",children:(0,ie.jsx)(o.A,{})}),(0,ie.jsxs)(Y.A,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"md",children:[(0,ie.jsxs)(E.A,{children:["Pay Now ",this.state.pay_by_invoice?"/ "+this.state.pay_by_invoice.invoice_number:null]}),(0,ie.jsxs)(z.A,{children:[(0,ie.jsx)(B.A,{}),(0,ie.jsx)(l.A,{sx:{flexGrow:1,m:.5},children:(0,ie.jsxs)(r.Ay,{container:!0,spacing:2,children:[(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:3,className:"create-input",children:(0,ie.jsxs)(m.A,{fullWidth:!0,children:[(0,ie.jsx)(y.A,{children:"Payment Type"}),(0,ie.jsxs)(x.A,{className:"input-inner",value:a.payment_type,fullWidth:!0,label:"Payment Type",onChange:e=>this.updateFormValue(e.target.value,"payment_type"),children:[this.state.pay_by_invoice?null:(0,ie.jsx)(A.A,{value:"advance",children:"Advance"}),(0,ie.jsx)(A.A,{value:"invoice",children:"Invoice"})]})]})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:3,className:"p-invoice-date create-input",children:(0,ie.jsx)(L.$,{dateAdapter:Q.R,children:(0,ie.jsx)(R.l,{label:"Payment Date",value:a.payment_date,inputFormat:"DD/MM/YYYY",onChange:e=>this.updateFormValue(e,"payment_date"),renderInput:e=>(0,ie.jsx)(c.A,{...e,fullWidth:!0,error:t.payment_date})})})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:3,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Amount",variant:"outlined",fullWidth:!0,value:a.amount,InputProps:{startAdornment:(0,ie.jsx)(d.A,{position:"start",children:"₹"})},error:t.amount,onChange:e=>this.updateFormValue(e.target.value,"amount")})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:3,className:"create-input",children:(0,ie.jsxs)(m.A,{fullWidth:!0,error:t.payment_mode,children:[(0,ie.jsx)(y.A,{children:"Payment Mode"}),(0,ie.jsxs)(x.A,{className:"input-inner",value:a.payment_mode,fullWidth:!0,label:"Payment Mode",onChange:e=>this.updateFormValue(e.target.value,"payment_mode"),children:[(0,ie.jsx)(A.A,{value:""}),(0,ie.jsx)(A.A,{value:"cash",children:"Cash"}),(0,ie.jsx)(A.A,{value:"cheque",children:"Cheque"}),(0,ie.jsx)(A.A,{value:"imps_neft",children:"NEFT/IMPS/UPI"}),(0,ie.jsx)(A.A,{value:"online",children:"Online"})]})]})}),"cheque"==a.payment_mode?(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Cheque No",variant:"outlined",fullWidth:!0,value:a.cheque_no,onChange:e=>this.updateFormValue(e.target.value,"cheque_no")})}):null,"imps_neft"==a.payment_mode||"upi"==a.payment_mode?(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,ie.jsx)(c.A,{label:"Transaction #",variant:"outlined",fullWidth:!0,value:a.txn_id,onChange:e=>this.updateFormValue(e.target.value,"txn_id")})}):null,(0,ie.jsx)(r.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,ie.jsx)(j.A,{className:"description",minRows:1,placeholder:"Notes",style:{width:"100%",height:"51px"},value:a.notes,onChange:e=>this.updateFormValue(e.target.value,"notes")})}),(0,ie.jsx)(r.Ay,{item:!0,xs:12,children:(0,ie.jsxs)(b.A,{spacing:1,direction:"row",justifyContent:"flex-end",children:[(0,ie.jsx)(n.A,{variant:"contained",type:"button",disabled:this.state.processing,onClick:this.handleSubmit,children:this.state.processing?"Processing":"Submit"}),(0,ie.jsx)(n.A,{variant:"outlined",onClick:this.handleDialogClose,children:"Cancel"})]})})]})})]})]})]})}}const oe=(0,C.Gh)((0,P.A)((0,i.connect)((e=>({item:e.superadmin.distributor.item,sales:e.superadmin.sales.items,total:e.superadmin.sales.total,actionCalled:e.superadmin.payment.actionCalled,createSuccess:e.superadmin.payment.createSuccess,successMessage:e.superadmin.payment.successMessage,errorMessage:e.superadmin.payment.errorMessage,auth:e.auth,stock_items:e.superadmin.stocks.items,stock_total:e.superadmin.stocks.total,categories:e.superadmin.category.items,sub_categories:e.superadmin.subCategory.items})),(e=>({dispatch:e,actions:(0,N.bindActionCreators)({distributorFetch:X.QM,paymentStore:O._N,salesList:H.Z$,getNotifiactions:J.p,stocksList:ae.ME,categoryList:se.jv,subCategoryList:te.xi},e)})))(re)));function le(e){const{row:a,page:t,limit:i,index:r,viewAction:o,downloadAction:l,payAction:c}=e,[d,h]=s.useState(!1);return(0,ie.jsx)(s.Fragment,{children:(0,ie.jsxs)(V.A,{sx:{"& > *":{borderBottom:"unset"}},children:[(0,ie.jsx)(I.A,{scope:"row",children:1==t?r+1:r+1+i}),(0,ie.jsx)(I.A,{children:a.invoice_date}),(0,ie.jsx)(I.A,{children:a.invoice_number}),(0,ie.jsx)(I.A,{children:a.total_payable}),(0,ie.jsx)(I.A,{children:a.return_amount}),(0,ie.jsx)(I.A,{children:a.paid_amount}),(0,ie.jsx)(I.A,{children:a.due_amount}),(0,ie.jsx)(I.A,{sx:{color:(p=a.approve_status,"Pending"==p?"#ff9100":"Accepted"==p?"#4caf50":"Declined"==p?"#ff3d00":void 0)},children:(0,ie.jsx)("b",{children:a.approve_status})}),(0,ie.jsx)(I.A,{className:"action_btn",children:(0,ie.jsxs)(b.A,{spacing:1,direction:"row",justifyContent:"left",alignItems:"left",children:[(0,ie.jsx)(n.A,{variant:"contained",color:"primary",onClick:()=>o(a),children:(0,ie.jsx)(W.A,{})}),(0,ie.jsx)(n.A,{variant:"contained",color:"primary",onClick:()=>l(a),children:(0,ie.jsx)(K.A,{})}),(0,ie.jsx)(n.A,{variant:"contained",color:"primary",onClick:()=>c(a),ref:e=>{e&&(e.style.setProperty("backgroundColor","#357a38","important"),e.style.setProperty("width","40px","important"),e.style.setProperty("fontSize","12px","important"))},children:"Pay"})]})})]})});var p}}}]);