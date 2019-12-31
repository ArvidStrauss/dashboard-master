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
import SelectModel from "../views/SelectModel.vue";
import NewSelectMetric from "../views/NewSelectMetric.vue";
import NewSelectModel from "../views/NewSelectModel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/en"
  },
  {
    path: "/:lang",
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "/",
        name: "Services",
        component: Services
      },
      {
        path: "dashboards/:service",
        name: "Dashboards",
        component: Dashboards
      },
      {
        path: "metrics/:service/:dashboard",
        name: "Metrics",
        component: Metrics
      },
      {
        path: "dashboards/:service/edit/:dashboard",
        name: "EditDashboard",
        component: EditDashboard
      },
      {
        path: "dashboards/:service/new",
        name: "NewDashboard",
        component: NewDashboard
      },
      {
        path: "metrics/:service/:dashboard/new",
        name: "NewMetric",
        component: NewMetric
      },
      {
        path: "metrics/:service/:dashboard/edit/:metric",
        name: "EditMetric",
        component: EditMetric
      },
      {
        path: "metrics/:service/:dashboard/selectMe/:metric",
        name: "SelectMetric",
        component: SelectMetric
      },
      {
        path: "metrics/:service/:dashboard/selectMo/:metric",
        name: "SelectModel",
        component: SelectModel
      },
      {
        path: "metrics/:service/:dashboard/selectMoNew",
        name: "NewSelectModel",
        component: NewSelectModel
      },
      {
        path: "metrics/:service/:dashboard/selectMeNew",
        name: "NewSelectMetric",
        component: NewSelectMetric
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
