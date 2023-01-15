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
import { useUniqueJobTypes } from "@/store/composables";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: { Accordion },
  setup() {
    const router = useRouter();
    const store = useStore();

    const selectedJobTypes = ref([]);
    const uniqueJobTypes = useUniqueJobTypes();

    const selectJobTypes = store.commit(
      ADD_SELECTED_JOB_TYPES,
      selectedJobTypes.value
    );
    router.push({ name: "JobResults" });

    return {
      selectedJobTypes,
      uniqueJobTypes,
      selectJobTypes,
    };
  },
};
</script>
