// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      publicWeatherKey: '99410713dc6616c9ae408faa5385b2e6',
      weatherUrl:
        'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_branding.scss" as *;',
        },
      },
    },
  },
  css: ['~/assets/weather.scss', 'maz-ui/css/main.css'],
  build: {
    transpile: ['maz-ui'],
  },
});
