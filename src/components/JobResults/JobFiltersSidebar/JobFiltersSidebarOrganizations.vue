<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrganizations"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              :data-test="organization"
              @change="selectOrganizations"
            />
            <label :for="organization" data-test="organization">
              {{ organization }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script>
import Accordion from "@/components/Common/Accordion.vue";
import {
  ADD_SELECTED_ORGANIZATIONS,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: { Accordion },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapGetters({
      uniqueOrganizations: UNIQUE_ORGANIZATIONS,
    }),
  },
  methods: {
    ...mapMutations({
      addSelectedOrganizations: ADD_SELECTED_ORGANIZATIONS,
    }),
    selectOrganizations() {
      this.addSelectedOrganizations(this.selectedOrganizations);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
