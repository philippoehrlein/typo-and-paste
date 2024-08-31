<template>
  <div>
    <k-button 
      :dropdown="true" 
      :title="translateString('button_title')"
      variant="filled" 
      size="sm" 
      icon="typo-and-paste" 
      class="k-page-view-options"
      @click="$refs.typopanel.toggle()">
    </k-button>
    <k-dropdown-content ref="typopanel" align-x="end">
      <typo-and-paste-panel :characters="characters" :languageCode="languageCode" :translations="translations" />
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
    },
    translations: {
      type: Object,
      required: true
    }
  },
  components: {
    'typo-and-paste-panel': TypoAndPastePanel
  },
  methods: {
    translateString(key, variables = {}) {
      const languageCode = this.$panel.user.language || 'en'
      const translationTemplate = this.translations[languageCode || 'en'][key] || key

      return translationTemplate.replace(/\$\{(\w+)\}/g, (match, variable) => {
        return variables[variable] !== undefined ? variables[variable] : match
      })
    }
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
  },
  mounted() {
    console.log(this.translations);
  }
}
</script>