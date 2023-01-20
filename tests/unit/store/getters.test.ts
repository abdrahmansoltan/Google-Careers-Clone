import getters from "@/store/getters";
import { createDegree, createJob, createState } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Temporary" }),
        createJob({ jobType: "Full-time" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degree values", () => {
      const degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const state = createState({ degrees });
      const result = getters.UNIQUE_DEGREES(state);
      expect(result).toEqual(new Set(["Master's", "Bachelor's"]));
    });
  });

  // --------- HELPER GETTERS ------------ //
  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user hasn't selected any organizations", () => {
      it("includes job", () => {
        const state = createState({ selectedOrganizations: [] });
        const job = createJob({ organization: "Google" });
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Amazon"],
      });
      const job = createJob({ organization: "Google" });
      const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user hasn't selected any job type", () => {
      it("includes job", () => {
        const state = createState({
          selectedJobTypes: [],
        });
        const job = createJob({ jobType: "Full-time" });
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifies if job is associated with given job types", () => {
      const state = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Part-time" });
      const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user hasn't selected any degree", () => {
      it("includes degree", () => {
        const state = createState({
          selectedDegrees: [],
        });
        const job = createJob({ degree: "Associate" });
        const includeDegree = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
        expect(includeDegree).toBe(true);
      });
    });

    it("identifies if degree is associated with given degree", () => {
      const state = createState({
        selectedDegrees: ["Ph.D", "Associate"],
      });
      const job = createJob({ degree: "Associate" });
      const includeDegree = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
      expect(includeDegree).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization,job type and degrees", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_DEGREE = jest.fn().mockReturnValue(true);
      // getters-object that has all getters and helper-getters-functions needed
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_DEGREE,
      };
      const job = createJob({ organization: "Google", jobType: "Full-time" });
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_DEGREE).toHaveBeenCalledWith(job);
      expect(result).toEqual([job]);
    });
  });
});
