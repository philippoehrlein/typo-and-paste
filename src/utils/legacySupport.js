import DropdownButton from "../components/DropdownButton.vue";

export function createLegacyMixin(isKirby5) {
  if (isKirby5) {
    return () => {};
  }

  return function (Vue) {
    Vue.mixin({
      async mounted() {
        if (this.$options.name !== "k-header") return;

        const buttonGroup = this.$children.find(
          (child) => child.$options.name === "k-button-group"
        );

        if (!buttonGroup) return;

        const button = new Vue({
          render: (h) => h(DropdownButton),
        }).$mount();

        buttonGroup.$el.prepend(button.$el);
        this.$forceUpdate();
      },
    });
  };
}
