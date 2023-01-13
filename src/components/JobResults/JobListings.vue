<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
          >
            Previous
          </router-link>
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "@/components/JobResults/JobListing.vue";
import { FETCH_JOBS, FILTERED_JOBS_BY_ORGANIZATION } from "@/store";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "JobListings",
  components: { JobListing },
  computed: {
    ...mapState(["jobs"]),
    ...mapGetters({
      filteredJobsByOrganization: FILTERED_JOBS_BY_ORGANIZATION,
    }),
    currentPage() {
      const pageString = this.$route.query.page || "1";
      return +pageString;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      return previousPage >= 1 ? previousPage : undefined; // check if previous page is >= firstPage(1)
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.filteredJobsByOrganization.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (+pageNumber - 1) * 10;
      const lastJobIndex = +pageNumber * 10;
      return this.filteredJobsByOrganization.slice(firstJobIndex, lastJobIndex);
    },
  },
  mounted() {
    // this.$store.dispatch(FETCH_JOBS);
    this.fetchJobs();
  },
  methods: {
    ...mapActions({
      fetchJobs: FETCH_JOBS,
    }),
  },
};
</script>
