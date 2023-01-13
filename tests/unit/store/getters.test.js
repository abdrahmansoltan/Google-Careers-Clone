import getters from "@/store/getters";

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
