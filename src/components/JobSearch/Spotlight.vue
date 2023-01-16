<template>
  <ul class="">
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- here, we pass a "spotlight" prop to the parent component that uses this slot -->
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "Spotlight",
  setup() {
    const spotlights = ref([]);

    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const url = `${baseUrl}/spotlights`;
      const response = await axios.get(url);
      spotlights.value = response.data;
    };
    onMounted(getSpotlights);

    return {
      spotlights,
    };
  },
};
</script>
