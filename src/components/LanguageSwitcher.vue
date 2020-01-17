<template>
  <!-- vue i18n official changer / icons dont work in select option -->
  <div class="locale-changer mr-2">
    <div
      v-for="(lang, i) in $i18n.availableLocales"
      :key="`Lang${i}`"
      class="row ml-4"
    >
      <a :href="'http://localhost:8080/' + lang">
        <span :class="'flag-icon flag-icon-' + lang" class="col"
      /></a>
    </div>
    <!--<select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in $i18n.availableLocales"
        :key="`Lang${i}`"
        :value="lang"
        >
        {{ lang }}
      </option
      >
    </select>-->
  </div>
</template>

<script>
export default {};
</script>
