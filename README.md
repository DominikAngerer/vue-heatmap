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

### entries

```
[
  {
    "counting": 2070,
    "created_at": "2017-06-21",
    "id": 391
  },
  {
    "counting": 3493,
    "created_at": "2017-06-22",
    "id": 875
  },
  {
    "counting": 3207,
    "created_at": "2017-06-23",
    "id": 1381
  },
  {
    "counting": 3199,
    "created_at": "2017-06-24",
    "id": 1896
  },
  {
    "counting": 3121,
    "created_at": "2017-06-25",
    "id": 2416
  }
]
```

### colorRange 

```
['#c9ecec', '#09b3af']
```

### tooltipEnabled

```
true/false
```

### tooltipUnit

```
'Stars'
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
