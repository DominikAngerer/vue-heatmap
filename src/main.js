// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Heatmap from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: 'calendar-heatmap',
  components: { 
    'calendar-heatmap': Heatmap
  }
})
