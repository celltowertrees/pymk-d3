import * as d3 from 'd3';

// used as getPymkData in main.js
export default function () {

  // X: timestamp
  // Y: numNew, scaled down to fit the graph viewport, but y still tells you the number of occurrences (?)

  // important for parsing dates of scrapes
  // also, this is not even a valid function
  const parseDate = d3.timeFormat('%Y-%m-%d').parse;

  // ----------------------- SETTINGS
  const margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
  // an onResize function would be useful at some point
  width = 700 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  // ----------------------- AXES DEFINITIONS

  const x = d3.scaleBand()
    .rangeRound([0, width], .1);

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

  d3.csv('data/pymk-inspector-sessions.csv', (error, data) => {

    // do we want to use domain here?
    // how is timestamp used to map the domain or range or whatever?
    x.domain(data.map(d => new Date(d.timestamp)));
    y.domain([0, d3.max(data, d => {
      return parseFloat(d.numNew);
    })]);

    // begin appending elements to the chart

    // axis x
    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

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
      .attr('x', d => x(new Date(d.timestamp)))
      .attr('y', d => y(d.numNew))
      .attr('height', d => height - y(d.numNew))
      .attr('width', x.bandwidth() - 5);
  });
}
