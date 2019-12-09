import Vue from "vue";
import VueRouter from "vue-router";
import Services from "../views/Services.vue";
import Dashboards from "../views/Dashboards.vue";
import Metrics from "../views/Metrics.vue";
import EditDashboard from "../views/EditDashboard.vue";
import NewDashboard from "../views/NewDashboard.vue";
import NewMetric from "../views/NewMetric.vue";
import EditMetric from "../views/EditMetric.vue";
import SelectMetric from "../views/SelectMetric.vue";

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
    path: "/dashboards/:service/new",
    name: "NewDashboard",
    component: NewDashboard
  },
  {
    path: "/metrics/:service/:dashboard/new",
    name: "NewMetric",
    component: NewMetric
  },
  {
    path: "/metrics/:service/:dashboard/edit/:metric",
    name: "EditMetric",
    component: EditMetric
  },
  {
    path: "/metrics/:service/:dashboard/select/:metric",
    name: "SelectMetric",
    component: SelectMetric
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
