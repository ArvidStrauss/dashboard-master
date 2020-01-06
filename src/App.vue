<template>
  <div id="app">
    <Header></Header>
    <div class="router-view">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@font-face {
  font-family: TeleGroteskNextRegular;
  src: url(./assets/fonts/telegrotesknext-regular.woff);
}

:root {
  /* Colour Variables Telekom Brand Design */
  --magenta: rgb(226, 0, 116) !important;
  --white: rgb(251, 251, 251) !important;
  --black: rgb(75, 75, 75);
  --superlightgrey: rgb(238, 238, 238);
  --lightgrey: rgb(164, 164, 164) !important;
  --darkgrey: rgb(108, 108, 108) !important;
  --darkblue: rgb(16, 99, 173);
  --lightblue: rgb(83, 186, 242);
  --cyan: rgb(27, 173, 162) !important;
  --green: rgb(191, 203, 68);
  --yellow: rgb(255, 211, 41);
  --orange: rgb(255, 154, 30);
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: TeleGroteskNextRegular !important;
  background-color: var(--white);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.router-view {
  margin-top: 0 vh;
  min-height: 80vh;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
