<template>
  <div
    v-if="characters?.length"
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
            v-for="char in section.characters"
            :key="char"
            ref="characterButtons"
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
import { computed, nextTick, onMounted, ref, usePanel } from "kirbyuse";
import { useCachedCharacters } from "../composables/useCachedCharacters";
import { isObject } from "../utils/helpers";

const props = defineProps({
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
const characters = ref([]);
const charactersSections = ref();
const characterButtons = ref();
const GRID_COLUMNS = props.type === "dialog" ? 12 : 8; // Number of columns in the grid

/**
 * Computes the characters to display in the panel.
 * @returns {Array<{label: string, lang?: string, characters: string[]}>} An array of character groups with labels and characters.
 */
const resolvedCharacters = computed(() => {
  return characters.value.map((group) => {
    let label;

    if (isObject(group.label)) {
      label = group.label[panel.user.language] || group.label.en;
    } else {
      label = group.label;
    }

    return {
      ...group,
      label,
    };
  });
});

onMounted(async () => {
  characters.value = await useCachedCharacters();
  await nextTick();

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
    ".tap-characters__section"
  );
  if (!currentSection) return;

  const buttons = [...currentSection.querySelectorAll(".tap-characters__item")];
  const currentIndex = buttons.indexOf(document.activeElement);
  const currentSectionIndex = sections.indexOf(currentSection);

  if (currentIndex === -1 && currentSectionIndex === -1) return; // No valid focus

  let nextIndex, nextSectionIndex;

  switch (event.key) {
    case "ArrowRight":
      nextIndex = currentIndex + 1;
      if (nextIndex < buttons.length) {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case "ArrowLeft":
      nextIndex = currentIndex - 1;
      if (nextIndex >= 0) {
        buttons[nextIndex].focus();
      }
      event.preventDefault();
      break;

    case "ArrowDown":
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

    case "ArrowUp":
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

    case "Enter":
    case " ":
      event.preventDefault();
      if (currentIndex !== -1) {
        const character = buttons[currentIndex].textContent.trim();
        copyToClipboard(character);
      }
      break;

    case "Tab":
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

    case "Escape":
      emit("close"); // Close overview
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
  padding-inline: 0;
}

.tap-characters__item:hover {
  background-color: var(--dropdown-color-hr);
}
</style>
