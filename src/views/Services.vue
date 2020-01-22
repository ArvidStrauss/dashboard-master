<template>
  <div v-if="services" class="services">
    <div v-if="panel == 0" class="w-100 pr-4">
      <transition name="fade">
        <button class="float-right normalButton mt-2" v-on:click="showPanel()">
          Show Info
        </button>
      </transition>
    </div>
    <div v-if="panel == 1" class="w-100 pr-4">
      <transition name="fade">
        <button class="float-right normalButton mt-2" v-on:click="hidePanel()">
          Close Info
        </button>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="panel == 1" id="panel" class="bg-primary text-white w-100">
        <h1 class="">Info</h1>
        <p class="w-75 mx-auto">
          {{ $t("info") }}
        </p>
        <br />
      </div>
    </transition>
    <br v-if="panel == 0" />
    <br />
    <h2 class="text-white font-weight-bold">Services</h2>
    <br />
    <br />
    <div class=" w-75 mx-auto service__grid">
      <div v-for="(service, index) in services" :key="index">
        <!--Die Service Card -->
        <div class="card border--magenta" style="width: 18rem;">
          <img
            class="card-img-top border-bottom border--grey"
            :src="service.image"
            :alt="service.name"
          />
          <!--zum Test hardcodiert-->
          <div class="card-body">
            <h3 class="card-title ">{{ service.name }}</h3>
            <p class="card-text">{{ service.desc }}</p>
            <router-link
              class="fancyButton"
              :to="'/' + $i18n.locale + '/dashboards/' + service.name"
            >
              Open
              <i class="fa fa-step-forward"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import json from "@/assets/services.json";
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
export default {
  name: "Services",
  data: function() {
    return {
      services: null,
      panel: 1
    };
  },
  computed: {},
  methods: {
    hidePanel: function() {
      this.panel = 0;
      sessionStorage.setItem("panel", "0");
    },
    showPanel: function() {
      this.panel = 1;
      sessionStorage.setItem("panel", "1");
    }
  },
  created() {
    if (sessionStorage.getItem("panel") !== null) {
      this.panel = sessionStorage.getItem("panel");
    }
  },
  mounted() {
    this.services = json;
    const baseURI = "http://localhost:8080/GetServices";
    this.$http.get(baseURI).then(result => {
      console.log(result.data);
    });
  }
};
</script>

<style scoped>
img {
  height: 150px;
}

.services {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/img/banner.jpg");
  background-position: center;
  background-size: cover;
}

.panel--hide {
  display: none;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/*--------------------------------
      CSS GRID für die Cards
  ---------------------------------*/
.service__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
}

/* .grid__item {
} */

/*Tablet*/
/* TODO: 1000-1024px-- margin verhält sich komisch, Breiten noch anpassen */

@media only screen and (max-width: 1000px) {
  .service__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/*Phone*/
@media only screen and (max-width: 500px) {
  .service__grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
