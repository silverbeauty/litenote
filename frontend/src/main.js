import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter)

Vue.config.productionTip = false

import Home from './components/pages/Home'
import Edit from './components/pages/Edit'
import Add from './components/pages/Add'

//set vue routes
const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'edit',
        path: '/edit',
        component: Edit,
        props: true
    },
    {
        name: 'add',
        path: '/add',
        component: Add,
        props: true
    }
]

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ store, router }, App)).$mount('#app');
