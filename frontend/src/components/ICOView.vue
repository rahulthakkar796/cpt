<template>
  <div>
    <v-tabs dark v-model="activeTab" color="transparent" slider-color="white" centered grow>
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>{{ tab.name }}</v-tab>
      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <center>
          <router-view></router-view>
        </center>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: "/onGoingICO",
      tabs: [
        { id: 1, name: "Ongoing", route: "/onGoingICO" },
        { id: 2, name: "Upcoming", route: "/upcomingICO" },
        { id: 3, name: "Ended", route: "/endedICO" }
      ]
    };
  },
  created() {}
};
</script>
<style>
.scroll {
  overflow-x: scroll;
  text-align: justify;
  white-space: pre;
  text-indent: 0px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>



