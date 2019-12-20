import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from 'router'
Vue.use(Vuex)
Vue.use(router)

export default new Vuex.Store({
  state: {
    myPosts: [],
    singlePost: [],
    getFavs: [],
    profile: '',
    getSymbols: [],
    index: 0,
    coinDetails: Array(),
    drawer: false,
    currentComp: 'Login',
    searchDialog: false,
    portfolioCoins: [],
    currentBuySell: 'BuyCoin',
    ICODetails: [],
    onGoingICO: [],
    endedICO: [],
    upcomingICO: [],
    searchCoin: '',
    symbols: Array(),
    resp: []
  },
  // getters:{
  //   getCoinDetails:
  // }
  mutations: {
    fetchPortfolioCoins: (state, data) => {
      if (data.data.portfolio.length > 0) {
        data.data.portfolio[0].coins.sort((a, b) => {
          if (a.coin === b.coin) return 0
          return a.coin < b.coin ? -1 : 1
        })
      }
      state.portfolioCoins = data.data
    },
    fetchdata: (state, data) => {
      if (state.coinDetails.length >= 1) {
        state.coinDetails.pop()
      }
      state.coinDetails.push(data.data.coinData)
    },
    fetchFavs: (state, data) => {
      console.log(data.data.allFavCoins)
      state.getFavs = data.data.allFavCoins
      console.log(state.getFavs)
    },
    fetchDetails: (state, resp) => {
      if (state.symbols.length >= 1) {
        state.symbols.pop()
      }

      let wsCoins = (req, res) => {
        state.symbols.push(state.coinDetails[0])
        //state.symbols.push(state.coinDetails)
        for (let i in state.symbols[0]) {
          for (let j in resp) {
            if (resp[j].s == state.symbols[0][i][0]) {
              state.symbols[0][i][1] = resp[j].c
              state.symbols[0][i][2] = resp[j].P
            }
          }
        }
      }

      //   if (state.symbols[i][1] != 'lol') {
      //   }
      // }
      wsCoins()
    },
    getICO: (state, res) => {
      state.ICODetails = res.data.icoData.results
      console.log(state.ICODetails[0])
    },
    getMyPosts: (state, res) => {
      state.myPosts = res.data.userPosts
      console.log(state.myPosts)
    },
    getSinglePost: (state, res) => {
      state.singlePost = res
      console.log(res)
    },
    getProfile: (state, res) => {
      console.log(res)
      state.profile = res.data.userProfile
    }
  },
  actions: {
    fetchPortfolioCoins(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/portfolio/show',
        withCredentials: true
      }).then(res => {
        context.commit('fetchPortfolioCoins', res)
      })
    },
    fetchData(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/coins/getCoins',
        withCredentials: true
      }).then(res => {
        context.commit('fetchdata', res)
      })
    },
    fetchFavs(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/favCoins/show',
        withCredentials: true
      }).then(res => {
        context.commit('fetchFavs', res)
      })
    },
    fetchDetail(context) {
      this.dispatch('fetchData')
      let resp = []
      const axios = require('axios')
      const stringify = require('json-stringify-safe')

      let socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
      socket.onmessage = function(msg) {
        resp = JSON.parse(msg.data)
        context.commit('fetchDetails', resp)
      }
    },
    fetchICO(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/icos/getIcos',
        withCredentials: true
      }).then(res => {
        context.commit('getICO', res)
      })
    },
    fetchMyPosts(context) {
      axios({
        method: 'get',
        url: ' http://localhost:3000/api/charts/userPosts',
        withCredentials: true
      }).then(res => {
        context.commit('getMyPosts', res)
        console.log(res)
      })
    },
    fetchProfile(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/getProfile',
        withCredentials: true
      })
        .then(data => {
          context.commit('getProfile', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
