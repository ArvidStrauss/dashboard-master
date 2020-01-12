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
      <h3 v-if="bigbrainloaded === false">
        Loading dashboards....
        <br />
        <br />
        <br />
        Please wait.
      </h3>
      <div v-if="bigbrainloaded === true">
        <div v-for="(dashboard, index) in sortedChoice" :key="index">
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
                  <div v-if="dashboardsLength > 1">
                    <div class="card__buttons--item">
                      <a class id v-on:click="removeEntry(dashboard.name)">
                        <button class="button--right">
                          <i class="fa fa-trash"></i>
                          {{ $t("menu.delete") }}
                        </button>
                      </a>
                    </div>
                  </div>
                  <div class="card__buttons--item" v-else>
                    <a href="#">
                      <button class="button--right bg-danger text-white">
                        <i class="fa fa-trash"></i>
                        {{ $t("menu.delete") }}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "@/assets/dashboards.json";
//import _ from 'lodash';
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
export default {
  name: "Dashboards",
  data: function() {
    return {
      dashboards: [],
      imageToggle: true,
      sorting: -1,
      bigbrainloaded: false
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    currentChoice: function() {
      let dashboardChoice = [];
      this.dashboards.forEach(dashboard => {
        if (dashboard.service === this.serviceName) {
          dashboardChoice.push(dashboard);
        }
      });
      return dashboardChoice;
    },
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
      //bug - looks like a double reload, because vue shows the edited dashboards first and then watch is called to reload template
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
    },
    saveJson: function() {
      let jsonFile = { dashboards: [] };
      this.dashboards.forEach(element => {
        jsonFile.dashboards.push(element);
      });
      this.$http.post("http://localhost:8080/SaveJson", jsonFile);
    },
    resetJson: function() {
      let jsonFile = { dashboards: [] };
      json.forEach(element => {
        jsonFile.dashboards.push(element);
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
          t.dashboards = data.dashboards;
          t.bigbrainloaded = true;
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
    //this.loadJson();
    //let t = this;
    //this.getJson = _.debounce(function(){t.loadJson();}, 500)
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
