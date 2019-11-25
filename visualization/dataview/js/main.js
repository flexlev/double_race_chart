var data;
var displayYear = "2010-04", isPlaying = false;
var barHeight = 20, barWidth = 500, centerOffset = 20;

const top_n = 10;
const height = 720;

const title_margin = 100;
const bottom_axis_margin = 40;

var leftScale;
var rightScale;
var y;

var tickDuration = 1500;

//inside graph
const margin = {
    top: 0,
    right: 0,
    bottom: 5,
    left: 10
};
let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);

/* Event handling */
function handleYearInputChange() {
  isPlaying = false;
  displayYear = +this.value;
  updateChart();
}


/* Initialization */
function initializeAxes() {
    let tickSize = height - title_margin;

    leftScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([0, -barWidth]);

    rightScale = d3.scaleLinear()
                 .domain([0, d3.max(data, d => d.value)])
                 .range([0, barWidth]);
    y = d3.scaleLinear()
          .domain([top_n, 1])
          .range([height - margin.bottom - margin.top - title_margin - bottom_axis_margin, margin.top]);

    var axis = d3.axisBottom()
    .scale(rightScale)
    .tickSize(tickSize)
    .tickFormat(d => d3.format(',')(d));

    d3.select(".right.axis")
    .call(axis);

    axis.scale(leftScale);
    d3.select(".left.axis")
    .call(axis);
}

function getYearData() {
    var yearData = data.filter(function(d) {
    return d.date === displayYear;
    });

    yearData = yearData.filter(function(d) {
        return d.rank <= top_n;
    });

    yearData = _.sortBy(yearData, function(d) {
    // Split the age range string by '-', keep the first number, remove any '+' symbols and convert to a number
    return +d.rank;
    });
    yearData.reverse();

    return yearData;
}


/* D3 code */
function initBarGroup(d) {
  d3.select(this)
    .append("rect")
    .attr("transform", "translate(-" + centerOffset + ",0)")
    .attr("height", barHeight - 1)
    .classed("female", true)
    .style("fill", "#F15F36");

  d3.select(this)
    .append("rect")
    .attr("transform", "translate(" + centerOffset + ",0)")
    .attr("height", barHeight - 1)
    .classed("male", true)
    .style("fill", "#19A0AA");

  d3.select(this)
    .append("text")
    .attr("y", 14)
    .classed("age label", true)
    .text(function(d) {
      return d.age
    });
}

function updateBarGroup(d) {

  d3.select(this)
    .select(".female")
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr("x", leftScale(d.female_pct))
    .attr("width", -leftScale(d.female_pct));

  d3.select(this)
    .select(".male")
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr("width", rightScale(d.male_pct));
}

function updateChart() {
    var yearData = getYearData();
    console.log(yearData);
    var u = d3.select(".bars")
    .selectAll("g.bar-group")
    .data(yearData, d => d.name)
    .enter()
    .append('rect')
    .attr("class", "bar")
    .attr("x", function(d){
        if (d.name.includes("_us")){
            return 0;
        } else{
            return leftScale(d.value);
        }
    })
    .attr("width", function(d){
        if (d.name.includes("_us")){
            return rightScale(d.value);
        } else{
            return -1*leftScale(d.value);
        }
    })
    .attr("y", function(d){
        return y(d.rank)+5;
    })
    .attr("transform", function(d){
        if (d.name.includes("_us")){
            return "translate(20,0)";
        } else{
            return "translate(-20,0)";
        }
    })
    .attr("height", y(1)-y(0)-barPadding);
    // .style("fill", function(d){ return myColor( unique_names.indexOf(d.name) ) ; });

    // u.enter()
    // .append("g")
    // .classed("bar-group", true)
    // .attr("transform", function(d, i) {
    //   return "translate(0," + i * barHeight + ")";
    // })
    // .each(initBarGroup)
    // .merge(u)
    // .each(updateBarGroup);

    u.exit()
    .remove();

    // Update main title
    d3.select(".title")
    .text("Mobile Devices Market Proportions (" + displayYear + ")");

    // Update slider
    d3.select("#year-input")
    .node().value = displayYear;
}

