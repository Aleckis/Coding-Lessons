const urlData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlCounties = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

async function fetchAllData() {
    const [dataResponse, countiesResponse] = await Promise.all([
        fetch(urlData),
        fetch(urlCounties),
    ]);

    const data = await dataResponse.json();
    const counties = await countiesResponse.json();

    const svg = d3
        .select("#main-frame")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 630);

    const geojsonCounties = topojson.feature(counties, counties.objects.counties);

    const colorScale = d3
        .scaleQuantize()
        .domain([0, d3.max(data, d => d.bachelorsOrHigher)])
        .range(d3.schemeBlues[9]);

    const tooltip = d3
        .select("#main-frame")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid black")
        .style("padding", "5px");

    svg.selectAll("path")
        .data(geojsonCounties.features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => {
            const countyData = data.find(entry => entry.fips === d.id);
            return countyData ? countyData.bachelorsOrHigher : 0;
        })
        .attr("d", d3.geoPath())
        .attr("fill", d => {
            const countyData = data.find(entry => entry.fips === d.id);
            return countyData ? colorScale(countyData.bachelorsOrHigher) : "#ccc";
        })
        .on("mouseover", (event, d) => {
            const countyData = data.find(entry => entry.fips === d.id);
            tooltip
                .style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 20}px`)
                .html(
                    countyData
                        ? `${countyData.area_name}, ${countyData.state}: ${countyData.bachelorsOrHigher}%`
                        : "No data"
                )
                .attr("data-education", countyData ? countyData.bachelorsOrHigher : 0);
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

    const legendWidth = 300;
    const legendHeight = 10;

    const legend = svg
        .append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${1100 - legendWidth - 50}, ${630 - 50})`);

    const legendScale = d3
        .scaleLinear()
        .domain(colorScale.domain())
        .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(6).tickFormat(d => `${d}%`);

    legend
        .selectAll("rect")
        .data(colorScale.range().map(color => {
            const d = colorScale.invertExtent(color);
            if (!d[0]) d[0] = legendScale.domain()[0];
            if (!d[1]) d[1] = legendScale.domain()[1];
            return d;
        }))
        .enter()
        .append("rect")
        .attr("x", d => legendScale(d[0]))
        .attr("y", 0)
        .attr("width", d => legendScale(d[1]) - legendScale(d[0]))
        .attr("height", legendHeight)
        .attr("fill", d => colorScale(d[0]));

    legend
        .append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(legendAxis);
}

fetchAllData();
