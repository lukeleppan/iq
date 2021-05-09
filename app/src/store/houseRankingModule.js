import axios from "axios";

export const houseRankingModule = {
  state: () => ({
    housesPoints: [],
    houseRankingLoading: true,
  }),
  getters: {
    housesPoints: (state) => state.housesPoints,
    houseRankingLoading: (state) => state.houseRankingLoading,
  },
  mutations: {
    setHousesPoints(state, points) {
      state.housesPoints = points;
    },
    setHouseRankingLoading(state) {
      state.houseRankingLoading = true;
    },
    notHouseRankingLoading(state) {
      state.houseRankingLoading = false;
    },
  },
  actions: {
    async socket_fetchHouseRanking({ commit }) {
      const { VUE_APP_API_URL } = process.env;
      commit("setHouseRankingLoading");
      axios({
        method: "get",
        baseURL: VUE_APP_API_URL,
        url: "/api/leaderboard/houses",
      })
        .then((res) => {
          commit(
            "setHousesPoints",
            res.data.houses.map((house) => house.points)
          );
          commit("notHouseRankingLoading");
        })
        .catch((error) => {
          error;
        });
    },
  },
};
