<template>
  <div>
    <k-button
    :dropdown="true"
    variant="filled"
    size="sm"
    icon="typo-and-paste"
    class="k-page-view-options"
    @click="$refs.typopanel.toggle()"
    >
  </k-button>
  <k-dropdown-content
  ref="typopanel"
  align-x="end"
  >
    <typo-and-paste-panel />
  </k-dropdown-content>
</div>

</template>

<script>
import TypoAndPastePanel from "./TypoAndPastePanel.vue";

export default {
  components: {
    'typo-and-paste-panel': TypoAndPastePanel
  },
  methods: {
    
  }
};
</script>