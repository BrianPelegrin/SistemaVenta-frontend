import { createApp } from "vue";
import "vuetify/styles";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
