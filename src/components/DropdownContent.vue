<template>
  <div>
    <div v-if="characters?.length" class="tap-dropdown">
      <template v-for="(section, index) in resolvedCharacters">
        <section
          v-if="!section.lang || section.lang === languageCode"
          :key="index"
          class="tap-dropdown__section"
        >
          <h3 v-if="section.label">
            {{ section.label }}
          </h3>
          <div class="tap-dropdown__items">
            <k-button
              v-for="char in section.characters"
              :key="char"
              class="tap-dropdown__item"
              @click="copyToClipboard(char)"
            >
              {{ char }}
            </k-button>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { isObject } from "../utils/helpers";

export default {
  props: {
    /**
     * An array of characters to display in the panel.
     * @type {Array<{label: string | Record<string, string>, lang?: string, characters: string[]}>}
     */
    characters: {
      type: Array,
      required: true,
    },
    /**
     * The language code of the current user.
     * @type {string}
     */
    languageCode: {
      type: String,
      required: true,
    },
    /**
     * The type of the dropdown content.
     * @type {string}
     */
    type: {
      type: String,
      required: true,
      default: 'dropdown'
    },
  },
  computed: {
    /**
     * Computes the characters to display in the panel.
     * @returns {Array<{label: string, lang?: string, characters: string[]}>} An array of character groups with labels and characters.
     */
    resolvedCharacters() {
      return this.characters.map((group) => {
        let label;

        if (isObject(group.label)) {
          label = group.label[this.$panel.user.language] || group.label.en;
        } else {
          label = group.label;
        }

        return {
          ...group,
          label,
        };
      });
    },
  },
  mounted() {
    if (this.type === 'dialog') {
      console.log('dialog');
      this.$nextTick(() => {
        const firstButton = this.$el.querySelector('.k-button');
        if (firstButton) {
          firstButton.focus();
        }
      });
    }
  },
  methods: {
    /**
     * Copies a character to the clipboard and shows a notification.
     * @param {string} character - The character to copy.
     */
    copyToClipboard(character) {
      navigator.clipboard.writeText(character);
      this.$panel.notification.info({
        message: this.$panel.t("philippoehrlein.typo-and-paste.copiedMessage", {
          character,
        }),
        icon: undefined,
      });
    },
  },
};
</script>

<style scoped>
.tap-dropdown {
  width: fit-content;
  padding: var(--spacing-2);
  max-height: 60vh;
}

.tap-dropdown > :where(*:not(:last-child)) {
  margin-bottom: var(--spacing-6);
}

.tap-dropdown__section h3 {
  margin-bottom: var(--spacing-3);
}

.tap-dropdown__items {
  display: grid;
  grid-template-columns: repeat(8, minmax(var(--button-height), 1fr));
}

.tap-dropdown__item {
  padding-inline: 0;
}

.tap-dropdown__item:hover {
  background-color: var(--dropdown-color-hr);
}
</style>
