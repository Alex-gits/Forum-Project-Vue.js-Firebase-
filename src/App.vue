<template>
  <div id="app">
    <TheNavBar />
    <div class="container">
      <router-view :key="$route.path" v-show="showPage" @ready="pageReady"/>
      <AppSpinner v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
import AppSpinner from '@/components/AppSpinner'
import NProgress from 'nprogress'

export default {
  components: {
    TheNavBar,
    AppSpinner
  },
  data () {
    return {
      showPage: false
    }
  },
  methods: {
    pageReady () {
      this.showPage = true
      NProgress.done()
    }
  },
  created () {
    NProgress.start()
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      NProgress.start()

      next()
    })
  }
}
</script>

<style>
@import 'assets/css/style.css';
@import '~nprogress/nprogress.css';

#nprogress .bar {
  background: #ff6b6b;
}

</style>
