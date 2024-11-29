<template>
  <k-dialog
    :cancel-button="false"
    :submit-button="false"
    size="medium"
    :visible="visible"
    class="k-typo-and-paste-dialog"
    @cancel="emit('cancel')"
  >
    <CharacterSelector :language-code="languageCode" type="dialog" />
  </k-dialog>
</template>

<script setup>
import { computed, usePanel } from "kirbyuse";
import CharacterSelector from "./CharacterSelector.vue";

defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(["cancel", "close", "input", "submit", "success"]);
const panel = usePanel();

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en"
);
</script>

<style scoped>
.k-typo-and-paste-dialog {
  background-color: var(--color-black);
  color: var(--color-white);
}
</style>
