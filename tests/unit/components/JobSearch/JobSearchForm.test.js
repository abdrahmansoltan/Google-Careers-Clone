import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";

jest.mock("vue-router");

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobSearchForm, {
        attachTo: document.body, // to be able to mount it to the DOM so that Buttons can be clicked and submitted
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      // input text
      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");
      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("London");

      // submit form
      const submitButton = wrapper.find("[data-test='submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "London",
        },
      });
    });
  });
});
