<template>
  <v-container class="mb-0 mt-0 pt-0">
    <v-layout row justify-center>
      <v-flex xs12 md12 sm12 lg8 class="mr-1">
        <v-btn block class="pa-2 mr-1 green white--text" style="pointer-events: none;">Buy</v-btn>
      </v-flex>
    </v-layout>
    <keep-alive>
      <component :is="this.$store.state.currentBuySell"></component>
    </keep-alive>
  </v-container>
</template>
<script>
import BuyCoin from "./BuyCoin";
import SellCoin from "./SellCoin";

export default {
  data() {
    return {
      activeBuy: true,
      activeSell: false
    };
  },
  components: {
    BuyCoin: BuyCoin,
    SellCoin: SellCoin
  },
  methods: {
    changetoSell() {
      this.$store.state.currentBuySell = "SellCoin";
      this.activeSell = true;
      this.activeBuy = false;
    },
    changeToBuy() {
      this.$store.state.currentBuySell = "BuyCoin";
      this.activeSell = false;
      this.activeBuy = true;
    }
  },
  created() {
    if (this.activeSell == true) {
      this.activeBuy = false;
    }
    this.$store.state.drawer = false;
    this.$store.dispatch("fetchData");
  }
  // data() {
  //   return {
  //     comp: 'BuyCoin'
  //   }
  // }
};
</script>
<style scoped>
.bg {
  background-color: green;
}
</style>
