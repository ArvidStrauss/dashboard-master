<template>
  <!-- vue i18n official changer / icons dont work in select option -->
  <div class="locale-changer mr-2">
    <span :class="`flag-icon flag-icon-${$i18n.locale}`"></span>
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in $i18n.availableLocales"
        :key="`Lang${i}`"
        :value="lang"
        >{{ lang }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: ["us", "de"]
    };
  }
};
</script>
