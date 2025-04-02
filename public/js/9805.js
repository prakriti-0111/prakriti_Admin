/*! For license information please see 9805.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9805],{78178:function(t,e,r){r.d(e,{Fe:function(){return s},Uy:function(){return a},b6:function(){return f},kI:function(){return l},v9:function(){return c},vh:function(){return u}});var n=r(69222),o=r(54453),i=r(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/roles".concat(t)).then((function(t){t.data.success&&e({type:o.Ud,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){n.Z.post("/superadmin/roles/store",t).then((function(t){e({type:o.Cd,payload:t.data})})).catch((function(t){}))}},u=function(t,e){return function(r){n.Z.post("/superadmin/roles/update/".concat(t),e).then((function(t){r({type:o.hv,payload:t.data})})).catch((function(t){}))}},s=function(t,e){return function(r){n.Z.delete("/superadmin/roles/delete/".concat(t),e).then((function(t){r({type:o.cc,payload:t.data})})).catch((function(t){}))}},f=function(t){return n.Z.get("/superadmin/permissions?role_id=".concat(t))},l=function(t){return n.Z.post("/superadmin/permissions/update",t)}},39805:function(t,e,r){var n=r(27378),o=r(23884),i=r(9647),a=r(10755),c=r(10418),u=r(43564),s=r(23434),f=r(78153),l=r(28730),p=r(13040),h=r(78178),d=r(24246);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}var v=["input","label","meta"];function m(){m=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof l?e:l,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=x(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function l(){}function p(){}function h(){}var d={};c(d,o,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(L([])));b&&b!==e&&r.call(b,o)&&(d=b);var g=h.prototype=l.prototype=Object.create(d);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function n(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==y(l)&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:_}}function _(){return{value:void 0,done:!0}}return p.prototype=h,c(g,"constructor",h),c(h,"constructor",p),p.displayName=c(h,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,c(t,a,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(O.prototype),c(O.prototype,i,(function(){return this})),t.AsyncIterator=O,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new O(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(g),c(g,a,"Generator"),c(g,o,(function(){return this})),c(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function b(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function g(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?g(Object(r),!0).forEach((function(e){L(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function O(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function x(t,e){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},x(t,e)}function j(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return P(t)}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}function L(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&x(t,e)}(h,t);var e,r,n,o,a,p=(o=h,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(o);if(a){var r=E(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return j(this,t)});function h(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h),L(P(e=p.call(this,t)),"getDefaultValues",(function(){return{name:"",status:1}})),L(P(e),"renderTextField",(function(t){var e=t.input,r=t.label,n=t.meta,o=n.touched,i=n.error,a=function(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(t,v);return(0,d.jsx)(c.Z,w(w({label:r,fullWidth:!0,error:!(!o||!i),helperText:o&&i?i:""},e),a))})),L(P(e),"permissionChange",(function(t){var r=t.target,n=r.name,o=r.checked;e.setState({permissions:w(w({},e.state.permissions),{},L({},n,!!o))})})),L(P(e),"handleFormSubmit",function(){var t,r=(t=m().mark((function t(r,n){var o;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=w({},r),!e.state.isCreateFrom){t.next=5;break}return t.abrupt("return",e.props.actions.roleCreate(o));case 5:return t.abrupt("return",e.props.actions.roleUpdate(e.state.formData.id,o));case 6:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){b(i,n,o,a,c,"next",t)}function c(t){b(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(t,e){return r.apply(this,arguments)}}()),L(P(e),"isDisabled",(function(){return!(!e.state.formData||9!=e.state.formData.id&&10!=e.state.formData.id)}));var r="formData"in e.props?e.props.formData:null;return e.state={formData:r,isCreateFrom:!r,permissions:{master:!1,product_master:!1,user_management:!1,employee:!1,investor:!1,stock:!1,invoice:!1,orders:!1,hr_management:!1,settings:!1}},e}return e=h,n=[{key:"getDerivedStateFromProps",value:function(t,e){return{}}}],(r=[{key:"componentDidMount",value:function(){this.state.formData?this.props.initialize(this.state.formData):this.props.initialize(this.getDefaultValues())}},{key:"render",value:function(){var t=this,e=this.props,r=e.handleSubmit;return e.pristine,e.submitting,this.state.permissions,(0,d.jsx)("form",{onSubmit:r(this.handleFormSubmit),children:(0,d.jsxs)(u.Z,{sx:{flexGrow:1},children:[(0,d.jsx)(s.ZP,{container:!0,spacing:2,children:(0,d.jsx)(s.ZP,{item:!0,xs:12,className:"create-input",children:(0,d.jsx)(i.gN,{name:"name",component:this.renderTextField,label:"Role Name",disabled:this.isDisabled()})})}),(0,d.jsxs)(f.Z,{spacing:1,mt:2,direction:"row",className:"modal-button-area",children:[(0,d.jsx)(l.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,d.jsx)(l.Z,{variant:"outlined",onClick:function(){return t.props.handleCancel()},children:"Cancel"})]})]})})}}])&&O(e.prototype,r),n&&O(e,n),Object.defineProperty(e,"prototype",{writable:!1}),h}(n.Component);e.Z=(0,p.Z)((0,o.connect)((function(t){return{}}),(function(t){return{dispatch:t,actions:(0,a.bindActionCreators)({roleCreate:h.v9,roleUpdate:h.vh},t)}}))((0,i.sx)({form:"RoleForm",validate:function(t){var e={};return["name"].forEach((function(r){t[r]||(e[r]="Required")})),e}})(_)))}}]);