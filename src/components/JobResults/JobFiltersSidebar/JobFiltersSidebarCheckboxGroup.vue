<template>
  <accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              :data-test="value"
              @change="selectValues"
            />
            <label :for="value" data-test="value">
              {{ value }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script lang="ts">
import Accordion from "@/components/Common/Accordion.vue";
import { key } from "@/store";
import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "JobFiltersSidebarCheckboxGroup",
  components: { Accordion },
  props: {
    header: {
      type: String,
      required: true,
    },
    uniqueValues: {
      type: [Array, Set] as PropType<string[] | Set<string>>,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore(key); // pass the injection key to the useStore method to retrieve the typed store.

    const selectedValues = ref<string[]>([]);

    const selectValues = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };

    return {
      selectedValues,
      selectValues,
    };
  },
});
</script>
