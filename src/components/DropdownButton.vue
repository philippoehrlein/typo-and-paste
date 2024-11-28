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
      <DropdownContent :characters="characters" :language-code="languageCode" @close="closeDropdown" />
    </k-dropdown-content>
  </div>
</template>

<script setup>
import { computed, ref, usePanel } from "kirbyuse";
import DropdownContent from "./CharacterSelector.vue";

const panel = usePanel();
const dropdownTrigger = ref();
const dropdownContent = ref();
const characters = ref([]);

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en"
);

// Lazily fetch characters
(async () => {
  try {
    characters.value = await panel.api.get("typo-and-paste/characters");
  } catch (error) {
    console.error("Error loading characters:", error);
  }
})();

// Close the dropdown
const closeDropdown = () => {
  dropdownContent.value.toggle();
}
</script>
