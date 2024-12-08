const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, right: 20, bottom: 50, left: 60 };
const width = 825 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#main-frame")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json(url).then(data => {
  const dataArr = data.data;

  const xScale = d3.scaleTime()
    .domain([new Date(dataArr[0][0]), new Date(dataArr[dataArr.length - 1][0])])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataArr, d => d[1])])
    .range([height, 0]);

  const xAxis = d3.axisBottom(xScale).ticks(10);
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
    .attr("id", "y-axis")
    .call(yAxis);

  svg.selectAll("rect")
    .data(dataArr)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(new Date(d[0])))
    .attr("y", d => yScale(d[1]))
    .attr("width", width / dataArr.length - 1)
    .attr("height", d => height - yScale(d[1]))
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .attr("fill", "black")
    .on("mouseover", function (event, d) {
      d3.select(this).attr("stroke", "blue").attr("stroke-width", "2px");
      tooltip.style("opacity", 1)
        .attr("data-date", d[0])
        .html(`${d[0]}<br>$${d[1]} Billion`)
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "none");
      tooltip.style("opacity", 0);
    });

  const tooltip = d3.select("#main-frame")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("padding", "5px")
    .style("pointer-events", "none");
});
