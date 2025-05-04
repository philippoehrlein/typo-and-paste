<template>
  <div
    v-if="characters.length"
    class="tap-characters"
    :class="[type !== 'dialog' && 'tap-characters--dropdown']"
    tabindex="-1"
  >
    <template v-for="(section, index) in resolvedCharacters">
      <section
        v-if="!section.lang || section.lang === languageCode"
        :key="index"
        ref="charactersSections"
        class="tap-characters__section"
      >
        <h3 v-if="section.label">
          {{ section.label }} 
        </h3>
        <div
          class="tap-characters__items"
          :style="{
            '--grid-columns': GRID_COLUMNS,
          }"
          @keydown="handleKeyNavigation"
        >
          <k-button
            v-for="item in section.characters"
            :key="item.value"
            ref="characterButtons"
            class="tap-characters__item"
            tabindex="0"
            role="menuitem"
            :title="item.label"
            @click="copyToClipboard(item.value)"
          >
            {{ item.value }}
          </k-button>
        </div>
      </section>
    </template>
    <section
      v-if="enableSearch"
      :key="resolvedCharacters.length"
      class="search-section"
    >
      <k-button
        icon="search"
        class="tap-characters__item"
        size="sm"
        @click="openSearchDialog"
      >
        Search 
      </k-button>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, usePanel } from "kirbyuse";
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
   * @type {'dropdown' | 'dialog'}
   */
  type: {
    type: String,
    default: "dropdown",
  },
});

const emit = defineEmits(["close"]);

const panel = usePanel();
const charactersSections = ref();
const characterButtons = ref();
const enableSearch = ref(false);
const searchDialog = ref();
const GRID_COLUMNS = props.type === "dialog" ? 12 : 8; // Number of columns in the grid

/**
 * Computes the characters to display in the panel.
 */
const resolvedCharacters = computed(() => {
  return props.characters.map((section) => {
    let label;

    if (isObject(section.label)) {
      label = section.label[panel.user?.language || "en"];
    } else {
      label = section.label;
    }

    const characters = section.characters.map((character) => {
      let value = character;
      let label = value;

      if (isObject(character)) {
        if (character.value) {
          value = character.value;
        }

        if (character.label) {
          label = isObject(character.label)
            ? character.label[panel.user?.language || "en"] || value
            : character.label;
        }
      }

      return {
        label,
        value,
      };
    });

    return {
      ...section,
      characters,
      label,
    };
  });
});

onMounted(async () => {
  await nextTick();

  const response = await window.panel.api.get("/typo-and-paste/enable-search");

  searchDialog.value = window.panel.plugins.components['k-typo-search-and-paste-dialog'];
  if(searchDialog.value && response.value) {
    enableSearch.value = response.value;
  }

  // Set the focus on the first button
  characterButtons.value?.[0]?.$el?.focus();
});

/**
 * Copies a character to the clipboard and shows a notification.
 * @param {string} character - The character to copy.
 */
function copyToClipboard(character) {
  navigator.clipboard.writeText(character);

  if (props.type === "dialog") {
    panel.dialog.close();
  } else {
    emit("close");
  }

  panel.notification.info({
    message: panel.t("philippoehrlein.typo-and-paste.copiedMessage", {
      character,
    }),
    icon: undefined,
  });
}

