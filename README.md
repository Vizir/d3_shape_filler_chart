[![Code Climate](https://codeclimate.com/github/Vizir/d3_shape_filler_chart/badges/gpa.svg)](https://codeclimate.com/github/Vizir/d3_shape_filler_chart) [![Test Coverage](https://codeclimate.com/github/Vizir/d3_shape_filler_chart/badges/coverage.svg)](https://codeclimate.com/github/Vizir/d3_shape_filler_chart/coverage)


# D3 Shape Filler Chart
D3 Shape Filler Chart is a very simple chart created with a single stacked bar chart inside a SVG shape body.

## Sample

![D3 Shape Filler Chart Sample](https://raw.githubusercontent.com/Vizir/d3_shape_filler_chart/master/docs/d3_shape_filler_chart_sample.png)

![Github mascot Chart Sample](https://raw.githubusercontent.com/Vizir/d3_shape_filler_chart/master/docs/github-icon-sample.png)

Have a look in this [github page](http://vizir.github.io/d3_shape_filler_chart/) to see it in action.

## Getting Started

Download the package, and include the dist/ng-content-editable.min.js file in your page.

Via bower

```shell
bower install d3_shape_filler_chart --save
```

## Usage

Include the Shape Filler's Javascript and Stylesheet in your HTML
```html
<script src="d3_shape_filler_chart.js" type="text/javascript"></script>
<link href="d3_shape_filler_chart.css"  rel="stylesheet" type="text/css">
```

Define HTML div to be the chart container
```html
<div class='shape-filler-chart-container'></div>
```

JavaScript initialize chart
```javascript
<script language="javascript">
  startShapeFillerChart(".shape-filler-chart-container", [
    {
      value: 0.51,
      label: "diesel",
      color: "#83ba43"
    },
    {
      value: 0.21,
      label: "gasoline",
      color: "#4370ba"
    },
    {
      value: 0.28,
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

## Changelog

### Release 0.0.2
* Complete rename lib from "D3 Water Drop Chart" to "D3 Shape Filler Chart", due the lib was already able to work with any kind of SVG shape and not only with Water Drop what's was in the beginning of the lib
* Changed the data object removed the attribute `x` that's must be 0 always, and renamed the attribute `y` to value that's more semantic correct.

You'll need to change the following code to be able to use this new version:

1. Change the function called to initialize the chart, use `startShapeFillerChart` instead of `startWaterDropChart`;
2. The data object must have only the `value` attribute instead of the `y`, and you must delete the `x` attribute, follows bellow the old data object format, and the new one:

Old format
```javascript
    {
      x: 0,
      y: 0.51,
      label: "diesel",
      color: "#83ba43"
    }
```

New format
```javascript
    {
      value: 0.51,
      label: "diesel",
      color: "#83ba43"
    }
```

### Release 0.0.1
* Initial version
