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
          component: 'k-typo-and-paste-dialog'
        });
      };
    },

    get name() {
      return "typo-and-paste";
    }
  }
};
