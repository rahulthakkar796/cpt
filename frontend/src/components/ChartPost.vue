<template>
  <div v-if="allPosts.length===0">
    <center>
      <h5 class="headline text-capitalize white--text">No posts available</h5>
    </center>
  </div>
  <div v-else>
    <center>
      <h1 class="white--text">Chart View</h1>
    </center>
    <v-layout wrap justify-center>
      <v-flex lg6 xs12 md12 sm12>
        <v-card
          dark
          class="ma-2 pa-1"
          style="border-radius:8px"
          v-for="(post, index) in allPosts"
          :key="index"
          :to="'singlePost/' + post._id"
        >
          <v-layout row wrap>
            <v-flex xs12 lg12 md12 sm12>
              <h2 class="headline ma-2">{{ post.chartTitle }}</h2>
            </v-flex>
          </v-layout>
          <v-layout fill-height row justify-start wrap class="pa-0 ma-0">
            <v-flex xs12 md12 lg12 sm12 class="pa-0 ma-0" shrink>
              <v-card-media>
                <img
                  class="pa-0 ma-0"
                  style="border:2px solid black"
                  :src="post.chartImg"
                  height="240px"
                  width="100%"
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
          <v-layout row wrap class="mb-0">
            <v-flex xs8 lg8 md8 sm8>
              <h4 class="body-2 ma-2 text-capitalize">{{ post.fname }} {{ post.lname }}</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mt-0 pt-0">
            <v-flex xs12 lg12 md12 sm12 class="mt-0 pt-0">
              <p
                class="body-1 mx-2"
                style="overflow-wrap: break-word;text-align:start"
              >{{ post.chartDesc }}</p>

              <div style="text-align:right">
                <v-icon class="pr-1" style="text-align:right">mode_comment</v-icon>
                <span class="mb-1">{{post.chartComments.length}}</span>
              </div>
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
      allPosts: []
    };
  },
  methods: {
    getPost() {
      axios({
        method: "get",
        url: "http://localhost:3000/api/charts/posts",
        withCredentials: true
      }).then(res => {
        console.log(res);
        this.allPosts = res.data.posts;
      });
    }
  },
  created() {
    this.getPost();
  }
};
</script>
