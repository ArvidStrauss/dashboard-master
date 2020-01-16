<template>
  <section
    v-if="dashboards"
    class="mt-4 form--width mx-auto border--magenta px-2"
  >
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="
          '/' + $i18n.locale + '/metrics/' + serviceName + '/' + dashboardName
        "
        ><i class="fa fa-times" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <br />
    <div>
      <h2 class="dashboards mb-3">
        {{ $t("newDashboard.add") }} {{ serviceName }}
      </h2>
    </div>
    <nav class="">
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
        <li class="breadcrumb-item">
          <router-link
            class=" breadcrumb__link"
            :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
          >
            {{ serviceName }}</router-link
          >
        </li>
        <li class="breadcrumb-item">
          <router-link
            class=" breadcrumb__link"
            :to="
              '/' +
                $i18n.locale +
                '/metrics/' +
                serviceName +
                '/' +
                dashboardName
            "
          >
            {{ dashboardName }}</router-link
          >
        </li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <p class="text-left">{{ $t("newDashboard.title") }}</p>
        <input
          type="text"
          required
          name=""
          placeholder="Title"
          class="form-control dashboards"
          v-model="dashboard.metrics[dashboard.metrics.length - 1].title"
          v-bind:style="
            validateTitle()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        />
        <br />
        <p class="text-left">{{ $t("newDashboard.desc") }}</p>
        <textarea
          rows="3"
          required
          class="form-control dashboards"
          placeholder="Description"
          v-model="dashboard.metrics[dashboard.metrics.length - 1].desc"
          v-bind:style="
            validateDesc()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        ></textarea>
        <hr />
        <br />
        <!-- Model & Metric links -->
        <a
          href="#"
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          v-on:click="saveJson(1)"
        >
          <p class="text-left">choose Model</p>
        </a>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">
            Fill in form to choose Model
          </p>
        </div>
        <br />
        <a
          href="#"
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          v-on:click="saveJson(2)"
        >
          <p class="text-left">choose Metric</p>
        </a>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">
            Fill in form to choose Metric
          </p>
        </div>
        <br />
        <hr />
        <p class="text-left">
          Prediction Time for model
          {{
            dashboards[dashboardID].metrics[
              dashboards[dashboardID].metrics.length - 1
            ].model
          }}
          :

          <b>{{ availablePredTime }} minutes </b>.
        </p>
        <br />
        <a
          href="#"
          v-if="validateForm() == true"
          class="saveButton saveButton--cyan mx-auto w-50"
          v-on:click="saveJson(3)"
        >
          {{ $t("newDashboard.save") }}
        </a>
        <div v-else>
          <p>{{ $t("newDashboard.please") }}</p>
          <span class="saveButton saveButton--red w-50 mx-auto">Save</span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
//import json from "@/assets/dashboards.json";

export default {
  name: "EditDashboards",
  data: function() {
    return {
      dashboards: null,
      imageToggle: true,
      availablePredTime: []
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
      return this.dashboards.find(
        element => element.name == this.dashboardName
      );
    }
  },
  methods: {
    saveJson: function(urlNr) {
      let url;
      //Switch for url depending on function call origin
      if (urlNr === 1) {
        url =
          "/" +
          this.$i18n.locale +
          "/metrics/" +
          this.serviceName +
          "/" +
          this.dashboardName +
          "/selectMoNew";
      }
      if (urlNr === 2) {
        url =
          "/" +
          this.$i18n.locale +
          "/metrics/" +
          this.serviceName +
          "/" +
          this.dashboardName +
          "/selectMeNew";
      }
      if (urlNr === 3) {
        url =
          "/" +
          this.$i18n.locale +
          "/metrics/" +
          this.serviceName +
          "/" +
          this.dashboardName;
      }
      let jsonFile = { settings: [] };
      this.dashboards.forEach(element => {
        jsonFile.settings.push(element);
      });
      let t = this;
      this.$http.post("http://localhost:8080/SaveJson", jsonFile).then(() => {
        t.$router.push(url);
      });
    },

    //FORM INPUT VALIDATIONS
    validateTitle: function() {
      let validated = true;
      let title = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .title;

      if (title == null || title == "") {
        validated = false;
      }
      return validated;
    },
    validateDesc: function() {
      let validated = true;
      let desc = this.dashboard.metrics[this.dashboard.metrics.length - 1].desc;

      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    //COMPLETE FORM VALIDATION FOR SAVE BUTTON
    validateForm: function() {
      let validated = true;
      let title = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .title;
      let desc = this.dashboard.metrics[this.dashboard.metrics.length - 1].desc;

      if (title == null || title == "") {
        validated = false;
      }
      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    loadJson: function(){
      //this.dashboards = json;
      let t = this;
      //GET dashboards
      fetch("http://localhost:8080/LoadJson")
        .then(response => {
          return response.json();
        })
        .then(data => {
          t.dashboards = JSON.parse(JSON.stringify(data.settings));

          t.dashboardID = t.dashboards
            .map(function(e) {
              return e.name;
            })
            .indexOf(t.$route.params.dashboard);
          //GET prediction time for chart
          t.$http
            .get(
              "http://localhost:8000/GetPredTime?service=" +
                this.serviceName +
                "&model=model_0"
            )
            .then(response => {
              t.availablePredTime = response.data.Pred_time;

              //create new chart
              t.dashboards[t.dashboardID].metrics.push({
                title: "",
                desc: "",
                model: "model_0", //default model
                metric: "100", //default metric
                predtime: t.availablePredTime
              });
            })
            .catch(error => console.log(error));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {
    this.loadJson();
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

hr {
  background-color: var(--magenta);
}

.img--size {
  width: 200px;
  height: 200px;
}

.img--size:hover {
  cursor: pointer;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0), 0 0 5px var(--magenta);
}

.paragraphLink {
  text-decoration: none;
  color: black;
  font-size: 1.1em;
}

.paragraphLink:hover {
  color: var(--magenta);
}

/*Table*/
@media only screen and (max-width: 1200px) {
  .form--width {
    width: 90%;
  }
}

/*Phone*/
@media only screen and (max-width: 500px) {
  .form--width {
    width: 90%;
  }
}
</style>
