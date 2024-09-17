<template>
  <div>
    <k-button 
      :dropdown="true" 
      :title="translations[languageCode]?.button_title || 'Special Characters'"
      variant="filled" 
      size="sm" 
      icon="typo-and-paste" 
      class="k-page-view-options"
      @click="$refs.typopanel.toggle()">
    </k-button>
    <k-dropdown-content ref="typopanel" align-x="end">
      <typo-and-paste-panel :characters="characters || []" :languageCode="languageCode" :translations="translations || {}" />
    </k-dropdown-content>
  </div>
</template>

<script>
import TypoAndPastePanel from "./TypoAndPastePanel.vue"

export default {
  props: {
    languageCode: {
      type: String,
      required: true
    },
    characters: {
      type: Array,
      required: true
    },
    translations: {
      type: Object,
      required: true
    }
  },
  components: {
    'typo-and-paste-panel': TypoAndPastePanel
  },
  computed: {
    languageCode() {
      const userLanguage = this.$panel.user && this.$panel.user.language
      return this.$panel.language.code || userLanguage || 'en'
    }
  }
}
</script>
