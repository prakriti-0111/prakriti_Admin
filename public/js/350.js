"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[350],{47078:function(e,t,n){n.d(t,{Jm:function(){return a},XI:function(){return i},bS:function(){return u},k6:function(){return c}});var r=n(69222),o=n(72088),s=n(57446),a=function(e){return e=(0,s.B7)(e,!0),function(t){r.Z.get("/superadmin/countries".concat(e)).then((function(e){e.data.success&&t({type:o.o5,payload:e.data.data})})).catch((function(e){}))}},i=function(e){return function(t){r.Z.post("/superadmin/countries/store",e).then((function(e){e.data.success&&t({type:o.Gu,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return function(n){r.Z.post("/superadmin/countries/update/".concat(e),t).then((function(e){e.data.success&&n({type:o.ne,payload:e.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.delete("/superadmin/countries/delete/".concat(e),t).then((function(e){e.data.success&&n({type:o.m$,payload:e.data})})).catch((function(e){}))}}},666:function(e,t,n){n.d(t,{PT:function(){return u},SS:function(){return a},iI:function(){return i},kG:function(){return l},ll:function(){return c}});var r=n(69222),o=n(25913),s=n(57446),a=function(e){return e=(0,s.B7)(e,!0),function(t){r.Z.get("/superadmin/investors".concat(e)).then((function(e){e.data.success&&t({type:o.iz,payload:e.data.data})})).catch((function(e){}))}},i=function(e){return function(t){r.Z.post("/superadmin/investors/store",e).then((function(e){t({type:o.AR,payload:e.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.get("/superadmin/investors/fetch/".concat(e)).then((function(e){e.data.success&&t({type:o.E$,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.post("/superadmin/investors/update/".concat(e),t).then((function(e){n({type:o.xz,payload:e.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.delete("/superadmin/investors/delete/".concat(e),t).then((function(e){n({type:o.sz,payload:e.data})})).catch((function(e){}))}}},72790:function(e,t,n){n.d(t,{EX:function(){return u},OS:function(){return i},Qv:function(){return c},UK:function(){return a},e9:function(){return l}});var r=n(69222),o=n(64091),s=n(57446),a=function(e){return e=(0,s.B7)(e,!0),function(t){r.Z.get("/superadmin/loans".concat(e)).then((function(e){e.data.success&&t({type:o.i,payload:e.data.data})})).catch((function(e){}))}},i=function(e){return function(t){r.Z.post("/superadmin/loans/store",e).then((function(e){t({type:o.Nh,payload:e.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.get("/superadmin/loans/view/".concat(e)).then((function(e){e.data.success&&t({type:o.GB,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.delete("/superadmin/loans/delete/".concat(e),t).then((function(e){n({type:o.Mo,payload:e.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.post("/superadmin/loans/make-payment/".concat(e),t).then((function(e){n({type:o.gO,payload:e.data})})).catch((function(e){}))}}},40350:function(e,t,n){n.r(t),n.d(t,{default:function(){return ce}});var r=n(27378),o=n(23884),s=n(28730),a=n(23434),i=n(10755),c=n(74154),u=n(8971),l=n(13040),p=n(57446),d=n(72790),f=(n(47078),n(72619),n(43014),n(46265)),h=n(64091),m=n(74570),y=n(26803),b=n(69162),j=n(93033),v=n(9647),g=n(56793),x=n(64212),O=n(55378),P=n(60789),S=n(95908),Z=n(10418),w=n(41485),_=n(33565),C=n(43564),D=n(78153),M=n(666),k=n(24246);function N(e){return N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},N(e)}var I=["input","label","meta"],T=["input","label","meta"],E=["input","label","meta"],F=["input","label","meta"],R=["input","label","meta"],A=["input","label","meta"],L=["input","label","meta"];function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(Object(n),!0).forEach((function(t){K(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function B(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e,t){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},G(e,t)}function U(e,t){if(t&&("object"===N(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return V(e)}function V(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function X(e){return X=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},X(e)}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var $=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&G(e,t)}(u,e);var t,n,r,o,i,c=(o=u,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=X(o);if(i){var n=X(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),K(V(t=c.call(this,e)),"renderInvestorField",(function(e){var n=e.input,r=e.label,o=e.meta,s=o.touched,a=o.error,i=B(e,I);return(0,k.jsxs)(g.Z,{fullWidth:!0,error:!(!s||!a),children:[r?(0,k.jsx)(x.Z,{children:r}):null,(0,k.jsxs)(O.Z,W(W(W({label:r,fullWidth:!0},n),i),{},{children:[(0,k.jsx)(P.Z,{value:""}),t.state.investors.map((function(e,t){return(0,k.jsx)(P.Z,{value:e.id,children:e.name},t)}))]})),s&&a?(0,k.jsx)(S.Z,{children:a}):null]})})),K(V(t),"renderAmountField",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,T);return(0,k.jsx)(Z.Z,W(W({label:n,fullWidth:!0,error:!(!o||!s),helperText:o&&s?s:"",InputProps:{startAdornment:(0,k.jsx)(w.Z,{position:"start",children:"₹"})}},t),a))})),K(V(t),"renderInterestField",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,E);return(0,k.jsx)(Z.Z,W(W({label:n,fullWidth:!0,error:!(!o||!s),helperText:o&&s?s:"",InputProps:{endAdornment:(0,k.jsx)(w.Z,{position:"start",children:"%"})}},t),a))})),K(V(t),"renderDurationField",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,F);return(0,k.jsx)(Z.Z,W(W({label:n,fullWidth:!0,error:!(!o||!s),helperText:o&&s?s:"",InputProps:{endAdornment:(0,k.jsx)(w.Z,{position:"start",children:"months"})}},t),a))})),K(V(t),"renderInterestTypeField",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,R);return(0,k.jsxs)(g.Z,{fullWidth:!0,error:!(!o||!s),children:[n?(0,k.jsx)(x.Z,{children:n}):null,(0,k.jsxs)(O.Z,W(W(W({label:n,fullWidth:!0},t),a),{},{children:[(0,k.jsx)(P.Z,{value:"monthly",children:"Monthly"}),(0,k.jsx)(P.Z,{value:"yearly",children:"Yearly"})]})),o&&s?(0,k.jsx)(S.Z,{children:s}):null]})})),K(V(t),"renderPaymentModeField",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,A);return(0,k.jsxs)(g.Z,{fullWidth:!0,error:!(!o||!s),children:[n?(0,k.jsx)(x.Z,{children:n}):null,(0,k.jsxs)(O.Z,W(W(W({label:n,fullWidth:!0},t),a),{},{children:[(0,k.jsx)(P.Z,{value:""}),(0,k.jsx)(P.Z,{value:"cash",children:"Cash"}),(0,k.jsx)(P.Z,{value:"cheque",children:"Cheque"}),(0,k.jsx)(P.Z,{value:"imps_neft",children:"NEFT/IMPS/UPI"}),(0,k.jsx)(P.Z,{value:"online",children:"Online"})]})),o&&s?(0,k.jsx)(S.Z,{children:s}):null]})})),K(V(t),"renderTextArea",(function(e){var t=e.input,n=e.label,r=e.meta,o=r.touched,s=r.error,a=B(e,L);return(0,k.jsx)(_.Z,W(W({minRows:2,label:n,error:o&&s?s:"",style:{width:"100%"}},t),a))})),t.state={investors:t.props.investors},t}return t=u,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.investors!==t.investors&&(n.investors=e.investors),n}}],(n=[{key:"componentDidMount",value:function(){this.props.actions.investorList({all:1}),this.props.initialize({interest_display_type:"yearly"})}},{key:"render",value:function(){var e=this,t=this.props,n=t.handleSubmit,r=(t.pristine,t.submitting);return(0,k.jsx)("form",{onSubmit:n,children:(0,k.jsxs)(C.Z,{sx:{flexGrow:1},children:[(0,k.jsxs)(a.ZP,{container:!0,spacing:2,className:"tax-input",children:[(0,k.jsx)(a.ZP,{item:!0,xs:6,className:"create-input",children:(0,k.jsx)(v.gN,{name:"user_id",component:this.renderInvestorField,label:"Investor",type:"select"})}),(0,k.jsx)(a.ZP,{item:!0,xs:6,className:"create-input",children:(0,k.jsx)(v.gN,{name:"amount",component:this.renderAmountField,label:"Loan Amount"})}),(0,k.jsx)(a.ZP,{item:!0,xs:3,className:"create-input",children:(0,k.jsx)(v.gN,{name:"interest",component:this.renderInterestField,label:"Interest"})}),(0,k.jsx)(a.ZP,{item:!0,xs:3,className:"create-input",children:(0,k.jsx)(v.gN,{name:"interest_display_type",component:this.renderInterestTypeField,label:"Interest Type",type:"select"})}),(0,k.jsx)(a.ZP,{item:!0,xs:3,className:"create-input",children:(0,k.jsx)(v.gN,{name:"duration",component:this.renderDurationField,label:"Duration"})}),(0,k.jsx)(a.ZP,{item:!0,xs:3,className:"create-input",children:(0,k.jsx)(v.gN,{name:"payment_mode",component:this.renderPaymentModeField,label:"Payment Mode",type:"select"})}),(0,k.jsx)(a.ZP,{item:!0,xs:12,className:"create-input",children:(0,k.jsx)(v.gN,{className:"description",name:"notes",component:this.renderTextArea,placeholder:"Notes"})})]}),(0,k.jsx)(a.ZP,{item:!0,xs:12,children:(0,k.jsxs)(D.Z,{spacing:{mt:2},direction:"row",className:"ratn-footer-buttons gap-1",justifyContent:"flex-end",children:[(0,k.jsx)(s.Z,{variant:"contained",type:"submit",className:"conf-button",disabled:r,children:"Submit"}),(0,k.jsx)(s.Z,{variant:"outlined",className:"close-button",onClick:function(){return e.props.handleCancel()},children:"Cancel"})]})})]})})}}])&&z(t.prototype,n),r&&z(t,r),Object.defineProperty(t,"prototype",{writable:!1}),u}(r.Component),J=(0,l.Z)((0,o.connect)((function(e){return{investors:e.superadmin.investor.items}}),(function(e){return{dispatch:e,actions:(0,i.bindActionCreators)({investorList:M.SS},e)}}))((0,v.sx)({form:"LoanForm",validate:function(e){var t={};return["user_id","amount","interest","duration","interest_display_type","payment_mode"].forEach((function(n){e[n]||(t[n]="This field is required.")})),t}})($))),Q=n(72897);function Y(e){return Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Y(e)}function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){ae(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function te(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ne(e,t){return ne=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},ne(e,t)}function re(e,t){if(t&&("object"===Y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return oe(e)}function oe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function se(e){return se=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},se(e)}function ae(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ie=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&ne(e,t)}(d,e);var t,n,r,o,i,l=(o=d,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=se(o);if(i){var n=se(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return re(this,e)});function d(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),ae(oe(t=l.call(this,e)),"handleView",(function(e){t.props.navigate("view/"+e.id)})),ae(oe(t),"handleDelete",(function(e){t.props.actions.loanDelete(e.id)})),ae(oe(t),"loadListData",(function(){t.props.actions.loanList(t.state.queryParams)})),ae(oe(t),"handlePagination",(function(e){t.state.queryParams.page=e,t.loadListData()})),ae(oe(t),"handleCancel",(function(){t.handleDialogClose()})),ae(oe(t),"handleCreate",(function(){t.setState({openDialog:!0,dialogTitle:"Create Loan"})})),ae(oe(t),"handleDialogClose",(function(e,n){n&&"backdropClick"==n||t.setState({openDialog:!1})})),ae(oe(t),"submitLoan",(function(e){t.props.actions.loanStore(e)})),t.state=ee(ee({},t.props),{},{queryParams:{page:1,limit:50},openDialog:!1,actionCalled:t.props.actionCalled,createSuccess:t.props.createSuccess,deleteSuccess:t.props.deleteSuccess,paymentSuccess:t.props.paymentSuccess,successMessage:t.props.successMessage,errorMessage:t.props.errorMessage}),t.columns=[{name:"investor_name",display_name:"Investor Name"},{name:"loan_amount",display_name:"Principal Amt"},{name:"interest_display",display_name:"INT Rate"},{name:"interest_display_type",display_name:"INT Type"},{name:"interest_amount",display_name:"Interest Amt"},{name:"total_with_interest",display_name:"Tot With Interest"},{name:"monthly_emi",display_name:"EMI Amount"}],t}return t=d,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.actionCalled!==t.actionCalled&&(n.actionCalled=e.actionCalled),e.createSuccess!==t.createSuccess&&(n.createSuccess=e.createSuccess),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),e.paymentSuccess!==t.paymentSuccess&&(n.paymentSuccess=e.paymentSuccess),e.successMessage!==t.successMessage&&(n.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(n.errorMessage=e.errorMessage),e.permissions!==t.permissions&&(n.permissions=e.permissions),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(){var e=this;this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({queryParams:ee(ee({},this.state.queryParams),{},{page:1}),openDialog:!1},(function(){e.loadListData()}))):this.state.deleteSuccess&&(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:h.oo}),this.handlePagination(1)),(0,p.xb)(this.state.errorMessage)||this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:h.oo}))}},{key:"render",value:function(){return(0,k.jsxs)(u.Z,{title:"Loans",secondary:(0,p.Fs)(this.state.permissions,"loans","add")?(0,k.jsx)(s.Z,{variant:"contained",onClick:this.handleCreate,children:"Add"}):null,children:[(0,k.jsx)(a.ZP,{container:!0,spacing:c.dv,children:(0,k.jsx)(f.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"View",onClick:this.handleView,color:"primary",show:(0,p.Fs)(this.state.permissions,"loans","view")},{label:"Delete",onClick:this.handleDelete,color:"error",isDelete:!0,show:(0,p.Fs)(this.state.permissions,"loans","delete")}]})}),(0,k.jsxs)(m.Z,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"md",children:[(0,k.jsx)(j.Z,{children:this.state.dialogTitle}),(0,k.jsxs)(y.Z,{children:[(0,k.jsx)(b.Z,{}),(0,k.jsx)(J,{onSubmit:this.submitLoan,handleCancel:this.handleCancel})]})]})]})}}])&&te(t.prototype,n),r&&te(t,r),Object.defineProperty(t,"prototype",{writable:!1}),d}(r.Component),ce=(0,Q.RM)((0,l.Z)((0,o.connect)((function(e){var t;return ae(t={items:e.superadmin.loan.items,total:e.superadmin.loan.total,actionCalled:e.superadmin.loan.actionCalled,createSuccess:e.superadmin.loan.createSuccess,deleteSuccess:e.superadmin.loan.deleteSuccess,paymentSuccess:e.superadmin.loan.paymentSuccess,successMessage:e.superadmin.loan.successMessage},"successMessage",e.superadmin.loan.successMessage),ae(t,"errorMessage",e.superadmin.loan.errorMessage),ae(t,"permissions",e.employee.permissions.permissions),t}),(function(e){return{dispatch:e,actions:(0,i.bindActionCreators)({loanList:d.UK,loanPayment:d.e9,loanStore:d.OS,loanDelete:d.EX},e)}}))(ie)))}}]);