// import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$url = 'http://api-book3/api';
app.config.globalProperties.$token = ref(localStorage.getItem('token') || null);
app.config.globalProperties.$role = ref(localStorage.getItem('role') || null);
app.config.globalProperties.$alertState = ref(false);
app.config.globalProperties.$modalState = ref(false);
app.use(router)

app.mount('#app')
