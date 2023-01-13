import JobListings from "@/components/JobResults/JobListings.vue";
import { flushPromises, RouterLinkStub, shallowMount } from "@vue/test-utils";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });
  const createStore = (config = {}) => ({
    // state: {
    //   jobs: Array(15).fill({}),
    //   selectedOrganizations: [],
    // },
    getters: {
      FILTERED_JOBS_BY_ORGANIZATION: [],
    },
    dispatch: jest.fn(),
    ...config, // to overRide these default values if needed or add additional properties
  });
  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const $store = createStore();
      shallowMount(JobListings, createConfig($route, $store));
      expect($store.dispatch).toBeCalledWith("FETCH_JOBS");
    });
  });

  it("creates a job listing for a maximum of 10 received jobs", async () => {
    const queryParams = { page: "1" }; // to have jobListings with length=10
    const $route = createRoute(queryParams);
    const numOfJobsInStore = 15;
    const $store = createStore({
      getters: {
        FILTERED_JOBS_BY_ORGANIZATION: Array(numOfJobsInStore).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined }; // overRide page param
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS_BY_ORGANIZATION: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("does not show link to next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
