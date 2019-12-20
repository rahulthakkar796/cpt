<template>
  <div
    v-if="$store.state.portfolioCoins.portfolio.length===0||$store.state.portfolioCoins.portfolio[0].coins.length==0"
  >
    <center>
      <v-layout row justify-center>
        <v-flex xs10 lg12 md10 sm10 justify-center>
          <v-btn outline dark large @click="toCreate">
            <v-icon left>add</v-icon>
            <span>Create Your first portfolio</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </center>
  </div>

  <div v-else-if="$store.state.portfolioCoins.portfolio[0].coins.length>0">
    <v-layout row wrap justify-center>
      <v-flex lg10 xl0 md12 sm12 xs12 justify-center>
        <v-card class="pt-1" color="#546E7A">
          <center>
            <h5 class="ma-2 caption text-uppercase white--text">main portfolio balance</h5>
            <h1
              class="ma-2 px-2 display-2 white--text font-weight-black"
              font-weight-black
            >₹{{totalAll}}</h1>
            <h1
              class="red--text heading"
              v-if="totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal<0"
            >
              <v-icon large class="red--text pa-0">arrow_drop_down</v-icon>
              ₹
              {{parseFloat(totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal).toFixed(2)}}
            </h1>
            <h1
              class="green--text header"
              v-else-if="totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal>0"
            >
              <v-icon large class="green--text">arrow_drop_up</v-icon>
              ₹
              {{parseFloat(totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal).toFixed(2)}}
            </h1>
            <h1
              class="header"
              v-else-if="totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal==0"
            >
              ₹
              {{parseFloat(totalAll-$store.state.portfolioCoins.portfolio[0].portfolioTotal).toFixed(2)}}
            </h1>
          </center>

          <!-- <v-speed-dial
            style="position:absolute"
            v-model="fab"
            absolute
            bottom
            right
            direction="bottom"
          >
            <template v-slot:activator>
              <v-btn style="position:relative" v-model="fab" color="blue darken-2" dark fab>
                <v-icon>account_circle</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
            <v-btn style="position:relative" fab dark small color="green">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-speed-dial>-->
          <v-btn absolute bottom right dark fab @click="toCreate">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>

    <div class="mt-4">
      <v-layout row wrap justify-center>
        <v-flex lg6 xs12 md12 sm10>
          <v-card
            class="ma-3 pa-0 divColor"
            dark
            v-for="(portfolio,index) in $store.state.portfolioCoins.portfolio[0].coins"
            :key="index"
          >
            <v-card-text>
              <v-layout row>
                <v-flex lg6 xs6 md6 sm6>
                  <div>
                    <h3>{{portfolio.coin}}</h3>
                  </div>
                  <div>
                    <h4
                      class="body-1 mb-0 pa-0"
                    >{{portfolio.coinQty}} {{portfolio.coin}}(₹{{(parseFloat(portfolio.coinQty*live[index][3]).toFixed(2))}})</h4>
                  </div>
                </v-flex>

                <v-flex lg6 xs6 md6 sm6>
                  <div class="mb-0 pa-0 toright">
                    <h3
                      class="red--text font-weight-black"
                      v-show="(parseFloat(live[index][3]*portfolio.coinQty-portfolio.totalPrice))<0"
                    >
                      <v-icon class="red--text">arrow_drop_down</v-icon>
                      ₹{{parseFloat(live[index][3]*portfolio.coinQty-portfolio.totalPrice).toFixed(2)}}
                    </h3>
                    <h3
                      class="green--text font-weight-black"
                      v-show="(parseFloat(live[index][3]*portfolio.coinQty-portfolio.totalPrice))>0"
                    >
                      <v-icon class="green--text">arrow_drop_up</v-icon>
                      ₹{{parseFloat(live[index][3]*portfolio.coinQty-portfolio.totalPrice).toFixed(2)}}
                    </h3>
                  </div>
                  <div class="pa-0 mb-0 toright">
                    <h4 class="body-1">
                      ₹{{parseFloat(
                      live[index][3]
                      ).toFixed(2)
                      }}
                    </h4>
                  </div>
                </v-flex>
              </v-layout>
              <!-- <v-divider class="mt-1" dark></v-divider>
              <center>
                <v-card-actions>
                  <v-btn class="ma-0 pa-0" flat>
                    <v-icon class="ma-0 pa-0">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </center>-->
            </v-card-text>
            <v-divider class="ma-0 pa-0" dark></v-divider>
            <v-layout row wrap justify-center class="py-2">
              <v-flex xs6 lg2 md6 sm6>
                <center>
                  <v-btn class="ma-0 my-1" @click="deleteCoin(portfolio._id,portfolio.totalPrice)">
                    <v-icon left>delete</v-icon>Remove
                  </v-btn>
                </center>
              </v-flex>
              <v-flex xs6 lg2 md6 sm6>
                <center>
                  <v-btn
                    class="ma-0 my-1"
                    :to="'sellCoin/'+portfolio._id+'/'+portfolio.coin+'/'+portfolio.coinQty"
                  >
                    <v-icon left>trending_down</v-icon>Sell
                  </v-btn>
                </center>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AsyncComputed from "vue-async-computed";
