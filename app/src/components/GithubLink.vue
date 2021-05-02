<template>
  <div>
    <i @click="open" class="fab fa-github fa-2x"></i>
  </div>
</template>

<script>
export default {
  name: "GithubLink",
  methods: {
    open() {
      window.open("https://github.com/lukeleppan/iq", "_blank");
    },
  },
};
</script>

<style scoped>
.fab {
  padding: 12px;
}

div {
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  background-color: rgb(240, 240, 240);
}

div:hover {
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}
</style>
