<template>
  <div>
    <k-button
      :dropdown="true"
      :title="$panel.t('philippoehrlein.typo-and-paste.buttonTitle')"
      variant="filled"
      size="sm"
      icon="typo-and-paste"
      @click="$refs.dropdownContent.toggle()"
    >
    </k-button>
    <k-dropdown-content ref="dropdownContent" align-x="end">
      <DropdownContent :characters="characters" :language-code="languageCode" />
    </k-dropdown-content>
  </div>
</template>

<script>
import DropdownContent from "./DropdownContent.vue";

export default {
  components: {
    DropdownContent,
  },
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
};
</script>
