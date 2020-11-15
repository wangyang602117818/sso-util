<template>
  <transition name="fade">
    <div class="v-confirm-background" v-if="show" @click="close">
      <div
        class="v-confirm-dialog"
        :style="'width:300px;height:150px'"
        :ref="'vconfirmdialog'"
        @click.stop
        @mouseup.stop="draging = false"
        @mousemove.stop="mouseMove"
      >
        <div class="v-confirm-title" @mousedown="mouseDown">
          <div class="v-confirm-c-title">{{ title }}</div>
          <div class="v-confirm-close" @click="show = false">
            <vueicondel size="18" />
          </div>
        </div>
        <div class="v-confirm-content">
          {{ content }}
        </div>
        <div class="v-confirm-buttons">
          <button
            type="button"
            class="v-confirm-button"
            tabindex="1"
            @click="close"
          >
            {{ cancelTitle }}
          </button>
          <button
            type="button"
            class="v-confirm-button"
            tabindex="2"
            @click="ok"
          >
            {{ submitTitle }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import vueicondel from "../icon/vue-icon-delete";
export default {
  components: { vueicondel },
  data() {
    return {
      show: false,
      title: "Title",
      content: "",
      cancelTitle: "No",
      submitTitle: "Yes",
      draging: false,
      modelDialog: null,
      dialogLeft: 0,
      dialogTop: 0,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    mouseUp() {
      this.draging = false;
    },
    mouseMove(e) {
      if (this.draging) {
        var left = e.pageX - this.dialogLeft;
        var top = e.pageY - this.dialogTop;
        var documentWidth = document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > documentWidth - e.currentTarget.clientWidth) {
          left = documentWidth - e.currentTarget.clientWidth;
        }
        if (top > documentHeight - e.currentTarget.clientHeight) {
          top = documentHeight - e.currentTarget.clientHeight;
        }
        e.currentTarget.style.left = left + "px";
        e.currentTarget.style.top = top + "px";
      }
    },
    mouseDown(e) {
      this.draging = true;
      this.dialogLeft = e.pageX - e.currentTarget.parentElement.offsetLeft;
      this.dialogTop = e.pageY - e.currentTarget.parentElement.offsetTop;
    },
    close(e) {
      this.show = false;
    },
    ok() {
      this.confirm();
      this.show = false;
    },
  },
};
</script>

<style scoped>
.v-confirm-background {
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-confirm-dialog {
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.v-confirm-title {
  display: flex;
  align-items: center;
  height: 20px;
  padding: 8px;
  background: linear-gradient(0deg, #e0e0e0 10%, #f0f0f0 90%);
  cursor: move;
}
.v-confirm-c-title {
  flex: 1;
  display: flex;
}
.v-confirm-close {
  display: flex;
}
.v-confirm-close svg {
  cursor: pointer;
}
.v-confirm-content {
  flex: 1;
  padding: 8px;
}
.v-confirm-buttons {
  bottom: 0;
  padding: 8px;
  height: 30px;
  display: flex;
  border-top: 1px solid #dddedf;
  justify-content: flex-end;
}
.v-confirm-button {
  margin-right: 10px;
  border: 1px solid #dddedf;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  color: #484848;
  padding-left: 20px;
  padding-right: 20px;
}
.v-confirm-button:hover {
  border: 1px solid #484848;
  color: #000;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 200ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
