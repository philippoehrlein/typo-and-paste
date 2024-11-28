export const textareaButtons = {
  "typo-and-paste": {
    icon: "typo-and-paste",
    label: "Typo & Paste",
    click() {
      window.panel.dialog.open({
        component: 'k-typo-and-paste-dialog'
      });
    }
  }
}