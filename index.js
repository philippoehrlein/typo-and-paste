(function(){"use strict";function c(a,e,t,n,o,r,i,y){var s=typeof a=="function"?a.options:a;return e&&(s.render=e,s.staticRenderFns=t,s._compiled=!0),r&&(s._scopeId="data-v-"+r),{exports:a,options:s}}const l={props:{characters:{type:Array,required:!0},translations:{type:Object,required:!0},languageCode:{type:String,default:"en",required:!0}},methods:{copyToClipboard(a){var e;navigator.clipboard.writeText(a),window.panel.notification.info({message:((e=this.translations[this.languageCode])==null?void 0:e.copied_message.replace("${character}",a))||`${a} copied to clipboard`,icon:null})}},computed:{computedCharacters(){const a=this.$panel.user.language||"en";return this.characters.map(e=>{let t;return typeof e.label=="object"&&e.label!==null?t=e.label[a]||e.label.en:t=e.label,{...e,label:t}})}}};var p=function(){var e=this,t=e._self._c;return t("div",{staticClass:"tap-dropdown"},[e.characters&&e.characters.length?t("div",e._l(e.computedCharacters,function(n,o){return t("div",{key:o},[!n.lang||n.lang==e.languageCode?t("section",{staticClass:"tap-dropdown__section"},[n.label?t("h3",[e._v(e._s(n.label))]):e._e(),t("div",{staticClass:"tap-dropdown__items"},e._l(n.characters,function(r){return t("k-button",{key:r,staticClass:"tap-dropdown__item",on:{click:function(i){return e.copyToClipboard(r)}}},[e._v(" "+e._s(r)+" ")])}),1)]):e._e()])}),0):e._e()])},d=[],u=c(l,p,d,!1,null,"5b4de706");const C=u.exports,_={props:{languageCode:{type:String,required:!0},characters:{type:Array,required:!0},translations:{type:Object,required:!0}},components:{"typo-and-paste-panel":C},computed:{languageCode(){const a=this.$panel.user&&this.$panel.user.language;return this.$panel.language.code||a||"en"}}};var h=function(){var n;var e=this,t=e._self._c;return t("div",[t("k-button",{staticClass:"k-page-view-options",attrs:{dropdown:!0,title:((n=e.translations[e.languageCode])==null?void 0:n.button_title)||"Special Characters",variant:"filled",size:"sm",icon:"typo-and-paste"},on:{click:function(o){return e.$refs.typopanel.toggle()}}}),t("k-dropdown-content",{ref:"typopanel",attrs:{"align-x":"end"}},[t("typo-and-paste-panel",{attrs:{characters:e.characters||[],languageCode:e.languageCode,translations:e.translations||{}}})],1)],1)},f=[],g=c(_,h,f,!1,null,null);const m=g.exports;panel.plugin("philippoehrlein/typo-and-paste",{icons:{"typo-and-paste":`
      <path d="M10.931 22C9.57512 22 8.37089 21.7948 7.31831 21.3845C6.28357 20.9563 5.47183 20.3498 
      4.8831 19.5648C4.29437 18.7798 4 17.8432 4 16.7549C4 15.5239 4.31221 14.5427 4.93662 13.8113C5.56103 
      13.062 6.33709 12.5446 7.26479 12.2592V12.1521C6.46197 11.7596 5.78404 11.2512 5.23099 10.6268C4.69577 
      9.98451 4.42817 9.11925 4.42817 8.03098C4.42817 6.94272 4.70469 6.02394 5.25775 5.27465C5.82864 4.52535 
      6.62254 3.96338 7.63944 3.58873C8.65634 3.19624 9.84272 3 11.1986 3C12.5188 3 13.6784 3.20516 14.6775 
      3.61549C15.6944 4.02582 16.4883 4.61455 17.0592 5.38169C17.63 6.13099 17.9155 7.01408 17.9155 
      8.03098V8.48591H15.5606V8.19155C15.5427 7.46009 15.3376 6.86244 14.9451 6.39859C14.5704 5.9169 14.0531 
      5.56901 13.393 5.35493C12.7507 5.123 12.0014 5.00704 11.1451 5.00704C10.5742 5.00704 10.03 5.06948 
      9.51268 5.19437C8.99531 5.30141 8.53146 5.47981 8.12113 5.72958C7.72864 5.97934 7.41643 6.30939 
      7.18451 6.71972C6.95258 7.11221 6.83662 7.5939 6.83662 8.16479C6.83662 8.89624 7.01502 9.50282 
      7.37183 9.98451C7.72864 10.4484 8.19249 10.7962 8.76338 11.0282C9.35211 11.2601 9.98545 11.3761 
      10.6634 11.3761H12.3225V13.3296H10.7169C10.0033 13.3296 9.31643 13.4188 8.65634 13.5972C7.99624 
      13.7756 7.46103 14.1056 7.0507 14.5873C6.65822 15.0512 6.46197 15.7202 6.46197 16.5944C6.46197 
      17.3972 6.6493 18.0484 7.02394 18.5479C7.41643 19.0474 7.96056 19.4131 8.65634 19.6451C9.36995 
      19.877 10.1906 19.993 11.1183 19.993C12.1174 19.993 12.9469 19.8681 13.607 19.6183C14.2671 19.3685 
      14.7577 18.985 15.0789 18.4676C15.4 17.9502 15.5606 17.3169 15.5606 16.5676V11.3761H20.1901V13.3563H17.9155
      V16.4873C17.9155 17.6648 17.6479 18.6639 17.1127 19.4845C16.5953 20.3052 15.8192 20.9296 14.7845 
      21.3577C13.7498 21.7859 12.4653 22 10.931 22Z"/>
    `},components:{"typo-and-paste-button":m},data(){return{characters:[]}},use:[function(a){a.mixin({async mounted(){if(this.$options.name==="k-header"){const e=this.$children.find(t=>t.$options.name==="k-button-group");if(e)try{const t=window.location.pathname.split("/panel")[0],o=await(await fetch(`${t}/typo-and-paste/characters`)).json();this.characters=o;const r=new a({render:i=>i("typo-and-paste-button",{props:{characters:this.characters||[],translations:this.translations||{}}})}).$mount();e.$el.prepend(r.$el),this.$forceUpdate()}catch(t){console.error("Error fetching characters:",t)}}}})}]})})();
