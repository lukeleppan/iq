<template>
  <div>
    <div id="signed-in" v-if="authenticated">hi</div>
    <div id="ss-buttons" v-else>
      <router-link to="/authentication" class="btn auth">Sign In</router-link>
      <router-link to="/registration" class="btn register">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthCentre",
  data() {
    return {
      authenticated: false,
    };
  },
};
</script>

<style scoped>
ss-buttons {
  border-color: aqua;
}

.auth {
  border-style: solid;
  border-color: black;
  border-width: 2px;
  color: black;
  background-color: white;
}
</style>
