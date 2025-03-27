"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1269],{71475:(s,t,e)=>{e.d(t,{E$:()=>a,b9:()=>o,ec:()=>r,kY:()=>d,qO:()=>c,tO:()=>l});var i=e(80325),n=e(29941);const a=()=>i.A.get("/superadmin/profile"),o=s=>t=>{i.A.post("/superadmin/edit-profile",s).then((s=>{t({type:n.bW,payload:s.data})})).catch((s=>{}))},r=s=>t=>{i.A.post("/superadmin/change-password",s).then((s=>{t({type:n.P8,payload:s.data})})).catch((s=>{}))},l=s=>s=>{i.A.get("/superadmin/dashboard").then((t=>{s({type:n.WG,payload:t.data.data})})).catch((s=>{}))},c=s=>s=>{i.A.get("/superadmin/auto-notifications").then((s=>{})).catch((s=>{}))},d=s=>i.A.get("/superadmin/next-user-name?role=".concat(s))},51269:(s,t,e)=>{e.r(t),e.d(t,{default:()=>f});var i=e(63696),n=e(52821),a=e(3577),o=e(44748),r=e(66593),l=e(36213),c=e(71475),d=e(45892),h=e(88441),x=e(50977),p=e(54086),m=e(47269),_=e(58241),u=e(58824),j=e(43242),b=(e(74258),e(29717)),A=e(72987),k=e(62540);function g(s,t,e){return t in s?Object.defineProperty(s,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):s[t]=e,s}u.t1.register(u.PP,u.kc,u.E8,u.hE,u.m_,u.s$);class y extends i.Component{constructor(s){super(s),g(this,"handleClick",(s=>{this.props.navigate((0,d.zr)((0,d.mA)(this.state.auth))+"/"+s)})),g(this,"loadProfile",(()=>{(0,c.E$)().then((s=>{s.data.success&&this.setState({profile:s.data.data})}))})),this.state={dashboard:this.props.dashboard,auth:this.props.auth,permissions:this.props.permissions,months_name:[],all_months:[],month_wise_customer:[],month_wise_order:[],month_wise_sales:[],profile:null},this.chartCustomerOptions={plugins:{legend:{position:"top"},title:{display:!0,text:"Customer Chart"}}},this.chartRetailerOptions={plugins:{legend:{position:"top"},title:{display:!0,text:"Retailer Chart"}}},this.chartAmountOptions={plugins:{legend:{position:"top"},title:{display:!0,text:"Sales & Orders Chart"}}},this.isSuperAdmin=(0,d.jm)(),this.isAdmin=(0,d.qc)(),this.isDistributor=(0,d.mb)(),this.isSalesExecutive=(0,d.$S)(),this.isManager=(0,d.k3)()}componentDidMount(){this.props.actions.getDashboardData(),this.props.actions.sendAutoNotifications(),this.loadProfile()}static getDerivedStateFromProps(s,t){let e={};return s.dashboard!==t.dashboard&&(e.dashboard=s.dashboard),s.auth!==t.auth&&(e.auth=s.auth),s.permissions!==t.permissions&&(e.permissions=s.permissions),null!=s.dashboard&&s.dashboard.all_months!==t.all_months&&(e.months_name=s.dashboard.all_months),null!=s.dashboard&&s.dashboard.month_wise_customer!==t.month_wise_customer&&(e.month_wise_customer=s.dashboard.month_wise_customer),null!=s.dashboard&&s.dashboard.month_wise_order!==t.month_wise_order&&(e.month_wise_order=s.dashboard.month_wise_order),null!=s.dashboard&&s.dashboard.month_wise_sales!==t.month_wise_sales&&(e.month_wise_sales=s.dashboard.month_wise_sales),e}render(){const{dashboard:s,permissions:t,profile:e}=this.state,i={labels:this.state.months_name,datasets:[{label:"Total Customer",data:this.state.month_wise_customer,backgroundColor:"rgba(255, 99, 132, 0.5)"}]},n={labels:this.state.months_name,datasets:[{label:"Total Retailer",data:this.state.month_wise_retailer,backgroundColor:"rgba(255, 99, 132, 0.5)"}]},c={labels:this.state.months_name,datasets:[{label:"Total Sales",data:this.state.month_wise_sales,backgroundColor:"rgba(255, 99, 132, 0.5)"},{label:"Total Order",data:this.state.month_wise_order,backgroundColor:"rgba(53, 162, 235, 0.5)"}]};return A.Fr&&(this.chartAmountOptions={...this.chartAmountOptions,responsive:!0,maintainAspectRatio:!0,aspectRatio:1},this.chartCustomerOptions={...this.chartCustomerOptions,responsive:!0,maintainAspectRatio:!0,aspectRatio:1},this.chartRetailerOptions={...this.chartRetailerOptions,responsive:!0,maintainAspectRatio:!0,aspectRatio:1}),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(a.A,{className:"dashboard_card",children:[!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,["purchase","sales"],"list")?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("wallet-history"),className:"dashboard_card_content bg-color-6",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsx)("h1",{children:"My Wallet "}),(0,k.jsx)("h2",{children:s?s.wallet_balance:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(_.A,{})})]}):null,!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"stock","list")?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("stocks"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["My Stock   ",(0,k.jsx)("span",{children:s?s.total_stock:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.total_stock_price," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(m.A,{})})]}):null,!(!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"stock","list"))||this.isSalesExecutive||this.isDistributor?null:(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("material-stocks"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Material Stock   ",(0,k.jsx)("span",{children:s?s.material_total_stock:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.material_total_stock_price," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(m.A,{})})]}),this.isSuperAdmin||this.isSalesExecutive?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("return-stocks"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Return Stock   ",(0,k.jsx)("span",{children:s?s.return_stock:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.return_stock_price," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(m.A,{})})]}):null,!this.isSalesExecutive&&(!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"supplier","list"))&&(!this.isDistributor||this.isDistributor&&e&&!e.own)?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("suppliers"),className:"dashboard_card_content bg-color-3",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Supplier   ",(0,k.jsxs)("span",{children:[s?s.total_supplier:(0,k.jsx)(l.A,{})," "]})," "]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.purchase_due_amount," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSuperAdmin&&(0,d._m)(t,"admin","list")?(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-2",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("admins?own=1"),children:["Own Admin   ",(0,k.jsx)("span",{children:s?s.total_admin:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_admin=1&by_specific=1"),children:s?s.total_admin_stock+" | "+s.total_admin_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSuperAdmin&&(0,d._m)(t,"distributor","list")?(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("distributors?own=1"),children:["Own Distributor   ",(0,k.jsx)("span",{children:s?s.total_distributor:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_distributor=1&by_specific=1"),children:s?s.total_distributor_stock+" | "+s.total_distributor_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSuperAdmin&&(0,d._m)(t,"admin","list")?(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-2",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("admins?own=0"),children:["Other Admin   ",(0,k.jsx)("span",{children:s?s.total_other_admin+" ( "+s.sale_due_amount+" )":(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_admin=0&by_specific=1"),children:s?s.total_other_admin_stock+" | "+s.total_other_admin_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSuperAdmin&&(0,d._m)(t,"distributor","list")?(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("distributors?own=0"),children:["Other Distributor   ",(0,k.jsx)("span",{children:s?s.total_other_distributor:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_distributor=0&by_specific=1"),children:s?s.total_other_distributor_stock+" | "+s.total_other_distributor_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isAdmin?(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("distributors?own=1"),children:["Total Own Distributor   ",(0,k.jsx)("span",{children:s?s.total_distributor:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_distributor=1&by_specific=1"),children:s?s.total_distributor_stock+" | "+s.total_distributor_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}),(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-4",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("distributors?own=0"),children:["Total Other Distributor   ",(0,k.jsx)("span",{children:s?s.total_other_distributor+" ( "+s.sale_due_amount+" )":(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_distributor=0&by_specific=1"),children:s?s.total_other_distributor_stock+" | "+s.total_other_distributor_stock_price:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]})]}):null,this.isSalesExecutive||this.isAdmin||!(!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"sales_executive","list"))?null:(0,k.jsxs)(o.A,{className:"dashboard_card_content bg-color-5",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{onClick:()=>this.handleClick("sales-executive"),children:["Total SE",(0,k.jsxs)(k.Fragment,{children:["  ",(0,k.jsx)("span",{children:s?s.total_sales_executive:(0,k.jsx)(l.A,{})})]})]}),this.isDistributor?(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_se=1&by_specific=1"),children:s?s.total_se_stock+" | "+s.total_se_stock_price:(0,k.jsx)(l.A,{})}):(0,k.jsx)("h2",{children:this.isSuperAdmin?(0,k.jsx)("h2",{onClick:()=>this.handleClick("stocks?own_se=1&by_specific=1"),children:s?s.total_se_stock+" | "+s.total_se_stock_price:(0,k.jsx)(l.A,{})}):null})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}),this.isSuperAdmin?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("purchase-products"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Purchase   ",(0,k.jsx)("span",{children:s?s.total_purchase_product:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{children:s?s.total_purchase:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(b.A,{})})]}):null,this.isSuperAdmin?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("sale-products"),className:"dashboard_card_content bg-color-8",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Sale   ",(0,k.jsx)("span",{children:s?s.total_own_sale_products:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{children:s?s.total_own_sale:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(b.A,{})})]}):null,this.isSuperAdmin||this.isSalesExecutive||e&&e.own?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("stocks?total_avl_stock=1&by_specific=1"),className:"dashboard_card_content bg-color-2",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Available   ",(0,k.jsx)("span",{children:s?s.total_avl_stock:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.total_avl_stock_price," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(m.A,{})})]}):null,!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"retailer","list")?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("retailers"),className:"dashboard_card_content bg-color-6",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Total Retailer   ",(0,k.jsx)("span",{children:s?s.total_retailer:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{children:this.isDistributor?(0,k.jsx)(k.Fragment,{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.sale_due_amount," "]}):(0,k.jsx)(l.A,{})}):(0,k.jsx)(k.Fragment,{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.total_retailer_due," "]}):(0,k.jsx)(l.A,{})})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSalesExecutive?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("my-retailers"),className:"dashboard_card_content bg-color-6",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["My Retailer   ",(0,k.jsx)("span",{children:s?s.my_retailer:(0,k.jsx)(l.A,{})})," "]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.my_retailer_due_amount," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,!this.isSuperAdmin||this.isSuperAdmin&&(0,d._m)(t,"customer","list")?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("customers"),className:"dashboard_card_content bg-color-7",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsx)("h1",{children:"Total Customer "}),(0,k.jsx)("h2",{children:s?s.total_customer:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(p.A,{})})]}):null,this.isSuperAdmin&&!this.isManager&&(0,d._m)(t,"stock","list")?(0,k.jsxs)(o.A,{onClick:()=>this.handleClick("stocks?manager=1&by_specific=1"),className:"dashboard_card_content bg-color-1",sx:{display:"flex",justifyContent:"space-between"},children:[(0,k.jsxs)(r.A,{sx:{fontSize:14,margin:0},color:"text.secondary",gutterBottom:!0,component:"span",children:[(0,k.jsxs)("h1",{children:["Manager Stock   ",(0,k.jsx)("span",{children:s?s.total_manager_stock:(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("h2",{children:s?(0,k.jsxs)("span",{style:{fontSize:"16px"},children:[" ",s.total_manager_stock_price," "]}):(0,k.jsx)(l.A,{})})]}),(0,k.jsx)("div",{className:"card-icon",children:(0,k.jsx)(m.A,{})})]}):null]}),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("div",{children:(0,k.jsx)(j.yP,{options:this.chartAmountOptions,data:c,height:100})}),this.isSalesExecutive?(0,k.jsx)("div",{children:(0,k.jsx)(j.yP,{options:this.chartRetailerOptions,data:n,height:100})}):(0,k.jsx)("div",{children:(0,k.jsx)(j.yP,{options:this.chartCustomerOptions,data:i,height:100})})]})]})}}const f=(0,x.A)((0,n.connect)((s=>({dashboard:s.superadmin.profile.dashboard,auth:s.auth,permissions:s.employee.permissions.permissions})),(s=>({dispatch:s,actions:(0,h.bindActionCreators)({getDashboardData:c.tO,sendAutoNotifications:c.qO},s)})))(y))}}]);