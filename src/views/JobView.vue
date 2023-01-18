<template>
  <div class="text6xl font-bold">
    <h1>Job view page</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",
  setup() {
    const route = useRoute();
    const currentJobId = route.params.id;

    return { currentJobId };
  },
});
</script>
