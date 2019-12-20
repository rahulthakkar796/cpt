<template>
  <div class="hello" ref="printChart">
    <VueTradingView
      :options="{
      symbol: `BINANCE:${this.$route.params.symbol}`,
      autosize: true,
      theme: 'dark',
      style: 2,
      hide_legend: true,
      withdateranges: false,
    }"
    />
    <button @click="print">print chart</button>
    <img :src="outputChart">
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";
import axios from "axios";

export default {
  name: "TV",
  components: {
    VueTradingView
  },
  data() {
    return {
      outputChart: null
    };
  },
  methods: {
    async print() {
      const el = this.$refs.printChart;
      const options = {
        type: "dataURL",
        proxy: "s.tradingview.com",
        useCORS: true
      };
      this.outputChart = await this.$html2canvas(el, options);
    }
  },
  created() {
    //screen.orientation.lock("landscape-primary");
    axios({
      method: "GET",
      url: "http://localhost:3000/api/icos/getIcos",
      withCredentials: true
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
#vue-trading-view {
  height: 87vh;
}
template {
  -webkit-transform: rotate(90deg);
}
</style>
