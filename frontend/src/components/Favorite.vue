<template>
  <v-container
    v-if="$store.state.getFavs.length===0 || $store.state.getFavs[0].favCoins.length===0 || $store.state.getFavs[0].favCoins[0].length===0 ||  $store.state.getFavs[0].favCoins[0].length===1"
  >
    <center>
      <h1 class="headline white--text">No Favorites found</h1>
    </center>
  </v-container>
  <v-container
    v-else-if="$store.state.getFavs[0].favCoins[0].coin.length!=0"
    class="body pt-0 mt-0 mb-0"
  >
    <center>
      <h1 class="headline white--text">Favorites</h1>
    </center>
    <v-layout row justify-center>
      <v-flex xs12 s6 lg6 md10>
        <v-card
          dark
          flat
          hover
          class="ma-2 pa-1 coinCard"
          v-for="(coin,index) in fetchFav()"
          :key="index"
        >
          <v-layout row justify-center>
            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="caption">symbol</h5>
              </center>
            </v-flex>

            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="caption">Last Price</h5>
              </center>
            </v-flex>
            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="caption">% Change</h5>
              </center>
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-flex xs4 lg4 md4 d-block>
              <center>
                <h5 class="body-2">{{coin[0]}}</h5>
              </center>
            </v-flex>

            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="body-2">{{coin[1] }}</h5>
              </center>
            </v-flex>
            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="body-2 red--text" v-show="coin[2]<0">{{ coin[2] }}</h5>
                <h5 class="body-2 green--text" v-show="coin[2]>0">+{{ coin[2] }}</h5>
              </center>
            </v-flex>
          </v-layout>
          <v-divider class="mt-3 mb-0" dark></v-divider>
          <v-card-actions>
            <v-layout row justify-center class="mt-2">
              <v-flex xs4 md2 lg2 sm2>
                <center>
                  <v-btn small fab @click="removeFav(coin[0])">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </center>
              </v-flex>
              <v-flex xs4 md2 lg2 sm2>
                <center>
                  <v-btn :to="'chartView/'+coin[0]" small fab>
                    <v-icon>insert_chart</v-icon>
                  </v-btn>
                </center>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
  <!-- <v-container>
      <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" fixed dark class="mb-4">
        <v-btn dark class="mb-4" @click="switchRoute">Home
          <v-icon medium>home</v-icon>
        </v-btn>

        <v-btn dark>Favorite
          <v-icon medium>favorite</v-icon>
        </v-btn>
      </v-bottom-nav>
  </v-container>-->
</template>

<script>
import AsyncComputed from "vue-async-computed";
import AOS from "aos";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      bottomNav: 1,
      data: [],
      arr: [],
      snackbar: false,
      color: "",
      mode: "",
      timeout: 1000,
      text: ""
    };
  },
  methods: {
    async getFav() {
      await this.$store.dispatch("fetchDetail");
      await this.$store.dispatch("fetchFavs");
    },
    fetchFav() {
      return this.$store.state.symbols[0].filter(symbol => {
        for (let i = 0; i < this.$store.state.getFavs[0].favCoins.length; i++) {
          if (symbol[0] == this.$store.state.getFavs[0].favCoins[i].coin) {
            return symbol[0].match(this.$store.state.searchCoin.toUpperCase());
          }
        }
      });
      console.log(this.$store.state.getFavs);
    },
    removeFav: function(name) {
      console.log(name);
      axios({
        method: "post",
        url: "http://localhost:3000/api/favCoins/addRemove",

        data: {
          favCoins: [
            {
              coin: name,
              fav: true
            }
          ]
        },
        withCredentials: true
      })
        .then(res => {
          this.$store.dispatch("fetchFavs");
          this.$store.dispatch("fetchDetail");
          console.log(res);
          this.text = res.data.msg;
          this.color = "green";
          this.snackbar = true;
        })
        .catch(err => {
          this.color = "error";
          this.text = res.data.msg;
          this.snackbar = true;
        });
    }
  },

  asyncComputed: {
    async fetchFavs() {
      return this.$store.state.symbols[0].filter(symbol => {
        this.data.data.msg[0].favCoins.forEach(coin => {
          return symbol[0].match(coin.coin);
        });
      });
    }
  },

  //     return this.$store.state.symbols[0].filter(symbol => {
  //       //console.log("done");
  //       for (let i = 0; i < this.$store.state.getFavs[0].favCoins.length; i++) {
  //         if (symbol[0] == this.$store.state.getFavs[0].favCoins[i].coin) {
  //           //console.log(this.$store.state.getFavs[0].favCoins[i].coin);
  //           console.log("hmm:", symbol);
  //           return symbol;

  //           //return symbol[0].match(this.$store.state.searchCoin.toUpperCase());
  //         }
  //       }
  //     });
  //   }

  created() {
    this.getFav();
  },
  mounted() {
    //console.log(fetchFavs);
  }

  // computed: {
  //   color() {
  //     switch (this.bottomNav) {
  //       case 0:
  //         return "blue-grey";
  //       case 1:
  //         return "teal";
  //     }
  //   }
  // },
  // methods: {
  //   switchRoute() {
  //     this.$router.replace({ path: "/" });
  //   }
  // }
};
</script>
<style scoped>
.body {
  background-color: black;
}
</style>
