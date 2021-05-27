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
/* 		.attr('transform', 'translate(0, ${height - margin.bottom})') */
    .call(d3.axisBottom(x)
    	.tickSizeOuter(0));

var svg = d3.select('body').append('svg').style('width', width).style('height', height);

/* svg.append('g').call(xAxis); */
svg.append('g')
		.selectAll('rect').data(data).enter().append('rect')
    .attr('x', d => x(d))
    .attr('y', d => y(d))
    .attr('height', d => y(0) - y(d))
    .attr('width', x.bandwidth())
    .attr('rx', 3)
    .attr('fill', '#1E3269');

svg.node();

// 딜레이를 위한 타이머
const timer = ms => new Promise(res => setTimeout(res, ms))

// 선택 정렬
async function selectionSort(data) {
		for(let i = 0; i < data.length; i++) {
				let minIndex = i;
				for(let j = i + 1; j < data.length; j++) {
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
        
				svg.selectAll('rect').data(data)
          	.attr('y', d => y(d))
          	.attr('height', d => y(0) - y(d));
      	svg.node();
    }
}

// 버블 정렬
async function bubbleSort(data) {
		for(let i = 0; i < data.length; i++) {
				let temp;
				for(let j = 0; j < data.length - 1 - i; j++) {
						if(data[j] > data[j + 1]) {
								temp = data[j];
								data[j] = data[j + 1];
								data[j + 1] = temp;
						}
				}
        await timer(100);
        
				svg.selectAll('rect').data(data)
        		.attr('y', d => y(d))
            .attr('height', d => y(0) - y(d));
				svg.node();
		}
}

// 삽입 정렬
async function insertionSort(data) {
		for(let i = 1; i < data.length; i++) {
				let cur = data[i];
				let left = i - 1;
				while(left >= 0 && data[left] > cur) {
						data[left + 1] = data[left];
						data[left] = cur;
						cur = data[left];
						left--;
				}
        await timer(100);
        
        svg.selectAll('rect').data(data)
        		.attr('y', d => y(d))
            .attr('height', d => y(0) - y(d));
				svg.node();
		}
}

// 병합 정렬
async function merge (left, right) {
		let resultArray = [];
		let leftIndex = 0;
		let rightIndex = 0;
    
		while (leftIndex < left.length && rightIndex < right.length) {
				if (left[leftIndex] < right[rightIndex]) {
						resultArray.push(left[leftIndex]);
						leftIndex++;
				} else {
						resultArray.push(right[rightIndex]);
						rightIndex++;
				}
        await timer(100);
				svg.selectAll('rect').data(data)
        		.attr('y', d => y(d))
            .attr('height', d => y(0) - y(d));
				svg.node();
		}
    if (left.length !== 0 || right.length !== 0) {
        await timer(100);
				svg.selectAll('rect').data(data)
        		.attr('y', d => y(d))
            .attr('height', d => y(0) - y(d));
				svg.node();
    		resultArray = resultArray.concat(left.slice(leftIndex));
    		resultArray = resultArray.concat(right.slice(rightIndex));
  	}
		return resultArray;
}

function mergeSort(data) {
		if (data.length < 2) {
				return data;
		}
		let mid = Math.floor(data.length / 2);
		let left = mergeSort(data.slice(0, mid));
		let right = mergeSort(data.slice(mid));
    
    let resultArray = merge(left, right);
    
		return resultArray;
}

// 퀵 정렬
async function quickSort(data) {
		if (data.length < 2) {
				return data;
		}
		const pivot = [data[0]];
		const left = [];
		const right = [];
		for (let i = 1; i < data.length; i++) {
				if (data[i] < pivot) {
						left.push(data[i]);
				} else if (data[i] > pivot) {
						right.push(data[i]);
				} else {
						pivot.push(data[i]);
				}
		}
    await timer(100);
		svg.selectAll('rect').data(data)
        .attr('y', d => y(d))
        .attr('height', d => y(0) - y(d));
		svg.node();
		return quickSort(left).concat(pivot, quickSort(right));
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

d3.select("#merge_btn").on("click", function() {
mergeSort(data);
})

d3.select("#quick_btn").on("click", function() {
quickSort(data);
})

