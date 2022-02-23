import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
import '@babel/polyfill'
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios"
import '../public/Home.css'
import VueAxios from "vue-axios"
import '@mdi/font/css/materialdesignicons.css'
import VSwitch from 'v-switch-case'
// import QRCode from 'qrcodejs2'
// import VueQRCodeComponent from 'vue-qrcode-component'


// Vue.component('qr-code', VueQRCodeComponent)
Vue.use(VSwitch)
Vue.use(VueAxios, axios);

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://localhost:4001';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
