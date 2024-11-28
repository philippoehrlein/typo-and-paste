<template>
  <div>
    <k-button
      ref="dropdownTrigger"
      :dropdown="true"
      :title="panel.t('philippoehrlein.typo-and-paste.buttonTitle')"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      @click="dropdownContent.toggle()"
    >
    </k-button>
    <k-dropdown-content ref="dropdownContent" align-x="end">
      <CharacterSelector
        :language-code="languageCode"
        @close="dropdownContent.toggle()"
      />
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
</script>
