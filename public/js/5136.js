"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5136],{54287:function(e,t,r){r.r(t);var o=r(27378),s=r(23884),n=r(23434),c=r(95287),u=r(61503),i=r(10755),a=r(8971),p=r(13040),f=r(4497),d=r(72897),l=r(11134),h=r(57446),y=r(24246);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}function m(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(f,e);var t,r,o,s,i,p=(s=f,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=M(s);if(i){var r=M(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return m(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=p.call(this,e)).state={actionCalled:t.props.actionCalled,editSuccess:t.props.editSuccess,successMessage:t.props.successMessage,errorMessage:t.props.errorMessage,product:t.props.product,id:t.props.params.id,auth:t.props.auth},t}return t=f,o=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.actionCalled!==t.actionCalled&&(r.actionCalled=e.actionCalled),e.editSuccess!==t.editSuccess&&(r.editSuccess=e.editSuccess),e.successMessage!==t.successMessage&&(r.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(r.errorMessage=e.errorMessage),e.product!==t.product&&(r.product=e.product),e.auth!==t.auth&&(r.auth=e.auth),r}}],(r=[{key:"componentDidMount",value:function(){this.props.actions.productView(this.state.id)}},{key:"componentDidUpdate",value:function(){this.state.actionCalled&&(this.state.editSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:l.Hh}),this.props.navigate((0,h.ZA)((0,h.O2)(this.state.auth))+"/products")):(this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:l.Hh})))}},{key:"render",value:function(){return(0,y.jsx)(a.Z,{title:"Product Edit",children:(0,y.jsx)("div",{children:this.state.product?(0,y.jsx)(u.Z,{formData:this.state.product}):(0,y.jsx)(n.ZP,{container:!0,justifyContent:"center",children:(0,y.jsx)(c.Z,{})})})})}}])&&g(t.prototype,r),o&&g(t,o),Object.defineProperty(t,"prototype",{writable:!1}),f}(o.Component);t.default=(0,d.RM)((0,p.Z)((0,s.connect)((function(e){return{actionCalled:e.superadmin.product.actionCalled,editSuccess:e.superadmin.product.editSuccess,successMessage:e.superadmin.product.successMessage,errorMessage:e.superadmin.product.errorMessage,product:e.superadmin.product.product,auth:e.auth}}),(function(e){return{dispatch:e,actions:(0,i.bindActionCreators)({productView:f.G_},e)}}))(S)))}}]);