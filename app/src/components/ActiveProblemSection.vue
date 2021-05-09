<template>
  <div class="main">
    <div class="loading" v-if="loadingProblem">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <section v-else-if="hasData">
      <ProblemDisplay />
      <LeaderUsers />
    </section>
    <div class="count-down" v-else>
      <CountDown />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProblemDisplay from "@/components/ProblemDisplay";
import LeaderUsers from "@/components/LeaderUsers";
import CountDown from "@/components/CountDown";

export default {
  name: "ActiveProblemSection",
  computed: {
    ...mapGetters(["jwt", "hasData", "loadingProblem"]),
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
