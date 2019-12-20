<template>
  <div class="my-5">
    <v-layout row justify-center>
      <v-flex xs12 md12 sm12 lg8 class="ma-0">
        <v-select
          dense
          transition="scale-transition"
          dark
          autocomplete
          color="red"
          :items="exchange"
          label="Exchange"
          class="white--text"
          box
          placeholder="Select an exchange"
          outline
          background-color="red"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md12 sm12 lg8>
        <v-select
          dense
          autocomplete
          transition="scale-transition"
          :menu-props="{ maxHeight: 150 }"
          @blur="getPrice"
          v-model="selectedCoin"
          placeholder="Select a pair"
          dark
          color="red"
          :items="pairs"
          label="Pair"
          class="white--text"
          box
          outline
          background-color="red"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex block xs6 md6 sm6 lg4 class="mr-1 d-inline-block">
        <v-text-field
          outline
          dark
          color="red"
          type="number"
          ref="price"
          value="0"
          label="Price"
          background-color="red"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 md6 sm6 lg4 class="ml-1">
        <v-text-field
          dark
          type="number"
          label="Amount bought"
          background-color="red"
          color="red"
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
        <v-btn block dark color="red" bottom depressed>Add transaction</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCoin: '',
      priceOfCoin: 0,
      exchange: ['Binance', 'Bitfinex', 'Bitbns'],
      pairs: [],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      
    }
  },
  methods: {
    async getPrice() {
      this.$store.state.symbols[0].filter(symbol => {
        if (symbol[0] == this.selectedCoin) {
          this.priceOfCoin = Number(symbol[1])
          this.$refs.price.value = Number(symbol[1])
        }
      })
    }
  },
  computed: {
    async getSymbols() {
      await this.$store.dispatch('fetchData')

      this.$store.state.coinDetails[0].filter(symbol => {
        if (symbol[1] != 'lol' && symbol[1] != '0.00000000') {
          this.pairs.push(symbol[0])
        }
      })
      await this.$store.dispatch('fetchDetail')
    }
  },
  mounted() {
    this.getSymbols
  }
}
</script>
<style scoped></style>
