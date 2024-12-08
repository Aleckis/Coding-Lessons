const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const margin = { top: 20, right: 20, bottom: 50, left: 60 };
const width = 950 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3
  .select("#main-frame")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json(url).then((data) => {
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Year), d3.max(data, (d) => d.Year)])
    .range([0, width]);

  const parseTime = (timeStr) => {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return new Date(1970, 0, 1, 0, minutes, seconds); // Convert to Date object
  };

  const yScale = d3
    .scaleTime()
    .domain([
      d3.max(data, (d) => parseTime(d.Time)),
      d3.min(data, (d) => parseTime(d.Time)),
    ]) // Reverse the domain
    .range([height, 0]);

  const timeFormat = d3.timeFormat("%M:%S");

  const xAxis = d3.axisBottom(xScale).ticks(12).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat).ticks(6);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g").attr("id", "y-axis").call(yAxis);

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(parseTime(d.Time)))
    .attr("r", 5)
    .attr("data-xvalue", (d) => d.Year) // Year remains unchanged
    .attr("data-yvalue", (d) => parseTime(d.Time)) // Use Date object for time
    .attr("fill", (d) => (d.Doping === "" ? "goldenrod" : "cornflowerblue"))
    .attr("opacity", 0.8)
    .attr("stroke", "black")
    .on("mouseover", function (event, d) {
      tooltip
        .style("opacity", 1)
        .html(
          `${d.Name} from ${d.Nationality}<br />Year: ${d.Year} Time: ${
            d.Time
          } ${d.Doping === "" ? "" : "<br /> " + d.Doping}`
        )
        .attr("data-year", d.Year)
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

  const tooltip = d3
    .select("#main-frame")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "lightgray")
    .style("border", "1px solid black")
    .style("border-radius", "4px")
    .style("padding", "5px")
    .style("pointer-events", "none")
    .style("font-family", "sans-serif")
    .style("font-size", "12px");
});