d3.csv("https://gist.githubusercontent.com/flexlev/ef88c3bd5d354473cc9b651eab9c0dc0/raw/031d84f8be44455fe7d459e5a85d0b92277a9946/data_cellphone_device.csv").then( function(csv){
    data = csv;
    data.forEach(function (d, i) {
        d.value = +d.value,
        d.rank = +d.rank,
        d.lastValue = +d.lastValue,
        d.value = isNaN(d.value) ? 0 : d.value + 1
    });

    initializeAxes();
    updateChart();
});














































// const chartDiv = document.getElementById("chart");

// var displayYear = 1980

// const tickDuration = 1800;
// const top_n = 19;

// // let brandData = d3.csv('https://gist.githubusercontent.com/flexlev/d21fe540d4a464970fb4f790bd765bf1/raw/df59463244afc028d981704db3871a51038cda88/data_insults.csv')
  
// const margin = {
//     top: 80,
//     right: 0,
//     bottom: 5,
//     left: 10
// };

// let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);

// function myColor(i){
//     if(i < 11){
//       return d3.scaleLinear().domain([0,10])
//               .range(["#A8A595", "#A38640"])(i)
//     } else {
//       return d3.scaleLinear().domain([11,19])
//               .range(["#A38640", "#211C1C"])(i)
//     }
// }

// let title = d3.select(".title")
//                 .attr("x", -300)
//                 .attr("y", 30)
//                 .text('Most Obese Countries (% Population)');

// /* Data handling */
// function initializeData(csv) {
//     data = csv.map(function(d) {
//         return {
//             year: +d.year,
//             age: d.age,
//             male_pct: +d.male_pct,
//             female_pct: +d.female_pct
//         }
//     });

//     data = data.filter(function(d) {
//         return d.age !== "Total";
//     });
// }

// function initializeAnimation() {
//     window.setInterval(function() {
//         updateChart();
//     }, 600);
// }

// function getYearData() {
//     var yearData = data.filter(function(d) {
//         return d.year === displayYear;
//     });
//     yearData = _.sortBy(yearData, function(d) {
//         // Split the age range string by '-', keep the first number, remove any '+' symbols and convert to a number
//         return +(d.age.split("-")[0].replace("+", ""));
//     });

//     yearData.reverse();

//     return yearData;
// }

// function updateChart() {
//     var yearData = getYearData();

//     var u = d3.select(".bars")
//             .selectAll("g.bar-group")
//             .data(yearData);

//     u.enter()
//         .append("g")
//         .classed("bar-group", true)
//         .attr("transform", function(d, i) {
//         return "translate(0," + i * barHeight + ")";
//         })
//         .each(initBarGroup)
//         .merge(u)
//         .each(updateBarGroup);

//     u.exit()
//         .remove();

//     // Update main title
//     d3.select(".title")
//         .text("US Population Percentage by Age and Gender (" + displayYear + ")");

//     // Update slider
//     d3.select("#year-input")
//         .node().value = displayYear;
// }

// d3.csv("https://gist.githubusercontent.com/flexlev/be317975f52bb76358659e5f2d8201fc/raw/5cc95f9f89f802c67bcd72acdb2b86f7059170fe/data_testing.csv").then( function(data){
//     initializeData(data);
//     initializeAnimation();

//     for(i = 0; i< data.length; i++){
//         brandData[i] = data[i];
//         if( !flags[brandData[i].name]){
//             flags[brandData[i].name] = true;
//             unique_names.push(brandData[i].name);
//         }
//     }

//     brandData.forEach(function (d, i) {
//         d.value = +d.value,
//         d.lastValue = +d.lastValue,
//         d.value = isNaN(d.value) ? 0 : d.value + 1,
//         d.year = +d.year,
//         d.colour = myColor( unique_names.indexOf(d.name) )
//     });

//     let yearSlice = brandData.filter(d => d.year == current_year && !isNaN(d.value))
//                          .sort((a,b) => b.value - a.value)
//                          .slice(0,top_n);

//     yearSlice.forEach((d,i) => d.rank = i);

//     let x = d3.scaleLinear()
//               .domain([0, d3.max(yearSlice, d => d.value)])
//               .range([margin.left + 150, width-margin.right-215]);

