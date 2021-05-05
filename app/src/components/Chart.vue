<template>
  <div class="chart-main">
    <div class="darberg-bar" :style="{ height: dalbergHeight + 'px' }"></div>
    <div class="savory-bar" :style="{ height: savoryHeight + 'px' }"></div>
    <div class="hurley-bar" :style="{ height: hurleyHeight + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: ["rows"],
  data() {
    return {
      dalbergHeight: 0,
      savoryHeight: 0,
      hurleyHeight: 0,
    };
  },
  mounted() {},
  methods: {
    calcHeight() {
      const dalbergPoints = this.rows[0].points;
      const savoryPoints = this.rows[1].points;
      const hurleyPoints = this.rows[2].points;
      const totalPoints = dalbergPoints + savoryPoints + hurleyPoints;

      this.dalbergHeight = (dalbergPoints / totalPoints) * 650;
      this.savoryHeight = (savoryPoints / totalPoints) * 650;
      this.hurleyHeight = (hurleyPoints / totalPoints) * 650;
    },
  },
};
</script>

<style></style>
