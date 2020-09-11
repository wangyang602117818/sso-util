<template>
  <svg viewBox="0 0 1024 1024" :width="size" :height="size">
    <path
      d="M485.888 384.512l-379.90400001 365.568c-13.824 13.824-36.352 13.824-50.17599999 0-13.824-13.824-13.824-35.84 0-49.664L460.8 299.52c13.824-13.824 36.352-13.824 50.176 0L915.968 700.416c13.824 13.824 13.824 35.84 0 49.664s-36.352 13.824-50.17600001 0l-379.90399999-365.568z"
    />
  </svg>
</template>

<script>
export default {
  name: "vue-icon-up",
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
