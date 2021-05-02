<template>
  <div class="main">
    <div class="loading" v-if="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <section v-else-if="hasData">
      <ProblemDisplay
        :problem="problem"
        :points="points"
        @answered="getProblem"
      />
      <LeaderUsers :users="users" />
    </section>
    <div class="count-down" v-else>
      <CountDown :date="openDate" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import moment from "moment";
import ProblemDisplay from "@/components/ProblemDisplay";
import LeaderUsers from "@/components/LeaderUsers";
import CountDown from "@/components/CountDown";

export default {
  name: "ActiveProblemSection",
  data() {
    return {
      loading: false,
      problem: {},
      points: 0,
      users: [],
      openDate: moment(),
    };
  },
  created() {
    this.getProblem();
  },
  computed: {
    ...mapGetters(["jwt"]),
    hasData() {
      return this.problem.problem_id;
    },
  },
  methods: {
    getProblem() {
      this.loading = true;
      const { VUE_APP_API_URL } = process.env;
      axios({
        method: "get",
        baseURL: VUE_APP_API_URL,
        url: "/api/problem/active",
      })
        .then((res) => {
          if (res.data.no_active) {
            this.problem = {};
            this.openDate = moment()
              .add(1, "day")
              .set({ hour: 15, minute: 0, second: 0 });
          } else if (res.data.problem) {
            this.problem = res.data.problem;
            this.users = res.data.users;
            this.points = res.data.points;
          } else {
            this.problem = {};
            this.openDate = moment(res.data.active_date);
          }
          this.loading = false;
        })
        .catch((error) => {
          if (error) {
            this.$router.replace("/");
          }
        });
    },
  },
  components: {
    ProblemDisplay,
    LeaderUsers,
    CountDown,
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 10px;
}

.loading {
  display: flex;
  justify-content: center;
  margin: 100px;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid cornflowerblue;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
