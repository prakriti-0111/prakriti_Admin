"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6451],{74670:function(e,t,r){r.r(t);var n=r(27378),s=r(23884),o=r(75226),c=r(8971),a=r(13040),u=r(72897),i=r(56904),p=r(57446),l=r(24246);function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function d(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(f,e);var t,r,n,s,a,u=(s=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(s);if(a){var r=b(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return d(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=u.call(this,e)).state={actionCalled:t.props.actionCalled,createSuccess:t.props.createSuccess,successMessage:t.props.successMessage,errorMessage:t.props.errorMessage,auth:t.props.auth},t}return t=f,n=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.actionCalled!==t.actionCalled&&(r.actionCalled=e.actionCalled),e.createSuccess!==t.createSuccess&&(r.createSuccess=e.createSuccess),e.successMessage!==t.successMessage&&(r.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(r.errorMessage=e.errorMessage),e.auth!==t.auth&&(r.auth=e.auth),r}}],(r=[{key:"componentDidUpdate",value:function(){this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:i.BD}),this.props.navigate((0,p.ZA)((0,p.O2)(this.state.auth))+"/leave-applications")):(this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:i.BD})))}},{key:"render",value:function(){return(0,l.jsx)(c.Z,{title:"Leave Application Create",children:(0,l.jsx)("div",{children:(0,l.jsx)(o.Z,{})})})}}])&&y(t.prototype,r),n&&y(t,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n.Component);t.default=(0,u.RM)((0,a.Z)((0,s.connect)((function(e){return{actionCalled:e.superadmin.leaveApplication.actionCalled,createSuccess:e.superadmin.leaveApplication.createSuccess,successMessage:e.superadmin.leaveApplication.successMessage,errorMessage:e.superadmin.leaveApplication.errorMessage,auth:e.auth}}),(function(e){return{dispatch:e}}))(v)))}}]);