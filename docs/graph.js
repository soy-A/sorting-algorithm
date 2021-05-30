// 랜덤하게 섞인 배열 생성
var data = [];
var arrSize = 40;
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

// 병합 정렬
function mergeSort() {
  var mergeReps = (unsortedArray.length).toString(2).length + 1;
  var mergeArrays = [[...unsortedArray], []];

  for (i=0; i<unsortedArray.length; i += 2) {
    mergeArrays[1].push(mergeTwo([unsortedArray[i]], [unsortedArray[i+1]]))
  }
  for (n=2; n<mergeReps; n++) {
    mergeArrays[n] = [];
    var unMerged = mergeArrays[n-1];
    for (i=0; i<unMerged.length; i += 2) {
      mergeArrays[n].push(mergeTwo(unMerged[i], unMerged[i+1] ? unMerged[i+1] : []))
    }
  }
  for (i=1; i<mergeArrays.length; i++) {
    mergeArrays[i] = d3.merge(mergeArrays[i])
  }
  mergeMove(0);

  function mergeTwo(iArray, nArray) {
    var newArray = [];
    for (var i=0, n=0; i<iArray.length || n<nArray.length;) {
      if (iArray[i] < nArray[n]) {
        newArray.push(iArray[i++])
      } else if (iArray[i] > nArray[n]) {
        newArray.push(nArray[n++])
      } else if (!(iArray[i])) {
        newArray.push(nArray[n++])
      } else if (!(nArray[n])) {
        newArray.push(iArray[i++])
      }
    }
    return newArray;
  }

  function mergeMove(j) {
    var oldArray = mergeArrays[j],
        newArray = [...mergeArrays[j+1]],
        sortedArray = [];

    moveStep(0);

    function moveStep(n) {
      if (stop) return stop = false;            
      d3.selectAll("rect").attr("class", "")                

      d3.select("#counter").html(++steps);
      d3.select("#rect" + newArray[n]).attr("class", "testing")

      sortedArray.push(newArray[n])
      oldArray.shift()

      rects.transition().duration(durationTime)
        .attr("transform", function(d) {
        var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
        return "translate(" + x(xVal - 1) + ",0)" 
      })

      labels
        .classed("sorted", function(d) {
        return !mergeArrays[j + 2] && sortedArray.indexOf(d) == d - 1;
      })
        .transition().duration(durationTime)
        .attr("transform", function(d) {
        var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
        return "translate(" + x(xVal) + ",0)" 
      })

      d3.timeout(function() {
        if (oldArray.length > 0) {
          moveStep(++n)
        } else if (mergeArrays[j + 2]) {
          mergeMove(++j)
        } else {
          rects.classed("testing", false)
        }
      }, durationTime);
    }
  }
}

// 퀵 정렬
/* async function quickSort(data) {
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
} */

const mod_arr = [];
var flag = 1;

async function q_sort(){
    i=0;j=0;
    while(flag){
        svg.selectAll('rect').data(mod_arr)
        	.attr('y', d => y(d))
          .attr('height', d => y(0) - y(d));
				svg.node();
        await timer(50);
/*         for(var a=0;a<100;a++){
            mod_arr.shift();
        } */
    }
}

function Swap(arr, idx1, idx2) { 
	var temp;
	temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp; 
}

 

function Partition(arr, left, right) {
	var pivot = arr[left];
	low = left + 1;
	high = right;

	while (low <= high) {	// 교차되지 않을 때까지 반복
		// 피벗보다 큰 값을 찾는 과정
		while (low <= right  && pivot >= arr[low]) low++;
		// 피벗보다 작은 값을 찾는 과정
		while (high >= (left+1) && pivot <= arr[high])  high--;
		// 교차되지 않는 상태라면 Swap 실행
		if (low <= high) { 	
			Swap(arr, low, high);
		}
	}
	Swap(arr, left, high);		// 피벗과 high 가 가리키는 대상 교환
	return high;					// 옮겨진 피벗의 위치정보 교환
}

 

async function QuickSort(arr, left, right) {
	if (left < right) {
		pivot = Partition(arr, left, right); 
        for(var a=0;a<arr.length;a++){
            mod_arr[i++] = arr[a];
        }
    await timer(100);
		QuickSort(arr, left, pivot - 1);
		QuickSort(arr, pivot + 1, right);
	} else{
  	flag = 0;
  }
}


function quick_sort(array){
    i=0,j=0;
    q_sort();
    QuickSort(array,0,array.length-1);
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
iterativeMergeSort(data);
})

d3.select("#quick_btn").on("click", function() {
quick_sort(data);
})

