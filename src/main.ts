import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createWebHashHistory, createRouter } from "vue-router";
import Ryan from "./components/Ryan.vue";
import Ryan2 from "./components/Ryan2.vue";
const history = createWebHashHistory();
const router = createRouter({
  history: history,
  routes: [
    { path: "/", component: Ryan },
    { path: "/xxx", component: Ryan2 },
  ],
});
const app = createApp(App);
app.use(router);
app.mount("#app");
