"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6550],{54486:function(t,e,n){n.d(e,{AU:function(){return s},Oz:function(){return c},UM:function(){return u},Vh:function(){return l},_u:function(){return i}});var a=n(69222),r=n(65634),o=n(57446),c=function(t){return t=(0,o.B7)(t,!0),function(e){a.Z.get("/superadmin/product-attribute-value".concat(t)).then((function(t){t.data.success&&e({type:r.D3,payload:t.data.data})})).catch((function(t){}))}},i=function(t){return function(e){a.Z.post("/superadmin/product-attribute-value/store",t).then((function(t){t.data.success&&e({type:r.vB,payload:t.data.data})})).catch((function(t){}))}},u=function(t){return function(e){a.Z.get("/superadmin/product-attribute-value/fetch/".concat(t)).then((function(t){t.data.success&&e({type:r.T_,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(n){a.Z.post("/superadmin/product-attribute-value/update/".concat(t),e).then((function(t){t.data.success&&n({type:r.a7,payload:!0})})).catch((function(t){}))}},l=function(t,e){return function(n){a.Z.delete("/superadmin/product-attribute-value/delete/".concat(t),e).then((function(t){t.data.success&&n({type:r.W5,payload:!0})})).catch((function(t){}))}}},51704:function(t,e,n){n.d(e,{Rs:function(){return c},bP:function(){return s},dq:function(){return l},ms:function(){return i},qM:function(){return u}});var a=n(69222),r=n(85432),o=n(57446),c=function(t){return t=(0,o.B7)(t,!0),function(e){a.Z.get("/superadmin/product-categories".concat(t)).then((function(t){t.data.success&&e({type:r.OQ,payload:t.data.data})})).catch((function(t){}))}},i=function(t){return function(e){a.Z.post("/superadmin/product-categories/store",t).then((function(t){t.data.success&&e({type:r.Pv,payload:t.data.data})})).catch((function(t){}))}},u=function(t){return function(e){a.Z.get("/superadmin/product-categories/fetch/".concat(t)).then((function(t){t.data.success&&e({type:r.s3,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(n){a.Z.post("/superadmin/product-categories/update/".concat(t),e).then((function(t){t.data.success&&n({type:r.$J,payload:!0})})).catch((function(t){}))}},l=function(t,e){return function(n){a.Z.delete("/superadmin/product-categories/delete/".concat(t),e).then((function(t){t.data.success&&n({type:r.FC,payload:!0})})).catch((function(t){}))}}},56550:function(t,e,n){n.r(e);var a=n(27378),r=n(23884),o=n(28730),c=n(23434),i=n(10755),u=n(74154),s=n(8971),l=n(13040),p=n(36158),d=n(46265),f=n(90419),y=n(26803),h=n(69162),b=n(93033),m=n(68858),g=n(51704),S=n(54486),P=n(46311),v=n(24246);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){q(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function D(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function Z(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return M(t)}function M(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var V=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(p,t);var e,n,a,r,i,l=(r=p,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(r);if(i){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return Z(this,t)});function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),q(M(e=l.call(this,t)),"loadListData",(function(){e.props.productMaterialList(e.queryParams),e.props.productCategoryList({all:1}),e.props.attributeValueList({all:1})})),q(M(e),"handlePagination",(function(t){e.setState({queryParams:C(C({},e.state.queryParams),{},{page:t})},(function(){e.loadListData()}))})),q(M(e),"handleEdit",(function(t){e.setState({editRow:t,openDialog:!0,dialogTitle:"Edit Sub Category"}),console.log("edit",t)})),q(M(e),"handleDelete",(function(t){e.props.productMaterialDelete(t.id)})),q(M(e),"handleCreate",(function(){e.setState({openDialog:!0,dialogTitle:"Create Category"})})),q(M(e),"handleDialogClose",(function(t,n){n&&"backdropClick"==n||e.setState({openDialog:!1})})),q(M(e),"submit",(function(t){e.props.productMaterialCreate(t)})),q(M(e),"handleCancel",(function(){e.handleDialogClose()})),e.state=C(C({},e.props),{},{queryParams:{page:1,limit:20},openDialog:!1,isCreate:!0,editRow:null,categories:e.props.categories,attributeValue:e.props.attributeValue,createSuccess:!1,editSuccess:!1,deleteSuccess:!1}),e.queryParams={page:1,limit:20},e.columns=[{name:"category",display_name:"Category"},{name:"name",display_name:"Name"},{name:"purity",display_name:"Purity"}],e.tableActions=[{label:"Edit",onClick:e.handleEdit,color:"primary"},{label:"Delete",onClick:e.handleDelete,isDelete:!0,color:"error"}],e}return e=p,a=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.categories!==e.categories&&(n.categories=t.categories),t.attributeValue!==e.attributeValue&&(n.attributeValue=t.attributeValue),"createSuccess"in t&&t.createSuccess!==e.createSuccess&&(n.createSuccess=t.createSuccess),"editSuccess"in t&&t.editSuccess!==e.editSuccess&&(n.editSuccess=t.editSuccess),"deleteSuccess"in t&&t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(){var t=this;this.state.createSuccess?(this.props.dispatch({type:P.tM,payload:!1}),this.setState({queryParams:C(C({},this.state.queryParams),{},{page:1}),openDialog:!1},(function(){t.loadListData()}))):this.state.deleteSuccess?(this.props.dispatch({type:P.h9,payload:!1}),this.handlePagination(1)):this.state.editSuccess&&(this.props.dispatch({type:P.g6,payload:!1}),this.setState({queryParams:C(C({},this.state.queryParams),{},{page:1}),openDialog:!1,editRow:null},(function(){t.loadListData()})))}},{key:"render",value:function(){return(0,v.jsxs)(s.Z,{title:"Product Material",secondary:(0,v.jsx)(o.Z,{variant:"contained",onClick:this.handleCreate,children:"Create"}),children:[(0,v.jsx)(c.ZP,{container:!0,spacing:u.dv,className:"abc",children:(0,v.jsx)(d.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})}),(0,v.jsxs)(f.Z,{open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"sm",children:[(0,v.jsx)(b.Z,{children:this.state.isCreate?"Create Material":"Edit Material"}),(0,v.jsxs)(y.Z,{children:[(0,v.jsx)(h.Z,{}),(0,v.jsx)(m.Z,{onSubmit:this.submit,formData:this.state.editRow,categories:this.state.categories,attributeValue:this.state.attributeValue,handleCancel:this.handleCancel})]})]})]})}}])&&D(e.prototype,n),a&&D(e,a),Object.defineProperty(e,"prototype",{writable:!1}),p}(a.Component);e.default=(0,l.Z)((0,r.connect)((function(t){return{items:t.productMaterial.items,total:t.productMaterial.total,categories:t.productCategory.items||[],attributeValue:t.attributeValue.items||[],createSuccess:t.productMaterial.createSuccess,editSuccess:t.productMaterial.editSuccess,deleteSuccess:t.productMaterial.deleteSuccess}}),(function(t){return C({dispatch:t},(0,i.bindActionCreators)({productMaterialList:p.DB,productMaterialCreate:p.wj,productMaterialDelete:p.le,productCategoryList:g.Rs,attributeValueList:S.Oz},t))}))(V))}}]);