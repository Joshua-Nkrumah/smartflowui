<template>
  <div id="google_translate_element"></div>
</template>

<script>
export default {
  name: 'GoogleTranslate',
  mounted() {
    if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,es,de,zh-CN,ja',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for the Google Translate component here */
#google_translate_element {
  margin-top: 10px;
}
</style>
