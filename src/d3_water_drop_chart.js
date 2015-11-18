var generateMarkup = function(container, data) {
  var container = document.querySelector(container);

  var chart = document.createElement("div");
  chart.setAttribute('class', 'gallery');
  chart.setAttribute('id', 'chart');
  container.appendChild(chart);

  var waterDrop = document.createElement("div");
  waterDrop.setAttribute('id', 'water-drop');
  container.appendChild(waterDrop);

  var legendsContainer = document.createElement("div");
  var legendsList = document.createElement("ul");
  legendsList.setAttribute('class', 'water-drop-legend-container');
  for(var i = 0; i < data.length; i++){
    var legend = document.createElement("li");

    legend.setAttribute('class', 'legend legend-' + i);

    var legendContainer = document.createElement("div");
    var percentContainer = document.createElement("span");
    percentContainer.appendChild(document.createTextNode(parseInt(data[i][0].y * 100) + "% "));
    legendContainer.appendChild(percentContainer);
    legendContainer.appendChild(document.createTextNode(data[i][0].label));

    legend.appendChild(legendContainer);

    legendsList.appendChild(legend);
  }
  legendsContainer.appendChild(legendsList);
  container.appendChild(legendsContainer);
}

var startWaterDropChart = function(container, data, width, height, mouseoverColor) {
  var n = data.length, // number of layers
    m = 1, // number of samples per layer
    mouseoverColor = mouseoverColor,
    data = data
  generateMarkup(container, data);

  var p = 20,
    w = width,
    h = height - .5 - p,
    mx = m,
    my = d3.max(data, function(d) {
      return d3.max(d, function(d) {
        return d.y0 + d.y;
      });
    }),
    mz = d3.max(data, function(d) {
      return d3.max(d, function(d) {
        return d.y;
      });
    }),
    x = function(d) {
      return d.x * w / mx;
    },
    y0 = function(d) {
      return h - d.y0 * h / my;
    },
    y1 = function(d) {
      return h - (d.y + d.y0) * h / my;
    },
    y2 = function(d) {
      return d.y * h / mz;
    }; // or `my` to not rescale

  var vis = d3.select("#chart")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h + p);

  var layers = vis.selectAll("g.layer")
    .data(data)
    .enter().append("svg:g")
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .style("fill", function(d, i) {
      return d[0].color;
    })
    .attr("class", function(d, i) {
      return "layer " + "layer-" + i;
    });

  var bars = layers.selectAll("g.bar")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("svg:g")
    .attr("class", "bar")
    .attr("transform", function(d) {
      return "translate(" + x(d) + ",0)";
    })
    .on('mouseover', function(d) {
      d3.select(this)
        .transition()
        .duration(250)
        .style("fill", mouseoverColor);
    })
    .on('mouseout', function(d, i) {
      d3.select(this)
        .transition()
        .duration(250)
        .style("fill", d.color);
    });

  bars.append("svg:rect")
    .attr("width", x({
      x: .9
    }))
    .attr("x", 0)
    .attr("y", h)
    .attr("height", 0)
    .transition()
    .attr("y", y1)
    .attr("height", function(d) {
      return y0(d) - y1(d);
    })
    .each("end", function(){
      var items = document.querySelectorAll('.layer .bar rect');
      var height = 0.0;
      for (var i = items.length; i > 0; i--) {
        var idx = i - 1
        document.querySelector('.legend-' + idx).setAttribute('style', 'top:' + (parseFloat(items[idx].getBoundingClientRect().top) + parseFloat(items[idx].getAttribute('height')) / 2) + 'px;');
        if (idx % 2) {
          document.querySelector('.legend-' + idx).classList.add('odd')
        } else {
          document.querySelector('.legend-' + idx).classList.add('even')
        }
      }
    });
}
