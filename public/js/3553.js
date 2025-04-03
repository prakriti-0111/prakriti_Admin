"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3553],{70004:function(e,t,n){n.d(t,{AW:function(){return l},CV:function(){return c},IV:function(){return s},_7:function(){return u},cT:function(){return a}});var r=n(69222),o=n(99351),i=n(57446),a=function(e){return e=(0,i.B7)(e,!0),function(t){r.Z.get("/superadmin/employees".concat(e)).then((function(e){e.data.success&&t({type:o.z4,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.post("/superadmin/employees/store",e).then((function(e){t({type:o.T1,payload:e.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.get("/superadmin/employees/fetch/".concat(e,"?role_id=4")).then((function(e){e.data.success&&t({type:o.aB,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.post("/superadmin/employees/update/".concat(e),t).then((function(e){n({type:o.Bb,payload:e.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.delete("/superadmin/employees/delete/".concat(e),t).then((function(e){n({type:o.tf,payload:e.data})})).catch((function(e){}))}}},53553:function(e,t,n){n.r(t);var r=n(27378),o=n(23884),i=n(28730),a=n(23434),s=n(10755),c=n(74154),u=n(8971),l=n(13040),p=n(70004),f=n(46265),d=n(99351),m=n(57446),y=n(24246);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function h(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_(e,t)}function j(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(p,e);var t,n,r,o,s,l=(o=p,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(o);if(s){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function p(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),D(P(t=l.call(this,e)),"loadListData",(function(){t.props.actions.salesExecutiveList(t.state.queryParams)})),D(P(t),"handlePagination",(function(e){t.state.queryParams.page=e,t.loadListData()})),D(P(t),"handleEdit",(function(e){t.props.navigate("edit/"+e.id)})),D(P(t),"handleView",(function(e){t.props.navigate("view/"+e.id)})),D(P(t),"handleEmployeeView",(function(e){t.props.navigate("/super-admin/employees/view/"+e.id)})),D(P(t),"handleDelete",(function(e){t.props.actions.salesExecutiveDelete(e.id)})),D(P(t),"getTableActions",(function(){var e=[{label:"Edit",onClick:t.handleEdit,color:"primary",show:(0,m.Fs)(t.state.permissions,"sales_executive","edit")},{label:"Delete",onClick:t.handleDelete,isDelete:!0,color:"error",show:(0,m.Fs)(t.state.permissions,"sales_executive","delete")}];return t.isDistributor?e=[{label:"View",onClick:t.handleView,color:"primary",show:(0,m.Fs)(t.state.permissions,"sales_executive","view")}]:t.isSuperAdmin&&(e=[{label:"View",onClick:t.handleEmployeeView,color:"primary",show:(0,m.Fs)(t.state.permissions,"sales_executive","view")}].concat(e)),e})),t.state=g(g({},t.props),{},{queryParams:{page:1,limit:50,role_id:4},deleteSuccess:t.props.deleteSuccess}),t.isDistributor=(0,m.JH)(),t.isSuperAdmin=(0,m.j5)(),t.columns=[{name:"name",display_name:"Name"},{name:"mobile",display_name:"Mobile"}],t.isDistributor||(t.columns=[].concat(h(t.columns),[{name:"parent_user_name",display_name:"Distributor"}])),(t.isDistributor||t.isSuperAdmin)&&(t.columns=[].concat(h(t.columns),[{name:"total_stock",display_name:"No of Stock",isBold:!0},{name:"total_stock_price",display_name:"Stock Amt",isBold:!0},{name:"wallet_balance",display_name:"Wallet Balance",isBold:!0},{name:"attendence",display_name:"Attendence",show_tag:!0,showAttendenceAddress:!0,color_conditions:[{key:"attendence",value:"Present",color:"success"},{key:"approve_status",value:"Absent",color:"error"}]}])),t}return t=p,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),e.permissions!==t.permissions&&(n.permissions=e.permissions),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(e,t){this.state.deleteSuccess&&((0,this.props.dispatch)({type:d.CB}),this.handlePagination(1))}},{key:"render",value:function(){var e=this;return(0,y.jsx)(u.Z,{title:"Sales Executives",secondary:!this.isDistributor&&(0,m.Fs)(this.state.permissions,"sales_executive","add")?(0,y.jsx)(i.Z,{variant:"contained",onClick:function(){return e.props.navigate("create")},children:"Add"}):null,children:(0,y.jsx)(a.ZP,{container:!0,spacing:c.dv,className:"abc",children:(0,y.jsx)(f.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.getTableActions()})})})}}])&&O(t.prototype,n),r&&O(t,r),Object.defineProperty(t,"prototype",{writable:!1}),p}(r.Component);t.default=(0,l.Z)((0,o.connect)((function(e){return{items:e.superadmin.salesExecutive.items,total:e.superadmin.salesExecutive.total,deleteSuccess:e.superadmin.salesExecutive.deleteSuccess,permissions:e.employee.permissions.permissions}}),(function(e){return{dispatch:e,actions:(0,s.bindActionCreators)({salesExecutiveList:p.cT,salesExecutiveDelete:p.AW},e)}}))(k))}}]);