import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: config.GTAG,
      params: {
        send_page_view: true,
      },
    },
    isEnabled: false,
    useDebugger: false,
  });
});
