// 랜덤하게 섞인 배열 생성
var data = [];
var arrSize = 0;
arrSize = 50;
for(let i = 0; i < arrSize; i++){
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
var margin = { top: 30, right: 30, left: 30, bottom: 20 };
var width = 1500;
var height = 700;

var x = d3.scaleBand()
		.domain(data.map(d => d))
    .range([margin.left, width - margin.right])
    .padding(0.2);

var y = d3.scaleLinear()
		.domain([0, d3.max(data, d => d)]).nice()
    .range([height - margin.bottom, margin.top]);

      
function fontSize() {
	return String((115 - arrSize) * 0.18 + 5) + "px";
}

var svg = d3.select('body').append('svg').style('width', width).style('height', height);

svg.append('g')
		.selectAll('rect').data(data).enter().append('rect')
    .attr('x', d => x(d))
    .attr('y', d => y(d))
    .attr('height', d => y(0) - y(d))
    .attr('width', x.bandwidth())
    .attr('rx', 3)
    .attr('fill', '#87CEFA');

svg.selectAll("text")
    .data(data)
    .enter().append("text")
    .text(function(d) {return d})
        .attr("x", d => x(d) + (100 - arrSize) * 0.05)
        .attr("y", d => y(d) + (110 - arrSize) * 0.2 + 10)
        .attr("font-size", fontSize())
        .attr('fill', '#FFFFFF');

svg.node();

// redraw 함수 정의
function redraw(newData) {
    svg.selectAll("rect")
        .data(newData)
        .transition()
        .duration(250) // 1s
        .attr('y', d => y(d))
        .attr('height', d => y(0) - y(d));
         
    svg.selectAll("text")
    		.data(newData)
        .transition()
        .duration(250) // 1s
    		.text(function(d) {return d})
        		.attr("y", d => y(d) + (110 - arrSize) * 0.2 + 10)
}

// 딜레이를 위한 타이머
const timer = ms => new Promise(res => setTimeout(res, ms))

// 선택 정렬
async function selectionSort(data) {
		let steps = 0;
		for(let i = 0; i < data.length; i++) {
				let minIndex = i;
        d3.select("#counter").html(++steps);
				for(let j = i + 1; j < data.length; j++) {
        		d3.select("#counter").html(++steps);
      			if(data[minIndex] > data[j]) {
        				minIndex = j;
       			 }
    		}
     		if(minIndex !== i) {
      			let temp = data[minIndex];
        		data[minIndex] = data[i];
        		data[i] = temp;
      	}
      	await timer(100);
        redraw(data);
    }
}

// 버블 정렬
async function bubbleSort(data) {
   	let steps = 0;
		for(let i = 0; i < data.length; i++) {
        d3.select("#counter").html(++steps);
				let temp;
				for(let j = 0; j < data.length - 1 - i; j++) {
        		d3.select("#counter").html(++steps);
						if(data[j] > data[j + 1]) {
								temp = data[j];
								data[j] = data[j + 1];
								data[j + 1] = temp;
						}
				}
        await timer(100);
        redraw(data);
		}
}

// 삽입 정렬
async function insertionSort(data) {
		let steps = 0;
		for(let i = 1; i < data.length; i++) {
    		d3.select("#counter").html(++steps);
				let cur = data[i];
				let left = i - 1;
				while(left >= 0 && data[left] > cur) {
        		d3.select("#counter").html(++steps);
						data[left + 1] = data[left];
						data[left] = cur;
						cur = data[left];
						left--;
				}
        await timer(100);
        redraw(data);
		}
}

d3.select("#reset_btn").on("click", function(){
window.location.reload()
})

d3.select("#selection_btn").on("click", function() {
selectionSort(data);
})

d3.select("#bubble_btn").on("click", function() {
bubbleSort(data);
})

d3.select("#insertion_btn").on("click", function() {
insertionSort(data);
})
