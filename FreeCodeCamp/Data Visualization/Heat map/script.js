const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const margin = { top: 20, right: 20, bottom: 50, left: 60 };
const width = 1350 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// Months array for full month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const svg = d3
  .select("#main-frame")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", 550)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json(url).then((data) => {
  const dataArr = data.monthlyVariance;

  // Define scales
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(dataArr, (d) => d.year), d3.max(dataArr, (d) => d.year)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(d3.range(12)) // Use 0-11 for months
    .range([0, height])
    .padding(0.05);

  // Define axes
  const xAxis = d3.axisBottom(xScale).ticks(26).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => months[d]);

  // Append axes
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g").attr("id", "y-axis").call(yAxis);

  // Add heat map cells
  svg
    .selectAll("rect")
    .data(dataArr)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("data-month", (d) => d.month - 1)
    .attr("data-year", (d) => d.year)
    .attr("data-temp", (d) => 8.66 + d.variance)
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.month - 1))
    .attr(
      "width",
      width /
        (d3.max(dataArr, (d) => d.year) - d3.min(dataArr, (d) => d.year) + 1)
    )
    .attr("height", yScale.bandwidth())
    .attr("fill", (d) => {
      const temp = d.variance + 8.66;
      if (temp <= 3) return "#4575b4";
      if (temp <= 6) return "#91bfdb";
      if (temp <= 9) return "#fee090";
      if (temp <= 12) return "#fc8d59";
      return "#f02b1d";
    })
    .on("mouseover", function (event, d) {
      d3.select(this).attr("stroke", "black").attr("stroke-width", "2px");
      tooltip
        .style("opacity", 0.7)
        .html(
          `${d.year} - ${months[d.month - 1]}<br />${(
            8.66 + d.variance
          ).toFixed(2)} °C<br />${
            d.variance > 0 ? "+" : ""
          }${d.variance.toFixed(2)}`
        )
        .attr("data-year", d.year)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "none").attr("stroke-width", "0");
      tooltip.style("opacity", 0);
    });

  // Configure legend
  const temperatureRanges = [
    { range: "0.0 - 3.0", color: "#4575b4" },
    { range: "3.1 - 6.0", color: "#91bfdb" },
    { range: "6.1 - 9.0", color: "#fee090" },
    { range: "9.1 - 12.0", color: "#fc8d59" },
    { range: "12.1+", color: "#f02b1d" },
  ];

  const legendWidth = 300;
  const legendHeight = 50;

  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(50, 440)`);

  legend
    .selectAll("rect")
    .data(temperatureRanges)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (legendWidth / temperatureRanges.length))
    .attr("y", 0)
    .attr("width", legendWidth / temperatureRanges.length)
    .attr("height", legendHeight / 2)
    .attr("fill", (d) => d.color);

  legend
    .selectAll("text")
    .data(temperatureRanges)
    .enter()
    .append("text")
    .attr(
      "x",
      (d, i) =>
        i * (legendWidth / temperatureRanges.length) +
        legendWidth / temperatureRanges.length / 2
    )
    .attr("y", legendHeight)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text((d) => d.range);

  // Tooltip

  const tooltip = d3
    .select("#main-frame")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "#fff")
    .style("border", "1px solid black")
    .style("border-radius", "4px")
    .style("padding", "5px")
    .style("pointer-events", "none")
    .style("font-family", "sans-serif")
    .style("font-size", "14px");
});
