(self.webpackChunk=self.webpackChunk||[]).push([[4342],{53669:(e,t,s)=>{"use strict";s.d(t,{SU:()=>o,U0:()=>r,rY:()=>l});var a=s(80325),n=s(99824),i=s(45892);const l=e=>(e=(0,i.x0)(e,!0),t=>{a.A.get("/admin/orders".concat(e)).then((e=>{e.data.success&&t({type:n.l3,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{a.A.post("/admin/orders/place-order",e).then((e=>{t({type:n.eG,payload:e.data})})).catch((e=>{}))},r=e=>t=>{a.A.get("/admin/orders/fetch/".concat(e)).then((e=>{e.data.success&&t({type:n.Ve,payload:e.data.data})})).catch((e=>{}))}},59333:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>D});var a=s(63696),n=s(52821),i=s(45271),l=s(41795),o=s(66107),r=s(26365),h=s(78976),d=s(49746),c=s(88441),m=s(61176),j=s(66098),u=s(50977),p=s(53669),g=s(27874),A=s(51449),x=s(36122),y=s(15164),b=s(79731),f=s(37046),_=s(42689),k=s.n(_),v=s(62540);function C(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class w extends a.Component{constructor(e){super(e),C(this,"loadListData",(()=>{let e={...this.state.queryParams};e.date_from&&(e.date_from=k()(e.date_from.toString()).format("YYYY-MM-DD")),e.date_to&&(e.date_to=k()(e.date_to.toString()).format("YYYY-MM-DD")),this.props.orderList(e)})),C(this,"handlePagination",(e=>{this.setState({queryParams:{...this.state.queryParams,page:e}},(()=>{this.loadListData()}))})),C(this,"handleView",(e=>{this.props.navigate("view/"+e.id)})),C(this,"updateQueryParams",((e,t)=>{this.setState({queryParams:{...this.state.queryParams,[t]:e}})})),C(this,"handleSearch",(()=>{this.loadListData()})),this.state={items:this.props.items,total:this.props.total,queryParams:{page:1,limit:50,date_from:null,date_to:null}},this.columns=[{name:"order_from",display_name:"Order From"},{name:"order_by",display_name:"Order By"},{name:"order_no",display_name:"Order #"},{name:"order_date",display_name:"Order Date"},{name:"no_of_products",display_name:"No of Prod"},{name:"total_amount",display_name:"Order Value"},{name:"city",display_name:"City"},{name:"mobile",display_name:"Mobile"},{name:"sale_executive_name",display_name:"Assign To"},{name:"status_display",display_name:"Status",show_tag:!0}],this.tableActions=[{label:"View",onClick:this.handleView,color:"primary"}]}componentDidMount(){this.loadListData()}static getDerivedStateFromProps(e,t){let s={};return e.items!==t.items&&(s.items=e.items),e.total!==t.total&&(s.total=e.total),s}render(){return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(j.A,{title:"Orders",children:[(0,v.jsxs)(i.Ay,{container:!0,spacing:m.iL,sx:{mb:2},children:[(0,v.jsx)(i.Ay,{item:!0,xs:4,className:"create-input",children:(0,v.jsxs)(l.A,{fullWidth:!0,children:[(0,v.jsx)(o.A,{children:"Status"}),(0,v.jsxs)(r.A,{className:"input-inner",value:this.state.queryParams.status,fullWidth:!0,label:"Status",defaultValue:"",onChange:e=>this.updateQueryParams(e.target.value,"status"),children:[(0,v.jsx)(h.A,{value:""}),(0,v.jsx)(h.A,{value:"pending",children:"Pending"}),(0,v.jsx)(h.A,{value:"accepted",children:"Accepted"}),(0,v.jsx)(h.A,{value:"shipped",children:"Shipped"}),(0,v.jsx)(h.A,{value:"out_for_delivery",children:"Out For Delivery"}),(0,v.jsx)(h.A,{value:"delivered",children:"Delivered"}),(0,v.jsx)(h.A,{value:"cancelled",children:"Cancelled"})]})]})}),(0,v.jsx)(i.Ay,{item:!0,xs:3,children:(0,v.jsx)(b.$,{dateAdapter:y.R,children:(0,v.jsx)(f.l,{label:"Date From",inputFormat:"DD/MM/YYYY",value:this.state.queryParams.date_from,onChange:e=>this.updateQueryParams(e,"date_from"),renderInput:e=>(0,v.jsx)(x.A,{...e})})})}),(0,v.jsx)(i.Ay,{item:!0,xs:3,children:(0,v.jsx)(b.$,{dateAdapter:y.R,children:(0,v.jsx)(f.l,{label:"Date To",inputFormat:"DD/MM/YYYY",value:this.state.queryParams.date_to,onChange:e=>this.updateQueryParams(e,"date_to"),renderInput:e=>(0,v.jsx)(x.A,{...e})})})}),(0,v.jsx)(i.Ay,{item:!0,xs:12,md:1,className:"create-input button-right",children:(0,v.jsx)(d.A,{variant:"contained",className:"search-btn",onClick:this.handleSearch,children:"Search"})})]}),(0,v.jsx)(i.Ay,{container:!0,spacing:m.iL,children:(0,v.jsx)(g.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})]})})}}const D=(0,A.Gh)((0,u.A)((0,n.connect)((e=>({items:e.admin.orders.items,total:e.admin.orders.total})),(e=>({dispatch:e,...(0,c.bindActionCreators)({orderList:p.rY},e)})))(w)))},27874:(e,t,s)=>{"use strict";s.d(t,{A:()=>T});var a=s(63696),n=s(36846),i=s(46133),l=s(72839),o=s(49746),r=s(45271),h=s(41795),d=s(26365),c=s(78976),m=s(2626),j=s(98993),u=s(73947),p=s(10228),g=s(45166),A=s(2598),x=s(55186),y=s(25606),b=s(24019),f=s(62688),_=s.n(f),k=s(89429),v=s(29443),C=s(52805),w=s(79859),D=s(43191),P=s(45892),S=s(16638),N=s(97217),O=s(60669),z=s(86074),V=s(35008),Y=s(78061),F=s(81117),L=s(51223),M=s(37001),q=s(37086),I=s(55063),B=s(71086),H=s(62540);function W(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class R extends a.Component{constructor(e){super(e),W(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),W(this,"getArrayComponent",((e,t)=>(0,H.jsx)(H.Fragment,{children:e.map(((e,s)=>(0,H.jsxs)(a.Fragment,{children:[e,!1!==t?(0,H.jsx)(H.Fragment,{children:" "}):""]},s)))}))),W(this,"getData",(e=>{let t=[];for(let s of this.state.columns){let a=s.name in e?e[s.name]:"";if(Array.isArray(a))if("show_tag"in s){let e=[];for(let t=0;t<a.length;t++)e.push((0,H.jsx)(n.A,{label:a[t][s.array_key],color:"primary"}));a=this.getArrayComponent(e)}else{let e=[];if("array_key"in s){for(let t=0;t<a.length;t++)e.push(a[t][s.array_key]);a=e}a=(0,P.Gp)(a.join("\n"))}else{if("show_tag"in s){let t="primary";if("color_conditions"in s){for(let a=0;a<s.color_conditions.length;a++)if(s.color_conditions[a].value==e[s.color_conditions[a].key]){t=s.color_conditions[a].color;break}}else"Status"==s.display_name&&(t=(0,P.qY)(a));if(a=a?(0,H.jsx)(n.A,{label:a,color:t}):"","showAttendenceAddress"in s&&s.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),a=[a].concat(t),a=this.getArrayComponent(a,!1)}if("redirectToMap"in s&&s.redirectToMap){let t=[(0,H.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:a})];a=this.getArrayComponent(t,!1)}}"isBold"in s&&s.isBold&&(a=this.getArrayComponent([(0,H.jsx)("b",{children:a})]))}if("isImage"in s&&s.isImage){let e={width:"isBanner"in s&&s.isBanner?"200px":"60px"};"isBanner"in s&&s.isBanner||(e.height="40px"),t.push((0,H.jsx)("img",{src:a,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(a)}))}else if("isRating"in s&&s.isRating)t.push((0,H.jsx)(i.A,{name:"read-only",value:a,readOnly:!0}));else{let n="";if("class_conditions"in s)for(let t=0;t<s.class_conditions.length;t++)if(s.class_conditions[t].value==e[s.class_conditions[t].key]){n=s.class_conditions[t].class_name;break}"isHtml"in s&&s.isHtml&&(a=this.getArrayComponent([(0,H.jsx)("span",{dangerouslySetInnerHTML:{__html:a}})])),n&&(a=this.getArrayComponent([(0,H.jsx)("span",{className:n,children:a})])),t.push(a)}}return t})),W(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,H.jsx)(N.A,{});case"Delete":return(0,H.jsx)(S.A,{});case"View":return(0,H.jsx)(O.A,{});case"+":return(0,H.jsx)(z.A,{});case"Download":return(0,H.jsx)(V.A,{});case"green_tick":return(0,H.jsx)(Y.A,{});case"Accept":return(0,H.jsx)(F.A,{});case"Decline":return(0,H.jsx)(L.A,{});case"Close":return(0,H.jsx)(M.A,{});case"Return":return(0,H.jsx)(q.A,{});case"Assign":return(0,H.jsx)(I.A,{});case"Permissions":return(0,H.jsx)(B.A,{})}})),W(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),W(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),W(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),W(this,"checkActionBtnCondtion",((e,t)=>{let s=[];for(let a=0;a<e.length;a++)"con_type"in e[a]?t[e[a].key]!=e[a].value&&s.push(!0):t[e[a].key]==e[a].value&&s.push(!0);return s.length==e.length})),W(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),W(this,"getActionValueStyle",(e=>{let t="";for(let s=0;s<this.state.actionValueColorConditions.length;s++)if(this.state.actionValueColorConditions[s].value==e){t=this.state.actionValueColorConditions[s].color;break}return t?{color:t}:{}})),W(this,"getSerialNo",((e,t,s)=>{let a=(t-1)*s+e+1;return a<10?"0"+a:a})),W(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),W(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),W(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let s={};return e.rows!==t.rows&&(s.rows=e.rows),e.page!==t.page&&(s.page=e.page),e.total!==t.total&&(s.total=e.total),e.actions!==t.actions&&(s.actions=e.actions),s}render(){const{rows:e,columnAlign:t,rowAlign:s,total:n,limit:i,page:f,columns:_,actions:P,havePagination:S,haveAllOption:N,showAll:O,stickyHeader:z}=this.state,V=O?1:Math.ceil(n/i);return(0,H.jsxs)(A.A,{component:b.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,H.jsxs)(j.A,{sx:{minWidth:500},stickyHeader:z,children:[(0,H.jsx)(u.A,{className:"ratn-table-header",children:(0,H.jsxs)(y.A,{children:[this.state.showSerialNo?(0,H.jsx)(g.A,{align:t,children:"#"}):null,_.map(((e,s)=>(0,H.jsxs)(g.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,H.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},s))),P.length||""!=this.state.actionValue?(0,H.jsx)(g.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,H.jsxs)(p.A,{children:[e.map(((e,t)=>(0,H.jsxs)(y.A,{children:[this.state.showSerialNo?(0,H.jsx)(g.A,{align:s,children:this.getSerialNo(t,f,i)}):null,this.getData(e).map(((e,a)=>(0,H.jsx)(g.A,{align:s,children:e},t+a))),P.length||""!=this.state.actionValue?(0,H.jsxs)(g.A,{align:s,className:"action_btn",children:[P.length?(0,H.jsx)(l.A,{spacing:1,direction:"row",justifyContent:s,alignItems:s,children:P.map(((t,s)=>(0,H.jsx)(a.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,H.jsx)(o.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+s)},s)))}):null,""!=this.state.actionValue?(0,H.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,H.jsx)(y.A,{children:(0,H.jsx)(g.A,{align:"center",colSpan:_.length+P.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,H.jsx)(x.A,{children:(0,H.jsx)(y.A,{})})]}),n>0&&S?(0,H.jsxs)(r.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[N?(0,H.jsx)(r.Ay,{item:!0,xs:2,children:(0,H.jsx)(h.A,{size:"small",children:(0,H.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,H.jsx)(c.A,{value:i,children:i}),(0,H.jsx)(c.A,{value:"all",children:"All"})]})})}):null,(0,H.jsx)(r.Ay,{item:!0,xs:N?10:12,children:(0,H.jsx)(m.A,{count:V,page:f,onChange:this.handleChangePage})})]}):null,(0,H.jsxs)(k.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,H.jsx)(D.A,{children:"Delete"}),(0,H.jsx)(C.A,{children:(0,H.jsx)(w.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,H.jsx)(v.A,{children:(0,H.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,H.jsx)(o.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,H.jsx)(o.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,H.jsxs)(k.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,H.jsx)(D.A,{children:(0,H.jsx)(M.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,H.jsx)(C.A,{children:(0,H.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}R.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},R.propTypes={minWidth:_().number,columns:_().array,actionValueColorConditions:_().array,rows:_().array,page:_().number,limit:_().number,total:_().number,columnAlign:_().string,actionValue:_().string,rowAlign:_().string,haveAction:_().bool,actions:_().array,havePagination:_().bool,showSerialNo:_().bool,loading:_().bool,stickyHeader:_().bool};const T=R},61738:(e,t,s)=>{var a={"./af":99805,"./af.js":99805,"./ar":94449,"./ar-dz":44468,"./ar-dz.js":44468,"./ar-kw":63480,"./ar-kw.js":63480,"./ar-ly":64197,"./ar-ly.js":64197,"./ar-ma":62180,"./ar-ma.js":62180,"./ar-sa":50230,"./ar-sa.js":50230,"./ar-tn":72808,"./ar-tn.js":72808,"./ar.js":94449,"./az":45865,"./az.js":45865,"./be":86627,"./be.js":86627,"./bg":60901,"./bg.js":60901,"./bm":63179,"./bm.js":63179,"./bn":61966,"./bn-bd":90969,"./bn-bd.js":90969,"./bn.js":61966,"./bo":6317,"./bo.js":6317,"./br":46474,"./br.js":46474,"./bs":35961,"./bs.js":35961,"./ca":77270,"./ca.js":77270,"./cs":61564,"./cs.js":61564,"./cv":43239,"./cv.js":43239,"./cy":92366,"./cy.js":92366,"./da":82453,"./da.js":82453,"./de":76601,"./de-at":47408,"./de-at.js":47408,"./de-ch":8101,"./de-ch.js":8101,"./de.js":76601,"./dv":96080,"./dv.js":96080,"./el":12655,"./el.js":12655,"./en-au":46836,"./en-au.js":46836,"./en-ca":22086,"./en-ca.js":22086,"./en-gb":2103,"./en-gb.js":2103,"./en-ie":35964,"./en-ie.js":35964,"./en-il":74379,"./en-il.js":74379,"./en-in":50765,"./en-in.js":50765,"./en-nz":71502,"./en-nz.js":71502,"./en-sg":1152,"./en-sg.js":1152,"./eo":90050,"./eo.js":90050,"./es":43350,"./es-do":49338,"./es-do.js":49338,"./es-mx":51326,"./es-mx.js":51326,"./es-us":89947,"./es-us.js":89947,"./es.js":43350,"./et":18231,"./et.js":18231,"./eu":28512,"./eu.js":28512,"./fa":59083,"./fa.js":59083,"./fi":25059,"./fi.js":25059,"./fil":32607,"./fil.js":32607,"./fo":83369,"./fo.js":83369,"./fr":27390,"./fr-ca":66711,"./fr-ca.js":66711,"./fr-ch":6152,"./fr-ch.js":6152,"./fr.js":27390,"./fy":62419,"./fy.js":62419,"./ga":3002,"./ga.js":3002,"./gd":82533,"./gd.js":82533,"./gl":16557,"./gl.js":16557,"./gom-deva":48944,"./gom-deva.js":48944,"./gom-latn":25387,"./gom-latn.js":25387,"./gu":17462,"./gu.js":17462,"./he":39237,"./he.js":39237,"./hi":49617,"./hi.js":49617,"./hr":36544,"./hr.js":36544,"./hu":60341,"./hu.js":60341,"./hy-am":41388,"./hy-am.js":41388,"./id":75251,"./id.js":75251,"./is":41146,"./is.js":41146,"./it":37891,"./it-ch":80007,"./it-ch.js":80007,"./it.js":37891,"./ja":73727,"./ja.js":73727,"./jv":5198,"./jv.js":5198,"./ka":28974,"./ka.js":28974,"./kk":37308,"./kk.js":37308,"./km":57786,"./km.js":57786,"./kn":84807,"./kn.js":84807,"./ko":61584,"./ko.js":61584,"./ku":61906,"./ku.js":61906,"./ky":79190,"./ky.js":79190,"./lb":7396,"./lb.js":7396,"./lo":38503,"./lo.js":38503,"./lt":33010,"./lt.js":33010,"./lv":5192,"./lv.js":5192,"./me":51944,"./me.js":51944,"./mi":56492,"./mi.js":56492,"./mk":2934,"./mk.js":2934,"./ml":61463,"./ml.js":61463,"./mn":8377,"./mn.js":8377,"./mr":78733,"./mr.js":78733,"./ms":18030,"./ms-my":39445,"./ms-my.js":39445,"./ms.js":18030,"./mt":55887,"./mt.js":55887,"./my":87228,"./my.js":87228,"./nb":48294,"./nb.js":48294,"./ne":19559,"./ne.js":19559,"./nl":20600,"./nl-be":78796,"./nl-be.js":78796,"./nl.js":20600,"./nn":9570,"./nn.js":9570,"./oc-lnc":5662,"./oc-lnc.js":5662,"./pa-in":87101,"./pa-in.js":87101,"./pl":56118,"./pl.js":56118,"./pt":29198,"./pt-br":7203,"./pt-br.js":7203,"./pt.js":29198,"./ro":45565,"./ro.js":45565,"./ru":33315,"./ru.js":33315,"./sd":58473,"./sd.js":58473,"./se":11258,"./se.js":11258,"./si":98798,"./si.js":98798,"./sk":26404,"./sk.js":26404,"./sl":7057,"./sl.js":7057,"./sq":25718,"./sq.js":25718,"./sr":45363,"./sr-cyrl":20478,"./sr-cyrl.js":20478,"./sr.js":45363,"./ss":37260,"./ss.js":37260,"./sv":42231,"./sv.js":42231,"./sw":27104,"./sw.js":27104,"./ta":47493,"./ta.js":47493,"./te":57705,"./te.js":57705,"./tet":94457,"./tet.js":94457,"./tg":22727,"./tg.js":22727,"./th":32206,"./th.js":32206,"./tk":33419,"./tk.js":33419,"./tl-ph":77243,"./tl-ph.js":77243,"./tlh":60016,"./tlh.js":60016,"./tr":87020,"./tr.js":87020,"./tzl":8026,"./tzl.js":8026,"./tzm":78537,"./tzm-latn":87899,"./tzm-latn.js":87899,"./tzm.js":78537,"./ug-cn":40818,"./ug-cn.js":40818,"./uk":48478,"./uk.js":48478,"./ur":77893,"./ur.js":77893,"./uz":89133,"./uz-latn":20311,"./uz-latn.js":20311,"./uz.js":89133,"./vi":52179,"./vi.js":52179,"./x-pseudo":92455,"./x-pseudo.js":92455,"./yo":3310,"./yo.js":3310,"./zh-cn":27244,"./zh-cn.js":27244,"./zh-hk":40076,"./zh-hk.js":40076,"./zh-mo":62305,"./zh-mo.js":62305,"./zh-tw":88588,"./zh-tw.js":88588};function n(e){var t=i(e);return s(t)}function i(e){if(!s.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=i,e.exports=n,n.id=61738}}]);