import Vue from 'vue'
import loading from '../icon/vue-icon-loading.vue'
import vueserverselect from "./vue-server-select"
import Toast from './toast';
import Confirm from './confirm'
import VueModal from './vue-modal'

const ToastConstructor = Vue.extend(Toast);
const toast = function (type, message, duration = 2) {
    const toastInstance = new ToastConstructor({ data: { type: type, message: message, duration: duration } }).$mount();
    document.body.appendChild(toastInstance.$el);
    return toastInstance;
};
const ConfirmConstructor = Vue.extend(Confirm);
const confirm = function () {
    var data = {};
    var method = {};
    for (var i = 0; i < arguments.length; i++) {
        if (i == 0) data.content = arguments[0];
        if (i == 1) {
            if (typeof arguments[i] == "string") {
                data.title = arguments[i]
            } else {
                method.confirm = arguments[i];
            }
        }
        if (i == 2) {
            if (typeof arguments[i] == "string") {
                data.cancelTitle = arguments[i]
            } else {
                method.confirm = arguments[i];
            }
        }
        if (i == 3) {
            if (typeof arguments[i] == "string") {
                data.submitTitle = arguments[i]
            } else {
                method.confirm = arguments[i];
            }
        }
        if (i == 4) {
            method.confirm = arguments[i];
        }
    }
    const confirmInstance = new ConfirmConstructor({
        data: data, methods: method
    }).$mount();
    document.body.appendChild(confirmInstance.$el);
    return confirmInstance;
}
let Index = {}
Index.install = function (Vue, options) {
    Vue.prototype.$toast = toast;  //toast
    Vue.prototype.$confirm = confirm;
    Vue.component(vueserverselect.name, vueserverselect)  //select
    Vue.component(loading.name, loading) //loading
    Vue.component(VueModal.name, VueModal);
}
export default Index