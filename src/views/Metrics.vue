<template>
  <div class="metrics">
    <Metric />
    <div v-for="(metric, index) in dashboard.metrics" :key="index">
      <button class="btn btn-primary">{{ metric.name }}</button>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";
import Metric from "@/components/Metric.vue";

export default {
  name: "Metrics",
  components: {
    Metric
  },
  data: function() {
    return {
      services: json
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    dashboardName: function() {
      return this.$route.params.dashboard;
    },
    dashboard: function() {
      return this.services
        .find(element => element.name == this.serviceName)
        .dashboards.find(element => element.name == this.dashboardName);
    }
  }
};
</script>
