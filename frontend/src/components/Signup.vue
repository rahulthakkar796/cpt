<template>
  <v-container>
    <center>
      <h1 class="yellow--text">Sign up on CPT</h1>
    </center>
    <v-form class="my-4" ref="form">
      <v-container>
        <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              v-model="fname"
              clearable
              box
              outline
              outine
              large
              prepend-icon="create"
              label="Enter Fist name"
              :rules="nameRules"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              outline
              v-model="lname"
              clearable
              box
              outine
              large
              prepend-icon="create"
              label="Enter Last name"
              :rules="nameRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <!-- <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              outline
              clearable
              v-model="mNo"
              type="number"
              box
              outine
              large
              prepend-icon="phone"
              label="Enter Mobile number"
              :rules="phoneRules"
            ></v-text-field>
          </v-flex>
        </v-layout>-->

        <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              outline
              clearable
              v-model="email"
              type="email"
              box
              outine
              large
              prepend-icon="email"
              label="Enter email"
              :rules="emailRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              outline
              v-model="password"
              clearable
              type="password"
              box
              hint="Must contain at least one uppercase,lowercase and number"
              outine
              prepend-icon="lock"
              label="Enter password"
              :rules="passRules"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs10 md6 lg6>
            <v-text-field
              dark
              outline
              v-model="cPassword"
              clearable
              :rules="cpassRules"
              type="password"
              box
              outine
              prepend-icon="lock_outline"
              label="Confirm password"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs6 md4 lg4>
            <center>
              <v-btn block large depressed color="green" @click="submit" class="signupbtn">Sign Up</v-btn>
            </center>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md12 lg12>
            <center>
              <h5 class="body-2 yellow--text">Already have an account?</h5>
            </center>
          </v-flex>
          <v-flex xs12 md12 lg2>
            <center>
              <v-btn flat @click="changeComp" class="yellow--text">Log in</v-btn>
            </center>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-snackbar
      top
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    snackbar: false,
    color: "error",
    mode: "",
    mNo: "",
    timeout: 6000,
    text: "",
    comp: "Login",
    fname: "",
    lname: "",
    email: "",
    password: "",
    cPassword: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    // phoneRules: [
    //   // v => v.length == 10 || "10 digits are required for mobile number",
    //   v =>
    //     /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
    //       v
    //     ) || "Mobile number must be valid"
    // ],
    passRules: [
      v => v.length > 0 || "Password is required",
      v => v.length > 5 || "Password must be greater than or equal to 5"
    ],
    cpassRules: [v => v.length > 0 || "Password is required"],
    nameRules: [v => !!v || "Name is required"]
    // cPassRules: [
    //   v =>  || "Confirm password must match with password"
    // ]
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        if (this.cPassword === this.password) {
          await axios({
            method: "post",
            url: "http://localhost:3000/api/user/signup",

            data: {
              fname: this.fname,
              lname: this.lname,
              email: this.email,
              password: this.cPassword
            }
          })
            .then(res => {
              this.text = "Signed Up successfully";
              this.color = "green";
              this.snackbar = true;
            })
            .catch(err => {
              this.text = "Enter correct details";
              this.color = "red";
              this.snackbar = true;
              console.log(err);
            });
        } else {
          this.text = "Password do not match";
          this.color = "red";
          this.snackbar = true;
        }
      } else {
        this.text = "Enter correct details";
        this.color = "red";
        this.snackbar = true;
      }
    },
    changeComp() {
      this.$store.state.currentComp = this.comp;
      console.log(this.$store.state.currentComp);
    }
  }
};
</script>
<style scoped>
.signupbtn {
  background: linear-gradient(
    to right,
    rgba(252, 234, 187, 1) 0%,
    rgba(251, 223, 147, 1) 0%,
    rgba(248, 181, 0, 1) 100%
  );
}
.body {
  background-color: blueviolet;
}
.otherbtn {
  background: linear-gradient(
    to right,
    rgba(252, 234, 187, 1) 0%,
    rgba(251, 223, 147, 1) 0%,
    rgba(248, 181, 0, 1) 100%
  );
}
</style>
