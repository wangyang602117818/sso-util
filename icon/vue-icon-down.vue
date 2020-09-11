<template>
  <svg viewBox="0 0 1024 1024" :width="size" :height="size">
    <path
      d="M538.112 639.488l379.904-365.568c13.824-13.824 36.352-13.824 50.176 0 13.824 13.824 13.824 35.84 0 49.664L563.2 724.48c-13.824 13.824-36.352 13.824-50.176 0L108.032 323.584c-13.824-13.824-13.824-35.84 0-49.664s36.352-13.824 50.176 0l379.904 365.568z"
    />
  </svg>
</template>

<script>
export default {
  name: "vue-icon-down",
  props: { size: { type: String, default: "16px" } },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
svg path {
  fill: #444;
}
svg:hover path {
  fill: #000;
}
</style>
