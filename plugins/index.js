import loading from '../icon/vue-icon-loading.vue'
import vueserverselect from "./vue-server-select"
let Index = {}
Index.install = function (Vue, options) {

    Vue.component(vueserverselect.name,vueserverselect)  //select
    Vue.component(loading.name, loading)
}
export default Index