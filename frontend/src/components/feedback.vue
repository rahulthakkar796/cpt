<template>
  <div>
    <center>
      <h5 class="white--text headline">Feedback</h5>
    </center>
    <v-form ref="form" light>
      <v-container class="mt-4">
        <v-layout row justify-center>
          <v-flex lg10 xs12 md12 sm12>
            <v-textarea
              auto-grow
              rows="3"
              :rules="feedRules"
              v-model="feedback"
              value="feedback"
              outline
              label="Enter feedback"
              box
              dark
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <center>
            <v-btn @click="submit" large outline dark>Sumbit</v-btn>
          </center>
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
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      color: "error",
      mode: "",
      timeout: 6000,
      text: "",
      feedback: "",
      feedRules: [v => !!v || "Feedback shouldn't be empty"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: "http://localhost:3000/api/user/feedback",
          data: {
            feedback: this.feedback
          },
          withCredentials: true
        })
          .then(res => {
            this.color = "success";
            this.text = "Feedback has been submitted";
            this.snackbar = true;
           
          })
          .catch(err => {
            this.color = "error";
            this.text = "Something went wrong";
            this.snackbar = true;
          });
      } else {
        this.color = "error";
        this.text = "Something went wrong";
        this.snackbar = true;
      }
    }
  }
};
</script>
