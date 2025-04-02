"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4497],{86552:(e,t,a)=>{a.d(t,{EM:()=>c,HH:()=>l,LT:()=>o,kX:()=>r});var s=a(80325),i=a(86418),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/countries".concat(e)).then((e=>{e.data.success&&t({type:i.GO,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/countries/store",e).then((e=>{e.data.success&&t({type:i.bT,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.post("/superadmin/countries/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.v$,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/countries/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.bI,payload:e.data})})).catch((e=>{}))}},44962:(e,t,a)=>{a.d(t,{Oo:()=>c,P9:()=>o,PV:()=>l,XG:()=>m,cQ:()=>d,gC:()=>h,hO:()=>p,jy:()=>r,y8:()=>u});var s=a(80325),i=a(70408),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/retailers".concat(e)).then((e=>{e.data.success&&t({type:i.RK,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/retailers/store",e).then((e=>{t({type:i.KC,payload:e.data})})).catch((e=>{}))},r=e=>t=>{s.A.get("/superadmin/retailers/fetch/".concat(e)).then((e=>{e.data.success&&t({type:i.$x,payload:e.data.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.post("/superadmin/retailers/update/".concat(e),t).then((e=>{a({type:i.Ao,payload:e.data})})).catch((e=>{}))},d=(e,t)=>a=>{s.A.delete("/superadmin/retailers/delete/".concat(e),t).then((e=>{a({type:i.i_,payload:e.data})})).catch((e=>{}))},h=e=>t=>{s.A.post("/superadmin/retailers/reviews/store",e).then((e=>{t({type:i.KC,payload:e.data})})).catch((e=>{}))},p=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/retailers/reviews".concat(e)).then((e=>{e.data.success&&t({type:i.Io,payload:e.data.data})})).catch((e=>{}))}),u=(e,t)=>a=>{s.A.post("/superadmin/retailers/review/update/".concat(e),t).then((e=>{a({type:i.Ao,payload:e.data})})).catch((e=>{}))},m=(e,t)=>s.A.get("/superadmin/retailers/my-review/".concat(e))},4497:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var s=a(63696),i=a(52821),n=a(3577),l=a(44748),o=a(66593),r=a(49746),c=a(45271),d=a(88441),h=a(61176),p=a(66098),u=a(50977),m=a(44962),g=a(86552),A=a(27874),x=a(70408),y=a(45892),_=a(89429),j=a(29443),C=a(52805),b=a(79859),f=a(62540);function w(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class v extends s.Component{constructor(e){super(e),w(this,"loadListData",(()=>{this.props.actions.retailerList(this.state.queryParams)})),w(this,"handlePagination",((e,t)=>{this.state.queryParams.page=e,this.state.queryParams.all=t?1:0,this.loadListData()})),w(this,"handleEdit",(e=>{this.props.navigate((0,y.zr)((0,y.mA)(this.state.auth))+"/retailers/edit/"+e.id)})),w(this,"handleView",(e=>{this.props.navigate((0,y.zr)((0,y.mA)(this.state.auth))+"/retailers/view/"+e.id)})),w(this,"dialogClose",(()=>{this.setState({dialogOpen:!1})})),w(this,"handleDelete",(e=>{this.props.actions.retailerDelete(e.id)})),this.state={...this.props,queryParams:{page:1,limit:50,my_retailer:1,all:0},deleteSuccess:this.props.deleteSuccess,countries:this.props.countries,dialogOpen:!1},this.isDistributor=(0,y.mb)(),this.isSalesExecutive=(0,y.$S)(),this.columns=[{name:"company_name",display_name:"Company Name"},{name:"mobile",display_name:"Contact Number"},{name:"city",display_name:"City"},{name:"total_amount_display",display_name:"Total Amount",className:"amount_column",isBold:!0},{name:"total_return_display",display_name:"Total Return",className:"amount_column",isBold:!0},{name:"paid_amount_display",display_name:"Paid Amount",className:"amount_column",isBold:!0},{name:"due_amount_display",display_name:"Due Amount",className:"amount_column",isBold:!0}],this.tableActions=[{label:"View",onClick:this.handleView,color:"primary"},{label:"Edit",onClick:this.handleEdit,color:"primary"}],this.isDistributor||this.isSalesExecutive||this.tableActions.push({label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error"})}componentDidMount(){this.loadListData(),this.props.actions.countryList({all:1})}static getDerivedStateFromProps(e,t){let a={};return e.items!==t.items&&(a.items=e.items),e.total!==t.total&&(a.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(a.deleteSuccess=e.deleteSuccess),e.countries!==t.countries&&(a.countries=e.countries),e.total_sale!==t.total_sale&&(a.total_sale=e.total_sale),e.total_sale_due!==t.total_sale_due&&(a.total_sale_due=e.total_sale_due),e.total_sale_paid!==t.total_sale_paid&&(a.total_sale_paid=e.total_sale_paid),e.total_sale_return!==t.total_sale_return&&(a.total_sale_return=e.total_sale_return),e.auth!==t.auth&&(a.auth=e.auth),a}componentDidUpdate(e,t){if(this.state.deleteSuccess){const{dispatch:e}=this.props;e({type:x.eU}),this.handlePagination(1)}}render(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(n.A,{className:"dashboard_card supplier-card",style:{marginBottom:"16px"},children:[(0,f.jsxs)(l.A,{className:"dashboard_card_content user-bg-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsxs)(o.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,f.jsx)("h1",{children:"Total Sales"}),(0,f.jsx)("h2",{children:(0,y.Pt)(this.state.total_sale)})]}),(0,f.jsx)("div",{className:"card-icon"})]}),(0,f.jsxs)(l.A,{className:"dashboard_card_content user-bg-2",sx:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsxs)(o.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,f.jsx)("h1",{children:"Total Return"}),(0,f.jsx)("h2",{children:(0,y.Pt)(this.state.total_sale_return)})]}),(0,f.jsx)("div",{className:"card-icon"})]}),(0,f.jsxs)(l.A,{className:"dashboard_card_content user-bg-3",sx:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsxs)(o.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,f.jsx)("h1",{children:"Total Paid"}),(0,f.jsx)("h2",{children:(0,y.Pt)(this.state.total_sale_paid)})]}),(0,f.jsx)("div",{className:"card-icon"})]}),(0,f.jsxs)(l.A,{className:"dashboard_card_content user-bg-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsxs)(o.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,f.jsx)("h1",{children:"Total Due"}),(0,f.jsx)("h2",{children:(0,y.Pt)(this.state.total_sale_due)})]}),(0,f.jsx)("div",{className:"card-icon"})]})]}),(0,f.jsxs)(p.A,{title:"My Retailers",secondary:(0,f.jsx)(r.A,{variant:"contained",onClick:()=>this.props.navigate((0,y.zr)((0,y.mA)(this.state.auth))+"/retailers/create"),children:"Add"}),children:[(0,f.jsx)(c.Ay,{container:!0,spacing:h.iL,className:"abc",children:(0,f.jsx)(A.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions,haveAllOption:!0})}),(0,f.jsxs)(_.A,{className:"ratn-dialog-footer delete_modal",open:this.state.dialogOpen,onClose:this.dialogClose,fullWidth:!0,maxWidth:"xs",children:[(0,f.jsx)(C.A,{children:(0,f.jsx)(b.A,{id:"alert-dialog-slide-description",children:"Coming Soon!"})}),(0,f.jsx)(j.A,{children:(0,f.jsx)("div",{className:"ratn-footer-buttons",children:(0,f.jsx)(r.A,{onClick:this.dialogClose,className:"conf-button",children:"Close"})})})]})]})]})}}const k=(0,u.A)((0,i.connect)((e=>({items:e.superadmin.retailer.items,total:e.superadmin.retailer.total,total_sale:e.superadmin.retailer.total_sale,total_sale_due:e.superadmin.retailer.total_sale_due,total_sale_paid:e.superadmin.retailer.total_sale_paid,total_sale_return:e.superadmin.retailer.total_sale_return,countries:e.superadmin.country.items||[],deleteSuccess:e.superadmin.retailer.deleteSuccess,auth:e.auth})),(e=>({dispatch:e,actions:(0,d.bindActionCreators)({retailerList:m.PV,retailerDelete:m.cQ,countryList:g.HH},e)})))(v))},27874:(e,t,a)=>{a.d(t,{A:()=>M});var s=a(63696),i=a(36846),n=a(46133),l=a(72839),o=a(49746),r=a(45271),c=a(41795),d=a(26365),h=a(78976),p=a(2626),u=a(98993),m=a(73947),g=a(10228),A=a(45166),x=a(2598),y=a(55186),_=a(25606),j=a(24019),C=a(62688),b=a.n(C),f=a(89429),w=a(29443),v=a(52805),k=a(79859),N=a(43191),S=a(45892),D=a(16638),P=a(97217),V=a(60669),O=a(86074),B=a(35008),L=a(78061),H=a(81117),I=a(51223),T=a(37001),F=a(37086),R=a(55063),W=a(71086),z=a(62540);function q(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class E extends s.Component{constructor(e){super(e),q(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),q(this,"getArrayComponent",((e,t)=>(0,z.jsx)(z.Fragment,{children:e.map(((e,a)=>(0,z.jsxs)(s.Fragment,{children:[e,!1!==t?(0,z.jsx)(z.Fragment,{children:" "}):""]},a)))}))),q(this,"getData",(e=>{let t=[];for(let a of this.state.columns){let s=a.name in e?e[a.name]:"";if(Array.isArray(s))if("show_tag"in a){let e=[];for(let t=0;t<s.length;t++)e.push((0,z.jsx)(i.A,{label:s[t][a.array_key],color:"primary"}));s=this.getArrayComponent(e)}else{let e=[];if("array_key"in a){for(let t=0;t<s.length;t++)e.push(s[t][a.array_key]);s=e}s=(0,S.Gp)(s.join("\n"))}else{if("show_tag"in a){let t="primary";if("color_conditions"in a){for(let s=0;s<a.color_conditions.length;s++)if(a.color_conditions[s].value==e[a.color_conditions[s].key]){t=a.color_conditions[s].color;break}}else"Status"==a.display_name&&(t=(0,S.qY)(s));if(s=s?(0,z.jsx)(i.A,{label:s,color:t}):"","showAttendenceAddress"in a&&a.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,z.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,z.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),s=[s].concat(t),s=this.getArrayComponent(s,!1)}if("redirectToMap"in a&&a.redirectToMap){let t=[(0,z.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:s})];s=this.getArrayComponent(t,!1)}}"isBold"in a&&a.isBold&&(s=this.getArrayComponent([(0,z.jsx)("b",{children:s})]))}if("isImage"in a&&a.isImage){let e={width:"isBanner"in a&&a.isBanner?"200px":"60px"};"isBanner"in a&&a.isBanner||(e.height="40px"),t.push((0,z.jsx)("img",{src:s,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(s)}))}else if("isRating"in a&&a.isRating)t.push((0,z.jsx)(n.A,{name:"read-only",value:s,readOnly:!0}));else{let i="";if("class_conditions"in a)for(let t=0;t<a.class_conditions.length;t++)if(a.class_conditions[t].value==e[a.class_conditions[t].key]){i=a.class_conditions[t].class_name;break}"isHtml"in a&&a.isHtml&&(s=this.getArrayComponent([(0,z.jsx)("span",{dangerouslySetInnerHTML:{__html:s}})])),i&&(s=this.getArrayComponent([(0,z.jsx)("span",{className:i,children:s})])),t.push(s)}}return t})),q(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,z.jsx)(P.A,{});case"Delete":return(0,z.jsx)(D.A,{});case"View":return(0,z.jsx)(V.A,{});case"+":return(0,z.jsx)(O.A,{});case"Download":return(0,z.jsx)(B.A,{});case"green_tick":return(0,z.jsx)(L.A,{});case"Accept":return(0,z.jsx)(H.A,{});case"Decline":return(0,z.jsx)(I.A,{});case"Close":return(0,z.jsx)(T.A,{});case"Return":return(0,z.jsx)(F.A,{});case"Assign":return(0,z.jsx)(R.A,{});case"Permissions":return(0,z.jsx)(W.A,{})}})),q(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),q(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),q(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),q(this,"checkActionBtnCondtion",((e,t)=>{let a=[];for(let s=0;s<e.length;s++)"con_type"in e[s]?t[e[s].key]!=e[s].value&&a.push(!0):t[e[s].key]==e[s].value&&a.push(!0);return a.length==e.length})),q(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),q(this,"getActionValueStyle",(e=>{let t="";for(let a=0;a<this.state.actionValueColorConditions.length;a++)if(this.state.actionValueColorConditions[a].value==e){t=this.state.actionValueColorConditions[a].color;break}return t?{color:t}:{}})),q(this,"getSerialNo",((e,t,a)=>{let s=(t-1)*a+e+1;return s<10?"0"+s:s})),q(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),q(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),q(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let a={};return e.rows!==t.rows&&(a.rows=e.rows),e.page!==t.page&&(a.page=e.page),e.total!==t.total&&(a.total=e.total),e.actions!==t.actions&&(a.actions=e.actions),a}render(){const{rows:e,columnAlign:t,rowAlign:a,total:i,limit:n,page:C,columns:b,actions:S,havePagination:D,haveAllOption:P,showAll:V,stickyHeader:O}=this.state,B=V?1:Math.ceil(i/n);return(0,z.jsxs)(x.A,{component:j.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,z.jsxs)(u.A,{sx:{minWidth:500},stickyHeader:O,children:[(0,z.jsx)(m.A,{className:"ratn-table-header",children:(0,z.jsxs)(_.A,{children:[this.state.showSerialNo?(0,z.jsx)(A.A,{align:t,children:"#"}):null,b.map(((e,a)=>(0,z.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,z.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},a))),S.length||""!=this.state.actionValue?(0,z.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,z.jsxs)(g.A,{children:[e.map(((e,t)=>(0,z.jsxs)(_.A,{children:[this.state.showSerialNo?(0,z.jsx)(A.A,{align:a,children:this.getSerialNo(t,C,n)}):null,this.getData(e).map(((e,s)=>(0,z.jsx)(A.A,{align:a,children:e},t+s))),S.length||""!=this.state.actionValue?(0,z.jsxs)(A.A,{align:a,className:"action_btn",children:[S.length?(0,z.jsx)(l.A,{spacing:1,direction:"row",justifyContent:a,alignItems:a,children:S.map(((t,a)=>(0,z.jsx)(s.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,z.jsx)(o.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+a)},a)))}):null,""!=this.state.actionValue?(0,z.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,z.jsx)(_.A,{children:(0,z.jsx)(A.A,{align:"center",colSpan:b.length+S.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,z.jsx)(y.A,{children:(0,z.jsx)(_.A,{})})]}),i>0&&D?(0,z.jsxs)(r.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[P?(0,z.jsx)(r.Ay,{item:!0,xs:2,children:(0,z.jsx)(c.A,{size:"small",children:(0,z.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,z.jsx)(h.A,{value:n,children:n}),(0,z.jsx)(h.A,{value:"all",children:"All"})]})})}):null,(0,z.jsx)(r.Ay,{item:!0,xs:P?10:12,children:(0,z.jsx)(p.A,{count:B,page:C,onChange:this.handleChangePage})})]}):null,(0,z.jsxs)(f.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,z.jsx)(N.A,{children:"Delete"}),(0,z.jsx)(v.A,{children:(0,z.jsx)(k.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,z.jsx)(w.A,{children:(0,z.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,z.jsx)(o.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,z.jsx)(o.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,z.jsxs)(f.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,z.jsx)(N.A,{children:(0,z.jsx)(T.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,z.jsx)(v.A,{children:(0,z.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}E.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},E.propTypes={minWidth:b().number,columns:b().array,actionValueColorConditions:b().array,rows:b().array,page:b().number,limit:b().number,total:b().number,columnAlign:b().string,actionValue:b().string,rowAlign:b().string,haveAction:b().bool,actions:b().array,havePagination:b().bool,showSerialNo:b().bool,loading:b().bool,stickyHeader:b().bool};const M=E}}]);