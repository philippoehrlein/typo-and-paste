<template>
  <div class="tap-dropdown">
    <div v-if="characters && characters.length">
      <div v-for="(section, index) in computedCharacters" :key="index">
        <section class="tap-dropdown__section" v-if="!section.lang || section.lang == languageCode">
          <h3 v-if="section.label">{{ section.label }}</h3>
          <div class="tap-dropdown__items">
            <k-button class="tap-dropdown__item" v-for="char in section.characters" :key="char"
              @click="copyToClipboard(char)">
              {{ char }}
            </k-button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import translationMixin from "../mixins/translationMixin";

export default {
  mixins: [translationMixin],
  props: {
    characters: {
      type: Array,
      required: true
    },
    translations: {
      type: Object,
      required: true
    },
    languageCode: {
      type: String,
      default: 'en',
      required: true
    }
  },
  methods: {
    copyToClipboard(character) {
      navigator.clipboard.writeText(character)
      window.panel.notification.info({
        message: this.translateString('copied_message', { character }),
        icon: null
      })
    }
  },
  computed: {
    computedCharacters() {
      const currentLanguage = this.$panel.user.language || 'en'
      return this.characters.map(group => {
        let label

        if (typeof group.label === 'object' && group.label !== null) {
          label = group.label[currentLanguage] || group.label['en']
        } else {
          label = group.label
        }

        return {
          ...group,
          label: label
        }
      })
    }
  }
}
</script>

<style scoped>
.tap-dropdown {
  width: fit-content;
  padding: var(--spacing-3);
  max-height: 60vh;
  overflow-y: auto;
}

.tap-dropdown__section {
  margin-bottom: var(--spacing-6);

  h3 {
    margin-bottom: var(--spacing-3);
  }
}

.tap-dropdown__items {
  display: grid;
  grid-template-columns: repeat(8, minmax(var(--button-height), 1fr));
}

.tap-dropdown__item {
  display: block;
  width: var(--button-height);
  padding-inline: 0;
  cursor: pointer;
  line-height: var(--button-height);
}

.tap-dropdown__item:hover {
  background-color: var(--dropdown-color-hr);
}

.tap-dropdown__item .k-button-text {
  width: 20px;
  text-align: center;
}
</style>