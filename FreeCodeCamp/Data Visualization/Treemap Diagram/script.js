const url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const svg = d3
      .select("#main-frame")
      .append("svg")
      .attr("width", "1000px")
      .attr("height", "1000px")
      .attr("fill", "");

    const legendData = {
      Wii: "#f28e2c",
      DS: "#76b7b2",
      X360: "#59a14f",
      GB: "#edc949",
      PS3: "#af7aa1",
      NES: "#ff9da7",
      PS2: "#9c755f",
      "3DS": "#bab0ab",
      PS4: "#4e79a7",
      SNES: "#e15759",
      PS: "#f1ce63",
      N64: "#86bc5e",
      GBA: "#d67195",
      XB: "#729ece",
      PC: "#b07aa1",
      2600: "#ff9d00",
      PSP: "#ed665d",
      XOne: "#ccaa50",
    };

    const hierarchyData = d3
      .hierarchy(data)
      .sum((d) => +d.value)
      .sort((a, b) => b.value - a.value);

    const leaves = hierarchyData.leaves();
    const treemap = d3.treemap().size([1000, 600]).padding(1);

    treemap(hierarchyData);

    const tooltip = d3
      .select("#main-frame")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid black")
      .style("padding", "5px");

    const groups = svg
      .selectAll("g")
      .data(leaves)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`)
      .on("mouseover", (event, d) => {
        tooltip
          .attr("data-value", d.data.value)
          .style("opacity", 1)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`)
          .html(
            `Name: ${d.data.name}<br/>Category: ${d.data.category}<br/>Value: ${d.data.value}`
          );
      })
      .on("mouseout", () => tooltip.style("opacity", 0));

    groups
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => legendData[d.data.category])
      .attr("class", "tile")
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value);

    groups
      .append("text")
      .attr("x", 5)
      .attr("y", 20)
      .text((d) => d.data.name)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .style("cursor", "default");

    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", "translate(350, 625)");

    const legendArray = Object.entries(legendData);

    legend
      .selectAll("g")
      .data(legendArray)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d, i) => `translate(${(i % 3) * 120}, ${Math.floor(i / 3) * 30})`
      )
      .each(function (d) {
        d3.select(this)
          .append("rect")
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", d[1])
          .attr("class", "legend-item");

        d3.select(this)
          .append("text")
          .attr("x", 30)
          .attr("y", 15)
          .text(d[0])
          .attr("fill", "black")
          .attr("font-size", "12px");
      });
  });
