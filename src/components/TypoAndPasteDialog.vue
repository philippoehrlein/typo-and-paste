<template>
  <k-dialog
    :cancel-button="false"
    :submit-button="false"
    :visible="true"
    size="medium"
    class="k-typo-and-paste-dialog"
    @cancel="emit('cancel')"
  >
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
  () => panel.language?.code || panel.user?.language || "en"
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
</style>
