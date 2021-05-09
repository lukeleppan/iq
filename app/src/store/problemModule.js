import axios from "axios";
import moment from "moment";

export const problemModule = {
  state: () => ({
    loadingProblem: true,
    activeProblem: null,
    leadingUsers: null,
    openDate: null,
    availablePoints: 0,
  }),
  getters: {
    problem: (state) => state.activeProblem,
    problemID: (state, getters) =>
      state.activeProblem ? getters.problem.problem_id : null,
    problemTitle: (state, getters) =>
      state.activeProblem ? getters.problem.title : null,
    problemDescription: (state, getters) =>
      state.activeProblem ? getters.problem.description : null,
    problemType: (state, getters) =>
      state.activeProblem ? getters.problem.type : null,
    problemDifficulty: (state, getters) =>
      state.activeProblem ? getters.problem.difficulty : null,
    problemImageUrl: (state, getters) =>
      state.activeProblem ? getters.problem.image_url : null,
    problemAuthor: (state, getters) =>
      state.activeProblem ? getters.problem.author : null,
    problemActiveDate: (state, getters) =>
      state.activeProblem ? moment(getters.problem.active_date) : null,
    availablePoints: (state) => state.availablePoints,
    hasData: (state, getters) => (getters.problem ? true : false),
    loadingProblem: (state) => state.loadingProblem,
    openDate: (state) => state.openDate,
    leadingUsers: (state) => state.leadingUsers,
    hasUsers: (state) => state.leadingUsers.length > 0,
  },
  mutations: {
    setActiveProblem(state, problem) {
      state.activeProblem = problem;
    },
    setLeadingUsers(state, users) {
      state.leadingUsers = users;
    },
    setOpenDate(state, date) {
      state.openDate = date;
    },
    setAvailablePoints(state, points) {
      state.availablePoints = points;
    },
    startLoadingProblem(state) {
      state.loadingProblem = true;
    },
    stopLoadingProblem(state) {
      state.loadingProblem = false;
    },
  },
  actions: {
    async socket_fetchProblem({ commit }) {
      const { VUE_APP_API_URL } = process.env;
      commit("startLoadingProblem");
      await axios({
        method: "get",
        baseURL: VUE_APP_API_URL,
        url: "/api/problem/active",
      })
        .then((res) => {
          if (res.data.no_active) {
            commit("setActiveProblem", null);
            commit(
              "setOpenDate",
              moment()
                .add(1, "day")
                .set({ hour: 15, minute: 0, second: 0 })
            );
          } else if (res.data.problem) {
            commit("setActiveProblem", res.data.problem);
            commit("setLeadingUsers", res.data.users);
            commit("setAvailablePoints", res.data.points);
          } else {
            commit("setActiveProblem", null);
            commit("setOpenDate", moment(res.data.active_date));
          }
          commit("stopLoadingProblem");
        })
        .catch((error) => {
          error;
        });
    },
  },
};
