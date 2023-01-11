import JobListing from "@/components/JobResults/JobListing.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  // Factory Functions
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    ...jobProps,
  });
  const createConfig = (jobProps) => ({
    props: {
      job: {
        ...jobProps,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "AirBnB" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("AirBnB");
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Port Said", "Alexandria"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Port Said");
    expect(wrapper.text()).toMatch("Alexandria");
  });

  it("renders job Qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Develope"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develope");
  });

  it("links to individual job's page", () => {
    const jobProps = createJobProps({
      id: 15,
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    // we must use "findComponent" method as it gets the component as an object which we can assert on its properties instead of the "find" method which gets the RAW HTML DOM Element
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
