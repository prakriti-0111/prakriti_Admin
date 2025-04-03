/*! For license information please see 8585.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[8585],{4497:function(t,n,e){"use strict";e.d(n,{BP:function(){return i},F6:function(){return h},G_:function(){return u},Ob:function(){return f},Uu:function(){return s},nh:function(){return c}});var r=e(69222),o=e(11134),a=e(57446),s=function(t){return t=(0,a.B7)(t,!0),function(n){r.Z.get("/superadmin/product".concat(t)).then((function(t){t.data.success&&n({type:o.f$,payload:t.data.data})})).catch((function(t){}))}},i=function(t){return t=(0,a.B7)(t,!0),function(t){r.Z.get("/superadmin/product/create").then((function(n){n.data.success&&t({type:o.l9,payload:n.data.data})})).catch((function(t){}))}},c=function(t){return function(n){r.Z.post("/superadmin/product/store",t).then((function(t){n({type:o.zN,payload:t.data})})).catch((function(t){}))}},u=function(t){return function(n){r.Z.get("/superadmin/product/view/".concat(t)).then((function(t){t.data.success&&n({type:o.N4,payload:t.data.data})})).catch((function(t){}))}},f=function(t,n){return function(e){r.Z.post("/superadmin/product/update/".concat(t),n).then((function(t){e({type:o.Q7,payload:t.data})})).catch((function(t){}))}},h=function(t,n){return function(e){r.Z.delete("/superadmin/product/delete/".concat(t),n).then((function(t){e({type:o.u7,payload:t.data})})).catch((function(t){}))}}},62386:function(t,n,e){"use strict";e.d(n,{Db:function(){return h},Nn:function(){return f},fF:function(){return d},gR:function(){return u},i7:function(){return l}});var r=e(69222),o=e(17937),a=e(57446);function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function i(){i=function(){return t};var t={},n=Object.prototype,e=n.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",a=r.asyncIterator||"@@asyncIterator",c=r.toStringTag||"@@toStringTag";function u(t,n,e){return Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{u({},"")}catch(t){u=function(t,n,e){return t[n]=e}}function f(t,n,e,r){var o=n&&n.prototype instanceof d?n:d,a=Object.create(o.prototype),s=new z(r||[]);return a._invoke=function(t,n,e){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(e.method=o,e.arg=a;;){var s=e.delegate;if(s){var i=k(s,e);if(i){if(i===l)continue;return i}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var c=h(t,n,e);if("normal"===c.type){if(r=e.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(r="completed",e.method="throw",e.arg=c.arg)}}}(t,e,s),a}function h(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l={};function d(){}function p(){}function j(){}var y={};u(y,o,(function(){return this}));var m=Object.getPrototypeOf,v=m&&m(m(E([])));v&&v!==n&&e.call(v,o)&&(y=v);var g=j.prototype=d.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(n){u(t,n,(function(t){return this._invoke(n,t)}))}))}function w(t,n){function r(o,a,i,c){var u=h(t[o],t,a);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==s(l)&&e.call(l,"__await")?n.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):n.resolve(l).then((function(t){f.value=t,i(f)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;this._invoke=function(t,e){function a(){return new n((function(n,o){r(t,e,n,o)}))}return o=o?o.then(a,a):a()}}function k(t,n){var e=t.iterator[n.method];if(void 0===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,k(t,n),"throw"===n.method))return l;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=h(e,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,l;var o=r.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,l):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,l)}function x(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function L(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function z(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function n(){for(;++r<t.length;)if(e.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=void 0,n.done=!0,n};return a.next=a}}return{next:_}}function _(){return{value:void 0,done:!0}}return p.prototype=j,u(g,"constructor",j),u(j,"constructor",p),p.displayName=u(j,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===p||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(w.prototype),u(w.prototype,a,(function(){return this})),t.AsyncIterator=w,t.async=function(n,e,r,o,a){void 0===a&&(a=Promise);var s=new w(f(n,e,r,o),a);return t.isGeneratorFunction(e)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},b(g),u(g,c,"Generator"),u(g,o,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=E,z.prototype={constructor:z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(e,r){return s.type="throw",s.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var i=e.call(a,"catchLoc"),c=e.call(a,"finallyLoc");if(i&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(i){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=n&&n<=a.finallyLoc&&(a=null);var s=a?a.completion:{};return s.type=t,s.arg=n,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(s)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),l},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),L(e),l}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;L(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:E(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),l}},t}function c(t,n,e,r,o,a,s){try{var i=t[a](s),c=i.value}catch(t){return void e(t)}i.done?n(c):Promise.resolve(c).then(r,o)}var u=function(t){return t=(0,a.B7)(t,!0),function(n){r.Z.get("/superadmin/stocks".concat(t)).then((function(t){t.data.success&&n({type:o.VR,payload:t.data.data})})).catch((function(t){}))}},f=function(t){return function(n){r.Z.get("/superadmin/stocks/view/".concat(t)).then((function(t){t.data.success&&n({type:o.Uy,payload:t.data.data})})).catch((function(t){}))}},h=function(t){return t=(0,a.B7)(t,!0),function(n){r.Z.get("/superadmin/stocks/products".concat(t)).then((function(t){t.data.success&&n({type:o.FR,payload:t.data.data})})).catch((function(t){}))}},l=function(t){return t=(0,a.B7)(t,!0),function(n){r.Z.get("/superadmin/stocks/product-details".concat(t)).then((function(t){t.data.success&&n({type:o.W4,payload:t.data.data})})).catch((function(t){}))}},d=function(){var t,n=(t=i().mark((function t(n){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.Z.post("/superadmin/stocks/check-certificate-exist",n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})),function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function s(t){c(a,r,o,s,i,"next",t)}function i(t){c(a,r,o,s,i,"throw",t)}s(void 0)}))});return function(t){return n.apply(this,arguments)}}()},95126:function(t,n,e){var r={"./af":1009,"./af.js":1009,"./ar":88769,"./ar-dz":23739,"./ar-dz.js":23739,"./ar-kw":93745,"./ar-kw.js":93745,"./ar-ly":99576,"./ar-ly.js":99576,"./ar-ma":67408,"./ar-ma.js":67408,"./ar-sa":48781,"./ar-sa.js":48781,"./ar-tn":87856,"./ar-tn.js":87856,"./ar.js":88769,"./az":2030,"./az.js":2030,"./be":56476,"./be.js":56476,"./bg":25304,"./bg.js":25304,"./bm":48125,"./bm.js":48125,"./bn":34,"./bn-bd":29835,"./bn-bd.js":29835,"./bn.js":34,"./bo":64082,"./bo.js":64082,"./br":8317,"./br.js":8317,"./bs":93107,"./bs.js":93107,"./ca":68272,"./ca.js":68272,"./cs":98567,"./cs.js":98567,"./cv":61583,"./cv.js":61583,"./cy":10076,"./cy.js":10076,"./da":31760,"./da.js":31760,"./de":8973,"./de-at":63214,"./de-at.js":63214,"./de-ch":74728,"./de-ch.js":74728,"./de.js":8973,"./dv":54053,"./dv.js":54053,"./el":7499,"./el.js":7499,"./en-au":67876,"./en-au.js":67876,"./en-ca":47010,"./en-ca.js":47010,"./en-gb":34239,"./en-gb.js":34239,"./en-ie":99830,"./en-ie.js":99830,"./en-il":28438,"./en-il.js":28438,"./en-in":25322,"./en-in.js":25322,"./en-nz":43264,"./en-nz.js":43264,"./en-sg":55449,"./en-sg.js":55449,"./eo":39486,"./eo.js":39486,"./es":32430,"./es-do":16310,"./es-do.js":16310,"./es-mx":27038,"./es-mx.js":27038,"./es-us":73099,"./es-us.js":73099,"./es.js":32430,"./et":34975,"./et.js":34975,"./eu":87063,"./eu.js":87063,"./fa":68073,"./fa.js":68073,"./fi":50957,"./fi.js":50957,"./fil":8764,"./fil.js":8764,"./fo":81775,"./fo.js":81775,"./fr":74179,"./fr-ca":14306,"./fr-ca.js":14306,"./fr-ch":73791,"./fr-ch.js":73791,"./fr.js":74179,"./fy":47014,"./fy.js":47014,"./ga":46911,"./ga.js":46911,"./gd":62958,"./gd.js":62958,"./gl":87344,"./gl.js":87344,"./gom-deva":33161,"./gom-deva.js":33161,"./gom-latn":35798,"./gom-latn.js":35798,"./gu":68485,"./gu.js":68485,"./he":27917,"./he.js":27917,"./hi":52159,"./hi.js":52159,"./hr":95842,"./hr.js":95842,"./hu":30005,"./hu.js":30005,"./hy-am":51312,"./hy-am.js":51312,"./id":60781,"./id.js":60781,"./is":64101,"./is.js":64101,"./it":43467,"./it-ch":4759,"./it-ch.js":4759,"./it.js":43467,"./ja":44164,"./ja.js":44164,"./jv":70079,"./jv.js":70079,"./ka":57036,"./ka.js":57036,"./kk":92022,"./kk.js":92022,"./km":63418,"./km.js":63418,"./kn":43655,"./kn.js":43655,"./ko":30986,"./ko.js":30986,"./ku":91902,"./ku.js":91902,"./ky":4604,"./ky.js":4604,"./lb":99026,"./lb.js":99026,"./lo":20537,"./lo.js":20537,"./lt":22288,"./lt.js":22288,"./lv":1495,"./lv.js":1495,"./me":60690,"./me.js":60690,"./mi":2571,"./mi.js":2571,"./mk":93959,"./mk.js":93959,"./ml":97225,"./ml.js":97225,"./mn":88,"./mn.js":88,"./mr":46622,"./mr.js":46622,"./ms":11070,"./ms-my":48899,"./ms-my.js":48899,"./ms.js":11070,"./mt":63931,"./mt.js":63931,"./my":95393,"./my.js":95393,"./nb":4274,"./nb.js":4274,"./ne":8914,"./ne.js":8914,"./nl":33114,"./nl-be":68479,"./nl-be.js":68479,"./nl.js":33114,"./nn":4513,"./nn.js":4513,"./oc-lnc":46549,"./oc-lnc.js":46549,"./pa-in":28264,"./pa-in.js":28264,"./pl":32848,"./pl.js":32848,"./pt":90899,"./pt-br":55077,"./pt-br.js":55077,"./pt.js":90899,"./ro":92512,"./ro.js":92512,"./ru":21753,"./ru.js":21753,"./sd":16840,"./sd.js":16840,"./se":78362,"./se.js":78362,"./si":50464,"./si.js":50464,"./sk":66324,"./sk.js":66324,"./sl":41963,"./sl.js":41963,"./sq":53039,"./sq.js":53039,"./sr":93454,"./sr-cyrl":10466,"./sr-cyrl.js":10466,"./sr.js":93454,"./ss":95158,"./ss.js":95158,"./sv":28859,"./sv.js":28859,"./sw":57594,"./sw.js":57594,"./ta":26915,"./ta.js":26915,"./te":15677,"./te.js":15677,"./tet":92154,"./tet.js":92154,"./tg":74098,"./tg.js":74098,"./th":89071,"./th.js":89071,"./tk":49381,"./tk.js":49381,"./tl-ph":1869,"./tl-ph.js":1869,"./tlh":92346,"./tlh.js":92346,"./tr":71483,"./tr.js":71483,"./tzl":30266,"./tzl.js":30266,"./tzm":33138,"./tzm-latn":32960,"./tzm-latn.js":32960,"./tzm.js":33138,"./ug-cn":29456,"./ug-cn.js":29456,"./uk":50805,"./uk.js":50805,"./ur":61127,"./ur.js":61127,"./uz":29628,"./uz-latn":80840,"./uz-latn.js":80840,"./uz.js":29628,"./vi":56962,"./vi.js":56962,"./x-pseudo":49257,"./x-pseudo.js":49257,"./yo":62423,"./yo.js":62423,"./zh-cn":61002,"./zh-cn.js":61002,"./zh-hk":6046,"./zh-hk.js":6046,"./zh-mo":36903,"./zh-mo.js":36903,"./zh-tw":24710,"./zh-tw.js":24710};function o(t){var n=a(t);return e(n)}function a(t){if(!e.o(r,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=a,t.exports=o,o.id=95126}}]);