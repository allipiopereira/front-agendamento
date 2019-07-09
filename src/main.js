import Vue from 'vue'
import Vuetify from 'vuetify'
import uploader from 'vue-simple-uploader/src'
import App from './App.vue'
import store from './store'
import router from './routes'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(uploader)

Vue.config.productionTip = false

// eslint-disable-next-line
/* eslint-disable */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
