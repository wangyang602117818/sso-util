<template>
  <div class="vueserverselect">
    <div class="vueserverselect-content">
      <div class="vueserverselect-data" @click.stop="showSelect">
        <div
          class="vueserverselect-item"
          v-if="!multiple"
        >{{selected.length==1?selected[0][label]:""}}</div>
        <div
          class="vueserverselect-multiple"
          v-else
          v-for="(item,index) in selected"
          :key="item[value]"
          @click.stop
        >
          <div class="vueserverselect-text">{{item[label]}}</div>
          <div class="vueserverselect-del" @click="delItem" :id="index">×</div>
        </div>
        <div class="vueserverselect-search" @click.stop>
          <input
            type="text"
            ref="vueserverselectsearch"
            @focus="showSelect"
            v-on:keyup.enter="searchItem"
          />
        </div>
      </div>
      <div class="vueserverselect-action" @click.stop="showDropdown=!showDropdown">
        <vueiconloading v-if="loading" size="16px" color="#3aa1ff" />
        <vueiconup v-else-if="showDropdown" />
        <vueicondown v-else />
      </div>
    </div>
    <div class="vueserverselect-dropdown" v-show="showDropdown">
      <div
        class="vueserverselect-dropdown-item"
        v-for="(item,index) in innerData"
        :key="index"
        :id="index"
        @click="selectItem"
      >{{item[label]}}</div>
      <div class="vueserverselect-dropdown-pagend" v-if="this.pageEnd" @click.stop>--end--</div>
      <div class="vueserverselect-dropdown-loadmore" ref="loadmore" v-else>
        <vueiconloading size="16px" color="#3aa1ff" />
      </div>
    </div>
  </div>
</template>

<script>
import vueicondown from "../icon/vue-icon-down";
import vueiconloading from "../icon/vue-icon-loading";
import vueiconup from "../icon/vue-icon-up";
export default {
  name: "vue-server-select",
  components: { vueicondown, vueiconup, vueiconloading },
  props: {
    datas: { type: Array, required: true },
    selected: { type: Array },
    pageEnd: { type: Boolean },
    loading: { type: Boolean },
    multiple: { type: Boolean },
    label: {
      type: String,
      default: function () {
        return "name";
      },
    },
    value: {
      type: String,
      default: function () {
        return "id";
      },
    },
  },
  data() {
    return {
      showDropdown: false,
      loadMoreObserver: null,
    };
  },
  computed: {
    innerData: function () {
      var data = [];
      var that = this;
      this.datas.filter(function (item) {
        var count = that.selected.find(
          (sel) => sel[that.value] == item[that.value]
        );
        if (!count) data.push(item);
      });
      return data;
    },
  },
  mounted() {
    var that = this;
    window.addEventListener("click", () => {
      that.closeSelect();
    });
    this.loadMoreObserver = new IntersectionObserver(this.infiniteScroll);
  },
  methods: {
    showSelect($event) {
      this.$refs.vueserverselectsearch.focus();
      if (this.showDropdown) return;
      this.showDropdown = true;
      if (!this.pageEnd) this.loadMoreObserver.observe(this.$refs.loadmore);
    },
    closeSelect() {
      this.showDropdown = false;
      if (!this.pageEnd) this.loadMoreObserver.disconnect();
    },
    selectItem($event) {
      var id = $event.target.id;
      var item = this.innerData[id];
      if (this.multiple) {
        $event.stopPropagation();
        this.selected.push(item);
      } else {
        this.selected.splice(0, 1, item);
      }
      this.$emit("select", this.selected);
    },
    delItem($event) {
      var id = $event.target.id;
      this.selected.splice(id, 1);
      this.$emit("select", this.selected);
    },
    searchItem($event) {
      var value = $event.target.value;
      this.$emit("search", value);
    },
    infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        if (!this.pageEnd) this.$emit("nextPage");
        this.$nextTick(function () {
          ul.scrollTop = scrollTop;
        });
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: Lato, Helvetica, sans-serif;
  color: #35495e;
}
.vueserverselect {
  position: relative;
  display: flex;
  flex-direction: column;
}
.vueserverselect-content {
  border: 1px solid #ccc;
  background-color:#fff;
  display: flex;
  flex-direction: row;
}
.vueserverselect-data {
  cursor: text;
  flex: 1;
}
.vueserverselect-multiple {
  margin: 3px;
  padding: 0px 4px;
  background-color: #e3f2fd;
  float: left;
  height: 24px;
  line-height: 24px;
}
.vueserverselect-item {
  float: left;
  position: absolute;
  margin: 3px;
  padding: 2px;
}
.vueserverselect-text {
  margin-right: 3px;
  color: #039be4;
  display: inline-flex;
  align-items: center;
}
.vueserverselect-del {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #039be4;
  font-weight: bold;
}
.vueserverselect-del:hover {
  color: #e53935;
}
.vueserverselect-search {
  float: left;
  margin: 3px;
  overflow: hidden;
}
.vueserverselect-search input {
  padding: 4px;
  width: 60px;
  outline: none;
  border: 1px solid transparent;
}
.vueserverselect-action {
  width: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}
.vueserverselect-dropdown {
  border: 1px solid #ccc;
  height: 400px;
  bottom: -401px;
  overflow-y: auto;
  position: absolute;
  z-index: 100;
  background-color: #fff;
  left: 0;
  right: 0;
}
.vueserverselect-dropdown-item {
  display: flex;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
}
.vueserverselect-dropdown-item:hover {
  background-color: #3aa1ff;
  color: #fff;
}
.vueserverselect-dropdown-loadmore {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.vueserverselect-dropdown-pagend {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
