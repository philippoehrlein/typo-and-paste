<template>
  <div>
    <k-button :dropdown="true" variant="filled" size="sm" icon="typo-and-paste" class="k-page-view-options"
      @click="$refs.typopanel.toggle()">
    </k-button>
    <k-dropdown-content ref="typopanel" align-x="end">
      <typo-and-paste-panel :characters="characters" :languageCode="languageCode" />
    </k-dropdown-content>
  </div>

</template>

<script>
import TypoAndPastePanel from "./TypoAndPastePanel.vue"

export default {
  props: {
    characters: {
      type: Array,
      required: true
    }
  },
  components: {
    'typo-and-paste-panel': TypoAndPastePanel
  },
  computed: {
    languageCode() {

      if (this.$panel.language.code) {
        return this.$panel.language.code
      }

      const userLanguage = this.$panel.user && this.$panel.user.language
      if (userLanguage) {
        return userLanguage
      }

      return 'en'
    }
  }
}
</script>