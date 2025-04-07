import { isKirby5 } from "kirbyuse";
import DropdownButton from "../components/DropdownButton.vue";

export function legacyViewButtonMixin(Vue) {
  if (isKirby5()) {
    return;
  }

  let buttonComponent;

  Vue.mixin({
    mounted() {
      if (this.$options.name !== "k-header") return;

      const buttonGroup = this.$children.find(
        (child) => child.$options.name === "k-button-group",
      );

      if (!buttonGroup) return;

      const ButtonConstructor = Vue.extend(DropdownButton);
      buttonComponent = new ButtonConstructor({ parent: this });
      buttonComponent.$mount();

      buttonGroup.$el.prepend(buttonComponent.$el);
    },
    beforeDestroy() {
      if (this.$options.name !== "k-header") return;

      if (buttonComponent) {
        buttonComponent.$destroy();
        buttonComponent = undefined;
      }
    },
  });
}
