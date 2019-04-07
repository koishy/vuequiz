import Vue from 'vue';
import App from './components/app.vue';

Vue.config.devtools = true;

var app = new Vue({
    el: "#root",
    components: {'x-app': App}
});