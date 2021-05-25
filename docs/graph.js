// 랜덤하게 섞인 배열 생성
var data = [];
for(let i = 0; i < 100; i++){
  data[i] = i + 1;
}

function initRandomArray(array){
    for(var i = array.length - 1 ; i > 0 ; i--){
        var j = Math.floor(Math.random() * (i + 1) ); 
        [array[i], array[j]]=[array[j], array[i]];
    }
}

initRandomArray(data);

// 그래프 생성
var margin = { top: 30, right: 50, left: 50, bottom: 20 };
var width = 1500;
var height = 700;

var x = d3.scaleBand()
		.domain(data.map(d => d))
    .range([margin.left, width - margin.right])
    .padding(0.2);

var y = d3.scaleLinear()
		.domain([0, d3.max(data, d => d)]).nice()
    .range([height - margin.bottom, margin.top]);
    
var xAxis = g => g
		.attr('transform', 'translate(0, ${height - margin.bottom})')
    .call(d3.axisBottom(x)
    	.tickSizeOuter(0));

var svg = d3.select('body').append('svg').style('width', width).style('height', height);

svg.append('g').call(xAxis);
svg.append('g')
		.selectAll('rect').data(data).enter().append('rect')
    .attr('x', d => x(d))
    .attr('y', d => y(d))
    .attr('height', d => y(0) - y(d))
    .attr('width', x.bandwidth())
    .attr('rx', 3)
    .attr('fill', '#1E3269');

svg.node();
