import { createStore } from "vuex";
import { jwtModule } from "./jwtModule";

export default createStore({
  modules: {
    jwt: jwtModule,
  },
});
