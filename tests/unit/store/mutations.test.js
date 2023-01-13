import mutations from "@/store/mutations";

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
