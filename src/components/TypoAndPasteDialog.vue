<template>
	<k-dialog
		:cancel-button="false"
		:submit-button="false"
		size="medium"
		:visible="visible"
		class="k-typo-and-paste-dialog"
		@cancel="$emit('cancel')"
	>
		<DropdownContent :characters="characters" :language-code="languageCode" type="dialog" />
	</k-dialog>
</template>

<script>
import DropdownContent from './CharacterSelector.vue';

export default {
	components: {
		DropdownContent
	},
	props: {
		visible: {
			default: false,
			type: Boolean
		}
	},
	emits: ["cancel", "close", "input", "submit", "success"],
  data() {
    return {
      dropdownContent: undefined,
      characters: [],
    };
  },
  computed: {
    languageCode() {
      return this.$panel.language?.code || this.$panel.user?.language || "en";
    },
  },
  async created() {
    try {
      this.characters = await this.$panel.api.get("typo-and-paste/characters");
    } catch (error) {
      console.error("Error loading characters:", error);
    }
  },
	methods: {
		/**
		 * Triggers the `@cancel` event and closes the dialog.
		 * @public
		 */
		cancel() {
			this.$emit("cancel");
		},
		/**
		 * Triggers the `@close` event and closes the dialog.
		 * @public
		 */
		close() {
			this.$emit("close");
		},
		/**
		 * Opens the dialog and triggers the `@open` event.
		 * Use ready to fire events that should be run as
		 * soon as the dialog is open
		 * @public
		 */
		open() {
			this.$panel.dialog.open(this);
		},
		submit() {
			/**
			 * The submit button is clicked or the form is submitted.
			 */
			this.$emit("submit", this.value);
		},
		/**
		 * Shows the success notification bar in the dialog with the given message
		 * @param {string|object} success
		 */
		success(success) {
			this.$emit("success", success);
		}
	}
};
</script>

<style>
.k-typo-and-paste-dialog {
  background-color: var(--color-black);
  color: var(--color-white);
}

.k-dialog-body {
	overflow-y: auto;
}

</style>
