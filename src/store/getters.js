import {
  FILTERED_JOBS,
  FILTERED_JOBS_BY_JOB_TYPES,
  FILTERED_JOBS_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  [UNIQUE_JOB_TYPES](state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },
  [FILTERED_JOBS_BY_ORGANIZATION](state) {
    if (state.selectedOrganizations.length === 0) return state.jobs;
    return state.jobs.filter((job) =>
      state.selectedOrganizations.includes(job.organization)
    );
  },
  [FILTERED_JOBS_BY_JOB_TYPES](state) {
    if (state.selectedJobTypes.length === 0) return state.jobs; // Guard clause to always include job even if nothing selected to continue filtering
    return state.jobs.filter((job) =>
      state.selectedJobTypes.includes(job.jobType)
    );
  },
  [FILTERED_JOBS](state, getters) {
    // using helper-getters functions
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },

  // --------- HELPER GETTERS ------------ //
  // a getter that is a function that return value, so that we can use it in other getters
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },
};

export default getters;
