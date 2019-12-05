import Vue from "vue";
import VueRouter from "vue-router";
import Services from "../views/Services.vue";
import Dashboards from "../views/Dashboards.vue";
import Metrics from "../views/Metrics.vue";
import EditDashboard from "../views/EditDashboard.vue";
import NewDashboard from "../views/NewDashboard.vue";

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
  },
  {
    path: "/dashboards/:service/edit/:dashboard",
    name: "EditDashboard",
    component: EditDashboard
  },
  {
    path: "/dashboards/:service/new/dashboard",
    name: "NewDashboard",
    component: NewDashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
