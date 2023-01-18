<template>
  <hero />
</template>

<script>
import Hero from "@/components/JobSearch/Hero.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: { Hero },
});
</script>
