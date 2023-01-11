import JobListings from "@/components/JobResults/JobListings.vue";
import { flushPromises, shallowMount } from "@vue/test-utils";
import axios from "axios";

// Must be on the same scope as your `import` to be hoisted to the top of the file not the scope
jest.mock("axios"); // mock the axios object and all its methods as jest functions

describe("JobListings", () => {
  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] }); // control the resolved value from the mocked method (get())
    shallowMount(JobListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for each received job", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings);
    await flushPromises(); // axios promise is resolved immediately like using "nextTick()"
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(15);
  });
});
