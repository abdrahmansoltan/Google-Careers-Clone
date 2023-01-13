import getJobs from "@/api/getJobs";
import { actions, mutations, state } from "@/store";

jest.mock("@/api/getJobs"); // must be outside any suit

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toBe(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      const data = ["job 1", "job 2"];
      mutations.RECEIVE_JOBS(state, data);
      expect(state).toEqual({ jobs: ["job 1", "job 2"] });
    });
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
    it("makes request to fetch jobs", async () => {
      const context = {
        commit: jest.fn(), // create a jest-mock-function named "commit"
      };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("send message to save received jobs in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
  });
});
