export default {
  methods: {
    translateString(key, variables = {}) {
      let languageCode = this.$panel.user.language || 'en';
      if (!this.translations[languageCode]) {
        languageCode = languageCode.split('_')[0];
      }
      
      const translationsForLanguage = this.translations[languageCode] || this.translations['en'];
    
      const translationTemplate = translationsForLanguage[key] || this.translations['en'][key] || key;
    
      return translationTemplate.replace(/\$\{(\w+)\}/g, (match, variable) => {
        return variables[variable] !== undefined ? variables[variable] : match;
      });
    }
  }
};