/**
 * Handles keyboard navigation through the character grid
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyNavigation(event) {
  if (event.key !== "Enter") event.stopPropagation();

  const sections = charactersSections.value;
  const currentSection = document.activeElement.closest(
    ".tap-characters__section, .search-section",
  );
  if (!currentSection) return;

  const buttons = [...currentSection.querySelectorAll(".tap-characters__item")];
  const currentIndex = buttons.indexOf(document.activeElement);
  const currentSectionIndex = sections.indexOf(currentSection);

  if (currentIndex === -1 && currentSectionIndex === -1) return; // No valid focus

  let nextIndex, nextSectionIndex;

  switch (event.key) {
    case "ArrowRight":
      event.preventDefault();
      nextIndex = currentIndex + 1;
      if (nextIndex < buttons.length) {
        buttons[nextIndex].focus();
      }
      break;

    case "ArrowLeft":
      event.preventDefault();
      nextIndex = currentIndex - 1;
      if (nextIndex >= 0) {
        buttons[nextIndex].focus();
      }
      break;

    case "ArrowDown":
      event.preventDefault();
      nextIndex = currentIndex + GRID_COLUMNS;

      // Switch to the next section if the bottom is reached
      if (nextIndex >= buttons.length) {
        nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex < sections.length) {
          focusFirstButtonInSection(sections[nextSectionIndex]);
        }
      } else {
        buttons[nextIndex].focus();
      }
      break;

    case "ArrowUp":
      event.preventDefault();
      nextIndex = currentIndex - GRID_COLUMNS;

      // Switch to the previous section if the top is reached
      if (nextIndex < 0) {
        nextSectionIndex = currentSectionIndex - 1;
        if (nextSectionIndex >= 0) {
          focusLastButtonInSection(sections[nextSectionIndex]);
        }
      } else {
        buttons[nextIndex].focus();
      }
      break;

    case "Enter":
    case "Space":
      event.preventDefault();
      if (currentIndex !== -1) {
        if (currentSection.classList.contains('search-section')) {
          openSearchDialog();
        } else {
          const character = buttons[currentIndex].textContent.trim();
          copyToClipboard(character);
        }
      }
      break;

    case "Tab":
      event.preventDefault();
      if (event.shiftKey) {
        // Shift+Tab -> Previous section
        nextSectionIndex = currentSectionIndex - 1;
        if (nextSectionIndex < 0) {
          if (enableSearch.value) {
            document.querySelector('.search-section .tap-characters__item')?.focus();
          } else {
            focusLastButtonInSection(sections.at(-1));
          }
        } else {
          focusLastButtonInSection(sections[nextSectionIndex]);
        }
      } else {
        // Tab -> Next section
        nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex >= sections.length) {
          if (enableSearch.value) {
            document.querySelector('.search-section .tap-characters__item')?.focus();
          } else {
            focusFirstButtonInSection(sections[0]);
          }
        } else {
          focusFirstButtonInSection(sections[nextSectionIndex]);
        }
      }
      break;

    case "Escape":
      emit("close"); // Close overview
      break;
  }
}

/**
 * Sets the focus on the first button in the specified section.
 * @param {HTMLElement} section - The section to set the focus on.
 */
function focusFirstButtonInSection(section) {
  section.querySelector(".tap-characters__item")?.focus();
}

/**
 * Sets the focus on the last button in the specified section.
 * @param {HTMLElement} section - The section to set the focus on.
 */
function focusLastButtonInSection(section) {
  const buttons = [...section.querySelectorAll(".tap-characters__item")];
  buttons.at(-1)?.focus();
}

function openSearchDialog() {
  window.panel.dialog.open({
    component: "k-typo-search-and-paste-dialog",
  });
}
</script>

<style scoped>
.k-button:focus {
  outline: var(--outline);
}

.tap-characters--dropdown {
  width: fit-content;
  padding: var(--spacing-2);
  max-height: 60vh;
}

.tap-characters > :where(*:not(:last-child)) {
  margin-bottom: var(--spacing-6);
}

.tap-characters__section h3 {
  margin-bottom: var(--spacing-3);
}

.tap-characters__items {
  display: grid;
  grid-template-columns: repeat(
    var(--grid-columns),
    minmax(var(--button-height), 1fr)
  );
}

.tap-characters__item {
  --button-padding: 0;
}

.tap-characters__item:hover {
  background-color: var(--dropdown-color-hr);
}

.search-section {
  margin-top: var(--spacing-3);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--dropdown-color-hr);
}

.search-section .k-button {
  width: 100%;
}
</style>
