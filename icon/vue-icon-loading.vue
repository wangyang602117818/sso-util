<template>
  <svg :width="size" :height="size" viewBox="0 0 100 100">
    <g transform="rotate(0 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.4444444444444444s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(40 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.3888888888888889s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(80 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.3333333333333333s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(120 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.2777777777777778s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(160 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.2222222222222222s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(200 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.16666666666666666s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(240 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.1111111111111111s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(280 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="-0.05555555555555555s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(320 50 50)">
      <rect x="44" y="3" rx="3" ry="3" width="12" height="30" :fill="color">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
  </svg>
</template>

<script>
export default {
  name: "vue-icon-loading",
  props: {
    size: { type: String, default: "32px" },
    color: { type: String, default: "#0a0a0a" },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>
