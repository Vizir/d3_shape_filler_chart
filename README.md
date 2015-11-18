# D3 Water Drop Chart
D3 Water Drop Chart is a very simple chart created with a single stacked bar chart inside a Water Drop body.

## Sample

![D3 Water Drop Chart Sample](https://raw.githubusercontent.com/Vizir/d3_water_drop_chart/master/docs/d3_water_drop_chart_sample.png)

Have a look in this [codepen](http://codepen.io/antonioams/pen/MaLdzX) to see it in action.

## Usage

Define HTML chart container
```html
<div class='water-drop-chart-container'></div>
```

JavaScript initialize chart
```javascript
<script language="javascript">
  startWaterDropChart(".water-drop-chart-container", [
    [{
      x: 0,
      y: 0.51,
      y0: 0,
      label: "diesel",
      color: "#83ba43"
    }],
    [{
      x: 0,
      y: 0.21,
      y0: 0.51,
      label: "gasoline",
      color: "#4370ba"
    }],
    [{
      x: 0,
      y: 0.28,
      y0: 0.72,
      label: "ethanol",
      color: "#fbac1c"
    }],
  ], 133, 190, "#6B486B")
</script>
```

## Dependencies

* D3 version 3.5.*
