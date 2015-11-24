# D3 Water Drop Chart
D3 Water Drop Chart is a very simple chart created with a single stacked bar chart inside a Water Drop body.

## Sample

![D3 Water Drop Chart Sample](https://raw.githubusercontent.com/Vizir/d3_water_drop_chart/master/docs/d3_water_drop_chart_sample.png)

![Github mascot Chart Sample](https://raw.githubusercontent.com/Vizir/d3_water_drop_chart/master/docs/github-icon-sample.png)

Have a look in this [github page](http://vizir.github.io/d3_water_drop_chart/) to see it in action.

## Getting Started

Download the package, and include the dist/ng-content-editable.min.js file in your page.

Via bower

```shell
bower install d3_water_drop_chart --save
```

## Usage

Include the Water Drop's Javascript and Stylesheet in your HTML
```html
<script src="d3_water_drop_chart.js" type="text/javascript"></script>
<link href="d3_water_drop_chart.css"  rel="stylesheet" type="text/css">
```

Define HTML div to be the chart container
```html
<div class='water-drop-chart-container'></div>
```

JavaScript initialize chart
```javascript
<script language="javascript">
  startWaterDropChart(".water-drop-chart-container", [
    {
      x: 0,
      y: 0.51,
      label: "diesel",
      color: "#83ba43"
    },
    {
      x: 0,
      y: 0.21,
      label: "gasoline",
      color: "#4370ba"
    },
    {
      x: 0,
      y: 0.28,
      label: "ethanol",
      color: "#fbac1c"
    }
  ], {
      width: 133,
      height: 190,
      mouseoverColor: "#6B486B",
      maskSvg: "github-icon.svg"
  })
</script>
```

## Dependencies

* D3 version 3.5.*
