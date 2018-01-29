
import * as d3 from 'd3';

// Local imports
import { createCircleChart } from './circle';  // named import
import makeBarChart from './bar';  // name is irrelevant since it is a default export
import getPymkData from './pymk-bar';

require('./main.scss');  // will build CSS from SASS 3 file

getPymkData();

// // important for parsing dates of scrapes
// const parseDate = d3.timeFormat('%Y-%m-%d').parse;

// // ----------------------- SETTINGS

// const margin = {
//     top: 20,
//     right: 30,
//     bottom: 30,
//     left: 40
//   },
//   width = 700 - margin.left - margin.right,
//   height = 500 - margin.top - margin.bottom;

// // ----------------------- AXES DEFINITIONS

// const x = d3.scaleBand()
//   .rangeRound([0, width], .1);

// const y = d3.scaleLinear()
//     .range([height, 0]);

// const xAxis = d3.axisBottom(x)
//   .scale(x);

// const yAxis = d3.axisLeft(y)
//   .scale(y)
//   .ticks(10, '%');

// // ----------------------- CREATE CHART CONTAINER

// const chart = d3.select("#viz")
//     .attr("width", width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`);


// // ----------------------- BUILD CHART FROM DATA

// d3.tsv("data.tsv", type, (error, data) => {
//   x.domain(data.map(d => d.name));
//   y.domain([0, d3.max(data, (d) => d.value)]);


//   // begin appending elements to the chart

//   // axis x
//   chart.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', `translate(0, ${height})`)
//     .call(xAxis);

//   // axis y
//   chart.append('g')
//     .attr('class', 'y axis')
//     .call(yAxis)
//     .append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', 6) // tf is "6"
//     .attr('dy', '.71em')
//     .style('text-anchor', 'end')
//     .text('Frequency');

//   // bars
//   chart.selectAll('.bar')
//     .data(data)
//     .enter().append('rect')
//     .attr('class', 'bar')
//     .attr('x', d => x(d.name))
//     .attr('y', (d) => {
//       console.log(y(d.value));
//       return y(d.value)
//     })
//     .attr('height', function (d) {
//       return height - y(d.value);
//     })
//     .attr('width', x.bandwidth() - 5);
// });



// // this is unused, idk what it will be used for
// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }