/*! For license information please see 5226.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5226],{51544:function(t,e,r){r.d(e,{Gd:function(){return s},TP:function(){return l},ak:function(){return c},kk:function(){return u},tt:function(){return a}});var n=r(69222),o=r(56904),i=r(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("/superadmin/leave-application".concat(t)).then((function(t){t.data.success&&e({type:o.Sb,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){n.Z.post("/superadmin/leave-application/store",t).then((function(t){e({type:o.Vf,payload:t.data})})).catch((function(t){}))}},u=function(t){return function(e){n.Z.get("/superadmin/leave-application/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.kz,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(r){n.Z.post("/superadmin/leave-application/update/".concat(t),e).then((function(t){r({type:o.eb,payload:t.data})})).catch((function(t){}))}},l=function(t,e){return function(r){n.Z.delete("/superadmin/leave-application/delete/".concat(t),e).then((function(t){r({type:o.Yo,payload:t.data})})).catch((function(t){}))}}},75226:function(t,e,r){var n=r(27378),o=r(23884),i=r(9647),a=r(10418),c=r(43564),u=r(23434),s=r(64212),l=r(78153),f=r(28730),p=r(10755),h=r(72897),d=r(20511),y=r(13040),m=r(57446),v=r(57704),g=r(83216),b=r(72072),w=r.n(b),x=r(51544),O=r(24246);function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}var S=["input","label","meta"];function E(){E=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=w(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function p(){}function h(){}var d={};c(d,o,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(P([])));m&&m!==e&&r.call(m,o)&&(d=m);var v=h.prototype=f.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==j(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function P(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=h,c(v,"constructor",h),c(h,"constructor",p),p.displayName=c(h,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,c(t,a,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},g(b.prototype),c(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(v),c(v,a,"Generator"),c(v,o,(function(){return this})),c(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function P(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function k(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function L(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?k(Object(r),!0).forEach((function(e){T(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function D(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _(t,e){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_(t,e)}function C(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return N(t)}function N(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function F(t){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},F(t)}function T(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Z=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_(t,e)}(y,t);var e,r,n,o,p,h=(o=y,p=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=F(o);if(p){var r=F(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return C(this,t)});function y(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,y),T(N(e=h.call(this,t)),"onEditorStateChange",(function(t){e.setState({message:t})})),T(N(e),"initializeFormData",(function(){var t=L({},e.state.formData);e.props.initialize(t),e.setState({message:e.state.formData.message?v.EditorState.createWithContent(v.ContentState.createFromBlockArray((0,v.convertFromHTML)(e.state.formData.message))):v.EditorState.createEmpty()})})),T(N(e),"getDefaultValues",(function(){return{title:"",message:""}})),T(N(e),"renderTextField",(function(t){var e=t.input,r=t.label,n=t.meta,o=n.touched,i=n.error,c=function(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(t,S);return(0,O.jsx)(a.Z,L(L({label:r,fullWidth:!0,error:!(!o||!i),helperText:o&&i?i:""},e),c))})),T(N(e),"handleFormSubmit",function(){var t,r=(t=E().mark((function t(r,n){var o,i,a;return E().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=L(L({},e.getDefaultValues()),r),i=e.state.message?w()((0,v.convertToRaw)(e.state.message.getCurrentContent())):"",t.prev=2,a=(a=i.replace(/<\/?[^>]+>/gi,"")).trim(),!e.isEmptyOrSpaces(a)){t.next=8;break}return e.props.enqueueSnackbar("Please write message.",{variant:"error"}),t.abrupt("return");case 8:t.next=12;break;case 10:t.prev=10,t.t0=t.catch(2);case 12:if(o.message=i,!e.state.isCreateFrom){t.next=17;break}return t.abrupt("return",e.props.actions.leaveApplicationStore(o));case 17:return t.abrupt("return",e.props.actions.leaveApplicationUpdate(e.state.formData.id,o));case 18:case"end":return t.stop()}}),t,null,[[2,10]])})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){P(i,n,o,a,c,"next",t)}function c(t){P(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(t,e){return r.apply(this,arguments)}}()),T(N(e),"handleFieldChange",(function(t,e){}));var r="formData"in e.props?e.props.formData:null;return e.state={auth:e.props.auth,formData:r,isCreateFrom:!r,message:v.EditorState.createEmpty()},e}return e=y,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.formData!==e.formData&&(r.formData=t.formData),r}}],(r=[{key:"componentDidMount",value:function(){this.state.formData?this.initializeFormData():this.setState({message:v.EditorState.createEmpty()})}},{key:"componentDidUpdate",value:function(t){this.props.formData!=t.formData&&this.initializeFormData()}},{key:"isEmptyOrSpaces",value:function(t){return null===t||null!==t.match(/^ *$/)}},{key:"render",value:function(){var t=this,e=this.props,r=e.handleSubmit,n=e.submitting,o=this.state.message;return(0,O.jsx)("form",{onSubmit:r(this.handleFormSubmit),className:"ratn-dialog-wrapper",ref:this.formRef,children:(0,O.jsxs)(c.Z,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:[(0,O.jsxs)(u.ZP,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,O.jsx)(u.ZP,{item:!0,xs:12,className:"create-input",children:(0,O.jsx)(i.gN,{className:"input-inner",name:"title",component:this.renderTextField,label:"Title"})}),(0,O.jsxs)(u.ZP,{item:!0,xs:12,className:"create-input",children:[(0,O.jsx)(s.Z,{children:"Message"}),(0,O.jsx)(g.Editor,{editorState:o,wrapperClassName:"demo-wrapper",editorClassName:"demo-editor",onEditorStateChange:this.onEditorStateChange,toolbar:{options:["inline","textAlign","history","blockType"],inline:{options:["bold","italic","underline"]},blockType:{options:["Normal","H1","H2","H3","H4","H5","H6"]}},editorStyle:{height:"200px",paddingLeft:"10px",paddingRight:"10px"},wrapperStyle:{border:"1px solid rgb(196 196 196)"},toolbarStyle:{borderBottom:"1px solid rgb(196 196 196)"}})]})]}),(0,O.jsx)(u.ZP,{container:!0,spacing:0,className:"loans_view p_view",children:(0,O.jsx)(u.ZP,{item:!0,xs:12,className:"create-input",style:{paddingTop:"10px"},children:(0,O.jsxs)(l.Z,{spacing:1,direction:"row",justifyContent:"flex-end",className:"p-submit-button",sx:{marginTop:"0px"},children:[(0,O.jsx)(d.Z,{variant:"contained",type:"button",loading:n,disabled:n,onClick:r(this.handleFormSubmit),children:"Submit"}),n?null:(0,O.jsx)(f.Z,{variant:"outlined",onClick:function(){return t.props.navigate((0,m.ZA)((0,m.O2)(t.state.auth))+"/leave-applications")},children:"Cancel"})]})})})]})})}}])&&D(e.prototype,r),n&&D(e,n),Object.defineProperty(e,"prototype",{writable:!1}),y}(n.Component);e.Z=(0,y.Z)((0,h.RM)((0,o.connect)((function(t){return{auth:t.auth}}),(function(t){return{dispatch:t,actions:(0,p.bindActionCreators)({leaveApplicationStore:x.ak,leaveApplicationUpdate:x.Gd},t)}}))((0,i.sx)({form:"LeaveApplicationForm",validate:function(t){var e={};return["title"].forEach((function(r){t[r]||(e[r]="Required")})),e}})(Z))))}}]);