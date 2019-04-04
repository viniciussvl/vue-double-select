
import DoubleSelect from './DoubleSelect.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

DoubleSelect.install = function (Vue, options) {
    Vue.use(BootstrapVue)
    Vue.component(DoubleSelect.name, DoubleSelect)
}

export default DoubleSelect