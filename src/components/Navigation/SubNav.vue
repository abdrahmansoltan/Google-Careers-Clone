<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage" data-test="job-count">
        <font-awesome-icon icon="search" class="mr-3" />
        <span>
          <span class="text-brand-green-1">
            {{ filteredJobsByOrganization.length }}
          </span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { FILTERED_JOBS_BY_ORGANIZATION } from "@/store/constants";
import { mapGetters } from "vuex";

export default {
  name: "SubNav",
  computed: {
    ...mapGetters({
      filteredJobsByOrganization: FILTERED_JOBS_BY_ORGANIZATION,
    }),
    onJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
