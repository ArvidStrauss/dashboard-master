<template>
  <div class="dashboards container w-75 mx-auto">
    <div v-for="(dashboard, index) in service.dashboards" :key="index">
      <div class="row mb-4">
        <div class="card w-100">
          <div class="card-header">
            <div class="card__header">
              <h6 class="font-weight-bold text-white">{{ dashboard.name }}</h6>
              <ul class="nav nav-tabs card-header-tabs pull-right"  id="">
                <li class="nav-item">
                  <a class="nav-link " id="" data-toggle="tab" href="#home" role="tab" aria-controls="edit" aria-selected="false">Edit
                  <!-- Platzhalter-->
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="" data-toggle="tab" href="#profile" role="tab" aria-controls="delete" aria-selected="false">Delete
                  <!-- Platzhalter-->
                  </a>
                </li>
                <li class="nav-item">
                  <router-link
                  class="nav-link active"
                  :to="'/metrics/' + serviceName + '/' + dashboard.name">Select</router-link> 
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body card__body--height">
            <article class="">
              {{ dashboard.description }}
            </article>
          </div>   
        </div>
      </div>
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
      return this.$route.params.service;
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  }
};
</script>

<style scoped>
  h6{
    font-size: 14pt;
  }
  .active{
    color: var(--magenta) !important;
    font-weight: bold;
  }
  .nav .nav-item a{
    color: white;
    font-size: 13pt;
  }
  .nav .nav-item a:hover{
    border-bottom: 1px solid var(--cyan);
    font-weight: bold;
  }
  .card__header{
    display: grid;
    grid-template-columns: 75% auto;
  }
  
  .header__buttons{
    height: 100%;
  }
  .card__body--height{
    height: 120px;
  }

  .row .card .card-header {
    background-color: var(--cyan) !important;
  }

  @media only screen and (max-width: 1025px){
    .card__header{
      grid-template-columns: 60% auto;
    }
  }
  
  @media only screen and (max-width: 700px){
    .card__header{
      grid-template-columns: 100%;
    }
  }
</style>
