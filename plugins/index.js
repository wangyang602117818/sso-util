import { createVNode, render } from "vue";
import vueserverselect from "./vue-server-select"
import Toast from './toast';
import Confirm from './confirm'
import VueModal from './vue-modal'
import vueicondelete from '../icon/vue-icon-delete.vue'
import vueicondown from "../icon/vue-icon-down";
import vueiconloading from "../icon/vue-icon-loading";
import vueiconup from "../icon/vue-icon-up";

let Index = {}
Index.install = function (app, options) {
    const toast = function (type, message, duration = 2) {
        const app = createVNode(Toast, { type, message, duration });
        var mountNode = document.createElement("div");
        render(app, mountNode);
        document.body.appendChild(mountNode);
    };
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
        const app = createVNode(Confirm, { ...data, ...method });
        var mountNode = document.createElement("div");
        render(app, mountNode);
        document.body.appendChild(mountNode);
    }
    app.config.globalProperties.$toast = toast;  //toast
    app.config.globalProperties.$confirm = confirm;
    app.component(vueserverselect.name, vueserverselect)  //select
    app.component(VueModal.name, VueModal);
    app.component(vueicondelete.name, vueicondelete);
    app.component(vueicondown.name, vueicondown);
    app.component(vueiconloading.name, vueiconloading);
    app.component(vueiconup.name, vueiconup);


}
export default Index