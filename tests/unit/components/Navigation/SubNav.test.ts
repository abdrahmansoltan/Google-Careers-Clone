import SubNav from "@/components/Navigation/SubNav.vue";
import useConfirmRoute from "@/composables/useConfirmRoute";
import { useFilteredJobs } from "@/store/composables";
import { mount } from "@vue/test-utils";

// mock out libraries to mock functions from them
jest.mock("vuex");
jest.mock("@/composables/useConfirmRoute");
jest.mock("@/store/composables");

// For Typescript to use "mockReturnValue" method
const useFilteredJobsMock = useFilteredJobs as jest.Mock;
const useConfirmRouteMock = useConfirmRoute as jest.Mock;

describe("SubNav", () => {
  const createConfig = () => ({
    // stub for global components
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      useConfirmRouteMock.mockReturnValue(true);
      useFilteredJobsMock.mockReturnValue([{ id: 1 }, { id: 2 }]);

      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("doesn't display job count", () => {
      useConfirmRouteMock.mockReturnValue(false);
      useFilteredJobsMock.mockReturnValue([]);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
