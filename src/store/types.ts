import { Degree, Job } from "@/api/types";

interface GlobalState {
  isLoggedIn: boolean;
  jobs: Job[];
  degrees: Degree[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

export default GlobalState;
