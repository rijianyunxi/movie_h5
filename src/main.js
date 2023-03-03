import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'


import Vant from 'vant';
import { Lazyload } from 'vant';

import 'vant/lib/index.css';
import * as API from "@/api/index"


Vue.use(Vant);
Vue.use(Lazyload);

Vue.prototype.API = API;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
