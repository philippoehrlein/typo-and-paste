<template>
  <div v-if="characters?.length" class="tap-characters" :class="{ 'tap-characters--dialog': type === 'dialog' }" tabindex="-1">
    <template v-for="(section, index) in resolvedCharacters">
      <section
        v-if="!section.lang || section.lang === languageCode"
        :key="index"
        class="tap-characters__section"
      >
        <h3 v-if="section.label">
          {{ section.label }}
        </h3>
        <div class="tap-characters__items" @keydown="handleKeyNavigation">
          <k-button
            v-for="char in section.characters"
            :key="char"
            class="tap-characters__item"
            tabindex="0"
            @click="copyToClipboard(char)"
          >
            {{ char }}
          </k-button>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, usePanel } from "kirbyuse";
import { isObject } from "../utils/helpers";

const props = defineProps({
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
    }
});

const emit = defineEmits(['close']);
const panel = usePanel();

/**
 * Computes the characters to display in the panel.
 * @returns {Array<{label: string, lang?: string, characters: string[]}>} An array of character groups with labels and characters.
 */
const resolvedCharacters = computed(() => {
  return props.characters.map((group) => {
    let label;

    if (isObject(group.label)) {
      label = group.label[panel.user.language] || group.label.en;
    } else {
      label = group.label;
    }
    focusFirstButton();
    return {
      ...group,
      label,
    };
  });
});

/**
 * Copies a character to the clipboard and shows a notification.
 * @param {string} character - The character to copy.
 */
function copyToClipboard(character) {
  navigator.clipboard.writeText(character);
  if(props.type === 'dialog') {
    panel.dialog.close();
  } else {
    emit('close');
  }
  panel.notification.info({
    message: panel.t("philippoehrlein.typo-and-paste.copiedMessage", {
      character,
    }),
    icon: undefined,
  });
}

// New constants for navigation
const GRID_COLUMNS = props.type === 'dialog' ? 12 : 8; // Number of columns in the grid

/**
 * Handles keyboard navigation through the character grid
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyNavigation(event) {
  if(event.key !== 'Enter')event.stopPropagation();

  const sections = Array.from(document.querySelectorAll('.tap-characters__section')); // All sections
  const buttons = Array.from(event.currentTarget.querySelectorAll('.tap-characters__item')); // All character buttons in the current section
  const currentIndex = buttons.findIndex(button => button === document.activeElement);
  const currentSectionIndex = sections.findIndex(section => section.contains(document.activeElement)); // Current section

  if (currentIndex === -1 && currentSectionIndex === -1) return; // No valid focus

  let nextIndex, nextSectionIndex;

  switch (event.key) {
    case 'ArrowRight':
      nextIndex = currentIndex + 1;
      if (nextIndex < buttons.length) {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case 'ArrowLeft':
      nextIndex = currentIndex - 1;
      if (nextIndex >= 0) {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case 'ArrowDown':
      nextIndex = currentIndex + GRID_COLUMNS;

      // Switch to the next section if the bottom is reached
      if (nextIndex >= buttons.length) {
        nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex < sections.length) {
          focusFirstButtonInSection(sections[nextSectionIndex]);
          event.preventDefault();
          return;
        }
      } else {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case 'ArrowUp':
      nextIndex = currentIndex - GRID_COLUMNS;

      // Switch to the previous section if the top is reached
      if (nextIndex < 0) {
        nextSectionIndex = currentSectionIndex - 1;
        if (nextSectionIndex >= 0) {
          focusLastButtonInSection(sections[nextSectionIndex]);
          event.preventDefault();
          return;
        }
      } else {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case 'Enter':
    case ' ':
      event.preventDefault();
      if (currentIndex !== -1) {
        const character = buttons[currentIndex].textContent.trim();
        copyToClipboard(character); // Copy character
      }
      break;

    case 'Tab':
      event.preventDefault();
      if (event.shiftKey) {
        // Shift+Tab -> Previous section
        nextSectionIndex = currentSectionIndex - 1;
        if (nextSectionIndex >= 0) {
          focusFirstButtonInSection(sections[nextSectionIndex]);
        }
      } else {
        // Tab -> Next section
        nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex < sections.length) {
          focusFirstButtonInSection(sections[nextSectionIndex]);
        }
      }
      break;

    case 'Escape':
      emit('close'); // Close overview
      break;

    default:
      break;
  }
}

/**
 * Sets the focus on the first button in the specified section.
 * @param {HTMLElement} section - The section to set the focus on.
 */
function focusFirstButtonInSection(section) {
  const firstButton = section.querySelector('.tap-characters__item');
  if (firstButton) {
    firstButton.focus();
  }
}

/**
 * Sets the focus on the last button in the specified section.
 * @param {HTMLElement} section - The section to set the focus on.
 */
function focusLastButtonInSection(section) {
  const buttons = Array.from(section.querySelectorAll('.tap-characters__item'));
  const lastButton = buttons[buttons.length - 1];
  if (lastButton) {
    lastButton.focus();
  }
}

/**
 * Sets the focus on the first button in the character grid.
 */
function focusFirstButton() {
  setTimeout(() => {
    const firstButton = document.querySelector('.tap-characters__item');
    if (firstButton) {
      firstButton.focus();
    }
  }, 0);
}

// Add the onMounted hook
onMounted(() => {
  focusFirstButton();
});
</script>

<style scoped>

.k-button:focus {
  outline:var(--outline);
}

.tap-characters {
  width: fit-content;
  padding: var(--spacing-2);
  max-height: 60vh;
}

.tap-characters--dialog {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}

.tap-characters > :where(*:not(:last-child)) {
  margin-bottom: var(--spacing-6);
}

.tap-characters__section h3 {
  margin-bottom: var(--spacing-3);
}

.tap-characters__items {
  display: grid;
  grid-template-columns: repeat(8, minmax(var(--button-height), 1fr));
}

.tap-characters--dialog .tap-characters__items {
  grid-template-columns: repeat(12, minmax(var(--button-height), 1fr));
}

.tap-characters__item {
  padding-inline: 0;
}

.tap-characters__item:hover {
  background-color: var(--dropdown-color-hr);
}
</style>
