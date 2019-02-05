
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

        svg.append("g")
            .attr("class", "xLabel")
            .attr("transform", "translate(0," + chartHeight + ")");
        svg.append("g")

            .attr("class","yLabel");

        var x = d3.select(".xLabel")
        var y = d3.select(".yLabel")

        

        chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(xAxis);
        chartGroup.append("g").call(yAxis);


        x.append("text").text("Poverty %").attr("transform", `translate(${chartWidth/2},135)`);
        y.append("text").text("HealthCare %").attr("transform", `translate(0,${chartHeight/2}) rotate(90)`);


        chartGroup.selectAll("circle-dots")
            .data(data)
            .enter().append("svg:circle")
            .attr("cx", elem => xLinearScale(elem.poverty))
            .attr("cy", elem => xLinearScale(elem.healthcare))
            .attr("r", 8)
            .attr("fill", "green")
            .attr("opacity", ".5");

        chartGroup.selectAll("circle-dots")
            .append("e").text(elem => console.log(elem.abbr));


        var idk = chartGroup.selectAll("circle-dots")
            .data(data).enter();
            
            
        idk.append("text").text(elem => elem.abbr)
            .attr("dx", elem => xLinearScale(elem.poverty))
            .attr("dy", elem => xLinearScale(elem.healthcare))
            .attr("fill", "red");


    });


