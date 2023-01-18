<template>
  <img
    :src="imageLink"
    alt="Profile Image"
    class="w-8 h-8 object-contain rounded-3xl"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://images.generated.photos/EDENxeInP9XQAFYpKVq-tD8fOqdzawrOW7Xmghb-2ic/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzcwMjA2LmpwZw.jpg",
    };
  },
});
</script>
