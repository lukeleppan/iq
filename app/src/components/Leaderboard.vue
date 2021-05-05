<template>
  <div class="leaderboard-main">
    <h1>Competition Leaderboard</h1>
    <div class="wrapper">
      <div class="loading" v-if="loading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="chart" v-else-if="rows.length > 0">
        <Chart rows="rows" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import axios from "axios";
export default {
  name: "Leaderboard",
  data() {
    return {
      loading: false,
      rows: [],
    };
  },
  components: { Chart },
  mounted() {
    this.getHouseLeaderboard();
  },
  methods: {
    getHouseLeaderboard() {
      this.loading = false;
      const { VUE_APP_API_URL } = process.env;
      axios({
        method: "get",
        baseURL: VUE_APP_API_URL,
        url: "/api/leaderboard/houses",
      })
        .then((res) => {
          this.rows = res.data.rows;
          this.loading = false;
        })
        .catch((error) => {
          if (error) {
            this.$router.replace("/");
          }
        });
    },
  },
};
</script>

<style scoped>
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
