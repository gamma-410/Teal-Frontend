import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDjGal2S9aXWmCiG5E0KfWy-G6m1q2wKPg",
  authDomain: "teal-app6652.firebaseapp.com",
  projectId: "teal-app6652",
  storageBucket: "teal-app6652.appspot.com",
  messagingSenderId: "94936121589",
  appId: "1:94936121589:web:2604bdab370139dfac05bc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
