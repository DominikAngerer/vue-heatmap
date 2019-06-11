import VuejsHeatmap from './VuejsHeatmap'
export default VuejsHeatmap

import Vue from 'vue'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  methods: {
    test: function (e) {
      console.log('test', e);
    }
  },
  components: { 
    VuejsHeatmap
  }
})
