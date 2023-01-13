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

export default {
  name: "Spotlight",
  data() {
    return {
      spotlights: [],
    };
  },
  async mounted() {
    const baseUrl = process.env.VUE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;
    const response = await axios.get(url);
    this.spotlights = response.data;
  },
};
</script>