//     let y = d3.scaleLinear()
//               .domain([top_n, 0])
//               .range([height-margin.bottom, margin.top]);

//     let xAxis = d3.axisTop()
//                   .scale(x)
//                   .ticks(width > 500 ? 5:2)
//                   .tickSize(-(height-margin.top-margin.bottom))
//                   .tickFormat(d => d3.format(',')(d));

//     svg.append('g')
//        .attr("class", "axis xAxis")
//        .attr("transform", `translate(0, ${margin.top})`)
//        .call(xAxis)
//        .selectAll('.tick line')
//        .classed('origin', d => d == 0);

//     svg.selectAll('rect.bar')
//         .data(yearSlice, d => d.name)
//         .enter()
//         .append('rect')
//         .attr("class", "bar")
//         .attr("x", x(0)+1)
//         .attr("width", function(d){
//             return x(d.value)-x(0)-1;
//         })
//         .attr("y", function(d){return y(d.rank)+5;})
//         .attr("height", y(1)-y(0)-barPadding)
//         .style("fill", function(d){ return myColor( unique_names.indexOf(d.name) ) ; });

//     svg.selectAll('image')
//         .data(yearSlice, d => d.name)
//         .enter()
//         .append("svg:image")
//         .attr("class", "label")
//         .attr('width', image_width)
//         .attr('height', image_height)
//         .attr("x", margin.left + 140)
//         .attr("y", function(d){ return y(d.rank)+5+((y(1)-y(0))/2)+1 - image_height - extra_image_height_gap; })
//         .attr("xlink:href", function(d){ return"images/" + d.name +".png"; } )

//     svg.selectAll('text.nameLabel')
//         .data(yearSlice, d => d.name)
//         .enter()
//         .append('text')
//         .attr("class", "nameLabel")
//         .attr("text-anchor", "end")
//         .attr("x", margin.left + 140)
//         .attr("y", function(d){ return y(d.rank)+5+((y(1)-y(0))/2)+1; })
//         .text(function(d){return d.name; } ); //.html(d => x(d.value)-x(0)-1 > 200 ? '"' + d.name + '"' : "");

//     svg.selectAll('text.valueLabel')
//         .data(yearSlice, d => d.name)
//         .enter()
//         .append('text')
//         .attr("class", "valueLabel")
//         .attr("x", function(d){return x(d.value)+5;})
//         .attr("y", function(d){return y(d.rank)+5+((y(1)-y(0))/2)+1;})
//         .text(function(d){return d3.format('.3s')(d.value);} );

//     svg.append('text')
//         .attr("class", "annotation")
//         .attr("transform", `translate(${width-margin.right-15}, ${height-margin.bottom-240})`)
//         .style('text-anchor', 'end')
//         .text('')
//         .selectAll('tspan')
//         .data(['Annotations go here', 'like this'], d => d)
//         .enter()
//         .append('tspan')
//         .text(function(d){return d;})
//         .attr("x", 0)
//         .attr("y", function(d,i){ return i * 28;})
//         .attr("opacity", 0)

//     let yearText = svg.append('text')
//                       .attr("class", "yearText")
//                       .attr("x", width-margin.right)
//                       .attr("y", height-25)
//                       .style('text-anchor', 'end')
//                       .text(current_year);

//     let annotate = function(text){

//         let annotation = svg.selectAll('.annotation').selectAll('tspan').data(text, d => d);

//         //console.log(annotation.enter().data());

//         annotation
//           .enter()
//           .append('tspan')
//           .html(d => d)
//           .attr("x", 0)
//           .attr("y", function(d,i){ return i * 28;})
//             .transition()
//             .ease(d3.easeLinear)
//             .duration(250)
//             .attr("opacity", 1)
//               .transition()
//               .ease(d3.easeLinear)
//               .delay(9000)
//               .duration(250)
//               .attr("opacity", 0);

//         annotation.exit().remove();
//     }

//     function animate() {
//         yearSlice = brandData.filter(d => (d.year == current_year) && !isNaN(d.value))
//                             .sort((a,b) => b.value - a.value)
//                             .slice(0,top_n);

//         yearSlice.forEach(function(d,i){
//             d.rank = i;
//             d.colour = myColor( unique_names.indexOf(d.name) );
//         });

