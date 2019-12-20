<template>
  <nav>
    <v-toolbar app color="#37474F" flat>
      <v-toolbar-side-icon class="white--text" @click="$store.state.drawer = !$store.state.drawer"></v-toolbar-side-icon>

      <v-toolbar-title
        to="home"
        class="body-2 text-capitalize white--text text--accent-2 text-xs-center"
      >cryptocurrency portfolio tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row justify-end class="hidden-md-and-down">
        <v-flex
          class="ma-0"
          lg1
          v-show="this.$router.currentRoute.path =='/coin' || this.$router.currentRoute.path =='/favorite'"
        >
          <!-- <v-text-field
            v-show="this.$router.currentRoute.name ==='coin'"
            v-model="$store.state.searchCoin"
            dark
            height="20"
            box
            prepend-icon="search"
            color="white"
          ></v-text-field>-->
          <v-btn
            class="mt-2"
            small
            dark
            flat
            @click="$store.state.searchDialog=!$store.state.searchDialog"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex lg1 class="ma-0">
          <v-btn small dark flat class="mt-2" @click="toHome">
            <v-icon>home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex lg1 class="ma-0">
          <v-btn small dark flat class="mt-2" @click="toFav">
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-navigation-drawer
      width="200"
      dark
      class="bgcolor"
      fixed
      floating
      temporary
      app
      v-model="$store.state.drawer"
    >
      <v-layout column align-center class="bgcolor">
        <v-flex xs6 class="mt-3 mb-3">
          <image-input v-model="avatar">
            <div slot="activator">
              <v-avatar
                size="90px"
                class="grey lighten-4 mb-3 pa-3"
                v-ripple
                v-if="$store.state.profile.profilePic==null"
              >
                <v-icon size="90px" light>account_circle</v-icon>
              </v-avatar>
              <v-avatar size="100" v-else-if="$store.state.profile.profilePic!=null" class="mb-3">
                <img height="100px" class width="100px" :src="$store.state.profile.profilePic">
              </v-avatar>
              <center>
                <h3
                  class="header white--text mb-2 text-xs-center text-capitalize"
                >{{$store.state.profile.fname}} {{$store.state.profile.lname}}</h3>
              </center>
            </div>
          </image-input>
          <v-slide-y-transition>
            <div v-if="avatar && saved == false">
              <v-btn class="primary mt-2" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
            </div>
          </v-slide-y-transition>
          <!-- <v-avatar size="90" class="ma-2">
            <v-img :src="link"></v-img>
          </v-avatar>
          <center>
            <span class="subheading white--text mb-2 text-xs-center">Elone Musk</span>
          </center>-->
        </v-flex>
      </v-layout>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          hover
          active-class="black--text"
        >
          <v-list-tile-action hover>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content hover>
            <v-list-tile-title class="align-end">
              {{
              item.title
              }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile hover @click="logout">
          <v-list-tile-action hover>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content hover>
            <v-list-tile-title class="align-end">LogOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import axios from "axios";
import ImageInput from "../components/ImageInput";
export default {
  data() {
    return {
      avatar: null,
      saving: false,
      saved: false,
      drawer: false,
      profile: "",

      items: [
        { title: "Portfolio", icon: "dashboard", route: "/portfolioView" },
        { title: "My Posts", icon: "featured_play_list", route: "/myPosts" },
        { title: "All Posts", icon: "library_books", route: "/allPosts" },
        // { title: "ChatBot", icon: "question_answer", route: "/chatbot" },
        { title: "ICO", icon: "monetization_on", route: "/onGoingICO" },
        { title: "Feedback", icon: "feedback", route: "/feedback" }
      ],
      right: null,
      home: "/",
      link:
        "https://i1.wp.com/smestreet.in/wp-content/uploads/2018/05/Elon-Musk-Tesla.gif?fit=300%2C225&ssl=1"
    };
  },
  components: {
    ImageInput: ImageInput
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true
    }
  },
  methods: {
    toHome() {
      this.$router.push("/coin");
    },
    toFav() {
      this.$router.push("/favorite");
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    logout() {
      this.$cookies.remove("signedin");
      this.$router.push("/");
    }
  },
  created() {
    this.$store.dispatch("fetchProfile");
    console.log("profile" + this.$store.state.profile);
    // axios({
    //   method: "get",
    //   url: "http://localhost:3000/api/user/getProfile",
    //   withCredentials: true
    // })
    //   .then(data => {
    //     console.log("this:", data);
    //     this.profile = data.data.userProfile;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
};
</script>
<style scoped>
.bgcolor {
  background-color: #607d8b;
}
</style>
