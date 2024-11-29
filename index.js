(function(){"use strict";const e=window.Vue;function S(){return window.panel}const x=e.computed;e.customRef,e.defineAsyncComponent,e.defineComponent,e.effectScope,e.getCurrentInstance;const B=e.getCurrentScope;e.h,e.inject,e.isProxy,e.isReactive,e.isReadonly,e.isRef,e.isShallow,e.markRaw;const I=e.nextTick;e.onActivated,e.onBeforeMount,e.onBeforeUnmount,e.onBeforeUpdate,e.onDeactivated,e.onErrorCaptured;const P=e.onMounted;e.onRenderTracked,e.onRenderTriggered;const A=e.onScopeDispose;e.onServerPrefetch,e.onUnmounted,e.onUpdated,e.provide,e.proxyRefs,e.reactive,e.readonly;const m=e.ref;e.shallowReactive,e.shallowReadonly,e.shallowRef,e.toRaw,e.toRef,e.toRefs,e.triggerRef;const E=e.unref;e.useAttrs,e.useCssModule,e.useCssVars,e.useListeners,e.useSlots;const M=e.watch;e.watchEffect,e.watchPostEffect,e.watchSyncEffect;let w;async function L(){if(w)return w;try{w=await window.panel.api.get("typo-and-paste/characters")}catch(s){console.error("Error loading characters:",s),w=[]}return w}function V(s){return Object.prototype.toString.call(s)==="[object Object]"}function R(s,t,o,n,r,c,f,l){var p=typeof s=="function"?s.options:s;return t&&(p.render=t,p.staticRenderFns=o,p._compiled=!0),c&&(p._scopeId="data-v-"+c),{exports:s,options:p}}const U={__name:"CharacterSelector",props:{languageCode:{type:String,required:!0},type:{type:String,default:"dropdown"}},emits:["close"],setup(s,{emit:t}){const o=s,n=S(),r=m([]),c=m(),f=m(),l=o.type==="dialog"?12:8,p=x(()=>r.value.map(a=>{let i;return V(a.label)?i=a.label[n.user.language]||a.label.en:i=a.label,{...a,label:i}}));P(async()=>{var a,i,_;r.value=await L(),await I(),(_=(i=(a=f.value)==null?void 0:a[0])==null?void 0:i.$el)==null||_.focus()});function g(a){navigator.clipboard.writeText(a),o.type==="dialog"?n.dialog.close():t("close"),n.notification.info({message:n.t("philippoehrlein.typo-and-paste.copiedMessage",{character:a}),icon:void 0})}function k(a){a.key!=="Enter"&&a.stopPropagation();const i=c.value,_=document.activeElement.closest(".tap-characters__section");if(!_)return;const C=[..._.querySelectorAll(".tap-characters__item")],y=C.indexOf(document.activeElement),b=i.indexOf(_);if(y===-1&&b===-1)return;let u,d;switch(a.key){case"ArrowRight":a.preventDefault(),u=y+1,u<C.length&&C[u].focus();break;case"ArrowLeft":a.preventDefault(),u=y-1,u>=0&&C[u].focus();break;case"ArrowDown":a.preventDefault(),u=y+l,u>=C.length?(d=b+1,d<i.length&&h(i[d])):C[u].focus();break;case"ArrowUp":a.preventDefault(),u=y-l,u<0?(d=b-1,d>=0&&v(i[d])):C[u].focus();break;case"Enter":case"Space":if(a.preventDefault(),y!==-1){const oe=C[y].textContent.trim();g(oe)}break;case"Tab":a.preventDefault(),a.shiftKey?(d=b-1,d>=0&&h(i[d])):(d=b+1,d<i.length&&h(i[d]));break;case"Escape":t("close");break}}function h(a){var i;(i=a.querySelector(".tap-characters__item"))==null||i.focus()}function v(a){var _;(_=[...a.querySelectorAll(".tap-characters__item")].at(-1))==null||_.focus()}return{__sfc:!0,props:o,emit:t,panel:n,characters:r,charactersSections:c,characterButtons:f,GRID_COLUMNS:l,resolvedCharacters:p,copyToClipboard:g,handleKeyNavigation:k,focusFirstButtonInSection:h,focusLastButtonInSection:v}}};var O=function(){var r;var t=this,o=t._self._c,n=t._self._setupProxy;return(r=n.characters)!=null&&r.length?o("div",{staticClass:"tap-characters",class:[t.type!=="dialog"&&"tap-characters--dropdown"],attrs:{tabindex:"-1"}},[t._l(n.resolvedCharacters,function(c,f){return[!c.lang||c.lang===t.languageCode?o("section",{key:f,ref:"charactersSections",refInFor:!0,staticClass:"tap-characters__section"},[c.label?o("h3",[t._v(" "+t._s(c.label)+" ")]):t._e(),o("div",{staticClass:"tap-characters__items",style:{"--grid-columns":n.GRID_COLUMNS},on:{keydown:n.handleKeyNavigation}},t._l(c.characters,function(l){return o("k-button",{key:l,ref:"characterButtons",refInFor:!0,staticClass:"tap-characters__item",attrs:{tabindex:"0"},on:{click:function(p){return n.copyToClipboard(l)}}},[t._v(" "+t._s(l)+" ")])}),1)]):t._e()]})],2):t._e()},j=[],F=R(U,O,j,!1,null,"64d965ff");const $=F.exports,K={__name:"DropdownButton",setup(s){const t=S(),o=m(),n=m(),r=x(()=>{var f,l;return((f=t.language)==null?void 0:f.code)||((l=t.user)==null?void 0:l.language)||"en"});function c(){n.value.toggle()}return{__sfc:!0,panel:t,dropdownTrigger:o,dropdownContent:n,languageCode:r,close:c,CharacterSelector:$}}};var H=function(){var t=this,o=t._self._c,n=t._self._setupProxy;return o("div",[o("k-button",{ref:"dropdownTrigger",attrs:{dropdown:!0,title:n.panel.t("philippoehrlein.typo-and-paste.buttonTitle"),variant:"filled",size:"sm",icon:"typo-and-paste"},on:{click:function(r){return n.close()}}}),o("k-dropdown-content",{ref:"dropdownContent",staticClass:"dropdown-content",attrs:{"align-x":"end"}},[o(n.CharacterSelector,{attrs:{"language-code":n.languageCode},on:{close:function(r){return n.close()}}})],1)],1)},q=[],N=R(K,H,q,!1,null,"3dffdc9d");const T=N.exports,z={__name:"TypoAndPasteDialog",props:{visible:{default:!1,type:Boolean}},emits:["cancel","close","input","submit","success"],setup(s,{emit:t}){const o=S(),n=x(()=>{var r,c;return((r=o.language)==null?void 0:r.code)||((c=o.user)==null?void 0:c.language)||"en"});return{__sfc:!0,emit:t,panel:o,languageCode:n,CharacterSelector:$}}};var G=function(){var t=this,o=t._self._c,n=t._self._setupProxy;return o("k-dialog",{staticClass:"k-typo-and-paste-dialog",attrs:{"cancel-button":!1,"submit-button":!1,size:"medium",visible:t.visible},on:{cancel:function(r){return n.emit("cancel")}}},[o(n.CharacterSelector,{attrs:{"language-code":n.languageCode,type:"dialog"}})],1)},W=[],Z=R(z,G,W,!1,null,null);const J=Z.exports;function Q(s,t,o,n){let r;const c=()=>{r==null||r(),r=void 0},f=(g,k,h,v)=>(g.addEventListener(k,h,v),()=>g.removeEventListener(k,h,v)),l=M(()=>X(s),g=>{c(),g&&(r=f(g,t,o,n))},{immediate:!0,flush:"post"}),p=()=>{l(),c()};return B()&&A(p),p}function X(s){const t=E(s);return(t==null?void 0:t.$el)??t}const Y={"typo-and-paste":'<path d="M10.931 22C9.57512 22 8.37089 21.7948 7.31831 21.3845C6.28357 20.9563 5.47183 20.3498 4.8831 19.5648C4.29437 18.7798 4 17.8432 4 16.7549C4 15.5239 4.31221 14.5427 4.93662 13.8113C5.56103 13.062 6.33709 12.5446 7.26479 12.2592V12.1521C6.46197 11.7596 5.78404 11.2512 5.23099 10.6268C4.69577 9.98451 4.42817 9.11925 4.42817 8.03098C4.42817 6.94272 4.70469 6.02394 5.25775 5.27465C5.82864 4.52535 6.62254 3.96338 7.63944 3.58873C8.65634 3.19624 9.84272 3 11.1986 3C12.5188 3 13.6784 3.20516 14.6775 3.61549C15.6944 4.02582 16.4883 4.61455 17.0592 5.38169C17.63 6.13099 17.9155 7.01408 17.9155 8.03098V8.48591H15.5606V8.19155C15.5427 7.46009 15.3376 6.86244 14.9451 6.39859C14.5704 5.9169 14.0531 5.56901 13.393 5.35493C12.7507 5.123 12.0014 5.00704 11.1451 5.00704C10.5742 5.00704 10.03 5.06948 9.51268 5.19437C8.99531 5.30141 8.53146 5.47981 8.12113 5.72958C7.72864 5.97934 7.41643 6.30939 7.18451 6.71972C6.95258 7.11221 6.83662 7.5939 6.83662 8.16479C6.83662 8.89624 7.01502 9.50282 7.37183 9.98451C7.72864 10.4484 8.19249 10.7962 8.76338 11.0282C9.35211 11.2601 9.98545 11.3761 10.6634 11.3761H12.3225V13.3296H10.7169C10.0033 13.3296 9.31643 13.4188 8.65634 13.5972C7.99624 13.7756 7.46103 14.1056 7.0507 14.5873C6.65822 15.0512 6.46197 15.7202 6.46197 16.5944C6.46197 17.3972 6.6493 18.0484 7.02394 18.5479C7.41643 19.0474 7.96056 19.4131 8.65634 19.6451C9.36995 19.877 10.1906 19.993 11.1183 19.993C12.1174 19.993 12.9469 19.8681 13.607 19.6183C14.2671 19.3685 14.7577 18.985 15.0789 18.4676C15.4 17.9502 15.5606 17.3169 15.5606 16.5676V11.3761H20.1901V13.3563H17.9155V16.4873C17.9155 17.6648 17.6479 18.6639 17.1127 19.4845C16.5953 20.3052 15.8192 20.9296 14.7845 21.3577C13.7498 21.7859 12.4653 22 10.931 22Z"/>'},ee={"typo-and-paste":{icon:"typo-and-paste",label:"Typo & Paste",click(){window.panel.dialog.open({component:"k-typo-and-paste-dialog"})}}},te={"typo-and-paste":{get button(){return{icon:"typo-and-paste",label:"Typo & Paste"}},commands(){return()=>{window.panel.dialog.open({component:"k-typo-and-paste-dialog"})}},get name(){return"typo-and-paste"}}};function ne(s){return s?()=>{}:function(t){t.mixin({async mounted(){if(this.$options.name!=="k-header")return;const o=this.$children.find(r=>r.$options.name==="k-button-group");if(!o)return;const n=new t({render:r=>r(T)}).$mount();o.$el.prepend(n.$el),this.$forceUpdate()}})}}const D=window.panel.plugins.viewButtons!==void 0;window.panel.plugin("philippoehrlein/typo-and-paste",{icons:Y,components:{"k-typo-and-paste-dialog":J},viewButtons:D?{"typo-and-paste":T}:void 0,textareaButtons:ee,writerMarks:te,use:[function(){Q(window,"keydown",s=>{!s.altKey||s.code!=="KeyT"||window.panel.dialog.open({component:"k-typo-and-paste-dialog"})})},ne(D)]})})();
