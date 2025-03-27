/*! For license information please see 2556.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2556],{78633:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");e.Z=i},39834:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");e.Z=i},27668:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");e.Z=i},71157:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");e.Z=i},16655:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");e.Z=i},51807:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");e.Z=i},28729:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");e.Z=i},21589:function(t,e,n){var r=n(73203);e.Z=void 0;var o=r(n(19124)),a=n(24246),i=(0,o.default)((0,a.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");e.Z=i},62792:function(t,e,n){n.d(e,{Z:function(){return g}});var r=n(25773),o=n(30808),a=n(27378),i=n(38944),c=n(82267),s=n(6851),u=n(76112),l=n(67018),p=n(6749);function f(t){return(0,p.Z)("MuiTableFooter",t)}(0,n(44124).Z)("MuiTableFooter",["root"]);var d=n(24246);const h=["className","component"],v=(0,l.ZP)("tfoot",{name:"MuiTableFooter",slot:"Root",overridesResolver:(t,e)=>e.root})({display:"table-footer-group"}),y={variant:"footer"},m="tfoot";var g=a.forwardRef((function(t,e){const n=(0,u.Z)({props:t,name:"MuiTableFooter"}),{className:a,component:l=m}=n,p=(0,o.Z)(n,h),g=(0,r.Z)({},n,{component:l}),b=(t=>{const{classes:e}=t;return(0,c.Z)({root:["root"]},f,e)})(g);return(0,d.jsx)(s.Z.Provider,{value:y,children:(0,d.jsx)(v,(0,r.Z)({as:l,className:(0,i.Z)(b.root,a),ref:e,role:l===m?null:"rowgroup",ownerState:g},p))})}))},51544:function(t,e,n){n.d(e,{Gd:function(){return u},TP:function(){return l},ak:function(){return c},kk:function(){return s},tt:function(){return i}});var r=n(69222),o=n(56904),a=n(57446),i=function(t){return t=(0,a.B7)(t,!0),function(e){r.Z.get("/superadmin/leave-application".concat(t)).then((function(t){t.data.success&&e({type:o.Sb,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){r.Z.post("/superadmin/leave-application/store",t).then((function(t){e({type:o.Vf,payload:t.data})})).catch((function(t){}))}},s=function(t){return function(e){r.Z.get("/superadmin/leave-application/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.kz,payload:t.data.data})})).catch((function(t){}))}},u=function(t,e){return function(n){r.Z.post("/superadmin/leave-application/update/".concat(t),e).then((function(t){n({type:o.eb,payload:t.data})})).catch((function(t){}))}},l=function(t,e){return function(n){r.Z.delete("/superadmin/leave-application/delete/".concat(t),e).then((function(t){n({type:o.Yo,payload:t.data})})).catch((function(t){}))}}},62339:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),a=n(28730),i=n(23434),c=n(10755),s=n(74154),u=n(8971),l=n(13040),p=n(57446),f=n(51544),d=n(46265),h=n(56904),v=n(72897),y=n(98784),m=n.n(y),g=n(74570),b=n(16569),w=n(26803),j=n(69162),S=n(93033),x=n(24246);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function k(t){return function(t){if(Array.isArray(t))return Z(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return Z(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function A(){A=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",a=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),i=new x(r||[]);return a._invoke=function(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=w(i,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,i),a}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function p(){}function f(){}function d(){}var h={};c(h,o,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(k([])));y&&y!==e&&n.call(y,o)&&(h=y);var m=d.prototype=p.prototype=Object.create(h);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function r(o,a,i,c){var s=u(t[o],t,a);if("throw"!==s.type){var l=s.arg,p=l.value;return p&&"object"==O(p)&&n.call(p,"__await")?e.resolve(p.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(p).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function w(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function k(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:Z}}function Z(){return{value:void 0,done:!0}}return f.prototype=d,c(m,"constructor",d),c(d,"constructor",f),f.displayName=c(d,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,i,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(b.prototype),c(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new b(s(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},g(m),c(m,i,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=k,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;S(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:k(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}function L(t,e,n,r,o,a,i){try{var c=t[a](i),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,o)}function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){T(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function M(t,e){return M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},M(t,e)}function E(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return D(t)}function D(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}function T(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var z=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&M(t,e)}(f,t);var e,n,r,o,c,l=(o=f,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(o);if(c){var n=N(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return E(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),T(D(e=l.call(this,t)),"loadListData",(function(){e.props.actions.leaveApplicationList(e.state.queryParams)})),T(D(e),"handlePagination",(function(t){e.setState({queryParams:_(_({},e.state.queryParams),{},{page:t})},(function(){e.loadListData()}))})),T(D(e),"handleEdit",function(){var t,n=(t=A().mark((function t(n){return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.props.navigate("edit/"+n.id);case 1:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){L(a,r,o,i,c,"next",t)}function c(t){L(a,r,o,i,c,"throw",t)}i(void 0)}))});return function(t){return n.apply(this,arguments)}}()),T(D(e),"handleView",(function(t){e.props.navigate("view/"+t.id)})),T(D(e),"handleDelete",(function(t){e.props.actions.leaveApplicationDelete(t.id)})),T(D(e),"handleAceept",(function(t){e.setState({actionItem:t,status:"accepted",dialogOpen:!0})})),T(D(e),"handleDecline",(function(t){e.setState({actionItem:t,status:"declined",dialogOpen:!0})})),T(D(e),"handleClose",(function(){e.setState({dialogOpen:!1})})),T(D(e),"handleSubmit",(function(){e.props.actions.leaveApplicationUpdate(e.state.actionItem.id,{status:e.state.status})})),e.state={items:e.props.items,total:e.props.total,actionCalled:e.props.actionCalled,editSuccess:e.props.editSuccess,deleteSuccess:e.props.deleteSuccess,successMessage:e.props.successMessage,errorMessage:e.props.errorMessage,queryParams:{page:1,limit:50},actionItem:null,status:"",dialogOpen:!1},e.isSuperAdmin=(0,p.j5)(),e.columns=[{name:"user_name",display_name:"User Name"},{name:"role",display_name:"Role"},{name:"title",display_name:"Title"},{name:"short_message",display_name:"Message",isHtml:!0},{name:"created_at",display_name:"Created At"},{name:"status_display",display_name:"Status",show_tag:!0,color_conditions:[{key:"status",value:"pending",color:"primary"},{key:"status",value:"accepted",color:"success"},{key:"status",value:"declined",color:"error"}]}],e.isSuperAdmin||(m().remove(e.columns,(function(t){return"user_name"==t.name})),m().remove(e.columns,(function(t){return"role"==t.name}))),e.tableActions=[{label:"View",onClick:e.handleView}],e.isSuperAdmin?e.tableActions=[].concat(k(e.tableActions),[{label:"Accept",onClick:e.handleAceept,color:"primary",conditions:[{key:"status",value:"pending"}]},{label:"Decline",onClick:e.handleDecline,color:"error",conditions:[{key:"status",value:"pending"}]}]):e.tableActions=[].concat(k(e.tableActions),[{label:"Edit",onClick:e.handleEdit,conditions:[{key:"status",value:"pending"}]},{label:"Delete",onClick:e.handleDelete,isDelete:!0,conditions:[{key:"status",value:"pending"}]}]),e}return e=f,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.actionCalled!==e.actionCalled&&(n.actionCalled=t.actionCalled),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),t.editSuccess!==e.editSuccess&&(n.editSuccess=t.editSuccess),t.successMessage!==e.successMessage&&(n.successMessage=t.successMessage),t.errorMessage!==e.errorMessage&&(n.errorMessage=t.errorMessage),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(t,e){this.state.actionCalled&&(this.state.deleteSuccess||this.state.editSuccess?(this.setState({dialogOpen:!1}),this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.loadListData()):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:h.BD}))}},{key:"render",value:function(){var t=this;return(0,x.jsxs)(u.Z,{title:"Leave Applications",secondary:(0,p.j5)()?null:(0,x.jsx)(a.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Add"}),children:[(0,x.jsx)(i.ZP,{container:!0,spacing:s.dv,className:"orders-sale-button",children:(0,x.jsx)(d.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})}),(0,x.jsxs)(g.Z,{className:"ratn-dialog-footer delete_modal",open:this.state.dialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"xs",children:[(0,x.jsx)(S.Z,{children:"accepted"==this.state.status?"Accept":"Decline"}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(j.Z,{children:"accepted"==this.state.status?"Are you sure want accept this leave application?":"Are you sure want decline this leave application?"})}),(0,x.jsx)(b.Z,{children:(0,x.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,x.jsx)(a.Z,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,x.jsx)(a.Z,{onClick:this.handleSubmit,className:"conf-button",children:"Yes, Confirm"})]})})]})]})}}])&&C(e.prototype,n),r&&C(e,r),Object.defineProperty(e,"prototype",{writable:!1}),f}(r.Component);e.default=(0,v.RM)((0,l.Z)((0,o.connect)((function(t){return{items:t.superadmin.leaveApplication.items,total:t.superadmin.leaveApplication.total,actionCalled:t.superadmin.leaveApplication.actionCalled,deleteSuccess:t.superadmin.leaveApplication.deleteSuccess,editSuccess:t.superadmin.leaveApplication.editSuccess,successMessage:t.superadmin.leaveApplication.successMessage}}),(function(t){return{dispatch:t,actions:(0,c.bindActionCreators)({leaveApplicationList:f.tt,leaveApplicationStore:f.ak,leaveApplicationFetch:f.kk,leaveApplicationUpdate:f.Gd,leaveApplicationDelete:f.TP},t)}}))(z)))}}]);