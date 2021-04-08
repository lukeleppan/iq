export const jwtModule = {
  state: () => ({
    currentJWT: "",
  }),
  getters: {
    jwt: (state) => state.currentJWT,
    jwtData: (state, getters) =>
      state.currentJWT ? JSON.parse(atob(getters.jwt.split(".")[1])) : null,
    jwtSubject: (state, getters) =>
      getters.jwtData ? getters.jwtData.sub : null,
  },
  mutations: {
    setJWT(state, jwt) {
      state.currentJWT = jwt;
    },
    logout(state) {
      state.currentJWT = null;
    },
  },
  actions: {
    async fetchJWT({ commit }) {
      const token = localStorage.getItem("id_token");
      commit("setJWT", token);
    },
  },
};
