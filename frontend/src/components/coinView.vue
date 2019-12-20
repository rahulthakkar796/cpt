<template>
  <v-container class="mt-0">
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card dark color="purple">
        <v-card-text color="blue">
          please wait..
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout row justify-center>
      <v-flex xs12 s6 lg6 md10>
        <v-card
          dark
          flat
          hover
          class="ma-2 pa-1 coinCard"
          data-aos="slide-up"
          v-for="(coin, index) in fetchCoins"
          v-show="coin[1]!='0.00000000'"
          :key="coin[0]"
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
                <h5 class="body-2">{{ coin[0] }}</h5>
              </center>
            </v-flex>

            <v-flex xs4 lg4 md4>
              <center>
                <h5 class="body-2">{{ coin[1] }}</h5>
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
              <v-flex xs4 md4 lg2 sm4>
                <center>
                  <v-btn small v-if="coin[3]===true" fab @click="addFav(coin[0])">
                    <v-icon color="#C62828">favorite</v-icon>
                  </v-btn>
                  <v-btn small v-else fab @click="addFav(coin[0])">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                </center>
              </v-flex>
              <v-flex xs4 md4 lg2 sm4>
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
import InfiniteLoading from "vue-infinite-loading";
import AsyncComputed from "vue-async-computed";
import AOS from "aos";
export default {
  data: () => ({
    coins: [],
    i: 0,
    color: "error",
    bottom: false,
    endIndex: 11,
    startIndex: 0,
    mode: "",
    top: false,
    expand: true,
    snackbar: false,
    timeout: 1000,
    loading: false,
    text: "",
    bottomNav: 1,
    dialog: false,
    len: 0,
    detail: {
      arr: Array()
    },

    size: "60",
    ticker: Array(),
    fav: Array()
  }),
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 2000);
    },
    bottom(bottom) {
      if (bottom) {
        this.addCoins();
      }
    },
    top(top) {
      if (top) {
        this.minusCoins();
      }
    }
  },

  asyncComputed: {
    // getCoins() {
    //   return this.fetchCoins;
    // },

    async fetchCoins() {
      this.coins = this.$store.state.symbols[0].slice(
        this.startIndex,
        this.endIndex
      );

      return this.coins.filter(symbol => {
        if (this.$store.state.getFavs.length > 0) {
          for (
            let i = 0;
            i < this.$store.state.getFavs[0].favCoins.length;
            i++
          ) {
            if (symbol[0] == this.$store.state.getFavs[0].favCoins[i].coin) {
              symbol[3] = true;
            }
          }
        }
        // if (symbol[0].includes(this.$store.state.getFavs[0].favCoins)) {
        //   symbol[3] = true;
        // }

        return symbol[0].match(this.$store.state.searchCoin.toUpperCase());
      });
    }
    // async fetchFavs() {
    //   this.fetchCoins.filter(symbol => {
    //     for (let i = 0; i < this.$store.state.getFavs[0].favCoins.length; i++) {
    //       if (symbol[0] == this.$store.state.getFavs[0].favCoins[i].coin) {
    //         symbol[3] = true;
    //       }
    //     }
    //   });
    // }
  },

  methods: {
    minusCoins() {
      if (this.startIndex != 0 && this.startIndex > 0) {
        this.startIndex = this.startIndex - 11;
        this.endIndex = this.endIndex - 11;
      }
    },
    addCoins() {
      if (this.endIndex < this.$store.state.symbols[0].length) {
        this.startIndex = this.endIndex;
        this.endIndex = this.startIndex + 11;
      }

      // console.log(
      //   this.$store.state.symbols[0].slice(this.startIndex, this.endIndex)
      // );
    },
    async getAPI() {
      await this.$store.dispatch("fetchDetail");
      await this.$store.dispatch("fetchFavs");
      //console.log(this.coins[0][0].data);
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    topVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = window.pageYOffset == 0;
      return bottomOfPage;
    },

    fetchCoins() {
      return this.$store.state.symbols[0].filter(symbol => {
        return symbol[0].match(this.$store.state.searchCoin.toUpperCase());
      });
    },
    addFav: function(name) {
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
          this.text = res.data.msg;
          this.color = "green";
          this.snackbar = true;
          console.log(res);
        })
        .catch(err => {
          this.text = "Something went wrong";
          this.color = "red";
          this.snackbar = true;
          console.log(err);
        });
    },
    // getCoinDetails: async function() {
    //   await this.getAPI();

    //   const axios = require("axios");
    //   const stringify = require("json-stringify-safe");

    //   let wsCoins = async (req, res) => {
    //     var symbols = Array();
    //     let parsedsymbol = this.coins[this.coins.length - 1];
    //     for (let i in parsedsymbol) {
    //       symbols.push([parsedsymbol[i].symbol, "lol"]);
    //     }

    //     symbols.sort((a, b) => {
    //       if (a[0] === b[0]) {
    //         return 0;
    //       } else {
    //         return a[0] < b[0] ? -1 : 1;
    //       }
    //     });

    //     let socket = new WebSocket(
    //       "wss://stream.binance.com:9443/ws/!ticker@arr"
    //     );
    //     socket.onmessage = function(msg) {
    //       let resp = JSON.parse(msg.data);

    //       for (let i in symbols) {
    //         for (let j in resp) {
    //           if (resp[j].s == symbols[i][0]) {
    //             symbols[i][1] = resp[j].c;
    //             symbols[i][2] = resp[j].p;
    //           }
    //         }
    //         if (symbols[i][1] != "lol") {
    //         }
    //       }
    //     };
    //     this.detail.arr.push(symbols);
    //   };
    //   await wsCoins();
    // },

    storeFav(name) {
      this.fav.push(name);
      console.log(this.fav);
    }
  },

  async created() {
    // this.ticker.pop();
    // let sc = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    // sc.onmessage = msg => {
    //   let resp = JSON.parse(msg.data);
    //   this.ticker = resp;
    // };

    this.getAPI();
    this.dialog = true;

    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
      this.top = this.topVisible();
    });
    //await this.addCoins();
  }
};
</script>

<style>
.fav-btn {
  /* width:30px; */
}
.textColor {
  color: #ffa000;
}
.coinCard {
  border-radius: 8px;
}
</style>
