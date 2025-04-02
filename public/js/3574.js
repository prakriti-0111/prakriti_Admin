"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3574],{96020:function(t,e,n){n.d(e,{$z:function(){return u},XQ:function(){return l},YZ:function(){return s},mx:function(){return c},xz:function(){return i}});var r=n(69222),o=n(41131),a=n(57446),c=function(t){return t=(0,a.B7)(t,!0),function(e){r.Z.get("/manager/workers".concat(t)).then((function(t){t.data.success&&e({type:o.QZ,payload:t.data.data})})).catch((function(t){}))}},i=function(t){return function(e){r.Z.post("/manager/workers/store",t).then((function(t){t.data.success&&e({type:o.ud,payload:t.data.data})})).catch((function(t){}))}},u=function(t){return function(e){r.Z.get("/manager/workers/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.tC,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(n){r.Z.post("/manager/workers/update/".concat(t),e).then((function(t){t.data.success&&n({type:o.__,payload:t.data.data})})).catch((function(t){}))}},l=function(t,e){return function(n){r.Z.delete("/manager/workers/delete/".concat(t),e).then((function(t){t.data.success&&n({type:o.FC,payload:!0})})).catch((function(t){}))}}},13574:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),a=n(28730),c=n(23434),i=n(10755),u=n(74154),s=n(8971),l=n(13040),f=n(96020),p=n(46265),d=n(41131),y=n(24246);function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){k(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function O(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return v(t)}function v(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(f,t);var e,n,r,o,i,l=(o=f,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(o);if(i){var n=P(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return O(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),k(v(e=l.call(this,t)),"loadListData",(function(){console.log("worker list from m - worker"),e.props.actions.workerList(e.state.queryParams)})),k(v(e),"handlePagination",(function(t){e.state.queryParams.page=t,e.loadListData()})),k(v(e),"handleEdit",(function(t){e.props.navigate("edit/"+t.id)})),k(v(e),"handleDelete",(function(t){e.props.actions.workerDelete(t.id)})),e.state=h(h({},e.props),{},{queryParams:{page:1,limit:50},deleteSuccess:e.props.deleteSuccess}),e.columns=[{name:"name",display_name:"Name"},{name:"email",display_name:"Email"},{name:"mobile",display_name:"Mobile"}],e.tableActions=[{label:"Edit",onClick:e.handleEdit,color:"primary"},{label:"Delete",onClick:e.handleDelete,isDelete:!0,color:"error"}],e}return e=f,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(t,e){this.state.deleteSuccess&&((0,this.props.dispatch)({type:d.FC,payload:!1}),this.handlePagination(1))}},{key:"render",value:function(){var t=this;return(0,y.jsx)(s.Z,{title:"Workers",secondary:(0,y.jsx)(a.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Add"}),children:(0,y.jsx)(c.ZP,{container:!0,spacing:u.dv,className:"abc",children:(0,y.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&g(e.prototype,n),r&&g(e,r),Object.defineProperty(e,"prototype",{writable:!1}),f}(r.Component);e.default=(0,l.Z)((0,o.connect)((function(t){return{items:t.manager.worker.items,total:t.manager.worker.total,deleteSuccess:t.manager.worker.deleteSuccess}}),(function(t){return{dispatch:t,actions:(0,i.bindActionCreators)({workerList:f.mx,workerDelete:f.XQ},t)}}))(j))}}]);