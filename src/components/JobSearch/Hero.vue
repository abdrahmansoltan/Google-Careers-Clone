<template>
  <main class="flex flex-col h-screen">
    <section class="flex flex-col pt-10 pb-20 bg-white">
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

    <Spotlight class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg w-72 bg-brand-gray-2"
        >
          <img :src="img" class="object-contain" />
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>
            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>

          <router-link
            to="/jobs/results"
            class="px-6 pb4 text-sm text-brand-blue-1"
          >
            See jobs
          </router-link>
        </router-link>
      </template>
    </Spotlight>
  </main>
</template>

<script>
import HeadLine from "@/components/JobSearch/HeadLine.vue";
import Spotlight from "@/components/JobSearch/Spotlight.vue";
import JobSearchForm from "./JobSearchForm.vue";
export default {
  name: "Hero",
  components: { HeadLine, JobSearchForm, Spotlight },
  data() {
    return {
      onJobResultsPage: true,
    };
  },
};
</script>
