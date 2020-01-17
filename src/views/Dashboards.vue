<template>
  <div v-if="dashboards" class="container mt-4">
    <h3>{{ serviceName }}</h3>
    <br />
    <div class="w-100 pr-4">
      <router-link
        class="routerLink pull-right"
        :to="'/' + $i18n.locale + '/dashboards/' + serviceName + '/new'"
      >
        <button class="normalButton cursor--add">
          <i class="fa fa-plus"></i>
          {{ $t("menu.newDashboard") }}
        </button>
      </router-link>
    </div>
    <br />
    <div class="w-75 mx-auto">
      <nav>
        <ol class="breadcrumb bg-white">
          <li
            class="breadcrumb-item"
            @mouseover="imageToggle = false"
            @mouseleave="imageToggle = true"
          >
            <router-link class="breadcrumb__link" :to="'/'">
              <img
                src="@/assets/img/home.png"
                class="breadcrumb__img"
                v-if="imageToggle == true"
              />
              <img
                src="@/assets/img/home--magenta.png"
                class="breadcrumb__img"
                v-if="imageToggle == false"
              />
            </router-link>
          </li>
          <li class="breadcrumb-item active">{{ serviceName }}</li>
        </ol>
      </nav>
      <h3 v-if="chartsLoaded === false">
        Loading dashboards....
        <br />
        <br />
        <br />
        Please wait.
      </h3>
      <div v-if="chartsLoaded === true">
        <div v-for="(dashboard, index) in sortedChoice" :key="index">
          <!-- Dashboard Card -->
          <div class="row mb-4">
            <div class="card__grid">
              <div class="card__header pt-2 pb-1">
                <h5 class="text-white">{{ dashboard.name }}</h5>
              </div>
              <div class="card__content">
                <div class="card__description">
                  <article>{{ dashboard.description }}</article>
                </div>

                <div class="card__buttons">
                  <div class="card__buttons--item">
                    <router-link
                      class
                      :to="
                        '/' +
                          $i18n.locale +
                          '/metrics/' +
                          serviceName +
                          '/' +
                          dashboard.name
                      "
                    >
                      <button class>
                        <i class="fa fa-step-forward"></i>
                        {{ $t("menu.open") }}
                      </button>
                    </router-link>
                  </div>
                  <div class="card__buttons--item">
                    <router-link
                      class
                      :to="
                        '/' +
                          $i18n.locale +
                          '/dashboards/' +
                          serviceName +
                          '/edit/' +
                          dashboard.name
                      "
                    >
                      <button>
                        <i class="fa fa-edit"></i>
                        {{ $t("menu.edit") }}
                      </button>
                    </router-link>
                  </div>
                  <div v-if="dashboardsLength > 1" class="card__buttons--item">
                    <a class id v-on:click="deleteWindow = index">
                      <button class="button--right">
                        <i class="fa fa-trash"></i>
                        {{ $t("menu.delete") }}
                      </button>
                    </a>
                  </div>
                  <div class="card__buttons--item" v-else>
                    <a href="#">
                      <button
                        class="button--right bg-lightgrey text-white cursor--none"
                      >
                        <i class="fa fa-trash"></i>
                        {{ $t("menu.delete") }}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <br v-if="deleteWindow === index" />
              <div
                class="row w-100 border--magenta--full py-2 rounded"
                v-if="deleteWindow === index"
              >
                <div class="col-6">{{ $t("notification.msg") }}</div>
                <a
                  class="normalChartButton col-2 text-white"
                  id
                  v-on:click="removeEntry(dashboard.name)"
                >
                  <i class="fa fa-trash"></i>
                  {{ $t("notification.yes") }}
                </a>
                <a
                  class="normalChartButton col-2 ml-2"
                  v-on:click="deleteWindow = false"
                  href="#"
                >
                  {{ $t("notification.no") }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import json from "@/assets/dashboards.json";
//import _ from 'lodash';
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
export default {
  name: "Dashboards",
  data: function() {
    return {
      dashboards: [],
      imageToggle: true,
      sorting: -1,
      chartsLoaded: false,
      deleteWindow: false
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    //selected Dashboard
    currentChoice: function() {
      let dashboardChoice = [];
      this.dashboards.forEach(dashboard => {
        if (dashboard.service === this.serviceName) {
          dashboardChoice.push(dashboard);
        }
      });
      return dashboardChoice;
    },
    //alphabetically sorted Dashboard
    sortedChoice: function() {
      return this.currentChoice
        .slice(0)
        .sort((a, b) => (a.name < b.name ? this.sorting : -this.sorting));
    },
    dashboardsLength: function() {
      return this.sortedChoice.length;
    }
  },
  methods: {
    removeEntry: function(name) {
      let i = null;
      this.dashboards.forEach((service, index) => {
        if (service.name == name) {
          i = index;
        }
      });
      if (i != null) {
        this.$delete(this.dashboards, i);
      }
      this.saveJson();
      this.deleteWindow = false;
    },
    saveJson: function() {
      let jsonFile = { settings: [] };
      this.dashboards.forEach(element => {
        jsonFile.settings.push(element);
      });
      this.$http.post("http://localhost:8080/SaveJson", jsonFile);
    },
    loadJson: function() {
      let t = this;
      fetch("http://localhost:8080/LoadJson")
        .then(response => {
          return response.json();
        })
        .then(data => {
          t.dashboards = data.settings;
          t.chartsLoaded = true;
        })
        .catch(err => {
          console.log(
            "ERROR: can't load /loadJson, the JSON file at the server is corrupted. Please contact the admin to reset the file."
          );
          this.resetJson(); //developement / reset to default version
          console.log(err);
        });
    }
  },
  created() {
    //this.dashboards = json;
  },
  mounted() {
    this.loadJson();
  }
};
</script>

<style scoped>
h6 {
  font-size: 14pt;
}

.cursor--none {
  cursor: default;
}

.bg-lightgrey {
  background-color: var(--superlightgrey) !important;
}

/* Cards */
.card__header {
  border-top-left-radius: 5px;
  background-color: var(--magenta);
}

.card__grid {
  width: 100%;
}

.card__content {
  display: grid;
  grid-template-columns: 75% auto;
}

.card__description {
  border-left: 1px solid var(--lightgrey);
  border-bottom: 1px solid var(--lightgrey);
  min-height: 100px;
}

.card__buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  border-right: 1px solid var(--lightgrey);
  border-bottom-right-radius: 5px;
}

.card__buttons--item {
  flex: 1;
}
.card__buttons--item button {
  background-color: white;
  color: var(--darkgrey);
  width: 100%;
  height: 100%;
  border-top: none;
  border-bottom: 1px solid var(--lightgrey);
  border-right: none;
  border-left: 1px solid var(--lightgrey);
}

.cursor--add {
  cursor: copy;
}

.button--right {
  border-bottom-right-radius: 5px;
}
.card__buttons--item button:hover {
  color: var(--magenta);
}
.card__buttons--item button:focus {
  outline: none;
  color: var(--magenta);
}
@media only screen and (max-width: 1025px) {
  .card__content {
    grid-template-columns: 100%;
    grid-template-rows: 75% auto;
    min-height: 100px;
  }
  .card__description {
    border-right: 1px solid var(--lightgrey);
  }
  .card__buttons {
    height: 50px;
  }
  .button--right {
    border-right: none;
  }
}
</style>
