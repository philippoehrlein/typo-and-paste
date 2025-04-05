import DropdownButton from "../components/DropdownButton.vue";

const isKirby5 = window.panel.plugins.viewButtons !== undefined;

export function legacyViewButtonMixin(Vue) {
  if (isKirby5) {
    return;
  }

  Vue.mixin({
    mounted() {
      if (this.$options.name !== "k-header") return;

      const buttonGroup = this.$children.find(
        (child) => child.$options.name === "k-button-group",
      );

      if (!buttonGroup) return;

      const ButtonConstructor = Vue.extend(DropdownButton);
      const button = new ButtonConstructor({ parent: this });
      button.$mount();

      buttonGroup.$el.prepend(button.$el);
    },
  });
}
