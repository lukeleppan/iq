<template>
  <div class="main"></div>
</template>

<script>
export default {
  name: "CountDown",
  props: ["year", "month", "date", "hour", "minute", "second", "millisecond"],
  data() {
    return {
      displayDays: 0,
      diplayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0,
    };
  },
  computed: {
    seconds: () => 1000,
    minutes() {
      return this.seconds * 60;
    },
    hours() {
      this.minutes * 60;
    },
    days() {
      return this.hours * 24;
    },
    end() {
      return new Date(
        this.year,
        this.month,
        this.date,
        this.hour,
        this.minute,
        this.second,
        this.millisecond
      );
    },
  },
  methods: {
    formatNum: (num) => (num < 10 ? "0" + num : num),

    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const duration = this.end.getTime() - now.getTime();

        if (duration < 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(duration / this.days);
        const hours = Math.floor(duration / this.days / this.hours);
        const minutes = Math.floor(duration / this.hours / this.minutes);
        const seconds = Math.floor(duration / this.minutes / this.seconds);
        this.displayDays = this.formatNum(days);
        this.displayHours = this.formatNum(hours);
        this.displayMinutes = this.formatNum(minutes);
        this.displaySeconds = this.formatNum(seconds);
      }, 1000);
    },
  },
};
</script>

<style></style>
