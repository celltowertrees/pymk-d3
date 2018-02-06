import * as d3 from 'd3';

// used as getPymkData in main.js
export default function () {

  // X: timestamp
  // Y: numNew, scaled down to fit the graph viewport, but y still tells you the number of occurrences (?)

  // ----------------------- SETTINGS
  const margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
  // an onResize function would be useful at some point
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  // ----------------------- AXES DEFINITIONS

  const x = d3.scaleBand()
    .rangeRound([0, width], .05);

  const y = d3.scaleLinear()
    .range([height, 0]);

  const xAxis = d3.axisBottom(x)
    .scale(x)
    .tickFormat(d3.timeFormat("%m-%d"));

  const yAxis = d3.axisLeft(y)
    .scale(y)
    .ticks(10);

  // ----------------------- CREATE CHART CONTAINER

  const chart = d3.select('#viz')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // ----------------------- BUILD CHART FROM DATA

  d3.csv('data/pymk-inspector-sessions.csv', (error, res) => {

    const data = res.sort((a, b) => {
      return Date.parse(a.timestamp) - Date.parse(b.timestamp);
    });

    x.domain(data.map(d => Date.parse(d.timestamp)));

    y.domain([0, d3.max(data, d => {
      return parseFloat(d.numNew);
    })]);

    // begin appending elements to the chart

    // axis x
    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-65)');

    // axis y
    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6) // unsure what the 6 is for
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('New Suggestions');

    // bars
    chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(Date.parse(d.timestamp)))
      .attr('y', d => y(d.numNew))
      .attr('height', d => height - y(d.numNew))
      .attr('width', x.bandwidth() - 5);
  });
}
