<template>
  <accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in uniqueJobTypes"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              :data-test="jobType"
              @change="selectJobTypes"
            />
            <label :for="jobType" data-test="job-type">
              {{ jobType }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script>
import Accordion from "@/components/Common/Accordion.vue";
import { ADD_SELECTED_JOB_TYPES, UNIQUE_JOB_TYPES } from "@/store/constants";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: { Accordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapGetters({
      uniqueJobTypes: UNIQUE_JOB_TYPES,
    }),
  },
  methods: {
    ...mapMutations({
      addSelectedJobTypes: ADD_SELECTED_JOB_TYPES,
    }),
    selectJobTypes() {
      this.addSelectedJobTypes(this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
