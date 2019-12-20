<template>
  <v-container>
    <center>
      <h1 class="yellow--text">Log in to CPT</h1>
    </center>
    <v-layout row wrap justify-center>
      <v-flex xs8 lg6 md8 sm8>
        <v-dialog v-model="dialog" light max-width="400px">
          <v-card light class="pa-4" style="border-radius:8px">
            <v-card-title>
              <h2 class="headline">Reset Password</h2>
            </v-card-title>
            <v-form ref="reset">
              <v-text-field
                :rules="passRules"
                v-model="newPass"
                outline
                hint="Must contain at least one uppercase,lowercase and number"
                label="Enter new password"
                required
              ></v-text-field>
              <v-text-field v-model="confirmNewPass" outline label="Repeat new password" required></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn dark @click="reset">Submit</v-btn>
              <v-btn dark @click="dialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-form light ref="form">
      <v-container class="my-3">
        <v-layout row justify-center>
          <v-flex xs12 md6 sm12 lg6>
            <v-text-field
              outline
              v-model="email"
              dark
              clearable
              type="email"
              outine
              large
              prepend-icon="email"
              label="Enter email"
              :rules="emailRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 sm12 md6 lg6>
            <v-text-field
              outline
              v-model="password"
              dark
              persistent-hint="true"
              clearable
              type="password"
              box
              outine
              prepend-icon="lock"
              label="Enter password"
              :rules="passRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex sm6 xs6 md4 lg4>
            <center>
              <v-btn
                block
                large
                depressed
                @click="submit"
                hover
                class="loginbtn purple--text"
              >Log In</v-btn>
            </center>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm12 md12 lg2>
            <center>
              <v-btn flat @click="changeComp" medium hover class="yellow--text subheading">Sign up</v-btn>
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
    timeout: 6000,
    text: "",
    dialog: false,
    newPass: "",
    confirmNewPass: "",
    comp: "Signup",
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passRules: [
      v => v.length > 0 || "Password is required",
      v => v.length > 5 || "Password must be greater than or equal to 5"
    ]
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await axios({
          method: "post",
          url: "http://localhost:3000/api/user/signin",
          withCredentials: true,

          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(res => {
            this.text = "Logged In sucessfully";
            this.color = "green";
            this.snackbar = true;
            this.$store.dispatch("fetchProfile");
            this.$cookies.set("signedin", "signedin", "365d");
            //this.$cookies.set("signedin", "signedin", "1h");
            this.$router.push("/coin");
          })
          .catch(err => {
            this.text = "Enter correct details";
            this.color = "red";
            this.snackbar = true;
          });
      } else {
        this.text = "Enter correct details";
        this.color = "red";
        this.snackbar = true;
      }
    },
    reset() {
      if (this.$refs.reset.validate()) {
        if (this.confirmNewPass === this.newPass) {
        } else {
          this.text = "Password do not match";
          this.color = "red";
          this.snackbar = true;
        }
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
.loginbtn {
  background: linear-gradient(
    to right,
    rgba(252, 234, 187, 1) 0%,
    rgba(251, 223, 147, 1) 0%,
    rgba(248, 181, 0, 1) 100%
  );
}
.otherbtn {
  background: linear-gradient(
    to right,
    rgba(252, 234, 187, 1) 0%,
    rgba(251, 223, 147, 1) 0%,
    rgba(248, 181, 0, 1) 100%
  );
  border-radius: 8px;
}
</style>
