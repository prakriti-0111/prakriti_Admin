"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9641],{9780:function(t,e,n){n.d(e,{Jm:function(){return a}});var r=n(69222),o=n(39684),i=n(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){r.Z.get("/admin/countries".concat(t)).then((function(t){t.data.success&&e({type:o.o5,payload:t.data.data})})).catch((function(t){}))}}},44988:function(t,e,n){n.d(e,{SG:function(){return c},Wr:function(){return l},gy:function(){return s},pi:function(){return u},zP:function(){return a}});var r=n(69222),o=n(75055),i=n(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){r.Z.get("/admin/distributors".concat(t)).then((function(t){t.data.success&&e({type:o.cW,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){r.Z.post("/admin/distributors/store",t).then((function(t){t.data.success&&e({type:o.F0,payload:t.data.data})})).catch((function(t){}))}},s=function(t){return function(e){r.Z.get("/admin/distributors/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.j6,payload:t.data.data})})).catch((function(t){}))}},u=function(t,e){return function(n){r.Z.post("/admin/distributors/update/".concat(t),e).then((function(t){t.data.success&&n({type:o.Ce,payload:t.data.data})})).catch((function(t){}))}},l=function(t,e){return function(n){r.Z.delete("/admin/distributors/delete/".concat(t),e).then((function(t){t.data.success&&n({type:o.Wh,payload:!0})})).catch((function(t){}))}}},89641:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),i=n(28730),a=n(23434),c=n(10755),s=n(74154),u=n(8971),l=n(13040),d=n(44988),f=n(9780),p=n(46265),y=n(75055),b=n(24246);function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){S(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function P(t,e){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},P(t,e)}function g(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return j(t)}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}function S(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&P(t,e)}(d,t);var e,n,r,o,c,l=(o=d,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(o);if(c){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return g(this,t)});function d(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,d),S(j(e=l.call(this,t)),"loadListData",(function(){e.props.actions.distributorList(e.state.queryParams)})),S(j(e),"handlePagination",(function(t){e.state.queryParams.page=t,e.loadListData()})),S(j(e),"handleEdit",(function(t){e.props.navigate("edit/"+t.id)})),S(j(e),"handleDelete",(function(t){e.props.actions.distributorDelete(t.id)})),e.state=O(O({},e.props),{},{queryParams:{page:1,limit:50},deleteSuccess:e.props.deleteSuccess,states:e.props.states,countries:e.props.countries,districts:e.props.districts}),e.columns=[{name:"name",display_name:"Name"},{name:"mobile",display_name:"Mobile"},{name:"email",display_name:"Email"},{name:"gst",display_name:"GST"},{name:"status_display",display_name:"Status"}],e.tableActions=[{label:"Edit",onClick:e.handleEdit,color:"primary"},{label:"Delete",onClick:e.handleDelete,isDelete:!0,color:"error"}],e}return e=d,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),t.states!==e.states&&(n.states=t.states),t.districts!==e.districts&&(n.districts=t.districts),t.countries!==e.countries&&(n.countries=t.countries),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData(),this.props.actions.countryList({all:1})}},{key:"componentDidUpdate",value:function(t,e){this.state.deleteSuccess&&((0,this.props.dispatch)({type:y.Wh,payload:!1}),this.handlePagination(1))}},{key:"render",value:function(){var t=this;return(0,b.jsx)(u.Z,{title:"Distributors",secondary:(0,b.jsx)(i.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Add"}),children:(0,b.jsx)(a.ZP,{container:!0,spacing:s.dv,className:"abc",children:(0,b.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&v(e.prototype,n),r&&v(e,r),Object.defineProperty(e,"prototype",{writable:!1}),d}(r.Component);e.default=(0,l.Z)((0,o.connect)((function(t){return{items:t.admin.distributor.items,total:t.admin.distributor.total,states:t.admin.countryState.items||[],countries:t.admin.country.items||[],districts:t.admin.district.items||[],deleteSuccess:t.admin.distributor.deleteSuccess}}),(function(t){return{dispatch:t,actions:(0,c.bindActionCreators)({distributorList:d.zP,distributorDelete:d.Wr,countryList:f.Jm},t)}}))(D))}}]);