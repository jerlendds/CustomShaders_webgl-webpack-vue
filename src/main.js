import Vue from 'vue';
import App from './App.vue';
// ! NTS: DO NOT INCLUDE COMMENTED CODE IN ARTICLE POST
// import router from './router'
// import store from './store'
Vue.config.productionTip = false;

new Vue({
    // router,
    // store,
    render: h => h(App)
}).$mount('#app');