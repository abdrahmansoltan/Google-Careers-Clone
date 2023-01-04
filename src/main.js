import App from "@/App.vue";
import "@/assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";

// registering search-icon with the library
library.add(faSearch); // register it to be able to use it as :icon="search"

// Registering Global Components
createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
