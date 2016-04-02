(function() {
  'use strict';
  var formatDataObject = function(data){
      data = generateY0(data);
      var formatedData = []
      for(var i = 0; i < data.length; i++){
        formatedData.push([data[i]])
      }
      return formatedData;
  }

  var generateY0 = function(data){
    var y0 = 0.0;
    var x = 0.0
    for(var i = 0; i < data.length; i++){
      data[i]['y'] = data[i].value;
      data[i]['y0'] = y0;
      data[i]['x'] = x;
      y0 += parseFloat(data[i].value);
    }
    return data;
  }

  var generateMarkup = function(container, data, width, height, maskSvg) {
    var markupContainer  = document.querySelector(container),
        legendsContainer = document.createElement("div"),
        legendsList      = document.createElement("ul"),
        shapeFiller        = document.createElement("div"),
        chart            = document.createElement("div");

    chart.setAttribute('class', 'gallery');
    chart.setAttribute('id', 'chart');
    chart.setAttribute('style', 'height:' + height + 'px; width:' + width + 'px');
    markupContainer.appendChild(chart);

    setTimeout(function(){
      shapeFiller.setAttribute('id', 'shape-filler');
      var style = 'background-size:' + width + 'px ' + height + 'px;'
      if(maskSvg)
        style += 'background-image: url(' + maskSvg + ');'
      shapeFiller.setAttribute('style', style);
      chart.appendChild(shapeFiller);
    }, 1);

    legendsList.setAttribute('class', 'shape-filler-legend-container');

    for(var i = 0; i < data.length; i++){

      var legend, legendContainerWrapper, legendContainer, percentContainer, percentNumberContainer;

      legend = document.createElement("li");
      legend.setAttribute('class', 'legend legend-' + i);
      legendContainerWrapper = document.createElement("div");
      legendContainer = document.createElement("span");
      percentContainer = document.createElement("span");
      percentNumberContainer = document.createElement("span");
      legendContainerWrapper.appendChild(legendContainer);
      percentNumberContainer.appendChild(document.createTextNode(parseInt(data[i][0].y * 100) + "% "));
      percentContainer.appendChild(document.createTextNode(data[i][0].label));
      legendContainer.appendChild(percentNumberContainer);
      legendContainer.appendChild(percentContainer);
      legendContainerWrapper.setAttribute('style', 'width:' + (parseInt(width/2)) + 'px ');
      legend.appendChild(legendContainerWrapper);
      if(data[i] && data[i][0].y) legendsList.appendChild(legend);
    }

    chart.appendChild(legendsList);
  };

  window.startShapeFillerChart = function(container, data, config) {
    var m = 1 // number of samples per layer

    var formatedData = formatDataObject(data);

    generateMarkup(container, formatedData, config.width, config.height, config.maskSvg);

    var w   = config.width,
        h   = config.height,
        mx  = m,
        my  = d3.max(formatedData, function(d) {
        return d3.max(d, function(d) {
          return d.y0 + d.y;
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
      };

    var vis = d3.select(container + " #chart")
      .append("svg:svg")
      .attr("width", w)
      .attr("height", h);

    var layers = vis.selectAll("g.layer")
      .data(formatedData)
      .enter().append("svg:g")
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .style("fill", function(d) {
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
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(250)
          .style("fill", config.mouseoverColor);
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .transition()
          .duration(250)
          .style("fill", d.color);
      });

    bars.append("svg:rect")
      .attr("width", x({
        x: 1
      }))
      .attr("x", 0)
      .attr("y", h)
      .attr("height", 0)
      .transition()
      .attr("y", y1)
      .attr("height", function(d) {
        return y0(d) - y1(d);
      })
      .each("end", function() {
        var items = document.querySelectorAll(container + ' .layer .bar rect');
        var height = 0.0;
        for (var i = items.length; i > 0; i--) {
          var idx = i - 1;
          var containerLegend = document.querySelector(container + ' .legend-' + idx);
		  if (containerLegend) containerLegend.setAttribute('style', 'top:' + (parseFloat(items[idx].getBoundingClientRect().top - document.querySelector(container + " .shape-filler-legend-container").getBoundingClientRect().top)  + parseFloat(items[idx].getAttribute('height')) / 2) + 'px;');
        }
      });
  };
})();
