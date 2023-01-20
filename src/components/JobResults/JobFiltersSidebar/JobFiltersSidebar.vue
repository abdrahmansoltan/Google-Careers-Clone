<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <job-filters-sidebar-checkbox-group
        header="Degrees"
        :unique-values="uniqueDegrees"
        :mutation="ADD_SELECTED_DEGREES"
        data-test="degrees-filter"
      />
      <job-filters-sidebar-checkbox-group
        header="Job Types"
        :unique-values="uniqueJobTypes"
        :mutation="ADD_SELECTED_JOB_TYPES"
        data-test="job-types-filter"
      />
      <job-filters-sidebar-checkbox-group
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :mutation="ADD_SELECTED_ORGANIZATIONS"
        data-test="organizations-filter"
      />
    </section>
  </div>
</template>

<script lang="ts">
import ActionButton from "@/components/Common/ActionButton.vue";
import {
  useUniqueDegrees,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from "@/store/composables";
import {
  ADD_SELECTED_DEGREES,
  ADD_SELECTED_JOB_TYPES,
  ADD_SELECTED_ORGANIZATIONS,
} from "@/store/constants";
import { defineComponent } from "vue";
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueJobTypes = useUniqueJobTypes();
    const uniqueOrganizations = useUniqueOrganizations();
    const uniqueDegrees = useUniqueDegrees();

    return {
      uniqueJobTypes,
      uniqueOrganizations,
      uniqueDegrees,
      ADD_SELECTED_DEGREES,
      ADD_SELECTED_JOB_TYPES,
      ADD_SELECTED_ORGANIZATIONS,
    };
  },
});
</script>
