import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
// import "bootstrap-vue/dist/bootstrap-vue.css";

//vue qr 생성
import VueQriously from "vue-qriously";
//fontAwesome (bootstrapIcon과 동시 사용 가능)
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";

library.add(fas);
library.add(far);
library.add(fab);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueQriously);
Vue.use(Toaster, { timeout: 30000 });

Vue.config.productionTip = false;
//토큰, 유저아이디, 지갑주소 확인하기
// console.log("token : " + localStorage.getItem("token"));
// console.log("email : " + localStorage.getItem("email"));
// console.log("nickname : " + localStorage.getItem("nickName"));
// console.log("role : " + localStorage.getItem("role"));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
