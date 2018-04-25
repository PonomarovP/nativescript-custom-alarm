import Vue from 'nativescript-vue';

import Main from './components/Main';


import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(Main),


}).$start();
