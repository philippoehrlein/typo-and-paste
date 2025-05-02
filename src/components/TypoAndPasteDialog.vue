<template>
  <k-dialog
    :cancel-button="false"
    :submit-button="false"
    :visible="true"
    size="medium"
    class="k-typo-and-paste-dialog"
    role="dialog"
    aria-labelledby="typo-and-paste-dialog-title"
    @cancel="emit('cancel')"
  >
    <h2 id="typo-and-paste-dialog-title" class="sr-only">
      {{
        panel.t(
          "philippoehrlein.typo-and-paste.dialogTitle",
          "Special Characters",
        )
      }}
    </h2>
    <p class="sr-only">
      {{
        panel.t(
          "philippoehrlein.typo-and-paste.dialogDescription",
          "Up and down to navigate between sections, left and right to navigate between characters.",
        )
      }}
    </p>
    <CharacterSelector
      :characters="characters"
      :language-code="languageCode"
      type="dialog"
    />
  </k-dialog>
</template>

<script setup>
import { computed, ref, usePanel } from "kirbyuse";
import { useCachedCharacters } from "../composables/useCachedCharacters";
import CharacterSelector from "./CharacterSelector.vue";

const emit = defineEmits(["cancel", "close", "input", "submit", "success"]);
const panel = usePanel();
const characters = ref([]);

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en",
);

(async () => {
  characters.value = await useCachedCharacters();
})();
</script>

<style>
.k-typo-and-paste-dialog {
  background-color: var(--color-black);
  color: var(--color-white);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
