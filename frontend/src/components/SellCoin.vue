<template>
  <div class="my-2 mx-3">
    <v-layout row wrap justify-center class="mb-2">
      <v-flex xs12 lg8 md12 sm12>
        <v-btn class="white--text" style="pointer-events: none;" block color="red">Sell</v-btn>
      </v-flex>
    </v-layout>
    <v-form ref="form">
      <v-layout row justify-center>
        <v-flex xs12 md12 sm12 lg8>
          <v-text-field
            outline
            dark
            disabled
            :value="selectedCoin"
            color="red"
            required
            label="Coin"
            background-color="red"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex block xs6 md6 sm6 lg4 class="mr-1 d-inline-block">
          <v-text-field
            outline
            dark
            @click="getPrice"
            color="red"
            :rules="priceRules"
            type="number"
            :value="priceOfCoin"
            v-model="priceOfCoin"
            ref="price"
            label="Price"
            background-color="red"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md6 sm6 lg4 class="ml-1">
          <v-text-field
            dark
            :rules="qtyRules"
            type="number"
            label="Amount sold"
            background-color="red"
            color="red"
            v-model="qty"
            outline
            class="border"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 sm12 md8 lg8>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              outline
              color="red"
              dark
              :rules="dateRules"
              background-color="red"
              label="Pick a selling date"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" color="red" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="red" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="red" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 sm12 md12 lg8>
          <v-btn block dark color="red" @click="sellCoin" bottom depressed>Add transaction</v-btn>
        </v-flex>
      </v-layout>
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
      selectedCoin: "",
      qty: 0,
      priceOfCoin: 0,
      exchange: ["Binance", "Bitfinex", "Bitbns"],
      pairs: [],
      totalQty: 0,
      livePrice: 0,
      USDPrice: 0,
      INRPrice: 0,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      priceRules: [v => !!v || "Price shouldn't be empty"],
      qtyRules: [v => !!v || "Quantity shouldn't be empty"],
      dateRules: [v => !!v || "Please select date"]
    };
  },
  methods: {
    getPrice() {
      this.$store.state.symbols[0].filter(symbol => {
        if (symbol[0] == this.selectedCoin) {
          this.priceOfCoin = symbol[1];
          //this.$refs.price.value = this.livePrice;
          //console.log(this.livePrice);
          //console.log(this.priceOfCoin);
        }
      });
    },
    toUSD() {
      if (
        !this.selectedCoin.includes("USDT") &&
        this.selectedCoin.includes("ETH")
      ) {
        this.$store.state.symbols[0].filter(symbol => {
          if (symbol[0] == "ETHUSDT") {
            this.USDPrice = symbol[1];
            this.INRPrice = parseFloat(
              this.priceOfCoin * this.USDPrice * 70.011
            ).toFixed(2);
            console.log(this.INRPrice);
            console.log(this.USDPrice);
          }
        });
      } else if (this.selectedCoin.includes("BTC")) {
        this.$store.state.symbols[0].filter(symbol => {
          if (symbol[0] == "BTCUSDT") {
            this.USDPrice = symbol[1];
            this.INRPrice = parseFloat(
              this.priceOfCoin * this.USDPrice * 70.011
            ).toFixed(2);
            console.log(this.INRPrice);
            console.log(this.USDPrice);
          }
        });
      } else if (this.selectedCoin.includes("BNB")) {
        this.$store.state.symbols[0].filter(symbol => {
          if (symbol[0] == "BNBUSDT") {
            this.USDPrice = symbol[1];
            this.INRPrice = parseFloat(
              this.priceOfCoin * this.USDPrice * 70.011
            ).toFixed(2);
            console.log(this.INRPrice);
            console.log(this.USDPrice);
          }
        });
      } else if (this.selectedCoin.includes("PAX")) {
        this.$store.state.symbols[0].filter(symbol => {
          if (symbol[0] == "PAXUSDT") {
            this.USDPrice = symbol[1];
            this.INRPrice = parseFloat(
              this.priceOfCoin * this.USDPrice * 70.011
            ).toFixed(2);
            console.log(this.INRPrice);
            console.log(this.USDPrice);
          }
        });
      } else if (
        this.selectedCoin.includes("USDT") ||
        this.selectedCoin.includes("USDC") ||
        this.selectedCoin.includes("TUSD")
      ) {
        this.$store.state.symbols[0].filter(symbol => {
          if (
            symbol[0].includes("USDT") ||
            symbol[0].includes("TUSD") ||
            (symbol[0].includes("USDC") && symbol[0] == this.selectedCoin)
          ) {
            this.USDPrice = symbol[1];
            this.INRPrice = parseFloat(this.priceOfCoin * 70.011).toFixed(2);
            console.log(this.INRPrice);
            console.log(this.USDPrice);
          }
        });
      }
    },
    sellCoin() {
      this.toUSD();
      console.log(this.qty);
      console.log(this.$route.params.coinQty);
      if (this.qty < this.totalQty) {
        console.log("hmm");
        axios({
          method: "patch",
          url:
            "http://localhost:3000/api/portfolio/sell/" +
            this.$route.params._id,
          data: {
            portfolioMinus: this.qty * this.INRPrice,
            coinQty: this.qty
          },
          withCredentials: true
        })
          .then(res => {
            this.$router.push("/portfolioView");
          })
          .catch(err => {
            console.log(err);
            this.color = "red";
            this.text = "Something went wrong";
            this.snackbar = true;
          });
      } else if (this.qty === this.totalQty) {
        axios({
          method: "post",
          url:
            "http://localhost:3000/api/portfolio/remove/" +
            this.$route.params._id,
          data: {
            portfolioMinus: this.priceOfCoin * this.qty
          },
          withCredentials: true
        })
          .then(res => {
            // alert("Done");
            this.$store.dispatch("fetchPortfolioCoins");
            this.$router.push("/portfolioView");
          })
          .catch(err => {
            this.color = "red";
            this.text = "Something went wrong";
            this.snackbar = true;
            console.log(err);
          });
      } else if (this.qty > this.totalQty) {
        this.color = "red";
        this.text = "Quantity exceeded";
        this.snackbar = true;
      }
    }
  },

  beforeCreate() {
    this.$store.dispatch("fetchDetail");
  },
  created() {
    this.selectedCoin = this.$route.params.coin;
    this.totalQty = this.$route.params.coinQty;
    console.log(this.$route.params._id);
  }
};
</script>
<style scoped></style>
