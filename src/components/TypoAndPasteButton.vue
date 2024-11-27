<template>
  <div>
    <k-button
      :dropdown="true"
      :title="translations[languageCode]?.button_title || 'Special Characters'"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      class="k-page-view-options"
      @click="$refs.typopanel.toggle()"
    >
    </k-button>
    <k-dropdown-content ref="typopanel" align-x="end">
      <TypoAndPastePanel
        :characters="characters || []"
        :language-code="languageCode"
        :translations="translations || {}"
      />
    </k-dropdown-content>
  </div>
</template>

<script>
import TypoAndPastePanel from "./TypoAndPastePanel.vue";

/**
 * @component TypoAndPasteButton
 * @author [@philippoehrlein](https://github.com/philippoehrlein)
 * @description A button that opens a dropdown with a panel of special characters.
 * @props {string} languageCode - The language code of the current user.
 * @props {Array} characters - An array of characters to display in the panel.
 * @props {object} translations - An object containing translations for the button and panel.
 * @example
 * <typo-and-paste-button :characters="characters" :translations="translations" />
 */
export default {
  components: {
    TypoAndPastePanel,
  },
  props: {
    /**
     * The language code of the current user.
     * @type {string}
     */
    languageCode: {
      type: String,
      required: true,
    },
    /**
     * An array of characters to display in the panel.
     * @type {Array<{label: {[key: string]: string}, lang?: string, characters: string[]}>}
     */
    characters: {
      type: Array,
      required: true,
    },
    /**
     * An object containing translations for the button and panel.
     * @type {object}
     */
    translations: {
      type: Object,
      required: true,
    },
  },
  computed: {
    languageCode() {
      return this.$panel.language?.code || this.$panel.user?.language || "en";
    },
  },
};
</script>
