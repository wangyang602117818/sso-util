<template>
  <transition name="fade">
    <div
      class="v-modal-background"
      v-if="show"
      @mouseup.stop="mouseUp"
      @mousemove.stop="mouseMove"
      @click.stop="clickToClose && close()"
    >
      <div
        class="v-modal-dialog"
        :style="'width:' + width + 'px'"
        @click.stop
        @mousedown="mouseDown"
      >
        <slot> </slot>
        <div
          v-if="resizable"
          class="v-modal-resizer"
          @mousedown.stop="resizing = true"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "vue-modal",
  props: {
    width: {
      type: Number,
      default: function () {
        return 300;
      },
    },
    resizable: { type: Boolean },
    draggable: { type: String },
    clickToClose: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    show: { type: Boolean },
  },
  computed: {},
  data() {
    return {
      draging: false,
      resizing: false,
      dialogLeft: 0,
      dialogTop: 0,
    };
  },
  mounted() {},
  methods: {
    mouseUp() {
      this.draging = false;
      this.resizing = false;
    },
    mouseMove(e) {
      var modelDialog = e.currentTarget.firstChild;
      if (this.resizing) {
        var dx = e.pageX - modelDialog.offsetLeft;
        var dy = e.pageY - modelDialog.offsetTop;
        modelDialog.style.width = dx + "px";
        modelDialog.style.height = dy + "px";
      }
      if (this.draging) {
        var left = e.pageX - this.dialogLeft;
        var top = e.pageY - this.dialogTop;
        var documentWidth = document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > documentWidth - modelDialog.clientWidth) {
          left = documentWidth - modelDialog.clientWidth;
        }
        if (top > documentHeight - modelDialog.clientHeight) {
          top = documentHeight - modelDialog.clientHeight;
        }
        modelDialog.style.left = left + "px";
        modelDialog.style.top = top + "px";
      }
    },
    mouseDown(e) {
      var draggable = this.draggable;
      if (draggable == undefined) return;
      var modelDialog = e.currentTarget;
      //全局都能drag
      if (draggable == "") {
        this.draging = true;
      } else if (
        e.target.className &&
        draggable.indexOf(e.target.className) > -1
      ) {
        this.draging = true;
      } else if (
        e.target.parentElement.className &&
        draggable.indexOf(e.target.parentElement.className) > -1
      ) {
        this.draging = true;
      }
      if (this.draging) {
        this.dialogLeft = e.pageX - modelDialog.offsetLeft;
        this.dialogTop = e.pageY - modelDialog.offsetTop;
      }
    },
    close(e) {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.v-modal-background {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-modal-dialog {
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.v-modal-resizer {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: transparent;
  cursor: se-resize;
}
.v-modal-resizer::after {
  display: block;
  position: absolute;
  content: "";
  background: transparent;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #ddd;
  border-left: 10px solid transparent;
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
