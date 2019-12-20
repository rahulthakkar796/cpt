<template>
  <div v-if="$store.state.myPosts.length==0">
    <center>
      <h2 class="headline white--text">No Posts available to show</h2>
      <v-btn dark outline class="mb-2 mt-4" @click="dialog=!dialog">
        <v-icon left>add</v-icon>
        <span>Create Your first post</span>
      </v-btn>
    </center>
    <v-layout row wrap justify-center>
      <v-flex xs8 lg6 md8 sm8>
        <v-dialog v-model="dialog" light max-width="400px">
          <v-card light class="pa-4" style="border-radius:8px">
            <v-card-title>
              <h2 class="headline">Create Post</h2>
            </v-card-title>
            <v-form>
              <v-text-field v-model="title" outline label="Enter title" required></v-text-field>
              <v-text-field v-model="url" outline label="Enter Image URL" required></v-text-field>
              <v-textarea v-model="desc" outline label="Enter description" auto-grow rows="1"></v-textarea>
            </v-form>
            <v-card-actions>
              <v-btn dark @click="create">create</v-btn>
              <v-btn dark @click="dialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
  <div v-else-if="$store.state.myPosts.length>0">
    <center>
      <v-btn dark outline class="mb-2" @click="dialog=!dialog">
        <v-icon left>add</v-icon>
        <span>Create new post</span>
      </v-btn>
    </center>
    <v-layout wrap justify-center>
      <v-flex lg6 xs12 md12 sm12>
        <v-card
          dark
          class="ma-2 pa-1"
          style="border-radius:8px"
          v-for="(post,index) in $store.state.myPosts"
          :key="index"
          :to="'singlePost/'+post._id"
        >
          <v-layout row wrap>
            <v-flex xs12 lg12 md12 sm12>
              <h2
                style="word-wrap: break-word;text-align:justify"
                class="headline ma-2"
              >{{post.chartTitle}}</h2>
            </v-flex>
          </v-layout>
          <v-layout fill-height row justify-start wrap class="pa-0 ma-0">
            <v-flex xs12 md12 lg12 sm12 class="pa-0 ma-0" shrink>
              <v-card-media>
                <img
                  class="pa-0 ma-0"
                  :src="post.chartImg"
                  height="240px"
                  width="100%"
                  style="border:2px solid black;border-radius:8px"
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

          <v-layout row wrap>
            <v-flex xs12 lg12 md12 sm12>
              <div>
                <p
                  class="body-1 mx-2"
                  style="word-wrap: break-word;text-align:start"
                >{{post.chartDesc}}</p>
              </div>

              <div style="text-align:right">
                <v-icon class="pr-1" style="text-align:right">mode_comment</v-icon>
                <span class="mb-1">{{post.chartComments.length}}</span>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs8 lg6 md8 sm8>
        <v-dialog v-model="dialog" light max-width="400px">
          <v-card light class="pa-4" style="border-radius:8px">
            <v-card-title>
              <h2 class="headline">Create Post</h2>
            </v-card-title>
            <v-form>
              <v-text-field v-model="title" outline label="Enter title" required></v-text-field>
              <v-text-field v-model="url" outline label="Enter Image URL" required></v-text-field>
              <v-textarea v-model="desc" outline label="Enter description" auto-grow rows="1"></v-textarea>
            </v-form>
            <v-card-actions>
              <v-btn dark @click="create">create</v-btn>
              <v-btn dark @click="dialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!-- <v-dialog v-model="showImage" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="showImage = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <img src="https://www.tradingview.com/x/3tRsMeJr" width="100%" height="280px">
    </v-dialog>-->
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
      dialog: false,
      showImage: false,
      url: "",
      desc: "",
      snackbar: false,
      color: "error",
      mode: "",
      timeout: 6000,
      text: ""
    };
  },
  methods: {
    create() {
      axios({
        method: "post",
        url: "http://localhost:3000/api/charts/addChart",
        data: {
          chartTitle: this.title,
          chartImg: this.url,
          chartDesc: this.desc
        },
        withCredentials: true
      })
        .then(res => {
          this.color = "success";
          this.text = "Post created";
          this.snackbar = true;
          this.dialog = false;
          this.$store.dispatch("fetchMyPosts");
        })
        .catch(err => {
          this.color = "red";
          this.text = "Something went wrong";
          this.snackbar = true;
        });
    }
  },
  created() {
    this.$store.dispatch("fetchMyPosts");
  }
};
</script>

