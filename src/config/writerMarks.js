export const writerMarks = {
  "typo-and-paste": {
    get button() {
      return {
        icon: "typo-and-paste",
        label: "Typo & Paste",
      };
    },

    commands() {
      return () => {
        window.panel.dialog.open({
          component: "k-typo-and-paste-dialog",
        });
      };
    },

    // Toolbar-only marks still need a schema, as with Kirby's native Clear mark.
    get schema() {
      return {};
    },

    get name() {
      return "typo-and-paste";
    },
  },
};
