import DropdownButton from "./components/DropdownButton.vue";
import TypoAndPasteDialog from "./components/TypoAndPasteDialog.vue";
import { useEventListener } from "./composables/useEventListener";
import { icons } from "./config/icons";
import { textareaButtons } from "./config/textareaButtons";
import { writerMarks } from "./config/writerMarks";
import { legacyViewButtonMixin } from "./utils/legacySupport";

window.panel.plugin("philippoehrlein/typo-and-paste", {
  icons,
  components: {
    "k-typo-and-paste-dialog": TypoAndPasteDialog,
  },
  viewButtons: {
    "typo-and-paste": DropdownButton,
  },
  textareaButtons,
  writerMarks,
  use: [
    function () {
      useEventListener(window, "keydown", (event) => {
        if (!event.altKey || event.code !== "KeyT") return;

        window.panel.dialog.open({
          component: "k-typo-and-paste-dialog",
        });
      });
    },
    legacyViewButtonMixin,
  ],
});
