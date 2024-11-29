<template>
  <div>
    <k-button
      ref="dropdownTrigger"
      :dropdown="true"
      :title="panel.t('philippoehrlein.typo-and-paste.buttonTitle')"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      @click="toggle()"
    >
    </k-button>
    <k-dropdown-content
      ref="dropdownContent"
      class="dropdown-content"
      align-x="end"
    >
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
const dropdownTrigger = ref();
const dropdownContent = ref();
const characters = ref([]);

const languageCode = computed(
  () => panel.language?.code || panel.user?.language || "en"
);

function toggle() {
  dropdownContent.value.toggle();
}

(async () => {
  characters.value = await useCachedCharacters();
})();
</script>
