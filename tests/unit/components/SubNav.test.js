import SubNav from "@/components/SubNav.vue";
import { mount } from "@vue/test-utils";

describe("SubNav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      const wrapper = mount(SubNav, {
        // stub for global components
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            // Temporary for TDD
            onJobResultsPage: true,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user is not on job page", () => {
    it("doesn't display job count", () => {
      const wrapper = mount(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            // Temporary for TDD
            onJobResultsPage: false,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
