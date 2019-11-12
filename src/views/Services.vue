<template>
  <div class="services">
    <div v-for="(service, index) in services" :key="index">
      <router-link :to="'/dashboards/' + service.name">{{
        service.name
      }}</router-link>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";

export default {
  name: "Services",
  data: function() {
    return {
      services: json
    };
  }
};
</script>
