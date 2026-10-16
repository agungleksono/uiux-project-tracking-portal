import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/assets/styles/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'

createApp(App).use(vuetify).use(router).mount('#app')
