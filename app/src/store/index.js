import { createStore } from "vuex";
import { answerModule } from "./answerModule";
import { jwtModule } from "./jwtModule";
import { problemModule } from "./problemModule";
import { houseRankingModule } from "./houseRankingModule";

export default createStore({
  modules: {
    jwt: jwtModule,
    problem: problemModule,
    answer: answerModule,
    houseRanking: houseRankingModule,
  },
});
