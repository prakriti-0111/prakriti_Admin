(self.webpackChunk=self.webpackChunk||[]).push([[7408],{66095:(e,s,t)=>{"use strict";var a=t(96784);s.A=void 0;var n=a(t(17044)),i=t(62540),l=(0,n.default)((0,i.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");s.A=l},66282:(e,s,t)=>{"use strict";var a=t(96784);s.A=void 0;var n=a(t(17044)),i=t(62540),l=(0,n.default)((0,i.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");s.A=l},36213:(e,s,t)=>{"use strict";t.d(s,{A:()=>C});var a=t(49257),n=t(68102),i=t(63696),l=t(68017),r=t(81023),o=t(91785),c=t(28362),d=t(90013),h=t(2512),u=t(46733);function m(e){return(0,u.A)("MuiCircularProgress",e)}(0,t(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=t(62540);const j=["className","color","disableShrink","size","style","thickness","value","variant"];let g,x,A,y,_=e=>e;const v=(0,o.i7)(g||(g=_`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),b=(0,o.i7)(x||(x=_`
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
`)),f=(0,h.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.root,s[t.variant],s[`color${(0,c.A)(t.color)}`]]}})((({ownerState:e,theme:s})=>(0,n.A)({display:"inline-block"},"determinate"===e.variant&&{transition:s.transitions.create("transform")},"inherit"!==e.color&&{color:(s.vars||s).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,o.AH)(A||(A=_`
      animation: ${0} 1.4s linear infinite;
    `),v))),k=(0,h.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,s)=>s.svg})({display:"block"}),w=(0,h.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.circle,s[`circle${(0,c.A)(t.variant)}`],t.disableShrink&&s.circleDisableShrink]}})((({ownerState:e,theme:s})=>(0,n.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:s.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,o.AH)(y||(y=_`
      animation: ${0} 1.4s ease-in-out infinite;
    `),b))),C=i.forwardRef((function(e,s){const t=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:i,color:o="primary",disableShrink:h=!1,size:u=40,style:g,thickness:x=3.6,value:A=0,variant:y="indeterminate"}=t,_=(0,a.A)(t,j),v=(0,n.A)({},t,{color:o,disableShrink:h,size:u,thickness:x,value:A,variant:y}),b=(e=>{const{classes:s,variant:t,color:a,disableShrink:n}=e,i={root:["root",t,`color${(0,c.A)(a)}`],svg:["svg"],circle:["circle",`circle${(0,c.A)(t)}`,n&&"circleDisableShrink"]};return(0,r.A)(i,m,s)})(v),C={},N={},S={};if("determinate"===y){const e=2*Math.PI*((44-x)/2);C.strokeDasharray=e.toFixed(3),S["aria-valuenow"]=Math.round(A),C.strokeDashoffset=`${((100-A)/100*e).toFixed(3)}px`,N.transform="rotate(-90deg)"}return(0,p.jsx)(f,(0,n.A)({className:(0,l.A)(b.root,i),style:(0,n.A)({width:u,height:u},N,g),ownerState:v,ref:s,role:"progressbar"},S,_,{children:(0,p.jsx)(k,{className:b.svg,ownerState:v,viewBox:"22 22 44 44",children:(0,p.jsx)(w,{className:b.circle,style:C,ownerState:v,cx:44,cy:44,r:(44-x)/2,fill:"none",strokeWidth:x})})}))}))},43303:(e,s,t)=>{"use strict";t.d(s,{Bm:()=>o,TK:()=>h,VS:()=>l,Y$:()=>c,_N:()=>r,yz:()=>d});var a=t(80325),n=t(78342),i=t(45892);const l=e=>(e=(0,i.x0)(e,!0),s=>{a.A.get("/superadmin/payments".concat(e)).then((e=>{e.data.success&&s({type:n.$F,payload:e.data.data})})).catch((e=>{}))}),r=e=>s=>{a.A.post("/superadmin/payments/store",e).then((e=>{s({type:n.ci,payload:e.data})})).catch((e=>{}))},o=e=>s=>{a.A.get("/superadmin/payments/due-amount?user_id=".concat(e)).then((e=>{e.data.success&&s({type:n.X6,payload:e.data.data})})).catch((e=>{}))},c=e=>(e=(0,i.x0)(e,!0),s=>{a.A.get("/superadmin/wallet-history".concat(e)).then((e=>{e.data.success&&s({type:n.Qz,payload:e.data.data})})).catch((e=>{}))}),d=e=>a.A.get("/superadmin/payments/wallet-balance?payment_mode=".concat(e)),h=(e,s)=>a.A.post("/superadmin/payments/update-status/"+e,s)},26118:(e,s,t)=>{"use strict";t.d(s,{Ox:()=>h,SI:()=>j,Uf:()=>u,Z$:()=>l,Zi:()=>c,_B:()=>x,il:()=>g,kA:()=>o,qn:()=>m,sd:()=>p,wp:()=>r,zK:()=>d});var a=t(80325),n=t(68212),i=t(45892);const l=e=>(e=(0,i.x0)(e,!0),s=>{a.A.get("/superadmin/sales".concat(e)).then((e=>{e.data.success&&s({type:n.go,payload:e.data.data})})).catch((e=>{}))}),r=e=>s=>{a.A.post("/superadmin/sales/store",e).then((e=>{s({type:n.x3,payload:e.data})})).catch((e=>{}))},o=e=>s=>{a.A.get("/superadmin/sales/view/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&s({type:n.gN,payload:e.data.data})})).catch((e=>{}))},c=(e,s)=>a.A.post("/superadmin/sales-on-approve/status/".concat(e),s),d=e=>s=>{a.A.get("/superadmin/sales/edit/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&s({type:n.gN,payload:e.data.data})})).catch((e=>{}))},h=(e,s)=>t=>{a.A.post("/superadmin/sales/update/".concat(e),s).then((e=>{t({type:n.hF,payload:e.data})})).catch((e=>{}))},u=(e,s)=>t=>{a.A.delete("/superadmin/sales/delete/".concat(e),s).then((e=>{t({type:n.VW,payload:e.data})})).catch((e=>{}))},m=e=>a.A.post("/superadmin/sales/download-invoice/".concat(e)),p=e=>a.A.get("/superadmin/sales/view/".concat(e)),j=(e,s)=>a.A.post("/superadmin/sales/return/".concat(e),s),g=e=>a.A.post("/superadmin/sales/return-stock-transfer",e),x=e=>(e=(0,i.x0)(e,!0),a.A.get("/superadmin/sales-products".concat(e)))},9943:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>J});var a=t(63696),n=t(52821),i=t(49746),l=t(45271),r=t(36213),o=t(36846),c=t(61095),d=t(36122),h=t(13007),u=t(41795),m=t(66107),p=t(26365),j=t(78976),g=t(65469),x=t(72839),A=t(11505),y=t(95624),_=t(66593),v=t(61176),b=t(66098),f=t(50977),k=t(27874),w=t(51449),C=t(26118),N=t(88441),S=t(98993),D=t(73947),P=t(10228),V=t(45166),M=t(2598),z=t(25606),F=t(24019),q=t(66095),I=t(66282),O=t(15164),W=t(79731),B=t(37046),L=t(42689),R=t.n(L),T=t(89429),Y=t(52805),H=t(79859),$=t(43191),E=t(45892),U=t(43303),K=t(78342),G=t(30069),Q=t(62540);function Z(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class X extends a.Component{constructor(e){super(e),Z(this,"loadListData",(()=>{let e={...this.state.queryParams,table_id:this.props.params.id};this.props.actions.paymentList(e)})),Z(this,"handlePagination",(e=>{this.setState({queryParams:{...this.state.queryParams,page:e}},(()=>{this.loadListData()}))})),Z(this,"handlePayNow",(()=>{this.setState({openDialog:!0})})),Z(this,"handleDialogClose",((e,s)=>{s&&"backdropClick"==s||this.setState({openDialog:!1})})),Z(this,"handleSupplierChange",(e=>{this.updateFormValue(e.target.value,"user_id"),this.props.actions.paymentTotalDue(e.target.value)})),Z(this,"updateFormValue",((e,s)=>{this.setState({formValues:{...this.state.formValues,[s]:e}})})),Z(this,"defaultFormValues",(()=>({formValues:{user_id:"",payment_mode:"",payment_date:R()().format("MM/DD/YYYY"),due_date:"",amount:"",notes:"",cheque_no:"",txn_id:"",table_type:"sale",table_id:""},formErros:{user_id:!1,payment_mode:!1,payment_date:!1,amount:!1,notes:!1,cheque_no:!1,txn_id:!1,due_date:!1}}))),Z(this,"handleSubmit",(()=>{if(!this.formValidate()){this.setState({processing:!0});let e={...this.state.formValues,user_id:this.state.sale.user_id,table_id:this.state.sale.id};this.props.actions.paymentStore(e)}})),Z(this,"formValidate",(()=>{let e=this.state.formValues,s=this.state.formErros,t=!1;return parseFloat(e.amount)>parseFloat(this.state.sale.due_amount)&&(t=!0,this.props.enqueueSnackbar("Amount must be less than or equal due amount.",{variant:"error"})),(0,E.Im)(e.amount)?(s.amount=!0,t=!0):s.amount=!1,(0,E.Im)(e.payment_mode)?(s.payment_mode=!0,t=!0):s.payment_mode=!1,(0,E.Im)(e.payment_date)?(s.payment_date=!0,t=!0):s.payment_date=!1,(0,E.Im)(e.due_date)?(s.due_date=!0,t=!0):s.due_date=!1,this.setState({formErros:s}),t})),Z(this,"loadViewData",(()=>{this.props.actions.salesView(this.props.params.id)})),this.state={sale:this.props.sale,openDialog:!1,...this.defaultFormValues(),actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,processing:!1,items:this.props.items,total:this.props.total,queryParams:{page:1,limit:50,date_from:null,date_to:null,table_type:"sale"},auth:this.props.auth},this.columns=[{name:"payment_date",display_name:"Payment Date"},{name:"amount",display_name:"Amount"},{name:"payment_mode",display_name:"Payment Mode"},{name:"cheque_no",display_name:"Cheque #"},{name:"txn_id",display_name:"Transaction #"}]}componentDidMount(){this.loadViewData(),this.loadListData()}static getDerivedStateFromProps(e,s){let t={};return e.sale!==s.sale&&(t.sale=e.sale),e.actionCalled!==s.actionCalled&&(t.actionCalled=e.actionCalled),e.createSuccess!==s.createSuccess&&(t.createSuccess=e.createSuccess),e.successMessage!==s.successMessage&&(t.successMessage=e.successMessage),e.errorMessage!==s.errorMessage&&(t.errorMessage=e.errorMessage),e.items!==s.items&&(t.items=e.items),e.total!==s.total&&(t.total=e.total),e.auth!==s.auth&&(t.auth=e.auth),t}componentDidUpdate(e){this.props.params.id!=e.params.id&&(this.loadViewData(),this.loadListData()),this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({processing:!1,openDialog:!1,queryParams:{...this.state.queryParams,page:1},...this.defaultFormValues()}),this.loadViewData(),this.loadListData(),this.props.actions.getNotifiactions()):(this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.setState({processing:!1})),this.props.dispatch({type:K.Kl}))}render(){var e;const{sale:s,formValues:t,formErros:a}=this.state;return(0,Q.jsxs)(b.A,{secondary:(0,Q.jsx)(i.A,{variant:"contained",onClick:()=>this.props.navigate(-1),children:"Back"}),children:[s?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)("div",{className:"return-wrapper",children:[(0,Q.jsxs)("div",{className:"return-header",children:[(0,Q.jsx)("p",{children:"Sale Details"}),(0,Q.jsxs)("p",{children:["Invoice Date: ",s.invoice_date]}),(0,Q.jsxs)("p",{children:["Dues Date:",s.due_date]}),s.notes?(0,Q.jsxs)("p",{children:["Notes: ",s.notes]}):null]}),(0,Q.jsx)("div",{className:"",children:(0,Q.jsx)(i.A,{className:"add-button",variant:"contained",onClick:()=>this.props.navigate(-1),children:"Back"})})]}),(0,Q.jsx)(l.Ay,{container:!0,spacing:v.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,Q.jsx)(l.Ay,{item:!0,xs:12,children:(0,Q.jsx)(M.A,{component:F.A,children:(0,Q.jsx)("div",{className:"ratn-table-purchase-wrapper",children:(0,Q.jsxs)(S.A,{"aria-label":"collapsible table",className:"invoice_product_list",children:[(0,Q.jsx)(D.A,{className:"ratn-table-header",children:(0,Q.jsxs)(z.A,{children:[(0,Q.jsx)(V.A,{children:"Company Name"}),(0,Q.jsx)(V.A,{children:"Total Amt"}),(0,Q.jsx)(V.A,{children:"Cash Disc"}),(0,Q.jsx)(V.A,{children:"Bill Amount"}),(0,Q.jsx)(V.A,{children:"Return Amt"}),(0,Q.jsx)(V.A,{children:"Paid Amt"}),(0,Q.jsx)(V.A,{children:"Due Amt"}),(0,Q.jsx)(V.A,{children:"Invoice No"}),(0,Q.jsx)(V.A,{children:"Status"})]})}),(0,Q.jsx)(P.A,{className:"pur-details-table-body",children:(0,Q.jsxs)(z.A,{children:[(0,Q.jsx)(V.A,{component:"th",scope:"row",children:null==s||null===(e=s.user_details)||void 0===e?void 0:e.company_name}),(0,Q.jsx)(V.A,{children:s.total_amount}),(0,Q.jsx)(V.A,{children:s.discount}),(0,Q.jsx)(V.A,{children:s.bill_amount}),(0,Q.jsx)(V.A,{children:s.return_amount}),(0,Q.jsx)(V.A,{children:s.paid_amount_display}),(0,Q.jsx)(V.A,{children:s.due_amount_display}),(0,Q.jsx)(V.A,{children:s.invoice_number}),(0,Q.jsx)(V.A,{className:"sales-status",children:(0,Q.jsx)(o.A,{label:s.approve_status,color:(0,E.ze)(s.is_approved)})})]})})]})})})})}),(0,Q.jsxs)(l.Ay,{container:!0,spacing:v.iL,className:"details-header ratn-pur-wrapper loans_view",children:[(0,Q.jsx)(l.Ay,{item:!0,xs:12,children:(0,Q.jsx)(M.A,{component:F.A,children:(0,Q.jsx)("div",{className:"ratn-table-purchase-wrapper",children:(0,Q.jsxs)(S.A,{"aria-label":"collapsible table",className:"invoice_product_list",children:[(0,Q.jsx)(D.A,{className:"ratn-table-header",children:(0,Q.jsxs)(z.A,{children:[(0,Q.jsx)(V.A,{}),(0,Q.jsx)(V.A,{children:"#"}),(0,Q.jsx)(V.A,{children:"Product Name"}),(0,Q.jsx)(V.A,{children:"Category Name"}),(0,Q.jsx)(V.A,{children:"Certificate Number"}),(0,Q.jsx)(V.A,{children:"Total Weight"}),(0,Q.jsx)(V.A,{children:"Size"}),(0,Q.jsx)(V.A,{children:"Making Charge"}),(0,Q.jsx)(V.A,{children:"Sub Total"}),(0,Q.jsx)(V.A,{children:"Dist"}),(0,Q.jsx)(V.A,{children:"Tax"}),(0,Q.jsx)(V.A,{children:"Total"})]})}),(0,Q.jsx)(P.A,{children:s.products.map(((e,s)=>(0,Q.jsx)(ee,{row:e,index:s},s)))})]})})})}),s.is_assigned?null:(0,Q.jsxs)(l.Ay,{item:!0,xs:12,className:"p-add-product create-input button-right",children:[(0,Q.jsxs)("h3",{className:"p_heading_list sales_heading_list",children:["Payment List ",parseFloat(s.due_amount)>0?(0,Q.jsx)(i.A,{variant:"contained",className:"add-button",onClick:()=>this.handlePayNow(),children:"Pay Now"}):null]}),(0,Q.jsx)(k.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[],actionValue:"action_value",actionValueColorConditions:[{value:"Accepted",color:"green"},{value:"Declined",color:"red"}]})]})]})]}):(0,Q.jsx)(l.Ay,{container:!0,justifyContent:"center",children:(0,Q.jsx)(r.A,{})}),(0,Q.jsxs)(T.A,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"md",children:[(0,Q.jsx)($.A,{children:"Pay Now"}),(0,Q.jsxs)(Y.A,{children:[(0,Q.jsx)(H.A,{}),(0,Q.jsx)(c.A,{sx:{flexGrow:1,m:.5},children:(0,Q.jsxs)(l.Ay,{container:!0,spacing:2,children:[(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"p-invoice-date create-input",children:(0,Q.jsx)(W.$,{dateAdapter:O.R,children:(0,Q.jsx)(B.l,{label:"Payment Date",value:t.payment_date,inputFormat:"DD/MM/YYYY",onChange:e=>this.updateFormValue(e,"payment_date"),renderInput:e=>(0,Q.jsx)(d.A,{...e,fullWidth:!0,error:a.payment_date,className:"non_disable_text"}),disabled:!0})})}),(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,Q.jsx)(d.A,{label:"Amount",variant:"outlined",fullWidth:!0,value:t.amount,InputProps:{startAdornment:(0,Q.jsx)(h.A,{position:"start",children:"₹"})},error:a.amount,onChange:e=>this.updateFormValue(e.target.value,"amount")})}),(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,Q.jsxs)(u.A,{fullWidth:!0,error:a.payment_mode,children:[(0,Q.jsx)(m.A,{children:"Payment Mode"}),(0,Q.jsxs)(p.A,{className:"input-inner",value:t.payment_mode,fullWidth:!0,label:"Payment Mode",onChange:e=>this.updateFormValue(e.target.value,"payment_mode"),children:[(0,Q.jsx)(j.A,{value:""}),(0,Q.jsx)(j.A,{value:"cash",children:"Cash"}),(0,Q.jsx)(j.A,{value:"cheque",children:"Cheque"}),(0,Q.jsx)(j.A,{value:"imps_neft",children:"NEFT/IMPS/UPI"}),(0,Q.jsx)(j.A,{value:"online",children:"Online"})]})]})}),"cheque"==t.payment_mode?(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,Q.jsx)(d.A,{label:"Cheque No",variant:"outlined",fullWidth:!0,value:t.cheque_no,onChange:e=>this.updateFormValue(e.target.value,"cheque_no")})}):null,"imps_neft"==t.payment_mode||"upi"==t.payment_mode?(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,Q.jsx)(d.A,{label:"Transaction #",variant:"outlined",fullWidth:!0,value:t.txn_id,onChange:e=>this.updateFormValue(e.target.value,"txn_id")})}):null,(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,Q.jsx)(g.A,{className:"description",minRows:1,placeholder:"Notes",style:{width:"100%",height:"51px"},value:t.notes,onChange:e=>this.updateFormValue(e.target.value,"notes")})}),(0,Q.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"p-invoice-date create-input",children:(0,Q.jsx)(W.$,{dateAdapter:O.R,children:(0,Q.jsx)(B.l,{label:"Due Date",value:t.due_date,inputFormat:"DD/MM/YYYY",onChange:e=>this.updateFormValue(e,"due_date"),renderInput:e=>(0,Q.jsx)(d.A,{...e,fullWidth:!0,error:a.due_date})})})}),(0,Q.jsx)(l.Ay,{item:!0,xs:12,children:(0,Q.jsxs)(x.A,{spacing:1,direction:"row",justifyContent:"flex-end",children:[(0,Q.jsx)(i.A,{variant:"contained",type:"button",disabled:this.state.processing,onClick:this.handleSubmit,children:this.state.processing?"Processing":"Submit"}),(0,Q.jsx)(i.A,{variant:"outlined",onClick:this.handleDialogClose,children:"Cancel"})]})})]})})]})]})]})}}const J=(0,w.Gh)((0,f.A)((0,n.connect)((e=>({sale:e.superadmin.sales.sale,actionCalled:e.superadmin.payment.actionCalled,createSuccess:e.superadmin.payment.createSuccess,successMessage:e.superadmin.payment.successMessage,errorMessage:e.superadmin.payment.errorMessage,items:e.superadmin.payment.items,total:e.superadmin.payment.total,auth:e.auth})),(e=>({dispatch:e,actions:(0,N.bindActionCreators)({salesView:C.kA,paymentStore:U._N,paymentList:U.VS,getNotifiactions:G.p},e)})))(X)));function ee(e){const{row:s,index:t}=e,[n,i]=a.useState(!1),l=t+1;let r=l%2==0?"even":"odd";return s.is_return&&(r+=" strike_through"),(0,Q.jsxs)(a.Fragment,{children:[(0,Q.jsxs)(z.A,{sx:{"& > *":{borderBottom:"unset"}},className:r,children:[(0,Q.jsx)(V.A,{children:(0,Q.jsx)(A.A,{"aria-label":"expand row",size:"small",onClick:()=>i(!n),className:"expand_icon",children:n?(0,Q.jsx)(I.A,{}):(0,Q.jsx)(q.A,{})})}),(0,Q.jsx)(V.A,{component:"th",scope:"row",children:l<=9?"0"+l:l}),(0,Q.jsx)(V.A,{component:"th",scope:"row",children:s.product_name}),(0,Q.jsx)(V.A,{children:s.category_name}),(0,Q.jsx)(V.A,{children:s.certificate_no}),(0,Q.jsx)(V.A,{children:s.total_weight}),(0,Q.jsx)(V.A,{children:s.size_name}),(0,Q.jsx)(V.A,{children:s.making_charge_display}),(0,Q.jsx)(V.A,{children:s.sub_price}),(0,Q.jsx)(V.A,{children:s.total_discount_display}),(0,Q.jsx)(V.A,{children:s.tax}),(0,Q.jsx)(V.A,{children:s.total_display})]}),(0,Q.jsx)(z.A,{className:"table-inner-row sub_table "+r,children:(0,Q.jsx)(V.A,{style:{paddingBottom:0,paddingTop:0},colSpan:11,children:(0,Q.jsx)(y.A,{in:n,timeout:"auto",unmountOnExit:!0,children:(0,Q.jsxs)(c.A,{sx:{margin:1},children:[(0,Q.jsx)(_.A,{variant:"h6",gutterBottom:!0,component:"span"}),(0,Q.jsxs)(S.A,{size:"medium","aria-label":"sales",children:[(0,Q.jsx)(D.A,{children:(0,Q.jsxs)(z.A,{className:"pur-details-inner-table",children:[(0,Q.jsx)(V.A,{children:"Material Name"}),(0,Q.jsx)(V.A,{children:"Purity"}),(0,Q.jsx)(V.A,{children:"Quantity"}),(0,Q.jsx)(V.A,{children:"Weight"}),(0,Q.jsx)(V.A,{children:"Unit"}),(0,Q.jsx)(V.A,{children:"Rate"}),(0,Q.jsx)(V.A,{children:"Amount"}),(0,Q.jsx)(V.A,{children:"Dist"}),"material"==s.product_type?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(V.A,{children:"Return Weight"}),(0,Q.jsx)(V.A,{children:"Return Qty"})]}):null]})}),(0,Q.jsx)(P.A,{className:"pur-details-table-body",children:s.materials.map(((e,t)=>(0,Q.jsxs)(z.A,{children:[(0,Q.jsx)(V.A,{component:"th",scope:"row",children:e.material_name}),(0,Q.jsx)(V.A,{children:e.purity_name}),(0,Q.jsx)(V.A,{children:e.quantity}),(0,Q.jsx)(V.A,{children:e.weight}),(0,Q.jsx)(V.A,{children:e.unit_name}),(0,Q.jsx)(V.A,{children:e.rate}),(0,Q.jsx)(V.A,{children:e.amount}),(0,Q.jsx)(V.A,{children:e.discount_amount_display}),"material"==s.product_type?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(V.A,{children:e.return_weight}),(0,Q.jsx)(V.A,{children:e.return_qty})]}):null]},t)))})]})]})})})})]})}},27874:(e,s,t)=>{"use strict";t.d(s,{A:()=>H});var a=t(63696),n=t(36846),i=t(46133),l=t(72839),r=t(49746),o=t(45271),c=t(41795),d=t(26365),h=t(78976),u=t(2626),m=t(98993),p=t(73947),j=t(10228),g=t(45166),x=t(2598),A=t(55186),y=t(25606),_=t(24019),v=t(62688),b=t.n(v),f=t(89429),k=t(29443),w=t(52805),C=t(79859),N=t(43191),S=t(45892),D=t(16638),P=t(97217),V=t(60669),M=t(86074),z=t(35008),F=t(78061),q=t(81117),I=t(51223),O=t(37001),W=t(37086),B=t(55063),L=t(71086),R=t(62540);function T(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class Y extends a.Component{constructor(e){super(e),T(this,"handleChangePage",((e,s)=>{this.props.handlePagination(s)})),T(this,"getArrayComponent",((e,s)=>(0,R.jsx)(R.Fragment,{children:e.map(((e,t)=>(0,R.jsxs)(a.Fragment,{children:[e,!1!==s?(0,R.jsx)(R.Fragment,{children:" "}):""]},t)))}))),T(this,"getData",(e=>{let s=[];for(let t of this.state.columns){let a=t.name in e?e[t.name]:"";if(Array.isArray(a))if("show_tag"in t){let e=[];for(let s=0;s<a.length;s++)e.push((0,R.jsx)(n.A,{label:a[s][t.array_key],color:"primary"}));a=this.getArrayComponent(e)}else{let e=[];if("array_key"in t){for(let s=0;s<a.length;s++)e.push(a[s][t.array_key]);a=e}a=(0,S.Gp)(a.join("\n"))}else{if("show_tag"in t){let s="primary";if("color_conditions"in t){for(let a=0;a<t.color_conditions.length;a++)if(t.color_conditions[a].value==e[t.color_conditions[a].key]){s=t.color_conditions[a].color;break}}else"Status"==t.display_name&&(s=(0,S.qY)(a));if(a=a?(0,R.jsx)(n.A,{label:a,color:s}):"","showAttendenceAddress"in t&&t.showAttendenceAddress){let s=[];e.attendence_address&&e.attendence_address.login&&(s.push((0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&s.push((0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),a=[a].concat(s),a=this.getArrayComponent(a,!1)}if("redirectToMap"in t&&t.redirectToMap){let s=[(0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:a})];a=this.getArrayComponent(s,!1)}}"isBold"in t&&t.isBold&&(a=this.getArrayComponent([(0,R.jsx)("b",{children:a})]))}if("isImage"in t&&t.isImage){let e={width:"isBanner"in t&&t.isBanner?"200px":"60px"};"isBanner"in t&&t.isBanner||(e.height="40px"),s.push((0,R.jsx)("img",{src:a,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(a)}))}else if("isRating"in t&&t.isRating)s.push((0,R.jsx)(i.A,{name:"read-only",value:a,readOnly:!0}));else{let n="";if("class_conditions"in t)for(let s=0;s<t.class_conditions.length;s++)if(t.class_conditions[s].value==e[t.class_conditions[s].key]){n=t.class_conditions[s].class_name;break}"isHtml"in t&&t.isHtml&&(a=this.getArrayComponent([(0,R.jsx)("span",{dangerouslySetInnerHTML:{__html:a}})])),n&&(a=this.getArrayComponent([(0,R.jsx)("span",{className:n,children:a})])),s.push(a)}}return s})),T(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,R.jsx)(P.A,{});case"Delete":return(0,R.jsx)(D.A,{});case"View":return(0,R.jsx)(V.A,{});case"+":return(0,R.jsx)(M.A,{});case"Download":return(0,R.jsx)(z.A,{});case"green_tick":return(0,R.jsx)(F.A,{});case"Accept":return(0,R.jsx)(q.A,{});case"Decline":return(0,R.jsx)(I.A,{});case"Close":return(0,R.jsx)(O.A,{});case"Return":return(0,R.jsx)(W.A,{});case"Assign":return(0,R.jsx)(B.A,{});case"Permissions":return(0,R.jsx)(L.A,{})}})),T(this,"handleActionButtonClick",((e,s)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:s,deleteFun:e.onClick}):e.onClick(s)})),T(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),T(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),T(this,"checkActionBtnCondtion",((e,s)=>{let t=[];for(let a=0;a<e.length;a++)"con_type"in e[a]?s[e[a].key]!=e[a].value&&t.push(!0):s[e[a].key]==e[a].value&&t.push(!0);return t.length==e.length})),T(this,"getColumnStyle",(e=>{let s={};return"width"in e&&(s.width=e.width),s})),T(this,"getActionValueStyle",(e=>{let s="";for(let t=0;t<this.state.actionValueColorConditions.length;t++)if(this.state.actionValueColorConditions[t].value==e){s=this.state.actionValueColorConditions[t].color;break}return s?{color:s}:{}})),T(this,"getSerialNo",((e,s,t)=>{let a=(s-1)*t+e+1;return a<10?"0"+a:a})),T(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),T(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),T(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,s){let t={};return e.rows!==s.rows&&(t.rows=e.rows),e.page!==s.page&&(t.page=e.page),e.total!==s.total&&(t.total=e.total),e.actions!==s.actions&&(t.actions=e.actions),t}render(){const{rows:e,columnAlign:s,rowAlign:t,total:n,limit:i,page:v,columns:b,actions:S,havePagination:D,haveAllOption:P,showAll:V,stickyHeader:M}=this.state,z=V?1:Math.ceil(n/i);return(0,R.jsxs)(x.A,{component:_.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,R.jsxs)(m.A,{sx:{minWidth:500},stickyHeader:M,children:[(0,R.jsx)(p.A,{className:"ratn-table-header",children:(0,R.jsxs)(y.A,{children:[this.state.showSerialNo?(0,R.jsx)(g.A,{align:s,children:"#"}):null,b.map(((e,t)=>(0,R.jsxs)(g.A,{align:s,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,R.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},t))),S.length||""!=this.state.actionValue?(0,R.jsx)(g.A,{align:s,sx:{width:100},children:"Actions"}):null]})}),(0,R.jsxs)(j.A,{children:[e.map(((e,s)=>(0,R.jsxs)(y.A,{children:[this.state.showSerialNo?(0,R.jsx)(g.A,{align:t,children:this.getSerialNo(s,v,i)}):null,this.getData(e).map(((e,a)=>(0,R.jsx)(g.A,{align:t,children:e},s+a))),S.length||""!=this.state.actionValue?(0,R.jsxs)(g.A,{align:t,className:"action_btn",children:[S.length?(0,R.jsx)(l.A,{spacing:1,direction:"row",justifyContent:t,alignItems:t,children:S.map(((s,t)=>(0,R.jsx)(a.Fragment,{children:"show"in s&&!s.show||!("conditions"in s&&this.checkActionBtnCondtion(s.conditions,e)||!("conditions"in s))?null:(0,R.jsx)(r.A,{variant:"contained",color:s.color,onClick:()=>this.handleActionButtonClick(s,e),disabled:!!s.disabled&&s.disabled,children:this.getActionIcon(s)},"b"+t)},t)))}):null,""!=this.state.actionValue?(0,R.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},s))),0==e.length?(0,R.jsx)(y.A,{children:(0,R.jsx)(g.A,{align:"center",colSpan:b.length+S.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,R.jsx)(A.A,{children:(0,R.jsx)(y.A,{})})]}),n>0&&D?(0,R.jsxs)(o.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[P?(0,R.jsx)(o.Ay,{item:!0,xs:2,children:(0,R.jsx)(c.A,{size:"small",children:(0,R.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,R.jsx)(h.A,{value:i,children:i}),(0,R.jsx)(h.A,{value:"all",children:"All"})]})})}):null,(0,R.jsx)(o.Ay,{item:!0,xs:P?10:12,children:(0,R.jsx)(u.A,{count:z,page:v,onChange:this.handleChangePage})})]}):null,(0,R.jsxs)(f.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,R.jsx)(N.A,{children:"Delete"}),(0,R.jsx)(w.A,{children:(0,R.jsx)(C.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,R.jsx)(k.A,{children:(0,R.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,R.jsx)(r.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,R.jsx)(r.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,R.jsxs)(f.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,R.jsx)(N.A,{children:(0,R.jsx)(O.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,R.jsx)(w.A,{children:(0,R.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}Y.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},Y.propTypes={minWidth:b().number,columns:b().array,actionValueColorConditions:b().array,rows:b().array,page:b().number,limit:b().number,total:b().number,columnAlign:b().string,actionValue:b().string,rowAlign:b().string,haveAction:b().bool,actions:b().array,havePagination:b().bool,showSerialNo:b().bool,loading:b().bool,stickyHeader:b().bool};const H=Y},61738:(e,s,t)=>{var a={"./af":99805,"./af.js":99805,"./ar":94449,"./ar-dz":44468,"./ar-dz.js":44468,"./ar-kw":63480,"./ar-kw.js":63480,"./ar-ly":64197,"./ar-ly.js":64197,"./ar-ma":62180,"./ar-ma.js":62180,"./ar-sa":50230,"./ar-sa.js":50230,"./ar-tn":72808,"./ar-tn.js":72808,"./ar.js":94449,"./az":45865,"./az.js":45865,"./be":86627,"./be.js":86627,"./bg":60901,"./bg.js":60901,"./bm":63179,"./bm.js":63179,"./bn":61966,"./bn-bd":90969,"./bn-bd.js":90969,"./bn.js":61966,"./bo":6317,"./bo.js":6317,"./br":46474,"./br.js":46474,"./bs":35961,"./bs.js":35961,"./ca":77270,"./ca.js":77270,"./cs":61564,"./cs.js":61564,"./cv":43239,"./cv.js":43239,"./cy":92366,"./cy.js":92366,"./da":82453,"./da.js":82453,"./de":76601,"./de-at":47408,"./de-at.js":47408,"./de-ch":8101,"./de-ch.js":8101,"./de.js":76601,"./dv":96080,"./dv.js":96080,"./el":12655,"./el.js":12655,"./en-au":46836,"./en-au.js":46836,"./en-ca":22086,"./en-ca.js":22086,"./en-gb":2103,"./en-gb.js":2103,"./en-ie":35964,"./en-ie.js":35964,"./en-il":74379,"./en-il.js":74379,"./en-in":50765,"./en-in.js":50765,"./en-nz":71502,"./en-nz.js":71502,"./en-sg":1152,"./en-sg.js":1152,"./eo":90050,"./eo.js":90050,"./es":43350,"./es-do":49338,"./es-do.js":49338,"./es-mx":51326,"./es-mx.js":51326,"./es-us":89947,"./es-us.js":89947,"./es.js":43350,"./et":18231,"./et.js":18231,"./eu":28512,"./eu.js":28512,"./fa":59083,"./fa.js":59083,"./fi":25059,"./fi.js":25059,"./fil":32607,"./fil.js":32607,"./fo":83369,"./fo.js":83369,"./fr":27390,"./fr-ca":66711,"./fr-ca.js":66711,"./fr-ch":6152,"./fr-ch.js":6152,"./fr.js":27390,"./fy":62419,"./fy.js":62419,"./ga":3002,"./ga.js":3002,"./gd":82533,"./gd.js":82533,"./gl":16557,"./gl.js":16557,"./gom-deva":48944,"./gom-deva.js":48944,"./gom-latn":25387,"./gom-latn.js":25387,"./gu":17462,"./gu.js":17462,"./he":39237,"./he.js":39237,"./hi":49617,"./hi.js":49617,"./hr":36544,"./hr.js":36544,"./hu":60341,"./hu.js":60341,"./hy-am":41388,"./hy-am.js":41388,"./id":75251,"./id.js":75251,"./is":41146,"./is.js":41146,"./it":37891,"./it-ch":80007,"./it-ch.js":80007,"./it.js":37891,"./ja":73727,"./ja.js":73727,"./jv":5198,"./jv.js":5198,"./ka":28974,"./ka.js":28974,"./kk":37308,"./kk.js":37308,"./km":57786,"./km.js":57786,"./kn":84807,"./kn.js":84807,"./ko":61584,"./ko.js":61584,"./ku":61906,"./ku.js":61906,"./ky":79190,"./ky.js":79190,"./lb":7396,"./lb.js":7396,"./lo":38503,"./lo.js":38503,"./lt":33010,"./lt.js":33010,"./lv":5192,"./lv.js":5192,"./me":51944,"./me.js":51944,"./mi":56492,"./mi.js":56492,"./mk":2934,"./mk.js":2934,"./ml":61463,"./ml.js":61463,"./mn":8377,"./mn.js":8377,"./mr":78733,"./mr.js":78733,"./ms":18030,"./ms-my":39445,"./ms-my.js":39445,"./ms.js":18030,"./mt":55887,"./mt.js":55887,"./my":87228,"./my.js":87228,"./nb":48294,"./nb.js":48294,"./ne":19559,"./ne.js":19559,"./nl":20600,"./nl-be":78796,"./nl-be.js":78796,"./nl.js":20600,"./nn":9570,"./nn.js":9570,"./oc-lnc":5662,"./oc-lnc.js":5662,"./pa-in":87101,"./pa-in.js":87101,"./pl":56118,"./pl.js":56118,"./pt":29198,"./pt-br":7203,"./pt-br.js":7203,"./pt.js":29198,"./ro":45565,"./ro.js":45565,"./ru":33315,"./ru.js":33315,"./sd":58473,"./sd.js":58473,"./se":11258,"./se.js":11258,"./si":98798,"./si.js":98798,"./sk":26404,"./sk.js":26404,"./sl":7057,"./sl.js":7057,"./sq":25718,"./sq.js":25718,"./sr":45363,"./sr-cyrl":20478,"./sr-cyrl.js":20478,"./sr.js":45363,"./ss":37260,"./ss.js":37260,"./sv":42231,"./sv.js":42231,"./sw":27104,"./sw.js":27104,"./ta":47493,"./ta.js":47493,"./te":57705,"./te.js":57705,"./tet":94457,"./tet.js":94457,"./tg":22727,"./tg.js":22727,"./th":32206,"./th.js":32206,"./tk":33419,"./tk.js":33419,"./tl-ph":77243,"./tl-ph.js":77243,"./tlh":60016,"./tlh.js":60016,"./tr":87020,"./tr.js":87020,"./tzl":8026,"./tzl.js":8026,"./tzm":78537,"./tzm-latn":87899,"./tzm-latn.js":87899,"./tzm.js":78537,"./ug-cn":40818,"./ug-cn.js":40818,"./uk":48478,"./uk.js":48478,"./ur":77893,"./ur.js":77893,"./uz":89133,"./uz-latn":20311,"./uz-latn.js":20311,"./uz.js":89133,"./vi":52179,"./vi.js":52179,"./x-pseudo":92455,"./x-pseudo.js":92455,"./yo":3310,"./yo.js":3310,"./zh-cn":27244,"./zh-cn.js":27244,"./zh-hk":40076,"./zh-hk.js":40076,"./zh-mo":62305,"./zh-mo.js":62305,"./zh-tw":88588,"./zh-tw.js":88588};function n(e){var s=i(e);return t(s)}function i(e){if(!t.o(a,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=i,e.exports=n,n.id=61738}}]);