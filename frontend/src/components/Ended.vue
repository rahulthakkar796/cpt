<template>
  <v-container class="mx-0 px-0">
    <v-layout justify-center row wrap>
      <v-flex lg5 xs12 md8 sm8>
        <v-card
          dark
          class="white--text mb-3 mx-3"
          style="border-radius:8px"
          data-aos="slide-up"
          v-for="(ico,index) in Ended"
          :key="index"
        >
          <v-layout row wrap justify-space-between>
            <v-flex xs6 lg7 md6 sm7>
              <v-card-title>
                <div class="scroll">
                  <div class="headline">{{ico.title}}</div>
                  <div class="pt-1" v-if="ico.platform===null">Platform:Coming soon</div>
                  <div class="pt-1" v-else>Platform:{{ico.platform}}</div>
                  <div
                    class="pt-1"
                    v-if="ico.ico_end!=''&& ico.ico_end!=null"
                  >End date:{{ico.ico_end.slice(0,10)}}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5 lg3 md5 sm5 justify-end>
              <v-avatar size="105px" class="pl-2 mt-1 ml-4 mb-2">
                <v-img
                  alt="No Image available"
                  :src="ico.logo_url"
                  style="border:3px solid black"
                  height="105px"
                  contain
                />
              </v-avatar>
            </v-flex>
            <!-- <v-flex xs5 lg3 md5 sm5 justify-end class="hidden-sm-and-down ml-5 pl-5 d-block">
              <v-img
                class="hidden-sm-and-down mt-1 pl-4"
                :src="ico.logo_url"
                height="110px"
                contain
              ></v-img>
            </v-flex>-->
          </v-layout>
          <v-divider></v-divider>
          <v-card-actions class="pa-3">
            <v-btn :href="ico.profile_url" flat dark>know more</v-btn>
            <v-spacer></v-spacer>
            ({{ico.rating}})
            <v-rating
              readonly
              v-model="ico.rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
            ></v-rating>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AOS from "aos";
import VueContentLoading from "vue-content-loading";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import AsyncComputed from "vue-async-computed";
import axios from "axios";
export default {
  data() {
    return {
      i: 0
    };
  },
  methods: {
    async getData() {
      await this.$store.dispatch("fetchICO");
    }
  },
  components: {
    VclFacebook
  },
  asyncComputed: {
    async filterData() {
      return this.$store.state.ICODetails.filter(ico => {
        return ico.status.match("Closed");
      });
    },
    async Ended() {
      return this.filterData.filter(data => {
        return data.title
          .toUpperCase()
          .match(this.$store.state.searchCoin.toUpperCase());
      });
    }
  },

  created() {
    this.getData();
  }
};
</script>
<style>
</style>


