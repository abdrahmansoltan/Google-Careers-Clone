import { Job } from "@/api/types";
import JobListing from "@/components/JobResults/JobListing.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createJob } from "../../store/utils";

describe("JobListing", () => {
  // Factory Functions
  // const createJobProps = (jobProps = {}) => ({
  //   title: "Vue Developer",
  //   organization: "AirBnB",
  //   ...jobProps,
  // });
  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const job = createJob({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const job = createJob({ organization: "AirBnB" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("AirBnB");
  });

  it("renders job locations", () => {
    const job = createJob({ locations: ["Port Said", "Alexandria"] });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Port Said");
    expect(wrapper.text()).toMatch("Alexandria");
  });

  it("renders job Qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Code", "Develope"],
    });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develope");
  });

  it("links to individual job's page", () => {
    const job = createJob({
      id: 15,
    });
    const wrapper = mount(JobListing, createConfig(job));
    // we must use "findComponent" method as it gets the component as an object which we can assert on its properties instead of the "find" method which gets the RAW HTML DOM Element
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
