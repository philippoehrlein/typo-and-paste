<template>
  <div>
    <k-button
      ref="dropdownTrigger"
      :dropdown="true"
      :title="panel.t('philippoehrlein.typo-and-paste.buttonTitle')"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      @click="close()"
    >
    </k-button>
    <k-dropdown-content
      ref="dropdownContent"
      class="dropdown-content"
      align-x="end"
    >
      <CharacterSelector :language-code="languageCode" @close="close()" />
    </k-dropdown-content>
  </div>
</template>

<script setup>
import { computed, ref, usePanel } from "kirbyuse";
import CharacterSelector from "./CharacterSelector.vue";

const panel = usePanel();
const dropdownTrigger = ref();
const dropdownContent = ref();

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en"
);

function close() {
  dropdownContent.value.toggle();
}
</script>

<style scoped>
/* Remove default padding to prevent flash of content until characters are loaded */
.dropdown-content {
  --dropdown-padding: 0;
}
</style>
