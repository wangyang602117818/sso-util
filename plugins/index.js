import Vue from 'vue'
import loading from '../icon/vue-icon-loading.vue'
import vueserverselect from "./vue-server-select"
import Toast from './toast';

const ToastConstructor = Vue.extend(Toast);
const toast = function (type, message, duration = 1) {
    const toastInstance = new ToastConstructor({ data: { type: type, message: message, duration: duration, show: true } }).$mount();
    document.body.appendChild(toastInstance.$el);
    return toastInstance;
};

let Index = {}
Index.install = function (Vue, options) {
    Vue.prototype.$toast = toast;  //toast
    Vue.component(vueserverselect.name, vueserverselect)  //select
    Vue.component(loading.name, loading) //loading
}
export default Index