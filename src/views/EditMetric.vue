<template>
  <section
    v-if="dashboards"
    class="mt-4 form--width mx-auto border--magenta px-2 mb-4"
  >
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="
          '/' + $i18n.locale + '/metrics/' + serviceName + '/' + dashboardName
        "
      >
        <i class="fa fa-times" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <br />
    <div>
      <h2 class="dashboards mb-3">
        {{ $t("editMetric.edit") }} {{ serviceName }}
      </h2>
    </div>
    <nav class>
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
            class="breadcrumb__link"
            :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
            >{{ serviceName }}</router-link
          >
        </li>
        <li class="breadcrumb-item active">{{ metricName }}</li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <p class="text-left">{{ $t("editMetric.title") }}</p>
        <input
          type="text"
          required
          name
          placeholder=""
          class="form-control dashboards"
          v-model="dashboards[dashboardID].metrics[metricID].title"
          v-bind:style="
            validateTitle()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        />
        <br />
        <p class="text-left">{{ $t("editMetric.desc") }}</p>
        <textarea
          rows="3"
          required
          class="form-control dashboards"
          placeholder=""
          v-model="dashboards[dashboardID].metrics[metricID].desc"
          v-bind:style="
            validateDesc()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        ></textarea>
        <hr />
        <br />
        <!--Model & Metric links -->
        <router-link
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          :to="
            '/' +
              $i18n.locale +
              '/metrics/' +
              serviceName +
              '/' +
              dashboardName +
              '/selectMo/' +
              dashboards[dashboardID].metrics[metricID].title
          "
          @click.native="saveJson"
        >
          <p class="text-left">
            {{ $t("editMetric.chooseModel") }} ---
            {{ dashboards[dashboardID].metrics[metricID].model }}
          </p>
        </router-link>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">
            {{ $t("editMetric.model") }}
          </p>
        </div>
        <br />
        <router-link
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          :to="
            '/' +
              $i18n.locale +
              '/metrics/' +
              serviceName +
              '/' +
              dashboardName +
              '/selectMe/' +
              dashboards[dashboardID].metrics[metricID].title
          "
          @click.native="saveJson"
        >
          <p class="text-left">
            {{ $t("editMetric.chooseMetric") }} ---
            {{ dashboards[dashboardID].metrics[metricID].metric }}
          </p>
        </router-link>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">
            {{ $t("editMetric.metric") }}
          </p>
        </div>
        <br />
        <hr />
        <p class="text-left">
          {{ $t("editMetric.pred") }}
          {{ dashboards[dashboardID].metrics[metricID].model }} :

          <b>{{ availablePredTime }} {{ $t("editMetric.min") }} </b>.
        </p>
        <br />
        <a
          href="#"
          v-if="validateForm() == true"
          class="saveButton saveButton--cyan mx-auto w-50"
          v-on:click="saveJson"
        >
          {{ $t("editMetric.save") }}
        </a>
        <div v-else>
          <p>{{ $t("editMetric.please") }}</p>
          <span class="saveButton saveButton--red w-50 mx-auto">{{
            $t("editMetric.save")
          }}</span>
        </div>
      </div>
    </form>
    <br />
    <br />
    <br />
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
      dashboardID: -1,
      metricID: -1,
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
    metricName: function() {
      return this.$route.params.metric;
    }
  },
  methods: {
    saveJson: function() {
      let jsonFile = { settings: [] };
      this.dashboards.forEach(element => {
        jsonFile.settings.push(element);
      });
      let t = this;
      this.$http.post("http://localhost:8080/SaveJson", jsonFile).then(() => {
        t.$router.push(
          "/" +
            t.$i18n.locale +
            "/metrics/" +
            t.serviceName +
            "/" +
            t.dashboardName
        );
      });
    },

    //FORM INPUT VALIDATIONS
    validateTitle: function() {
      let validated = true;
      let title = this.dashboards[this.dashboardID].metrics[this.metricID]
        .title;

      if (title == null || title == "") {
        validated = false;
      }
      return validated;
    },
    validateDesc: function() {
      let validated = true;
      let desc = this.dashboards[this.dashboardID].metrics[this.metricID].desc;

      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    //COMPLETE FORM VALIDATION FOR SAVE BUTTON
    validateForm: function() {
      let validated = true;
      let title = this.dashboards[this.dashboardID].metrics[this.metricID]
        .title;
      let desc = this.dashboards[this.dashboardID].metrics[this.metricID].desc;

      if (title == null || title == "") {
        validated = false;
      }
      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    loadJson: function() {
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
          t.metricID = t.dashboards[t.dashboardID].metrics
            .map(function(e) {
              return e.title;
            })
            .indexOf(t.$route.params.metric);
          //GET prediction time for chart
          t.$http
            .get(
              "http://localhost:8000/GetPredTime?service=" +
                this.serviceName +
                "&model=" +
                t.dashboards[t.dashboardID].metrics[t.metricID].model
            )
            .then(response => {
              t.availablePredTime = response.data.Pred_time;
              t.dashboards[t.dashboardID].metrics[t.metricID].predtime =
                t.availablePredTime;
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
