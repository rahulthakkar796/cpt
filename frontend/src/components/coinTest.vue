<template>
  <div id="Coins">
    <h1>Logged in</h1>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
    >
      <div v-for="(coin, index) in getCoins" :key="index">
        <div id="lolDiv" v-if="coin[1] != 'lol'">
          Symbol: {{coin[0]}}
          <br>
          Price: {{coin[1]}}
          <br>
          Change: {{coin[2]}}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AsyncComputed from "vue-async-computed";
export default {
  data() {
    return {
      allCoins: [], // this will help implementing infinite-stone -- LOL
      busy: false,
      limit: 10
    };
  },
  asyncComputed: {
    async getCoins() {
      this.busy = true;
      let append = this.$store.state.symbols[0].slice(
        this.allCoins.length,
        this.allCoins.length + this.limit
      );
      this.allCoins = this.allCoins.concat(append);
      this.busy = false;
      return this.allCoins;
    }
  },
  methods: {
    loadMore: function() {
      this.getCoins;
    },
    getApi: async function() {
      await this.$store.dispatch("fetchData");
      await this.$store.dispatch("fetchDetail");
    }
  },
  created() {
    this.getApi();
  }
};
</script>

<style scoped>
#Coins {
  margin: auto;
  text-align: center;
}
#lolDiv {
  background-color: grey;
  margin: 20px;
  padding: 10px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0px 10px 10px black;
}
</style>
