<template>
  <div class="text6xl font-bold">
    <h1>Job view page</h1>
  </div>
</template>
<script>
export default {
  name: "JobView",
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
