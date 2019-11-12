import Vue from "vue";
import VueRouter from "vue-router";
import Services from "../views/Services.vue";
import Dashboards from "../views/Dashboards.vue";
import Metrics from "../views/Metrics.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Services",
    component: Services
  },
  {
    path: "/dashboards/:service",
    name: "Dashboards",
    component: Dashboards
  },
  {
    path: "/metrics/:service/:dashboard",
    name: "Metrics",
    component: Metrics
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
