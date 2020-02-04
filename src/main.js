import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import vuelidate from 'vuelidate'

Vue.use(vuelidate)
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyAW84hp8ySzpNxdZRr3V8EBletdj3mxUfo',
  authDomain: 'vue-school-forum-c9b38.firebaseapp.com',
  databaseURL: 'https://vue-school-forum-c9b38.firebaseio.com',
  projectId: 'vue-school-forum-c9b38',
  storageBucket: 'vue-school-forum-c9b38.appspot.com',
  messagingSenderId: '26246503526',
  appId: '1:26246503526:web:a92240a6198283163c21a7'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
