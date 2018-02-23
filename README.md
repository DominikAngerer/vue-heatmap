# vue-heatmap

> The github style inspired calendar-heatmap capsuled as an easy to use vue.js component

> A [d3.js](https://d3js.org/) heatmap representing time series data. Inspired by Github's contribution chart

![Reusable D3.js Calendar Heatmap chart](https://raw.githubusercontent.com/DKirwan/calendar-heatmap/develop/example/thumbnail.png)

# [Demo Link](http://www.dominikangerer.com/projects/vuejs-heatmap/)

# How to use:

```
# 1. Install Vuejs heatmap
npm install --save vuejs-heatmap

# 2. Import
import VuejsHeatmap from 'vuejs-heatmap'

# 3. Use
<VuejsHeatmap> </VuejsHeatmap>
```

## Props

### entries `entries`

```
[
  {
    "counting": 2070,
    "created_at": "2018-06-21"
  },
  {
    "counting": 3493,
    "created_at": "2018-06-22"
  }
]
```

### colorRange `color-range`

```
['#c9ecec', '#09b3af']
```

### tooltipEnabled `tooltip-enabled`

```
true/false
```

### tooltipUnit `tooltip-unit`

```
'Star'
```

### locale `locale`

```
{
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  No: 'No',
  on: 'on',
  Less: 'Less',
  More: 'More'
}
```

### max `max`

Any number which should be the max color.

### onClick `on-click`

A function that should be called if clicked, will receive an object as first parameter:

```
{
  count: 123,
  date: DateObject,
  entry: { 
    counting: 123,
    created_at: "2018-01-24"
    // every property you pass in your entries.
  }
}
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Thanks [@DKirwan](https://github.com/DKirwan) for the initial calendar-heatmap.
