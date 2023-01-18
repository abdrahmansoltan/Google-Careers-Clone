import App from "@/App.vue";
import "@/assets/tailwind.css";
import router from "@/router";
import store, { key } from "@/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";

// registering icons with the library
library.add(faSearch, faAngleUp, faAngleDown); // register it to be able to use it as :icon="search"

// Registering Global Components
createApp(App)
  .use(store, key)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
