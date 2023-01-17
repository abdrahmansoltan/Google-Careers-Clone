import { Job } from "@/api/types";

interface GlobalState {
  isLoggedIn: boolean;
  jobs: Job[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
}

export default GlobalState;
