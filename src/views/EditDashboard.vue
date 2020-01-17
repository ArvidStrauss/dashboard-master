<template>
  <section
    v-if="dashboards"
    class="mt-4 form--width mx-auto border--magenta px-2"
  >
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
        ><i class="fa fa-times" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <br />
    <div>
      <h2 class="dashboards mb-3">
        {{ $t("editDashboard.edit") }} {{ serviceName }}
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
        <li class="breadcrumb-item active">
          {{ dashboardName }}
        </li>
      </ol>
    </nav>
    <form v-if="dashboards">
      <div class="container form-group pb-4">
        <p class="text-left">{{ $t("editDashboard.title") }}</p>
        <input
          type="text"
          required
          id="title"
          class="form-control dashboards"
          name=""
          placeholder=""
          v-model="dashboards[dashboardID].name"
          v-bind:style="
            validateTitle()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        />
        <br />
        <p class="text-left">{{ $t("editDashboard.desc") }}</p>
        <textarea
          rows="3"
          required
          id="desc"
          class="form-control dashboards"
          placeholder=""
          v-model="dashboards[dashboardID].description"
          v-bind:style="
            validateDesc()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        ></textarea>
        <br />
        <a
          href="#"
          v-if="validateForm() == true"
          class="saveButton saveButton--cyan mx-auto w-50"
          v-on:click="saveJson"
        >
          {{ $t("editDashboard.save") }}
        </a>
        <div v-else>
          <p>{{ $t("editDashboard.please") }}</p>
          <span class="saveButton saveButton--red w-50 mx-auto">{{
            $t("editDashboard.save")
          }}</span>
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
      dashboards: [],
      dashboardID: -1,
      imageToggle: true
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    dashboardName: function() {
      return this.$route.params.dashboard;
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
        t.$router.push("/" + t.$i18n.locale + "/dashboards/" + t.serviceName);
      });
    },
    //FORM INPUT VALIDATIONS
    validateTitle: function() {
      let validated = true;
      let title = this.dashboards[this.dashboardID].name;

      if (title == null || title == "") {
        validated = false;
      }
      return validated;
    },
    validateDesc: function() {
      let validated = true;
      let description = this.dashboards[this.dashboardID].description;

      if (description == null || description == "") {
        validated = false;
      }

      return validated;
    },
    //COMPLETE FORM VALIDATION FOR SAVE BUTTON
    validateForm: function() {
      let validated = true;
      let title = this.dashboards[this.dashboardID].name;
      let description = this.dashboards[this.dashboardID].description;

      if (title == null || title == "") {
        validated = false;
      }
      if (description == null || description == "") {
        validated = false;
      }

      return validated;
    },
    loadJson: function() {
      let t = this;
      return fetch("http://localhost:8080/LoadJson")
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
