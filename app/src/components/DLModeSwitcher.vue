<template>
  <div>
    <i v-if="dark" @click="toggle()" class="fas fa-sun fa-lg"></i>
    <i v-else @click="toggle()" class="fas fa-moon fa-lg"></i>
  </div>
</template>

<script>
export default {
  name: "DLModeSwitcher",
  data() {
    return {
      dark: false,
    };
  },
  methods: {
    toggle() {
      this.dark = !this.dark;
    },
  },
};
</script>

<style scoped>
.fas {
  padding: 15px;
}

div {
  border-radius: 0.5rem;
  background-color: rgb(243, 243, 243);
}

div:hover {
  background-color: rgb(240, 239, 239);
}
</style>
