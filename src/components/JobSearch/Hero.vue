<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20 bg-white">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <head-line />
          <job-search-form />
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            src="https://careers.google.com/jobs/dist/img/assets/hero-04_1x.5377e160fa426c8b388a861f23cc185b.png"
            alt=""
          />
        </div>
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>
  </main>
</template>

<script>
import HeadLine from "@/components/JobSearch/HeadLine.vue";
import JobSearchForm from "./JobSearchForm.vue";
export default {
  name: "Hero",
  components: { HeadLine, JobSearchForm },
  data() {
    return {
      onJobResultsPage: true,
    };
  },
};
</script>
