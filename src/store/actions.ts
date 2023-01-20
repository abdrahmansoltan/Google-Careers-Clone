import getDegrees from "@/api/getDegrees";
import getJobs from "@/api/getJobs";
import {
  FETCH_DEGREES,
  FETCH_JOBS,
  RECEIVE_DEGREES,
  RECEIVE_JOBS,
} from "@/store/constants";
import { Commit } from "vuex";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings);
  },
  [FETCH_DEGREES]: async (context: Context) => {
    const degrees = await getDegrees();
    context.commit(RECEIVE_DEGREES, degrees);
  },
};

export default actions;
