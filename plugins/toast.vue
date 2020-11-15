<template>
  <transition name="move">
    <div class="toast" v-if="show" :style="'top:' + top + 'px'">
      <svg viewBox="0 0 1024 1024" width="18" height="18" v-if="type == 'info'">
        <path
          d="M512 39.384615C250.092308 39.384615 39.384615 250.092308 39.384615 512s210.707692 472.615385 472.615385 472.615385 472.615385-210.707692 472.615385-472.615385S773.907692 39.384615 512 39.384615z m0 238.276923c33.476923 0 59.076923 25.6 59.076923 59.076924s-25.6 59.076923-59.076923 59.076923-59.076923-25.6-59.076923-59.076923 25.6-59.076923 59.076923-59.076924z m98.461538 413.538462c0 9.846154-7.876923 17.723077-19.692307 17.723077h-157.538462c-9.846154 0-19.692308-5.907692-19.692307-17.723077v-39.384615c0-9.846154 7.876923-21.661538 19.692307-21.661539 9.846154 0 19.692308-5.907692 19.692308-17.723077v-78.769231c0-9.846154-7.876923-21.661538-19.692308-21.661538-9.846154 0-19.692308-5.907692-19.692307-17.723077v-39.384615c0-9.846154 7.876923-21.661538 19.692307-21.661539h118.153846c9.846154 0 19.692308 9.846154 19.692308 21.661539v157.538461c0 9.846154 7.876923 17.723077 19.692308 17.723077 9.846154 0 19.692308 9.846154 19.692307 21.661539v39.384615z"
          :fill="color"
        ></path>
      </svg>

      <svg
        viewBox="0 0 1024 1024"
        width="18"
        height="18"
        v-if="type == 'error'"
      >
        <path
          d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 394.016l-104-104q-12-12-27.488-12t-27.008 11.488-11.488 27.008 12 27.488l104 104-104 104q-12 12-12 27.488t11.488 27.008 27.008 11.488 27.488-12l104-104 104 104q16 15.008 36.992 9.504t26.496-26.496-9.504-36.992L565.984 512l104-104q12-12 12-27.488t-11.488-27.008-27.008-11.488-27.488 12z"
          :fill="color"
        ></path>
      </svg>

      <svg
        viewBox="0 0 1024 1024"
        width="18"
        height="18"
        v-if="type == 'success'"
      >
        <path
          d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m-56 536l-99.008-99.008q-12-11.008-27.488-11.008t-27.008 11.488-11.488 26.496 11.008 27.008l127.008 127.008q11.008 11.008 27.008 11.008t27.008-11.008l263.008-263.008q15.008-15.008 9.504-36.512t-27.008-27.008-36.512 9.504z"
          :fill="color"
        ></path>
      </svg>
      <span :style="'color:' + color">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type: "success",
      message: "success!",
      duration: 0,
      top: 20,
    };
  },
  computed: {
    color: function () {
      switch (this.type) {
        case "success":
          return "#1890ff";
        case "info":
          return "#eb8c00";
        case "error":
          return "#f5222d";
      }
      return "#eb8c00";
    },
  },
  mounted() {
    this.show = true;
    var that = this;
    var top = Math.floor(
      document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset
    );
    this.top = top + 20;
    setTimeout(() => {
      that.show = false;
    }, that.duration * 1000);
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  background-color: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 100;
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  right: 50%;
}

.toast span {
  margin-left: 5px;
}

.move-enter,
.move-leave-to {
  transform: translateY(-200%);
}
.move-enter-active,
.move-leave-active {
  transition: 400ms;
}
.move-enter-to {
  transform: translateY(0);
}
</style>
