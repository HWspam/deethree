
var svgWidth = 920;
var svgHeight = 600;

var chartMargin = {
    top: 100,
    right: 150,
    bottom: 80,
    left: 125
}

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.bottom - chartMargin.top;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv("assets/data/data.csv")
    .then(function (data) {

        data.forEach(elem => {
            elem.poverty = + elem.poverty;
            elem.healthcare = + elem.healthcare;
            elem.abbr = elem.abbr;
        });

        var xLinearScale = d3.scaleLinear().domain(d3.extent(data, elem => elem.poverty)).range([10, 500]);
        var yLinearScale = d3.scaleLinear().domain(d3.extent(data, elem => elem.healthcare)).range([500, -10]);

        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(xAxis);
        chartGroup.append("g").call(yAxis);


        chartGroup.selectAll("circle-dots")
            .data(data)
            .enter().append("svg:circle")
            .attr("cx", elem => xLinearScale(elem.poverty))
            .attr("cy", elem => xLinearScale(elem.healthcare))
            .attr("r", 8)
            .attr("fill", "green")
            .attr("opacity", ".5");

    });


