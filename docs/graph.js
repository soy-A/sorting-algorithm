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
var width = 400,
    leftMargin = 100,
    topMargin = 30,
    barHeight = 20,
    barGap = 5,
    tickGap = 5,
    tickHeight = 10,
    scaleFactor = width / 100,
    barSpacing = barHeight + barGap,
    translateText = "translate(" + leftMargin + "," + topMargin + ")",
    scaleText = "scale(" + scaleFactor + ",1)";

var body = d3.select("body");
body.append("h2").text("Sorting Algorithms");
body.append("div").attr("class", "clearfix")
var svg = body.append("svg");
var barGroup = svg.append("g")
    .attr("transform", translateText + " " + scaleText)
    .attr("class", "bar");
for(var i = 0; i < data.length; i++){
  barGroup.append("rect")
      .attr("x", 0)
      .attr("y", i * barSpacing)
      .attr("height", barHeight)
      .attr("width", data[i]);
};

