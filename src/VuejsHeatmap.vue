<template>
<div class="vuejs-heatmap"></div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import * as d3 from 'd3'
import { calendarHeatmap } from './calendar-heatmap.js'

export default {
  props: ['entries', 'colorRange', 'tooltipEnabled', 'tooltipUnit'],
  name: 'vuejs-heatmap',
  mounted() {
    this.renderHeatMap()
  },
  watch: {
    entries: function() {
      this.renderHeatMap()
    }
  },
  methods: {
    renderHeatMap() {
      let entries = this.entries
        if(!entries) {
          entries = [{"id":391,"counting":2070,"created_at":"2017-06-21"},{"id":875,"counting":3493,"created_at":"2017-06-22"},{"id":1381,"counting":3207,"created_at":"2017-06-23"},{"id":1896,"counting":3199,"created_at":"2017-06-24"},{"id":2416,"counting":3121,"created_at":"2017-06-25"}]
        }

        let colorRange = this.colorRange
        if(!colorRange) {
          colorRange = ['#c9ecec', '#09b3af']
        }

        let tooltipEnabled = this.tooltipEnabled
        if(!tooltipEnabled) {
          tooltipEnabled = true
        }

        let tooltipUnit = this.tooltipUnit
        if(!tooltipUnit) {
          tooltipUnit = 'Stars'
        }


        let now = moment().endOf('day').toDate()
        let yearAgo = moment().startOf('day').subtract(1, 'year').toDate()

        let chartData = d3.time.days(yearAgo, now).map((dateElement) => {
          return {
            date: dateElement,
            count: ((dateElement) => {
              let heatmapEntry = _.find(entries, {created_at: moment(dateElement).format('YYYY-MM-DD')})
              if(!heatmapEntry) {
                return 0
              } else {
                return heatmapEntry.counting
              }
            })(dateElement)
          }
        })

        let heatmap = calendarHeatmap.init()
                    .data(chartData)
                    .selector('.vuejs-heatmap')
                    .tooltipEnabled(tooltipEnabled)
                    .colorRange(colorRange)
                    .tooltipUnit(tooltipUnit)
        heatmap()  // render the chart
    }
  }
}
</script>

<style>
.vuejs-heatmap text.month-name,
.vuejs-heatmap text.calendar-heatmap-legend-text,
.vuejs-heatmap text.day-initial {
  font-size: 10px;
  fill: inherit;
  font-family: Helvetica, arial, 'Open Sans', sans-serif;
}
.vuejs-heatmap rect.day-cell:hover {
  stroke: #555555;
  stroke-width: 1px;
}
.vuejs-heatmap .day-cell-tooltip {
  position: absolute;
  z-index: 9999;
  padding: 5px 9px;
  color: #bbbbbb;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  text-align: center;
}
.vuejs-heatmap .day-cell-tooltip > span {
  font-family: Helvetica, arial, 'Open Sans', sans-serif
}
.vuejs-heatmap .calendar-heatmap {
  box-sizing: initial;
}
</style>
