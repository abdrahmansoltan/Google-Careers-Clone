<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Job view page</h1>
    </template>
  </header-container>
</template>
<script lang="ts">
import HeaderContainer from "@/components/Common/HeaderContainer.vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",
  components: { HeaderContainer },
  setup() {
    const route = useRoute();
    const currentJobId = route.params.id;

    return { currentJobId };
  },
});
</script>
