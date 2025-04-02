"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3341],{58211:(e,t,a)=>{a.d(t,{A:()=>y});var s=a(49257),i=a(68102),n=a(63696),l=a(68017),r=a(81023),o=a(30142),c=a(14428),d=a(28362),h=a(90013),p=a(2512),m=a(37719),u=a(62540);const g=["children","className","color","component","disabled","error","filled","focused","required"],A=(0,p.Ay)("label",{name:"MuiFormLabel",slot:"Root",overridesResolver:({ownerState:e},t)=>(0,i.A)({},t.root,"secondary"===e.color&&t.colorSecondary,e.filled&&t.filled)})((({theme:e,ownerState:t})=>(0,i.A)({color:(e.vars||e).palette.text.secondary},e.typography.body1,{lineHeight:"1.4375em",padding:0,position:"relative",[`&.${m.A.focused}`]:{color:(e.vars||e).palette[t.color].main},[`&.${m.A.disabled}`]:{color:(e.vars||e).palette.text.disabled},[`&.${m.A.error}`]:{color:(e.vars||e).palette.error.main}}))),x=(0,p.Ay)("span",{name:"MuiFormLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})((({theme:e})=>({[`&.${m.A.error}`]:{color:(e.vars||e).palette.error.main}}))),y=n.forwardRef((function(e,t){const a=(0,h.A)({props:e,name:"MuiFormLabel"}),{children:n,className:p,component:y="label"}=a,f=(0,s.A)(a,g),j=(0,c.A)(),b=(0,o.A)({props:a,muiFormControl:j,states:["color","required","focused","disabled","error","filled"]}),w=(0,i.A)({},a,{color:b.color||"primary",component:y,disabled:b.disabled,error:b.error,filled:b.filled,focused:b.focused,required:b.required}),C=(e=>{const{classes:t,color:a,focused:s,disabled:i,error:n,filled:l,required:o}=e,c={root:["root",`color${(0,d.A)(a)}`,i&&"disabled",n&&"error",l&&"filled",s&&"focused",o&&"required"],asterisk:["asterisk",n&&"error"]};return(0,r.A)(c,m.Z,t)})(w);return(0,u.jsxs)(A,(0,i.A)({as:y,ownerState:w,className:(0,l.A)(C.root,p),ref:t},f,{children:[n,b.required&&(0,u.jsxs)(x,{ownerState:w,"aria-hidden":!0,className:C.asterisk,children:[" ","*"]})]}))}))},37719:(e,t,a)=>{a.d(t,{A:()=>n,Z:()=>i});var s=a(46733);function i(e){return(0,s.A)("MuiFormLabel",e)}const n=(0,a(29009).A)("MuiFormLabel",["root","colorSecondary","focused","disabled","error","filled","required","asterisk"])},66107:(e,t,a)=>{a.d(t,{A:()=>y});var s=a(49257),i=a(68102),n=a(63696),l=a(81023),r=a(30142),o=a(14428),c=a(58211),d=a(37719),h=a(90013),p=a(2512),m=a(46733);function u(e){return(0,m.A)("MuiInputLabel",e)}(0,a(29009).A)("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);var g=a(62540);const A=["disableAnimation","margin","shrink","variant"],x=(0,p.Ay)(c.A,{shouldForwardProp:e=>(0,p.ep)(e)||"classes"===e,name:"MuiInputLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[{[`& .${d.A.asterisk}`]:t.asterisk},t.root,a.formControl&&t.formControl,"small"===a.size&&t.sizeSmall,a.shrink&&t.shrink,!a.disableAnimation&&t.animated,t[a.variant]]}})((({theme:e,ownerState:t})=>(0,i.A)({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},t.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},"small"===t.size&&{transform:"translate(0, 17px) scale(1)"},t.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!t.disableAnimation&&{transition:e.transitions.create(["color","transform","max-width"],{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut})},"filled"===t.variant&&(0,i.A)({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},"small"===t.size&&{transform:"translate(12px, 13px) scale(1)"},t.shrink&&(0,i.A)({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},"small"===t.size&&{transform:"translate(12px, 4px) scale(0.75)"})),"outlined"===t.variant&&(0,i.A)({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},"small"===t.size&&{transform:"translate(14px, 9px) scale(1)"},t.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 24px)",transform:"translate(14px, -9px) scale(0.75)"})))),y=n.forwardRef((function(e,t){const a=(0,h.A)({name:"MuiInputLabel",props:e}),{disableAnimation:n=!1,shrink:c}=a,d=(0,s.A)(a,A),p=(0,o.A)();let m=c;void 0===m&&p&&(m=p.filled||p.focused||p.adornedStart);const y=(0,r.A)({props:a,muiFormControl:p,states:["size","variant","required"]}),f=(0,i.A)({},a,{disableAnimation:n,formControl:p,shrink:m,size:y.size,variant:y.variant,required:y.required}),j=(e=>{const{classes:t,formControl:a,size:s,shrink:n,disableAnimation:r,variant:o,required:c}=e,d={root:["root",a&&"formControl",!r&&"animated",n&&"shrink","small"===s&&"sizeSmall",o],asterisk:[c&&"asterisk"]},h=(0,l.A)(d,u,t);return(0,i.A)({},t,h)})(f);return(0,g.jsx)(x,(0,i.A)({"data-shrink":m,ownerState:f,ref:t},d,{classes:j}))}))},45862:(e,t,a)=>{a.d(t,{Px:()=>r,gN:()=>o,jv:()=>l,k0:()=>c});var s=a(80325),i=a(47092),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/categories".concat(e)).then((e=>{e.data.success&&t({type:i.YE,payload:e.data.data})})).catch((e=>{}))}),r=e=>t=>{s.A.post("/superadmin/categories/store",e).then((e=>{t({type:i.tU,payload:e.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.post("/superadmin/categories/update/".concat(e),t).then((e=>{a({type:i.x4,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/categories/delete/".concat(e),t).then((e=>{a({type:i.RD,payload:e.data})})).catch((e=>{}))}},26118:(e,t,a)=>{a.d(t,{Ox:()=>h,SI:()=>g,Uf:()=>p,Z$:()=>l,Zi:()=>c,_B:()=>x,il:()=>A,kA:()=>o,qn:()=>m,sd:()=>u,wp:()=>r,zK:()=>d});var s=a(80325),i=a(68212),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/sales".concat(e)).then((e=>{e.data.success&&t({type:i.go,payload:e.data.data})})).catch((e=>{}))}),r=e=>t=>{s.A.post("/superadmin/sales/store",e).then((e=>{t({type:i.x3,payload:e.data})})).catch((e=>{}))},o=e=>t=>{s.A.get("/superadmin/sales/view/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&t({type:i.gN,payload:e.data.data})})).catch((e=>{}))},c=(e,t)=>s.A.post("/superadmin/sales-on-approve/status/".concat(e),t),d=e=>t=>{s.A.get("/superadmin/sales/edit/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&t({type:i.gN,payload:e.data.data})})).catch((e=>{}))},h=(e,t)=>a=>{s.A.post("/superadmin/sales/update/".concat(e),t).then((e=>{a({type:i.hF,payload:e.data})})).catch((e=>{}))},p=(e,t)=>a=>{s.A.delete("/superadmin/sales/delete/".concat(e),t).then((e=>{a({type:i.VW,payload:e.data})})).catch((e=>{}))},m=e=>s.A.post("/superadmin/sales/download-invoice/".concat(e)),u=e=>s.A.get("/superadmin/sales/view/".concat(e)),g=(e,t)=>s.A.post("/superadmin/sales/return/".concat(e),t),A=e=>s.A.post("/superadmin/sales/return-stock-transfer",e),x=e=>(e=(0,n.x0)(e,!0),s.A.get("/superadmin/sales-products".concat(e)))},63341:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var s=a(63696),i=a(52821),n=a(3577),l=a(44748),r=a(66593),o=a(61095),c=a(45271),d=a(41795),h=a(66107),p=a(26365),m=a(78976),u=a(49746),g=a(88441),A=a(61176),x=a(66098),y=a(50977),f=a(26118),j=a(27874),b=a(51449),w=a(45862),C=a(45892),v=a(62540);function _(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class k extends s.Component{constructor(e){super(e),_(this,"loadListData",(()=>{(0,f._B)(this.state.queryParams).then((e=>{e.data.success&&this.setState({items:e.data.data.items,price_by_categories:e.data.data.categories})}))})),_(this,"handleView",(e=>{this.props.navigate((0,C.zr)((0,C.mA)(this.state.auth))+"/sales/view/"+e.sale_id)})),_(this,"handleCategoryChange",(e=>{let t=e.target.value;this.setState({queryParams:{...this.state.queryParams,category_id:t}})})),_(this,"handleSearch",(()=>{this.loadListData()})),_(this,"handleCardClick",(e=>{this.setState({queryParams:{...this.state.queryParams,category_id:e}},(()=>{this.handleSearch()}))})),this.state={items:[],price_by_categories:[],categories:this.props.categories,queryParams:{category_id:""},auth:this.props.auth},this.columns=[{name:"image",display_name:"Image",isImage:!0},{name:"name",display_name:"Product Name"},{name:"certificate_no",display_name:"Certificate No",width:"120px"},{name:"total_weight_display",display_name:"Total Wt.",width:"90px"},{name:"stock_material_display",display_name:"Materials Name",width:"165px"},{name:"purity_display",display_name:"Purity Name",width:"165px"},{name:"weight_display",display_name:"Qty"},{name:"unit_display",display_name:"Unit"},{name:"product_code",display_name:"P Code"},{name:"size_name",display_name:"Size"},{name:"mrp_display",display_name:"Price"}],this.tableActions=[{label:"View",onClick:this.handleView,color:"primary"}]}componentDidMount(){this.loadListData(),this.props.actions.categoryList({all:1})}static getDerivedStateFromProps(e,t){let a={};return e.auth!==t.auth&&(a.auth=e.auth),e.categories!==t.categories&&(a.categories=e.categories),a}render(){return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:"sale-heading",children:(0,v.jsx)("h1",{children:"Sale Products List"})}),this.state.price_by_categories.length?(0,v.jsx)(n.A,{className:"dashboard_card",style:{marginBottom:"4px"},children:this.state.price_by_categories.map(((e,t)=>(0,v.jsxs)(l.A,{className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},onClick:()=>this.handleCardClick(e.category_id),children:[(0,v.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,v.jsx)("h1",{children:e.category_name}),(0,v.jsx)("h2",{children:(0,C.Pt)(e.total_amount)}),(0,v.jsxs)("h3",{children:[e.quantity," Piece(s)"]})]}),(0,v.jsx)("div",{className:"card-icon"})]},t)))}):null,(0,v.jsxs)(x.A,{children:[(0,v.jsx)(o.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,v.jsxs)(c.Ay,{container:!0,spacing:2,className:"tax-input loans_view p_view",columnSpacing:{xs:1,sm:2,md:2},children:[(0,v.jsx)(c.Ay,{item:!0,xs:6,md:3,className:"create-input",children:(0,v.jsxs)(d.A,{fullWidth:!0,children:[(0,v.jsx)(h.A,{children:"Category"}),(0,v.jsxs)(p.A,{value:this.state.queryParams.category_id,label:"Category",onChange:this.handleCategoryChange,className:"input-inner",defaultValue:"",children:[(0,v.jsx)(m.A,{value:"",children:"All"}),this.state.categories.map(((e,t)=>(0,v.jsx)(m.A,{value:e.id,children:e.name},t)))]})]})}),(0,v.jsx)(c.Ay,{item:!0,xs:6,md:1,className:"create-input order-input button-right",children:(0,v.jsx)(u.A,{variant:"contained",className:"search-btn",onClick:this.handleSearch,children:"Search"})})]})}),(0,v.jsx)(c.Ay,{container:!0,spacing:A.iL,className:"orders-sale-button",children:(0,v.jsx)(j.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.items.length,havePagination:!1,actions:this.tableActions})})]})]})}}const S=(0,b.Gh)((0,y.A)((0,i.connect)((e=>({categories:e.superadmin.category.items,auth:e.auth})),(e=>({dispatch:e,actions:(0,g.bindActionCreators)({categoryList:w.jv},e)})))(k)))},27874:(e,t,a)=>{a.d(t,{A:()=>E});var s=a(63696),i=a(36846),n=a(46133),l=a(72839),r=a(49746),o=a(45271),c=a(41795),d=a(26365),h=a(78976),p=a(2626),m=a(98993),u=a(73947),g=a(10228),A=a(45166),x=a(2598),y=a(55186),f=a(25606),j=a(24019),b=a(62688),w=a.n(b),C=a(89429),v=a(29443),_=a(52805),k=a(79859),S=a(43191),N=a(45892),P=a(16638),D=a(97217),q=a(60669),V=a(86074),L=a(35008),I=a(78061),O=a(81117),z=a(51223),F=a(37001),W=a(37086),M=a(55063),B=a(71086),R=a(62540);function H(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class $ extends s.Component{constructor(e){super(e),H(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),H(this,"getArrayComponent",((e,t)=>(0,R.jsx)(R.Fragment,{children:e.map(((e,a)=>(0,R.jsxs)(s.Fragment,{children:[e,!1!==t?(0,R.jsx)(R.Fragment,{children:" "}):""]},a)))}))),H(this,"getData",(e=>{let t=[];for(let a of this.state.columns){let s=a.name in e?e[a.name]:"";if(Array.isArray(s))if("show_tag"in a){let e=[];for(let t=0;t<s.length;t++)e.push((0,R.jsx)(i.A,{label:s[t][a.array_key],color:"primary"}));s=this.getArrayComponent(e)}else{let e=[];if("array_key"in a){for(let t=0;t<s.length;t++)e.push(s[t][a.array_key]);s=e}s=(0,N.Gp)(s.join("\n"))}else{if("show_tag"in a){let t="primary";if("color_conditions"in a){for(let s=0;s<a.color_conditions.length;s++)if(a.color_conditions[s].value==e[a.color_conditions[s].key]){t=a.color_conditions[s].color;break}}else"Status"==a.display_name&&(t=(0,N.qY)(s));if(s=s?(0,R.jsx)(i.A,{label:s,color:t}):"","showAttendenceAddress"in a&&a.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),s=[s].concat(t),s=this.getArrayComponent(s,!1)}if("redirectToMap"in a&&a.redirectToMap){let t=[(0,R.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:s})];s=this.getArrayComponent(t,!1)}}"isBold"in a&&a.isBold&&(s=this.getArrayComponent([(0,R.jsx)("b",{children:s})]))}if("isImage"in a&&a.isImage){let e={width:"isBanner"in a&&a.isBanner?"200px":"60px"};"isBanner"in a&&a.isBanner||(e.height="40px"),t.push((0,R.jsx)("img",{src:s,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(s)}))}else if("isRating"in a&&a.isRating)t.push((0,R.jsx)(n.A,{name:"read-only",value:s,readOnly:!0}));else{let i="";if("class_conditions"in a)for(let t=0;t<a.class_conditions.length;t++)if(a.class_conditions[t].value==e[a.class_conditions[t].key]){i=a.class_conditions[t].class_name;break}"isHtml"in a&&a.isHtml&&(s=this.getArrayComponent([(0,R.jsx)("span",{dangerouslySetInnerHTML:{__html:s}})])),i&&(s=this.getArrayComponent([(0,R.jsx)("span",{className:i,children:s})])),t.push(s)}}return t})),H(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,R.jsx)(D.A,{});case"Delete":return(0,R.jsx)(P.A,{});case"View":return(0,R.jsx)(q.A,{});case"+":return(0,R.jsx)(V.A,{});case"Download":return(0,R.jsx)(L.A,{});case"green_tick":return(0,R.jsx)(I.A,{});case"Accept":return(0,R.jsx)(O.A,{});case"Decline":return(0,R.jsx)(z.A,{});case"Close":return(0,R.jsx)(F.A,{});case"Return":return(0,R.jsx)(W.A,{});case"Assign":return(0,R.jsx)(M.A,{});case"Permissions":return(0,R.jsx)(B.A,{})}})),H(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),H(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),H(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),H(this,"checkActionBtnCondtion",((e,t)=>{let a=[];for(let s=0;s<e.length;s++)"con_type"in e[s]?t[e[s].key]!=e[s].value&&a.push(!0):t[e[s].key]==e[s].value&&a.push(!0);return a.length==e.length})),H(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),H(this,"getActionValueStyle",(e=>{let t="";for(let a=0;a<this.state.actionValueColorConditions.length;a++)if(this.state.actionValueColorConditions[a].value==e){t=this.state.actionValueColorConditions[a].color;break}return t?{color:t}:{}})),H(this,"getSerialNo",((e,t,a)=>{let s=(t-1)*a+e+1;return s<10?"0"+s:s})),H(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),H(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),H(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let a={};return e.rows!==t.rows&&(a.rows=e.rows),e.page!==t.page&&(a.page=e.page),e.total!==t.total&&(a.total=e.total),e.actions!==t.actions&&(a.actions=e.actions),a}render(){const{rows:e,columnAlign:t,rowAlign:a,total:i,limit:n,page:b,columns:w,actions:N,havePagination:P,haveAllOption:D,showAll:q,stickyHeader:V}=this.state,L=q?1:Math.ceil(i/n);return(0,R.jsxs)(x.A,{component:j.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,R.jsxs)(m.A,{sx:{minWidth:500},stickyHeader:V,children:[(0,R.jsx)(u.A,{className:"ratn-table-header",children:(0,R.jsxs)(f.A,{children:[this.state.showSerialNo?(0,R.jsx)(A.A,{align:t,children:"#"}):null,w.map(((e,a)=>(0,R.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,R.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},a))),N.length||""!=this.state.actionValue?(0,R.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,R.jsxs)(g.A,{children:[e.map(((e,t)=>(0,R.jsxs)(f.A,{children:[this.state.showSerialNo?(0,R.jsx)(A.A,{align:a,children:this.getSerialNo(t,b,n)}):null,this.getData(e).map(((e,s)=>(0,R.jsx)(A.A,{align:a,children:e},t+s))),N.length||""!=this.state.actionValue?(0,R.jsxs)(A.A,{align:a,className:"action_btn",children:[N.length?(0,R.jsx)(l.A,{spacing:1,direction:"row",justifyContent:a,alignItems:a,children:N.map(((t,a)=>(0,R.jsx)(s.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,R.jsx)(r.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+a)},a)))}):null,""!=this.state.actionValue?(0,R.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,R.jsx)(f.A,{children:(0,R.jsx)(A.A,{align:"center",colSpan:w.length+N.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,R.jsx)(y.A,{children:(0,R.jsx)(f.A,{})})]}),i>0&&P?(0,R.jsxs)(o.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[D?(0,R.jsx)(o.Ay,{item:!0,xs:2,children:(0,R.jsx)(c.A,{size:"small",children:(0,R.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,R.jsx)(h.A,{value:n,children:n}),(0,R.jsx)(h.A,{value:"all",children:"All"})]})})}):null,(0,R.jsx)(o.Ay,{item:!0,xs:D?10:12,children:(0,R.jsx)(p.A,{count:L,page:b,onChange:this.handleChangePage})})]}):null,(0,R.jsxs)(C.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,R.jsx)(S.A,{children:"Delete"}),(0,R.jsx)(_.A,{children:(0,R.jsx)(k.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,R.jsx)(v.A,{children:(0,R.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,R.jsx)(r.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,R.jsx)(r.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,R.jsxs)(C.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,R.jsx)(S.A,{children:(0,R.jsx)(F.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,R.jsx)(_.A,{children:(0,R.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}$.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},$.propTypes={minWidth:w().number,columns:w().array,actionValueColorConditions:w().array,rows:w().array,page:w().number,limit:w().number,total:w().number,columnAlign:w().string,actionValue:w().string,rowAlign:w().string,haveAction:w().bool,actions:w().array,havePagination:w().bool,showSerialNo:w().bool,loading:w().bool,stickyHeader:w().bool};const E=$}}]);