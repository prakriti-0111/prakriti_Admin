"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1147],{1147:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var a=n(27378),o=n(23884),r=n(23434),c=(n(75790),n(10755)),i=n(74154),s=n(8971),u=n(13040),l=n(69222),p=n(31922),f=n(57446),d=function(e){return e=(0,f.B7)(e,!0),function(t){l.Z.get("/admin/leave-application".concat(e)).then((function(e){e.data.success&&t({type:p.Sb,payload:e.data.data})})).catch((function(e){}))}},y=function(e){return function(t){l.Z.post("/admin/leave-application/store",e).then((function(e){t({type:p.Vf,payload:e.data})})).catch((function(e){}))}},m=function(e){return function(t){l.Z.get("/admin/leave-application/fetch/".concat(e)).then((function(e){e.data.success&&t({type:p.kz,payload:[e.data.data]})})).catch((function(e){}))}},b=n(46265),h=n(72897),v=n(24246);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function S(e,t){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},S(e,t)}function w(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return A(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&S(e,t)}(l,e);var t,n,a,o,c,u=(o=l,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(o);if(c){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),_(A(t=u.call(this,e)),"loadListData",(function(){var e=localStorage.getItem("auth");t.props.leaveApplicationFetch(JSON.parse(e).user.id)})),_(A(t),"handlePagination",(function(e){t.setState({queryParams:P(P({},t.state.queryParams),{},{page:e})},(function(){t.loadListData()}))})),t.state={items:t.props.items,total:t.props.total,actionCalled:t.props.actionCalled,deleteSuccess:t.props.deleteSuccess,successMessage:t.props.successMessage,product:t.props.product,queryParams:{page:1,limit:50}},t.columns=[{name:"userName",display_name:"User Name"},{name:"title",display_name:"title"},{name:"message",display_name:"Message"},{name:"role",display_name:"Role"},{name:"status",display_name:"status"}],t}return t=l,a=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.actionCalled!==t.actionCalled&&(n.actionCalled=e.actionCalled),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),e.successMessage!==t.successMessage&&(n.successMessage=e.successMessage),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(e,t){if(this.state.deleteSuccess){var n=this.props.dispatch;this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),n({type:p.BD}),this.handlePagination(1)}}},{key:"render",value:function(){return(0,v.jsx)(s.Z,{title:"Leave Application",children:(0,v.jsx)(r.ZP,{container:!0,spacing:i.dv,className:"abc",children:(0,v.jsx)(b.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&j(t.prototype,n),a&&j(t,a),Object.defineProperty(t,"prototype",{writable:!1}),l}(a.Component),D=(0,h.RM)((0,u.Z)((0,o.connect)((function(e){return{items:e.admin.leaveApplication.items,total:e.admin.leaveApplication.total,actionCalled:e.admin.leaveApplication.actionCalled,deleteSuccess:e.admin.leaveApplication.deleteSuccess,successMessage:e.admin.leaveApplication.successMessage,product:e.admin.leaveApplication.product}}),(function(e){return P({dispatch:e},(0,c.bindActionCreators)({leaveApplicationList:d,leaveApplicationStore:y,leaveApplicationFetch:m},e))}))(k)))}}]);