//         x.domain([0, d3.max(yearSlice, d => d.value)]);

//         svg.select('.xAxis')
//           .transition()
//           .duration(tickDuration)
//           .ease(d3.easeLinear)
//           .call(xAxis);

//         let bars = svg.selectAll('.bar').data(yearSlice, d => d.name);


//         bars
//           .enter()
//           .append('rect')
//           .attr("class", function(d,i){ 
//             return `bar ${d.name}`;
//         })
//           .attr("x", x(0)+1)
//           .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
//           .attr("y", y(top_n+1)+5)
//           .attr("height", y(1)-y(0)-barPadding)
//         //   .style("fill", function(d,i){ 
//         //     return d.colour;
//         // })
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("width", function(d,i){ return y(d.rank)+5;});


//         bars
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
//             .attr("y", function(d,i){ 
//                 return y(d.rank)+5;
//             })

//         bars
//           .exit()
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
//             .attr("y", y(top_n+1)+5)
//             .remove();

//         let labels = svg.selectAll('.label').data(yearSlice, d => d.name);

//         labels
//           .enter()
//           .append('text')
//           .attr("class", 'label')
//           .attr("x", margin.left + 140)
//           .attr("y", y(top_n+1)+5+((y(1)-y(0))/2))
//           .attr("text-anchor", 'end')
//           .html(d => '"' + d.name + '"')    
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("y", function(d){ return y(d.rank)+5+((y(1)-y(0))/2)+1- image_height - extra_image_height_gap;});

//         labels
//           .transition()
//           .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", margin.left + 140)
//             .attr("y", function(d,i){ return y(d.rank)+5+((y(1)-y(0))/2)+1- image_height - extra_image_height_gap;});

//         labels
//           .exit()
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", margin.left + 140)
//             .attr("y", y(top_n+1)+5+((y(1)-y(0))/2)+1- image_height - extra_image_height_gap)
//             .remove();

//         let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.name);

//         valueLabels
//           .enter()
//           .append('text')
//           .attr("class", 'valueLabel')
//           .attr("x", function(d,i){ return x(d.value)+5;})
//           .attr("y", y(top_n+1)+5)
//           .text(d => d3.format(',.0f')(d.lastValue))
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("y", function(d,i){ return y(d.rank)+5+((y(1)-y(0))/2)+1;});

//         valueLabels
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", function(d,i){ return x(d.value)+5;})
//             .attr("y", function(d,i){ return y(d.rank)+5+((y(1)-y(0))/2)+1;})
//             .tween("text", function(d) {
//               let i = d3.interpolateNumber(d.lastValue, d.value);
//               return function(t) {
//                 this.textContent = d3.format('.3s')(i(t));
//               };
//             });

//         valueLabels
//           .exit()
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", function(d,i){ return x(d.value)+5;})
//             .attr("y", y(top_n+1)+5)
//             .remove();

//         let nameLabels = svg.selectAll('.nameLabel').data(yearSlice, d => d.name);

//         nameLabels
//           .enter()
//           .append('text')
//           .attr("class", 'nameLabel')
//           .attr("x", function(d,i){ return margin.left + 140;})
//           .attr("y", y(top_n+1)+5)
//           .text(d => d.name)
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("y", function(d,i){ return y(d.rank)+5+((y(1)-y(0))/2)+1;});

//         nameLabels
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", function(d,i){ return margin.left + 140;})
//             .attr("y", function(d,i){ return y(d.rank)+5+((y(1)-y(0))/2)+1;})
//             .text(d => d.name);
//             // .tween("text", function(d) {
//             //   let i = d3.interpolateNumber(d.lastValue, d.value);
//             //   return function(t) {
//             //     this.textContent = d3.format('.3s')(i(t));
//             //   };
//             // });

//         nameLabels
//           .exit()
//           .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .attr("x", function(d,i){ return x(d.value)+5;})
//             .attr("y", y(top_n+1)+5)
//             .remove();

//         if(current_year >= 2016) ticker.stop();

//         current_year = current_year +1;
//         yearText.text(current_year);

//     }

//     let ticker = d3.interval(e => {
//         animate();
//     },tickDuration);
  
// });

