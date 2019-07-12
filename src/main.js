import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store';
import Quill from "quill";
import QuillEditor from "./components/shared/QuillEditor.vue";
import { longClickDirective } from 'vue-long-click'
import vClickOutside from 'v-click-outside'

const version = "__VERSION__";

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.component("VueEditor", QuillEditor);
}

const NoteEditor = {
  install,
  version,
  Quill
};

Vue.use(VueRouter)
Vue.use(NoteEditor)
const longClickInstance = longClickDirective({delay: 400, interval: 50})
Vue.directive('longclick', longClickInstance)
Vue.use(vClickOutside)

Vue.config.productionTip = false

import Home from './components/pages/Home'
import Edit from './components/pages/Edit'
import Add from './components/pages/Add'
import Search from './components/pages/Search'
import Embed from './components/pages/Embed'
import Quote from './components/pages/Quote'

//set vue routes
const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        props: true
    },
    {
        name: 'edit',
        path: '/edit',
        component: Edit,
        props: true
    },
    {
      name: 'search',
      path: '/search',
      component: Search,
      props: true
    },
    {
        name: 'add',
        path: '/add',
        component: Add,
        props: true
    },
    {
      name: 'embed',
      path: '/embed',
      component: Embed,
      props: true
    },
    {
      name: 'quote',
      path: '/quote',
      component: Quote,
      props: true
    }
]

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ store, router }, App)).$mount('#app');
