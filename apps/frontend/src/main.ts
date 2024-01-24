import { createApp } from 'vue'
import '@/assets/styles/index.scss'

import '@/vant-style'
import router from './router'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
