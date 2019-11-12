<template>
  <div class="metrics">
    <Metric />
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
  }
};
</script>
