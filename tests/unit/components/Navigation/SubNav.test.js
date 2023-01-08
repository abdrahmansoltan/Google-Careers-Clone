import SubNav from "@/components/Navigation/SubNav.vue";
import { mount } from "@vue/test-utils";

describe("SubNav", () => {
  const createConfig = (routeName) => ({
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
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
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
