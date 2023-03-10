import mutations from "@/store/mutations";
import { createDegree, createJob, createState } from "./utils";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const startingState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startingState);
      expect(startingState.isLoggedIn).toBe(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const startingState = createState({ jobs: [] });
      const jobOne = createJob();
      const jobTwo = createJob();
      mutations.RECEIVE_JOBS(startingState, [jobOne, jobTwo]);
      expect(startingState.jobs).toEqual([jobOne, jobTwo]);
    });
  });

  describe("RECEIVE_DEGREES", () => {
    it("receives degrees from API response", () => {
      const startingState = createState({ degrees: [] });
      const degree = createDegree();
      mutations.RECEIVE_DEGREES(startingState, [degree]);
      expect(startingState.degrees).toEqual([degree]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedOrganizations: [] });
      const data = ["Org1", "Org2"];
      mutations.ADD_SELECTED_ORGANIZATIONS(startingState, data);
      expect(startingState.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedJobTypes: [] });
      const data = ["Full-time", "Part-time"];
      mutations.ADD_SELECTED_JOB_TYPES(startingState, data);
      expect(startingState.selectedJobTypes).toEqual([
        "Full-time",
        "Part-time",
      ]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("keeps track of which degrees the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedDegrees: [] });
      const data = ["Master's", "Bachelor's"];
      mutations.ADD_SELECTED_DEGREES(startingState, data);
      expect(startingState.selectedDegrees).toEqual(data);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives search term for skills the user has", () => {
      const startingState = createState({ skillsSearchTerm: "" });
      mutations.UPDATE_SKILLS_SEARCH_TERM(startingState, "Vue");
      expect(startingState.skillsSearchTerm).toEqual("Vue");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const startingState = createState({
        selectedJobTypes: ["Random job type"],
        selectedOrganizations: ["Random organization"],
        selectedDegrees: ["Random degree"],
      });
      mutations.CLEAR_USER_JOB_FILTER_SELECTIONS(startingState);
      expect(startingState.selectedJobTypes).toEqual([]);
      expect(startingState.selectedOrganizations).toEqual([]);
      expect(startingState.selectedDegrees).toEqual([]);
      expect(startingState.skillsSearchTerm).toBe("");
    });
  });
});
