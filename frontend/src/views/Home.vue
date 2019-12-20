<template>
  <div id="Home">
    <v-container>
      <h1>CPT</h1>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm9 md9 lg9>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="fname" :counter="20" label="First Name" required></v-text-field>
            <v-text-field v-model="lname" :counter="20" label="Last Name" required></v-text-field>
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" label="Enter Password"></v-text-field>
            <v-btn block round color="blue" @click="signup">Signup</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <v-snackbar
        v-model="snackbar.show"
        :multi-line="snackbar.multiLine"
        :timeout="snackbar.timeout"
        :top="snackbar.top"
      >
        {{ snackbar.text }}
        <v-btn color="pink" flat @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      snackbar: {
        show: false,
        top: true,
        multiLine: true,
        timeout: 6000,
        text: ""
      },
      valid: true,
      fname: this.$store.state.user.fname,
      lname: this.$store.state.user.lname,
      email: this.$store.state.user.email,
      password: ""
    };
  },
  methods: {
    signup() {
      axios({
        method: "POST",
        url: "https://cptfinal.herokuapp.com/api/user/signup",
        data: {
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          password: this.password
        }
      })
        .then(res => {
          this.snackbar.text = res.data.msg;
          this.snackbar.show = true;
        })
        .catch(err => {
          this.snackbar.text = err.response.data.error;
          this.snackbar.show = true;
        });
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
  padding-bottom: 25px;
}
</style>
