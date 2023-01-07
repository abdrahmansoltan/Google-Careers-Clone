<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20 bg-white">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <head-line />
        </div>
        <div class="col-start-7 col-span-5">5 colum</div>
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>
  </main>
</template>

<script>
import HeadLine from "@/components/HeadLine.vue";
export default {
  name: "Hero",
  components: { HeadLine },
  data() {
    return {
      onJobResultsPage: true,
    };
  },
};
</script>
