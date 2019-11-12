<template>
  <div class="dashboards">
    <div v-for="(dashboard, index) in service.dashboards" :key="index">
      <router-link to="/metrics">{{ dashboard.name }}</router-link>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";

export default {
  name: "Dashboards",
  data: function() {
    return {
      services: json
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.id;
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  }
};
</script>
