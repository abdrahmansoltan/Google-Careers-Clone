import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import { useUniqueJobTypes } from "@/store/composables";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

jest.mock("vue-router");
jest.mock("vuex");
jest.mock("@/store/composables");

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true, // from accordion component
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useStore.mockReturnValue({ commit: jest.fn() });
    useRouter.mockReturnValue({ push: jest.fn() });

    // here we mount and not shallowMount as we need to render the accordion component
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const jobTypesLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypesLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job types", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();
      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", []);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full-time", "Part-time"]));
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