export default {
  data() {
    return {
      portfolioCoins: [],
      liveCoinPrice: [],
      ETHPrice: "",
      BTCPrice: "",
      BNBPrice: "",
      PAXPrice: "",
      totalAll: "",
      fab: true,
      data: []
    };
  },
  methods: {
    toCreate() {
      this.$router.push("/createPortfolio");
    },
    deleteCoin(id, total) {
      console.log(id + " " + total);
      axios({
        method: "post",
        url: "http://localhost:3000/api/portfolio/remove/" + id,
        data: {
          portfolioMinus: total
        },
        withCredentials: true
      }).then(res => {
        this.$store.dispatch("fetchPortfolioCoins");
      });
    }
  },
  asyncComputed: {
    async liveCoin() {
      if (this.$store.state.portfolioCoins.portfolio[0].coins.length > 0) {
        this.portfolioCoins = this.$store.state.portfolioCoins.portfolio[0].coins;

        let sum = 0;
        let arr = [];

        for (
          let i = 0;
          i < this.$store.state.portfolioCoins.portfolio[0].coins.length;
          i++
        ) {
          this.$store.state.symbols[0].filter(symbol => {
            if (symbol[0].match("ETHUSDT")) {
              this.ETHPrice = symbol[1];
            }
            if (symbol[0].match("BTCUSDT")) {
              this.BTCPrice = symbol[1];
            }
            if (symbol[0].match("BNBUSDT")) {
              this.BNBPrice = symbol[1];
            }
            if (symbol[0].match("PAXUSDT")) {
              this.PAXPrice = symbol[1];
            }

            // if (
            //   symbol[0] ==
            //     this.$store.state.portfolioCoins.portfolio[0].coins[i].coin &&
            //   this.$store.state.portfolioCoins.portfolio[0].coins[
            //     i
            //   ].coin.includes("ETH")
            // ) {
            //   if (symbol[0] == "ETHUSDT") {
            //     let USDPrice = symbol[1];
            //     let INRPrice = this.live[i][1] * USDPrice * 70;
            //     this.symbol.push(INRPrice);
            //     return this.symbol;
            //   }
            // }
            if (
              this.$store.state.portfolioCoins.portfolio[0].coins[i].coin.match(
                symbol[0]
              )
            ) {
              if (
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("ETH") &&
                !this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDT")
              ) {
                // console.log("hm");
                //console.log(symbol);
                let INRPrice = symbol[1] * this.ETHPrice * 70;
                symbol[3] = INRPrice;
                sum +=
                  symbol[3] *
                  this.$store.state.portfolioCoins.portfolio[0].coins[i]
                    .coinQty;
                this.totalAll = parseFloat(sum).toFixed(2);

                this.data[i] = symbol;

                //console.log(this.$store.state.portfolioCoins.portfolio[0].coins);
              } else if (
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("BTC") &&
                !this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDT")
              ) {
                // console.log("hm");
                //console.log(symbol);
                let INRPrice = symbol[1] * this.BTCPrice * 70;
                symbol[3] = INRPrice;
                sum +=
                  symbol[3] *
                  this.$store.state.portfolioCoins.portfolio[0].coins[i]
                    .coinQty;
                this.totalAll = parseFloat(sum).toFixed(2);

                this.data[i] = symbol;

                //console.log(this.$store.state.portfolioCoins.portfolio[0].coins);
              } else if (
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("BNB") &&
                !this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDT")
              ) {
                // console.log("hm");
                //console.log(symbol);
                let INRPrice = symbol[1] * this.BNBPrice * 70;
                symbol[3] = INRPrice;
                sum +=
                  symbol[3] *
                  this.$store.state.portfolioCoins.portfolio[0].coins[i]
                    .coinQty;
                this.totalAll = parseFloat(sum).toFixed(2);

                this.data[i] = symbol;

                //console.log(this.$store.state.portfolioCoins.portfolio[0].coins);
              } else if (
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("PAX") &&
                !this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDT")
              ) {
                // console.log("hm");
                //console.log(symbol);
                let INRPrice = symbol[1] * this.BNBPrice * 70;
                symbol[3] = INRPrice;
                sum +=
                  symbol[3] *
                  this.$store.state.portfolioCoins.portfolio[0].coins[i]
                    .coinQty;
                this.totalAll = parseFloat(sum).toFixed(2);

                this.data[i] = symbol;

                //console.log(this.$store.state.portfolioCoins.portfolio[0].coins);
              } else if (
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDT") ||
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("USDC") ||
                this.$store.state.portfolioCoins.portfolio[0].coins[
                  i
                ].coin.includes("TUSD")
              ) {
                // console.log("hm");
                //console.log(symbol);

                let INRPrice = symbol[1] * 70;

                symbol[3] = INRPrice;
                sum +=
                  symbol[3] *
                  this.$store.state.portfolioCoins.portfolio[0].coins[i]
                    .coinQty;
                this.totalAll = parseFloat(sum).toFixed(2);

                this.data[i] = symbol;

                //console.log(this.$store.state.portfolioCoins.portfolio[0].coins);
              }
            }

            //return this.data;
          });
        }
      }
    },
    async live() {
      return this.data;
    }
    // async sum() {
    //   for (let i = 0; i < this.live.length; i++) {
    //     if (
    //       this.$store.state.portfolioCoins.portfolio[0].coins[i].coin ==
    //       this.live[i][0]
    //     )
    //       console.log(this.live);
    //     this.totalAll +=
    //       this.live[i][3] *
    //       this.$store.state.portfolioCoins.portfolio[0].coins[i].coinQty;
    //   }
    // }

    // async toUSD() {
    //   for (let i = 0; i < this.live.length; i++) {
    //     return this.$store.state.symbols[0].filter(symbol => {
    //       if (this.live[i][0].includes("ETH")) {
    //         if (symbol[0] == "ETHUSDT") {
    //           let USDPrice = symbol[1];
    //           let INRPrice = this.live[i][1] * USDPrice * 70;
    //           this.live[i].push(INRPrice);
    //           return this.live;
    //         }
    //       }
    //     });
    //   }
    // }
    //   // }
    // }
  },
  beforeCreate() {
    this.$store.dispatch("fetchDetail");
    this.$store.dispatch("fetchPortfolioCoins");
  },
  created() {
    // this.portfolioCoins = this.$store.state.portfolioCoins;
    // console.log(this.portfolioCoins);
  }
};
</script>
<style scoped>
.divColor {
  border-radius: 8px;
}
.toright {
  text-align: right;
}
</style>

