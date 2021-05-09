import axios from "axios";
import moment from "moment";

export const answerModule = {
  state: () => ({
    answerable: false,
    cooldown: false,
    cooldownEnd: moment(),
    answerError: false,
    answerErrorText: "",
    correct: false,
  }),
  getters: {
    answerable: (state) => state.answerable,
    cooldown: (state) => state.cooldown,
    cooldownEnd: (state) => moment(state.cooldownEnd).fromNow(),
    correct: (state) => state.correct,
  },
  mutations: {
    setAnswerable(state) {
      state.answerable = true;
    },
    notAnswerable(state) {
      state.answerable = false;
    },
    setCooldown(state) {
      state.cooldown = true;
    },
    notCooldown(state) {
      state.cooldown = false;
    },
    setCooldownEnd(state, date) {
      state.cooldownEnd = date;
    },
    setAnswerError(state) {
      state.answerError = true;
    },
    notAnswerError(state) {
      state.answerError = false;
    },
    setAnswerErrorText(state, error) {
      state.answerErrorText = error;
    },
    setCorrect(state) {
      state.correct = true;
    },
    notCorrect(state) {
      state.correct = false;
    },
  },
  actions: {
    async socket_fetchAnswerable({ commit, getters }) {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "get",
        url: VUE_APP_API_URL + "/api/users/answerable",
        headers: { Authorization: getters.jwt },
      }).then((res) => {
        if (res.data.answerable) {
          commit("notCorrect");
          commit("notCooldown");
        } else if (res.data.cooldown) {
          commit("notCorrect");
          commit("setCooldown");
          commit("setCooldownEnd", moment(res.data.cooldown));
        } else {
          commit("notCooldown");
          commit("setCorrect");
        }
      });
    },
    async answer({ commit, getters }, { vm, answer }) {
      const { VUE_APP_API_URL } = process.env;
      commit("notAnswerError");
      commit("setAnswerErrorText", "");
      if (answer === "") {
        commit("notAnswerError");
        commit("setAnswerErrorText", "");
        return;
      }
      axios({
        method: "post",
        baseURL: VUE_APP_API_URL,
        url: "/api/users/answer",
        headers: { Authorization: getters.jwt },
        data: { answer: answer },
      })
        .then((res) => {
          if (res.data.correct) {
            vm.$socket.client.emit("successful_answer");
          } else {
            vm.$socket.client.emit("failed_answer");
          }
        })
        .catch((error) => {
          error;
        });
    },
  },
};
