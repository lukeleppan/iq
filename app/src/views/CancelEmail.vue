<template>
  <div id="main">
    <div class="wrapper" v-if="success">
      <i class="fas fa-check-circle fa-9x success-icon"></i>
      <p class="success-text">Cancelled</p>
    </div>
    <div class="wrapper" v-else>
      <i class="fas fa-times-circle fa-9x fail-icon"></i>
      <p class="fail-text">Cancel Failed. Try Again Later.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CancelEmail",
  data() {
    return {
      success: false,
    };
  },
  beforeCreate() {
    const { VUE_APP_API_URL } = process.env;
    const token = this.$route.params.token;

    axios
      .post(VUE_APP_API_URL + "/api/users/cancel/" + token)
      .then((res) => {
        if (res.data.success) {
          return (this.success = true);
        }
        return (this.success = false);
      })
      .catch((error) => {
        console.log(error);
        return (this.success = false);
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  color: rgb(34, 168, 0);
  margin: 2rem;
}

.success-text {
  font-size: 25px;
  font-family: Cabin;
  font-weight: bold;
}

.fail-icon {
  color: rgb(255, 69, 69);
  margin: 2rem;
}

.fail-text {
  font-size: 25px;
  font-family: Cabin;
  font-weight: bold;
}

.btn {
  text-decoration: none;
  color: white;
}
</style>
