import getJobs from "@/api/getJobs";
import { actions, getters, mutations, state } from "@/store";

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

  it("stores organizations that the user would like to filter jobs by", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
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

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const state = { selectedOrganizations: [] };
      const data = ["Org1", "Org2"];
      mutations.ADD_SELECTED_ORGANIZATIONS(state, data);
      expect(state).toEqual({ selectedOrganizations: ["Org1", "Org2"] });
    });
  });
});

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATION", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Meta" },
        ],
        selectedOrganizations: ["Google", "Amazon"],
      };
      const result = getters.FILTERED_JOBS_BY_ORGANIZATION(state);
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
      ]);
    });

    describe("when user hasn't select any organizations", () => {
      it("returns all jobs", () => {
        const state = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Meta" },
          ],
          selectedOrganizations: [],
        };
        const result = getters.FILTERED_JOBS_BY_ORGANIZATION(state);
        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Meta" },
        ]);
      });
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
