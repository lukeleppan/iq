<template>
  <div class="main">
    <h1>A New Problem will arrive tomorrow at 15:00.</h1>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "CountDown",
  data() {
    return {
      displayDays: 0,
      diplayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0,
    };
  },
  mounted() {
    this.showRemaining();
  },
  computed: {
    ...mapGetters(["openDate"]),
    seconds: () => 1000,
    minutes() {
      return this.seconds * 60;
    },
    hours() {
      return this.minutes * 60;
    },
    days() {
      return this.hours * 24;
    },
    end() {
      return new moment(this.openDate);
    },
  },
  methods: {
    formatNum: (num) => (num < 10 ? "0" + num : num),

    showRemaining() {
      const timer = setInterval(() => {
        const duration =
          this.end.toDate().getTime() -
          moment()
            .toDate()
            .getTime();

        if (duration < 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(duration / this.days);
        const hours = Math.floor(duration / this.days / this.hours);
        const minutes = Math.floor(duration / this.hours / this.minutes);
        const seconds = Math.floor(duration / this.minutes / this.seconds);
        this.displayDays = days;
        this.displayHours = hours;
        this.displayMinutes = minutes;
        this.displaySeconds = seconds;
      }, 1000);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 24px;
  margin: 5rem;
}
</style>
