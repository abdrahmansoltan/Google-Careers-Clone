import SubNav from "@/components/Navigation/SubNav.vue";
import { mount } from "@vue/test-utils";

describe("SubNav", () => {
  const createConfig = (routeName, $store = {}) => ({
    // stub for global components
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      mocks: {
        // mocks "this.$route object"
        $route: {
          name: routeName,
        },
        $store,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";
      const $store = {
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(SubNav, createConfig(routeName, $store));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("doesn't display job count", () => {
      const routeName = "Home";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
