<template>
  <svg viewBox="0 0 1024 1024" :width="size" :height="size">
    <path
      d="M512 457.68914034L312.94980323 258.59413333a38.40297529 38.40297529 0 1 0-54.31085852 54.31085966L457.6443301 512l-199.09500815 199.05019677a38.40297529 38.40297529 0 1 0 54.31085967 54.31085852L512 566.3556699l199.05019677 199.09500815a38.40297529 38.40297529 0 1 0 54.31085852-54.31085967L566.3556699 512l199.09500815-199.05019677a38.40297529 38.40297529 0 1 0-54.31085967-54.31085852L512 457.6443301z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "vue-icon-delete",
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
