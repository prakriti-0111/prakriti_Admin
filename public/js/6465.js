"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6465],{26465:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),i=n(23434),c=n(95287),u=n(54074),s=n(10755),a=n(8971),f=n(13040),l=n(72897),p=n(23880),y=n(24246);function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(l,t);var e,n,r,o,s,f=(o=l,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(o);if(s){var n=m(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return v(this,t)});function l(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),(e=f.call(this,t)).state={id:e.props.params.id,sale:e.props.sale},e}return e=l,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.sale!==e.sale&&(n.sale=t.sale),n}}],(n=[{key:"componentDidMount",value:function(){this.props.actions.salesEdit(this.state.id)}},{key:"render",value:function(){return(0,y.jsx)(a.Z,{title:"Return Sale",children:(0,y.jsx)("div",{children:this.state.sale?(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(u.Z,{formData:this.state.sale})}):(0,y.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,y.jsx)(c.Z,{})})})})}}])&&d(e.prototype,n),r&&d(e,r),Object.defineProperty(e,"prototype",{writable:!1}),l}(r.Component);e.default=(0,l.RM)((0,f.Z)((0,o.connect)((function(t){return{sale:t.superadmin.sales.sale}}),(function(t){return{dispatch:t,actions:(0,s.bindActionCreators)({salesEdit:p.DZ},t)}}))(j)))}}]);