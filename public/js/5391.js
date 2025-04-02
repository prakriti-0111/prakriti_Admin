"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5391],{47078:function(t,e,n){n.d(e,{Jm:function(){return i},XI:function(){return a},bS:function(){return l},k6:function(){return s},w4:function(){return u}});var r=n(69222),o=n(72088),c=n(57446),i=function(t){return t=(0,c.B7)(t,!0),function(e){r.Z.get("/superadmin/countries".concat(t)).then((function(t){t.data.success&&e({type:o.o5,payload:t.data.data})})).catch((function(t){}))}},a=function(t){return function(e){r.Z.post("/superadmin/countries/store",t).then((function(t){t.data.success&&e({type:o.Gu,payload:t.data.data})})).catch((function(t){}))}},u=function(t){return function(e){r.Z.get("/superadmin/countries/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.j4,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(n){r.Z.post("/superadmin/countries/update/".concat(t),e).then((function(t){t.data.success&&n({type:o.ne,payload:t.data.data})})).catch((function(t){}))}},l=function(t,e){return function(n){r.Z.delete("/superadmin/countries/delete/".concat(t),e).then((function(t){t.data.success&&n({type:o.m$,payload:!0})})).catch((function(t){}))}}},55391:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),c=n(28730),i=n(23434),a=n(10755),u=n(74154),s=n(8971),l=n(13040),f=n(47078),p=n(94630),d=n(72088),y=n(24246);function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function v(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return P(t)}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(f,t);var e,n,r,o,a,l=(o=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(o);if(a){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return v(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),g(P(e=l.call(this,t)),"loadListData",(function(){e.props.countryList(e.queryParams)})),g(P(e),"handlePagination",(function(t){e.queryParams.page=t,e.loadListData()})),g(P(e),"handleEdit",(function(t){e.props.navigate("edit/"+t.id)})),g(P(e),"handleDelete",(function(t){e.props.countryDelete(t.id)})),e.state={items:e.props.items,total:e.props.total,deleteSuccess:e.props.deleteSuccess},e.queryParams={page:1,limit:20},e.columns=[{name:"name",display_name:"Country"}],e.tableActions=[{label:"Edit",onClick:e.handleEdit,color:"primary"},{label:"Delete",onClick:e.handleDelete,isDelete:!0,color:"error"}],e}return e=f,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(t,e){this.state.deleteSuccess&&((0,this.props.dispatch)({type:d.m$,payload:!1}),this.handlePagination(1))}},{key:"render",value:function(){var t=this;return(0,y.jsx)(s.Z,{title:"Countries",secondary:(0,y.jsx)(c.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Create"}),children:(0,y.jsx)(i.ZP,{container:!0,spacing:u.dv,className:"abc",children:(0,y.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.queryParams.page,limit:this.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&m(e.prototype,n),r&&m(e,r),Object.defineProperty(e,"prototype",{writable:!1}),f}(r.Component);e.default=(0,l.Z)((0,o.connect)((function(t){return{items:t.country.items,total:t.country.total,deleteSuccess:t.country.deleteSuccess}}),(function(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({dispatch:t},(0,a.bindActionCreators)({countryList:f.Jm,countryDelete:f.bS},t))}))(w))}}]);