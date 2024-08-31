(function() {
  "use strict";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$1 = {
    data() {
      return {
        config: [
          {
            label: "Sonderzeichen",
            characters: ["©", "®", "™", "°", "§", "¶", "†", "‡"]
          },
          {
            label: "Sonderzeichen",
            characters: ["©", "®", "™", "°", "§", "¶", "†", "‡"]
          }
        ]
      };
    },
    methods: {
      copyToClipboard(character) {
        navigator.clipboard.writeText(character);
        this.$store.dispatch("notification/success", `Kopiert: ${character}`);
      }
    },
    mounted() {
      console.log("SpecialCharacters mounted");
    }
  };
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "tap-dropdown" }, _vm._l(_vm.config, function(section, index) {
      return _c("section", { key: index, staticClass: "tap-dropdown__section" }, [section.label ? _c("h3", [_vm._v(_vm._s(section.label))]) : _vm._e(), _c("div", { staticClass: "tap-dropdown__items" }, _vm._l(section.characters, function(char) {
        return _c("k-button", { key: char, staticClass: "tap-dropdown__item", on: { "click": function($event) {
          return _vm.copyToClipboard(char);
        } } }, [_vm._v(" " + _vm._s(char) + " ")]);
      }), 1)]);
    }), 0);
  };
  var _sfc_staticRenderFns$1 = [];
  _sfc_render$1._withStripped = true;
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    "b57aa051"
  );
  __component__$1.options.__file = "/Users/philipp/Documents/02_Offen/Kirby Plugins/TypoAndPaste/site/plugins/typo-and-paste/src/components/TypoAndPastePanel.vue";
  const TypoAndPastePanel = __component__$1.exports;
  const _sfc_main = {
    components: {
      "typo-and-paste-panel": TypoAndPastePanel
    },
    methods: {}
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", [_c("k-button", { staticClass: "k-page-view-options", attrs: { "dropdown": true, "variant": "filled", "size": "sm", "icon": "typo-and-paste" }, on: { "click": function($event) {
      return _vm.$refs.typopanel.toggle();
    } } }), _c("k-dropdown-content", { ref: "typopanel", attrs: { "align-x": "end" } }, [_c("typo-and-paste-panel")], 1)], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null
  );
  __component__.options.__file = "/Users/philipp/Documents/02_Offen/Kirby Plugins/TypoAndPaste/site/plugins/typo-and-paste/src/components/TypoAndPasteButton.vue";
  const TypoAndPasteButton = __component__.exports;
  panel.plugin("philippoehrlein/typo-and-paste", {
    icons: {
      "typo-and-paste": '<path d="M10.931 22C9.57512 22 8.37089 21.7948 7.31831 21.3845C6.28357 20.9563 5.47183 20.3498 4.8831 19.5648C4.29437 18.7798 4 17.8432 4 16.7549C4 15.5239 4.31221 14.5427 4.93662 13.8113C5.56103 13.062 6.33709 12.5446 7.26479 12.2592V12.1521C6.46197 11.7596 5.78404 11.2512 5.23099 10.6268C4.69577 9.98451 4.42817 9.11925 4.42817 8.03098C4.42817 6.94272 4.70469 6.02394 5.25775 5.27465C5.82864 4.52535 6.62254 3.96338 7.63944 3.58873C8.65634 3.19624 9.84272 3 11.1986 3C12.5188 3 13.6784 3.20516 14.6775 3.61549C15.6944 4.02582 16.4883 4.61455 17.0592 5.38169C17.63 6.13099 17.9155 7.01408 17.9155 8.03098V8.48591H15.5606V8.19155C15.5427 7.46009 15.3376 6.86244 14.9451 6.39859C14.5704 5.9169 14.0531 5.56901 13.393 5.35493C12.7507 5.123 12.0014 5.00704 11.1451 5.00704C10.5742 5.00704 10.03 5.06948 9.51268 5.19437C8.99531 5.30141 8.53146 5.47981 8.12113 5.72958C7.72864 5.97934 7.41643 6.30939 7.18451 6.71972C6.95258 7.11221 6.83662 7.5939 6.83662 8.16479C6.83662 8.89624 7.01502 9.50282 7.37183 9.98451C7.72864 10.4484 8.19249 10.7962 8.76338 11.0282C9.35211 11.2601 9.98545 11.3761 10.6634 11.3761H12.3225V13.3296H10.7169C10.0033 13.3296 9.31643 13.4188 8.65634 13.5972C7.99624 13.7756 7.46103 14.1056 7.0507 14.5873C6.65822 15.0512 6.46197 15.7202 6.46197 16.5944C6.46197 17.3972 6.6493 18.0484 7.02394 18.5479C7.41643 19.0474 7.96056 19.4131 8.65634 19.6451C9.36995 19.877 10.1906 19.993 11.1183 19.993C12.1174 19.993 12.9469 19.8681 13.607 19.6183C14.2671 19.3685 14.7577 18.985 15.0789 18.4676C15.4 17.9502 15.5606 17.3169 15.5606 16.5676V11.3761H20.1901V13.3563H17.9155V16.4873C17.9155 17.6648 17.6479 18.6639 17.1127 19.4845C16.5953 20.3052 15.8192 20.9296 14.7845 21.3577C13.7498 21.7859 12.4653 22 10.931 22Z"/>'
    },
    components: {
      "typo-and-paste-button": TypoAndPasteButton
    },
    use: [
      function(Vue) {
        Vue.mixin({
          mounted() {
            if (this.$options.name === "k-header") {
              const buttonGroup = this.$children.find((child) => child.$options.name === "k-button-group");
              if (buttonGroup) {
                const button = new Vue({
                  render: (h) => h("typo-and-paste-button")
                }).$mount();
                buttonGroup.$el.prepend(button.$el);
                this.$forceUpdate();
              }
            }
          }
        });
      }
    ]
  });
})();
