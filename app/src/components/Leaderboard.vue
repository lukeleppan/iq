<template>
  <div class="leaderboard-main">
    <h1 class="cl-title">Competition Leaderboard</h1>
    <div class="wrapper">
      <div class="loading" v-if="houseRankingLoading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <div v-else-if="housesPoints.length > 0">
        <Chart class="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import { mapGetters } from "vuex";

export default {
  name: "Leaderboard",
  computed: {
    ...mapGetters(["houseRankingLoading", "housesPoints"]),
  },
  components: { Chart },
};
</script>

<style scoped>
.leaderboard-main {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
}
.cl-title {
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
  font-family: Cabin;
  font-weight: bold;
  font-size: 48px;
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
