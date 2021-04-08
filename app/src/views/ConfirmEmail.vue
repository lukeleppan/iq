<template>
  <div>
    <p id="success" v-if="success">Email Verified</p>
    <p id="fail" v-else>Email Verification Failed</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ConfirmEmail",
  data() {
    return {
      success: false,
    };
  },
  beforeCreate() {
    const token = this.$route.params.token;
    axios
      .post("http://localhost:5000/api/users/confirm/" + token)
      .then((res) => {
        console.log(res);
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

<style></style>
