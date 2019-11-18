<template>
  <div class="services">
    <div class="Panel mx-auto w-100">
      <h1 class="Panel-title" > Services</h1>
      <p class="Panel-text" >Beschreibung</p>
    </div>
    <br>
    <div class=" w-75 mx-auto service__grid">
      <div v-for="(service, index) in services" :key="index">
        
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" :src="service.image" :alt="service.alt"> <!--zum Test hardcodiert-->
          <div class="card-body">
            <h4 class="card-title" >{{ service.name }}</h4>
            <p class="card-text" >{{ service.description }}</p>
            <button type="button" class="button" @click="()=>$router.push('/dashboards/' + service.name)">
              <transition name="fade" mode="out-in">
                <p class="btnTitle" >Zum {{ service.name }} Dashboard</p>
              </transition>
            </button>
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

img{
  height: 150px;
}
.Panel {
  width: 70vw;
  height: 20vh;
  border-radius: 5px;
  background-color: var(--cyan) !important;
  color: white;
  box-shadow: 2px 2px 2px 2px gray !important;
}
.button{
  width: auto;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
  height: 5vh;
  border: none;
  border-radius: 0.5vh;
  border: 1px solid #38001d;
  color: white;
  background-color: var(--magenta);

  -webkit-box-shadow: 0 1px 0 rgb(255, 255, 255, 0.5) inset,
    0 -1px 0 rgb(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgb(0, 0, 0, 0.5);
  -moz-box-shadow: 0 1px 0 rgb(255, 255, 255, 0.5) inset,
    0 -1px 0 rgb(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgb(0, 0, 0, 0.5);
  box-shadow: 0 1px 0 rgb(255, 255, 255, 0.5) inset,
    0 -1px 0 rgb(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgb(0, 0, 0, 0.5);
}

.button:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btnTitle {
text-align: center;
font-size: 1.3em;
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
