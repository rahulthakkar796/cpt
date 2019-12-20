<template>
  <keep-alive>
    <component :is="this.$store.state.currentComp"></component>
  </keep-alive>
</template>

<script>
import Login from "../components/Login";
import Signup from "../components/Signup";
export default {
  components: {
    Login: Login,
    Signup: Signup
  }
};
</script>
