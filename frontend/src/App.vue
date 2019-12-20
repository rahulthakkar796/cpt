<template>
  <div>
    <v-app>
      <navbar v-show="this.$router.currentRoute.name != 'LogSign'"/>
      <v-dialog dense dark class="transparent ma-0 pa-0" v-model="$store.state.searchDialog">
        <v-text-field
          height="20"
          class="text-capitalize ma-0 pa-0"
          clearable
          v-model="$store.state.searchCoin"
          prepend-icon="search"
          color="yellow"
          outline
        ></v-text-field>
      </v-dialog>
      <v-content class="color">
        <transition name="page" mode="out-in" v-if="$router.currentRoute.name!='coin'">
          <router-view/>
        </transition>
        <router-view v-else-if="$router.currentRoute.name=='coin'"/>
      </v-content>
      <v-bottom-nav
        :value="true"
        app
        color="#37474F"
        :fixed="true"
        dark
        class="hidden-md-and-up"
        v-show="this.$router.currentRoute.name != 'LogSign'"
      >
        <v-btn flat dark exact color="#FFD740" to="/coin">
          Home
          <v-icon medium>home</v-icon>
        </v-btn>

        <v-btn value="favorite" flat exact color="#FFD740" dark to="/favorite">
          Favorite
          <v-icon medium>favorite</v-icon>
        </v-btn>
        <v-btn
          dark
          @click="$store.state.searchDialog = !$store.state.searchDialog"
          v-show="this.$router.currentRoute.name == 'coin' || this.$router.currentRoute.name=='favorite' || this.$router.currentRoute.name=='onGoingICO' || this.$router.currentRoute.name=='upcomingICO' || this.$router.currentRoute.name=='endedICO'"
        >
          Search
          <v-icon medium>search</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
      bottomNav: "",
      search: false
    };
  },
  computed: {
    // color() {
    //   switch (this.bottomNav) {
    //     case 0:
    //       return "blue-grey";
    //     case 1:
    //       return "teal";
    //     case 2:
    //       return "cyan";
    //   }
    // }
  },
  methods: {},

  created() {
    //this.$store.dispatch("fetchData");

    console.log(this.$router.currentRoute.name);
  }
};
</script>
<style>
.color,
body {
  background-color: black;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
