<template>
  <div>
    <k-button
      :dropdown="true"
      :title="panel.t('philippoehrlein.typo-and-paste.buttonTitle')"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="toggle()"
    >
    </k-button>
    <k-dropdown-content ref="dropdownContent" align-x="end" role="menu">
      <CharacterSelector
        :characters="characters"
        :language-code="languageCode"
        @close="toggle()"
      />
    </k-dropdown-content>
  </div>
</template>

<script setup>
import { computed, ref, usePanel } from "kirbyuse";
import { useCachedCharacters } from "../composables/useCachedCharacters";
import CharacterSelector from "./CharacterSelector.vue";

const panel = usePanel();
const dropdownContent = ref();
const characters = ref([]);
const isOpen = ref(false);

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en",
);

(async () => {
  characters.value = await useCachedCharacters();
})();

function toggle() {
  dropdownContent.value.toggle();
  isOpen.value = !isOpen.value;
}
</script>
