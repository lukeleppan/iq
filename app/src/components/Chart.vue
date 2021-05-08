<template>
  <div class="chart-wrapper">
    <canvas id="houses-chart" height="500px"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  name: "Chart",
  props: {
    points: {
      type: Array,
    },
    chartOptions: {
      type: Object,
    },
  },
  mounted() {
    Chart.register(...registerables);
    const ctx = document.getElementById("houses-chart").getContext("2d");
    const data = {
      type: "bar",
      data: {
        labels: ["Dalberg", "Savory", "Hurley"],
        datasets: [
          {
            label: "Points",
            data: this.points,
            backgroundColor: [
              "rgb(255, 50, 50)",
              "rgb(70, 70, 255)",
              "rgb(0, 0, 0)",
            ],
          },
        ],
      },
      options: {
        aspectRatio: 1.2,
        scales: {
          y: {
            display: false,
          },
          x: {
            ticks: {
              font: {
                family: "Cabin",
                weight: "bold",
                size: 20,
              },
            },
            grid: {
              display: false,
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 5,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "House Rankings",
            font: {
              family: "Cabin",
              weight: "bold",
              size: 28,
            },
            padding: {
              top: 20,
              bottom: 0,
            },
            color: "rgb(40, 40, 40)",
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
        },
      },
    };
    new Chart(ctx, data);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

.chart-wrapper {
  display: flex;
  justify-content: center;
  margin: 10px 16px;
  /* max-height: 500px;
  height: 500px; */
}

#houses-chart {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  max-width: 900px;
  max-height: 500px;
  height: 500px;
}
</style>
