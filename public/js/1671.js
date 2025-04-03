"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1671],{84200:function(e,t,n){n.d(t,{BQ:function(){return c},hV:function(){return s},kI:function(){return u},ll:function(){return a},vR:function(){return l}});var o=n(69222),r=n(53159),i=n(57446),a=function(e){return e=(0,i.B7)(e,!0),function(t){o.Z.get("/superadmin/employees".concat(e)).then((function(e){e.data.success&&t({type:r.qH,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){o.Z.post("/superadmin/employees/store",e).then((function(e){t({type:r.I0,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return t=t||"",function(n){o.Z.get("/superadmin/employees/fetch/".concat(e,"?role_id=").concat(t)).then((function(e){e.data.success&&n({type:r.Bv,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){o.Z.post("/superadmin/employees/update/".concat(e),t).then((function(e){n({type:r.cU,payload:e.data})})).catch((function(e){}))}},l=function(e,t){return function(n){o.Z.delete("/superadmin/employees/delete/".concat(e),t).then((function(e){n({type:r.$6,payload:e.data})})).catch((function(e){}))}}},61671:function(e,t,n){n.r(t);var o=n(27378),r=n(23884),i=n(28730),a=n(23434),s=n(10755),c=n(74154),u=n(8971),l=n(13040),p=n(84200),f=n(46265),d=n(53159),y=n(57446),m=n(24246);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function w(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(p,e);var t,n,o,r,s,l=(r=p,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(s){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function p(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),_(P(t=l.call(this,e)),"loadListData",(function(){t.props.actions.employeeList(t.state.queryParams)})),_(P(t),"handlePagination",(function(e){t.state.queryParams.page=e,t.loadListData()})),_(P(t),"handleEdit",(function(e){t.props.navigate("edit/"+e.id)})),_(P(t),"handleDelete",(function(e){t.props.actions.employeeDelete(e.id)})),_(P(t),"handleView",(function(e){t.props.navigate("view/"+e.id)})),t.state=v(v({},t.props),{},{queryParams:{page:1,limit:50},deleteSuccess:t.props.deleteSuccess}),t.columns=[{name:"profile_image",display_name:"Image",isImage:!0},{name:"name",display_name:"Employee Name"},{name:"mobile",display_name:"Contact Number"},{name:"parents_name",display_name:"Work Under"},{name:"role_name",display_name:"Designation Role"},{name:"expense_balance",display_name:"Expense Balance"},{name:"attendence",display_name:"Attendence",show_tag:!0,showAttendenceAddress:!0,color_conditions:[{key:"attendence",value:"Present",color:"success"},{key:"approve_status",value:"Absent",color:"error"}]}],t}return t=p,o=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),e.permissions!==t.permissions&&(n.permissions=e.permissions),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(e,t){this.state.deleteSuccess&&((0,this.props.dispatch)({type:d.sW}),this.handlePagination(1))}},{key:"render",value:function(){var e=this;return(0,m.jsx)(u.Z,{title:"Employees",secondary:(0,y.Fs)(this.state.permissions,"employees","add")?(0,m.jsx)(i.Z,{variant:"contained",onClick:function(){return e.props.navigate("create")},children:"Add"}):null,children:(0,m.jsx)(a.ZP,{container:!0,spacing:c.dv,className:"abc",children:(0,m.jsx)(f.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"View",onClick:this.handleView,color:"primary",show:(0,y.Fs)(this.state.permissions,"employees","view")},{label:"Edit",onClick:this.handleEdit,color:"primary",show:(0,y.Fs)(this.state.permissions,"employees","edit")},{label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error",show:(0,y.Fs)(this.state.permissions,"employees","delete")}]})})})}}])&&g(t.prototype,n),o&&g(t,o),Object.defineProperty(t,"prototype",{writable:!1}),p}(o.Component);t.default=(0,l.Z)((0,r.connect)((function(e){return{items:e.superadmin.employee.items,total:e.superadmin.employee.total,deleteSuccess:e.superadmin.employee.deleteSuccess,permissions:e.employee.permissions.permissions}}),(function(e){return{dispatch:e,actions:(0,s.bindActionCreators)({employeeList:p.ll,employeeDelete:p.vR},e)}}))(k))}}]);