import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

  import { initializeApp } from "firebase/app";
  import 'firebase/auth'; 


  const firebaseConfig = {
    apiKey: "AIzaSyBK79IHAS5zwtUXDfCO4gCMlyIJAEvB7UQ",
    authDomain: "eventtime-694f6.firebaseapp.com",
    projectId: "eventtime-694f6",
    storageBucket: "eventtime-694f6.appspot.com",
    messagingSenderId: "536083129539",
    appId: "1:536083129539:web:4857f9567324758fa62e76",
    measurementId: "G-W84PC4DLYX"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

