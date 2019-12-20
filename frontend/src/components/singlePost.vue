<template>
  <div>
    <!-- <center>
      <h1 class="white--text">Chart View</h1>
    </center>-->
    <v-layout wrap justify-center>
      <v-flex lg6 xs12 md12 sm12>
        <v-card dark class="ma-2 pa-2" style="border-radius:8px">
          <v-layout fill-height row justify-start wrap class="pa-0 ma-0">
            <v-flex xs12 md12 lg12 sm12 class="pa-0 ma-0" shrink>
              <v-card-media>
                <img
                  class="pa-0 ma-0"
                  :src="singlePost.chartImg"
                  height="240px"
                  width="100%"
                  style="border:2px solid black"
                >
                <!-- <v-img
                  class="pa-0 ma-0"
                  src="https://www.tradingview.com/x/3tRsMeJr/"
                  min-height="240px"
                  min-width="auto"
                  :aspect-ratio="16/9"
                />-->
              </v-card-media>
            </v-flex>
          </v-layout>
          <v-layout row justify-center class="ma-0 pa-0">
            <v-flex xs12 lg12 md12 sm12 class="mt-2">
              <v-textarea
                class="pa-0 ma-0"
                background-color="white"
                v-model="comment"
                box
                :value="comment"
                ref="comment"
                clearable
                light
                label="Enter comment"
                auto-grow
                rows="2"
              ></v-textarea>
            </v-flex>
            <v-btn small @click="postComment" fab color="primary my-4">
              <v-icon small>send</v-icon>
            </v-btn>
          </v-layout>
          <v-layout>
            <v-flex xs12 lg12 md12 sm12 class="px-2">
              <template v-for="(post,index) in singlePost.chartComments">
                <div :key="index" class="mt-1">
                  <h3 class="header text-capitalize">{{post.fname}} {{post.lname}}</h3>
                  <div class="pa-0 ma-0">
                    <p
                      class="body-1"
                      style="overflow-wrap:break-word;text-align:justify"
                    >{{post.comment}}</p>
                    <v-divider class="ma-0 pa-0" dark></v-divider>
                  </div>
                </div>
              </template>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      str: "hahahahahhahahhahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      singlePost: [],
      comment: ""
    };
  },
  methods: {
    getPost() {
      axios({
        method: "get",
        url:
          "http://localhost:3000/api/charts/singlePost/" +
          this.$route.params._id,
        withCredentials: true
      }).then(res => {
        console.log(res);
        this.singlePost = res.data.singlePost;
      });
    },
    postComment() {
      axios({
        method: "post",
        url:
          "http://localhost:3000/api/charts/comment/" + this.$route.params._id,
        data: {
          comment: this.comment
        },
        withCredentials: true
      })
        .then(res => {
          this.getPost();
          this.comment = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getPost();
  }
};
</script>
