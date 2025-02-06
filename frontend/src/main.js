// Vue
import { createApp } from 'vue'
import App from './app'
const app = createApp(App)

// Vue Router
import { router } from './utilities/router'
app.use(router)

// CSS
import './style.css'

app.mount('#app')
