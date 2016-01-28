;(function (window, document) {

  var SUN_RADIUS = 695800;
  var AU = 149597871;

  var width = window.innerWidth - 50;
  var height = window.innerHeight - 50;

  var svg = d3.select('#planets').append('svg')
    .attr('width', width)
    .attr('height', height);

  var container = svg.append('g')
    .attr('class', 'container')
    .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')');

  var ImageWidth = SUN_RADIUS / AU * 3000 * (2.7 / 1.5);
  container.append('svg:image')
    .attr('x', -ImageWidth)
    .attr('y', -ImageWidth)
    .attr('class', 'sun')
    .attr('xlink:href', 'img/sun.png')
    .attr('width', ImageWidth * 2)
    .attr('height', ImageWidth * 2)
    .attr('text-anchor', 'middle');

  var colors = ["#FB1108","#FD150B","#FA7806","#FBE426","#FCFB8F","#F3F5E7","#C7E4EA","#ABD6E6","#9AD2E1","#42A1C1","#1C5FA5", "#172484"];
  var colorScale = d3.scale.linear()
    .domain([2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 14000, 20000, 30000]) // Temperatures
    .range(colors);

  // 这哥们是啥
  var rScale = d3.scale.linear()
    .range([1, 20])
    .domain([0, d3.max(planets, function (d) {return d.Radius; })]);

  //
  var gradientChoice = "Temp";
  createGradients();

  // 画轨道
  var orbitsContainer = container.append('g').attr('class', 'orbitsContainer');
  var orbits = orbitsContainer.selectAll('g.orbit')
    .data(planets).enter().append('ellipse')
    .attr('class', 'orbit')
    .attr('cx', function (d) {return d.cx;})
    .attr('cy', function (d) {return d.cy;})
    .attr('rx', function (d) {return d.major;})
    .attr('ry', function (d) {return d.minor;})
    .style('fill', '#3E5968')
    .style('fill-opacity', 0)
    .style('stroke', 'white')
    .style('stroke-opacity', 0);

  // 画天体
  var planetContainer = container.append('g').attr('class', 'planetContainer');
  var drwaingPlanets = planetContainer.selectAll('g.planet')
    .data(planets).enter()
    .append('circle')


  function createGradients() {

    //Just for fun a gradient that runs over all planets in a rainbow patterns
    var gradientLinear = svg
      .append("linearGradient")
      .attr("id", "gradientLinear")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("y1", "0")
      .attr("y2", "0")
      .attr("x1", "0")
      .attr("x2", "30%")
      .attr("spreadMethod", "reflect")
      .selectAll("stop")
      .data([
          {offset: "0%", color: "#6363FF"},
          {offset: "6.16%", color: "#6373FF"},
          {offset: "12.4%", color: "#63A3FF"},
          {offset: "18.7%", color: "#63E3FF"},
          {offset: "24.9%", color: "#63FFFB"},
          {offset: "31.2%", color: "#63FFCB"},
          {offset: "37.5%", color: "#63FF9B"},
          {offset: "43.7%", color: "#63FF6B"},
          {offset: "50%", color: "#7BFF63"},
          {offset: "56.3%", color: "#BBFF63"},
          {offset: "62.5%", color: "#DBFF63"},
          {offset: "68.8%", color: "#FBFF63"},
          {offset: "75%", color: "#FFD363"},
          {offset: "81.3%", color: "#FFB363"},
          {offset: "87.6%", color: "#FF8363"},
          {offset: "93.8%", color: "#FF7363"},
          {offset: "100%", color: "#FF6364"}
        ])
      .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

    //Radial gradient with the center at one end of the circle, as if illuminated from the side
    //A gradient is created for each planet and colored to the temperature of its star
    var gradientContainer = container.append("g").attr("class","gradientContainer");

    var gradientRadial = gradientContainer
      .selectAll("radialGradient").data(planets).enter()
      .append("radialGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "0%")
      .attr("gradientUnits", "objectBoundingBox")
      .attr('id', function(d){return "gradientRadial-"+d.ID})

    gradientRadial.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", function(d) {return d3.rgb(colorScale(d.temp)).brighter(1);});

    gradientRadial.append("stop")
      .attr("offset", "40%")
      .attr("stop-color", function(d) {return colorScale(d.temp);});

    gradientRadial.append("stop")
      .attr("offset",  "100%")
      .attr("stop-color", function(d) {return d3.rgb(colorScale(d.temp)).darker(1.75);});

  };

})(window, document);