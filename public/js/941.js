"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[941],{70941:function(t,e,r){r.r(e);var n=r(27378),o=r(23884),i=r(23434),c=r(95287),u=r(23233),f=r(10755),s=r(8971),a=r(13040),p=r(24761),l=r(24246);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function h(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(p,t);var e,r,n,o,f,a=(o=p,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(o);if(f){var r=m(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return h(this,t)});function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=a.call(this,t)).state={item:e.props.item},e}return e=p,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.item!==e.item&&(r.item=t.item),r}}],(r=[{key:"componentDidMount",value:function(){this.props.actions.distributorFetch(this.props.params.id)}},{key:"render",value:function(){return(0,l.jsx)(s.Z,{title:"Distributor Edit",children:(0,l.jsx)("div",{children:this.state.item?(0,l.jsx)(u.Z,{formData:this.state.item}):(0,l.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,l.jsx)(c.Z,{})})})})}}])&&b(e.prototype,r),n&&b(e,n),Object.defineProperty(e,"prototype",{writable:!1}),p}(n.Component);e.default=(0,a.Z)((0,o.connect)((function(t){return{item:t.superadmin.distributor.item||null}}),(function(t){return{dispatch:t,actions:(0,f.bindActionCreators)({distributorFetch:p.gy},t)}}))(v))}}]);