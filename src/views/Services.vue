<template>
  <div class="services">
    <div v-if="panel == 0" class="w-100">
      <transition name="fade">
        <button class="float-right btn btn-sm btn-secondary mr-2 mt-1" v-on:click="showPanel()">Show Info</button>
      </transition>
    </div>
    <div v-if="panel == 1" class="w-100">
      <transition name="fade">
        <button class="float-right btn btn-sm btn-secondary mr-2 mt-1" v-on:click="hidePanel()">Close Info</button>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="panel == 1" id="panel" class="bg-primary text-white w-100" >
        <h1 class="" >Info</h1>
        <p class="w-75 mx-auto" >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <br>
      </div>
    </transition>
    <br v-if="panel== 0">
    <br>
    <h3>Services</h3>
    <div class="w-75 mx-auto">
      <router-link
                  class="btn btn-secondary pull-left"
                  :to="'/new/service'">New Service</router-link> 
    </div>
    <br>
    <br>
    <div class=" w-75 mx-auto service__grid">
      <div v-for="(service, index) in services" :key="index">
        
        <!--Die Service Card -->
        <div class="card" style="width: 18rem;">
          <router-link
                  class="btn"
                  :to="'/edit/' +service.name">Edit</router-link> 
          <img class="card-img-top border-bottom" :src="service.image" :alt="service.alt"> <!--zum Test hardcodiert-->
          <div class="card-body">
            <h3 class="card-title " >{{ service.name }}</h3>
            <p class="card-text" >{{ service.desc }}</p>
            <router-link class="grid__button" :to="'/dashboards/' +service.name">
              Select
            </router-link> 
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";
export default {
  name: "Services",
  data: function() {
    return {
      services: json,
      panel: 1
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  },
  methods: {
    hidePanel: function(){
      this.panel = 0;
      sessionStorage.setItem('panel', '0');
    },
    showPanel: function(){
      this.panel = 1;
      sessionStorage.setItem('panel', '1');
    }
  },
  created(){
    if (sessionStorage.getItem("panel") !== null) {
      this.panel = sessionStorage.getItem("panel");
    }
  }
};
</script>

<style scoped>
  
  .grid__button{
    display: block;
    padding-top: 4px;
    padding-bottom: 4px;
    border: 1px solid var(--magenta);
    color: var(--magenta);
    font-weight: bold;
    background: linear-gradient(to right, var(--magenta) 50%, white 50%);
    background-size: 200% 100%;
    background-position:right bottom;
    transition:all 2s ease;
  }
  .grid__button:hover{
    background-position:left bottom;
    color: white;
  }


  img{
    height: 150px;
  }

  .panel--hide{
    display: none;
  }

  .bg-primary{
    background-color: var(--cyan) !important;
  }
  /*--------------------------------
      CSS GRID für die Cards
  ---------------------------------*/
  .service__grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1.0em;
    grid-column-gap: 1.0em;
  }

  .grid__item{
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  
  /*Tablet*/
  /* TODO: 1000-1024px-- margin verhält sich komisch, Breiten noch anpassen */
  
  @media only screen and (max-width: 1000px){
    .service__grid{
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /*Phone*/
  @media only screen and (max-width: 500px){
    .service__grid{
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
