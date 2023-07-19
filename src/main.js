import { createApp } from 'vue'
import './assets/styles/normalize.css'
import './assets/styles/main.css'
import './assets/styles/fonts.css'
import './assets/styles/media.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
