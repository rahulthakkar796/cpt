import Vue from 'vue'
import Router from 'vue-router'
import CoinView from './views/CoinView.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import LogSign from './views/LogSign.vue'
import Favoriteview from './views/Favoriteview.vue'
import BuySellview from './views/BuySellview.vue'
import coinTest from './components/coinTest.vue'
import PortfolioView from './views/PortfolioView.vue'
import ICOView from './views/ICOView.vue'
import EndedView from './views/Endedview.vue'
import UpcomingView from './views/UpcomingView.vue'
import onGoingView from './views/onGoingView.vue'
import SellView from './views/SellView.vue'
import ChartView from './views/ChartView.vue'
import ChartPostView from './views/ChartPostView.vue'
import MyPostView from './views/MyPostView.vue'
import singlePostView from './views/singlePostView.vue'
import feedbackView from './views/feedbackView.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LogSign',
      component: LogSign,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next()
        } else {
          next({ name: 'coin' })
        }
      }
    },
    {
      path: '/index.html',
      name: 'LogSign',
      component: LogSign
    },
    {
      path: '/coin',
      name: 'coin',
      component: CoinView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/sellCoin/:_id/:coin/:coinQty',
      name: 'sellCoin',
      component: SellView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/chartView/:symbol',
      name: 'chartView',
      component: ChartView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/allPosts',
      name: 'allPosts',
      component: ChartPostView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/myPosts',
      name: 'myPosts',
      component: MyPostView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/singlePost/:_id',
      name: 'singlePost',
      component: singlePostView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },

    {
      path: '/favorite',
      name: 'favorite',
      component: Favoriteview,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/createPortfolio',
      name: 'BuySellview',
      component: BuySellview,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/coinTest',
      name: 'coinTest',
      component: coinTest,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },
    {
      path: '/portfolioView',
      name: 'portfolioView',
      component: () => import('./views/PortfolioView.vue'),
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    },

    {
      path: '/ICOView',
      name: 'ICOView',
      component: ICOView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      },
      children: [
        {
          path: '/endedICO',
          name: 'endedICO',
          component: EndedView
        },
        {
          path: '/onGoingICO',
          name: 'onGoingICO',
          component: onGoingView
        },
        {
          path: '/upcomingICO',
          name: 'upcomingICO',
          component: UpcomingView
        }
      ]
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedbackView,
      beforeEnter: (to, from, next) => {
        if (!$cookies.isKey('signedin')) {
          next({ name: 'LogSign' })
        } else {
          next()
        }
      }
    }
  ]
})
