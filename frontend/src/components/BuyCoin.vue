<template>
  <div class="my-2">
    <v-form ref="form">
      <v-layout row justify-center>
        <v-flex xs12 md12 sm12 lg8 class="ma-0">
          <v-select
            dense
            :rules="exchangeRules"
            transition="scale-transition"
            dark
            v-model="selctedExchange"
            autocomplete
            color="green"
            :items="exchange"
            label="Exchange"
            class="white--text"
            placeholder="Select an exchange"
            outline
            background-color="green"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 md12 sm12 lg8>
          <v-select
            dense
            :rules="pairRules"
            v-model="selectedCoin"
            transition="scale-transition"
            placeholder="Select a coin & pair"
            dark
            @blur="getPrice"
            :cache-items="true"
            autocomplete
            color="green"
            :menu-props="{ maxHeight: 150 }"
            :items="pairs"
            label="Pair"
            class="white--text"
            outline
            background-color="green"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex block xs6 md6 sm6 lg4 class="mr-1">
          <v-text-field
            outline
            :rules="priceRules"
            dark
            type="number"
            color="green"
            label="Price"
            ref="price"
            :value="priceOfCoin"
            background-color="green"
          >45</v-text-field>
        </v-flex>
        <v-flex xs6 md6 sm6 lg4 class="ml-1">
          <v-text-field
            dark
            v-model="qty"
            :rules="qtyRules"
            type="number"
            label="Amount bought"
            background-color="green"
            color="green"
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
              :rules="dateRules"
              v-model="date"
              outline
              color="green"
              dark
              background-color="green"
              label="Pick a purchase date"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" color="green" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="green" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="green" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 sm12 md12 lg8>
          <v-btn
            block
            dark
            color="green"
            bottom
            depressed
            @click="createBuyPortfolio"
          >Add transaction</v-btn>
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
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import AsyncComputed from "vue-async-computed";
export default {
  data() {
    return {
      snackbar: false,
      color: "error",
      mode: "",
      timeout: 6000,
      text: "",
      selectedCoin: "",
      priceOfCoin: 0,
      qty: 0,
      USDPrice: 0,
      INRPrice: 0.0,
      selctedExchange: "",
      exchange: ["Binance", "Bitfinex", "Bitbns"],
      pairs: [],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      exchangeRules: [v => !!v || "Please select Exchange"],
      pairRules: [v => !!v || "Please select Pair"],
      priceRules: [v => !!v || "Price shouldn't be empty"],
      qtyRules: [v => !!v || "Quantity shouldn't be empty"],
      dateRules: [v => !!v || "Please select date"]
    };
  },
  methods: {
    getPrice() {
      this.$store.state.symbols[0].filter(symbol => {
        if (symbol[0] == this.selectedCoin) {
          this.priceOfCoin = Number(symbol[1]);
          //this.$refs.price.value = Number(symbol[1]);
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
    async createBuyPortfolio() {
      if (this.$refs.form.validate()) {
        await this.toUSD();
        console.log(this.selctedExchange);

        try {
          await axios({
            method: "post",
            url: "http://localhost:3000/api/portfolio/update",
            data: {
              coins: [
                {
                  coin: this.selectedCoin,
                  coinQty: this.qty,
                  buyPrice: this.INRPrice,

                  buyDate: "03/20/1998",
                  exchange: this.selctedExchange
                }
              ]
            },
            withCredentials: true
          });
          this.snackbar = true;
          this.text = "Transaction added to portfolio";
          this.color = "green";

          this.$router.push("/portfolioView");
        } catch (err) {
          // .then(res => {
          //   this.text = "Transaction added to portfolio";
          //   this.color = "green";
          //   this.snackbar = true;
          //   this.$router.push("/portfolioView");
          // })
          console.log(err.stack);
        }
      }
      //  else{
      //       this.text = "Enter correct details";
      //       this.color = "red";
      //       this.snackbar = true;
      // }
    }
  },
  asyncComputed: {
    async getSymbols() {
      console.log(this.$store.state.coinDetails);
      this.$store.state.coinDetails[0].filter(symbol => {
        //console.log("hm");
        if (symbol[0][1] != "lol" && symbol[0][1] != "0.00000000") {
          this.pairs.push(symbol[0]);
        }
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchData");
    this.$store.dispatch("fetchDetail");
  }
};
</script>
<style scoped>
.bodrer {
  outline-color: green;
  border-color: green;
}
</style>
