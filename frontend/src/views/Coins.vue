<template>
  <div id="coins">
    <ul v-for="(symbol, index) in ticker" :key="index">
      <li>Last price of {{ symbol.s }} is {{ symbol.c }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticker: {}
    };
  },
  created() {
    let sc = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    sc.onmessage = msg => {
      let resp = JSON.parse(msg.data);
      this.ticker = resp;
    };
  }
};
</script>

<style scoped>
#coins {
  background-color: black;
}
li {
  color: lime;
  font-size: 25px;
}
</style>
