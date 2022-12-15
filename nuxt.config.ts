// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      publicWeatherKey: '99410713dc6616c9ae408faa5385b2e6',
      weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
    },
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
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
