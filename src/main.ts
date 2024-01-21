import { createApp } from "vue";
import "vuetify/styles";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
