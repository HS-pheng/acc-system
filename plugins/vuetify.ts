import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#3F51B5",
            secondary: "#00BCD4",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
