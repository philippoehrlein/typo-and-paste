<template>
  <TypoAndPasteButton
    :characters="characters"
    :translations="translations"
    :language-code="languageCode"
  />
</template>

<script>
import { loadCharacters } from "../utils/characters";
import TypoAndPasteButton from "./TypoAndPasteButton.vue";

/**
 * @component TypoAndPasteViewButton
 * @author [@philippoehrlein](https://github.com/philippoehrlein)
 * @description The view button for the header (Kirby 5+).
 */
export default {
  components: {
    TypoAndPasteButton,
  },
  data() {
    return {
      characters: [],
      translations: window.panel.translations || {},
      languageCode: window.panel.language?.code || "en",
    };
  },
  async created() {
    try {
      this.characters = await loadCharacters();
    } catch (error) {
      console.error("Error loading characters:", error);
    }
  },
};
</script>
