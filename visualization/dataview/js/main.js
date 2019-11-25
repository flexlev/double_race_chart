var data;
var display_year = "2010", current_year = 2010, display_month = "04", current_month = 4, isPlaying = false;
var barHeight = 20, barWidth = 500, centerOffset = 60;
var valueLabelOffset = 12
const top_n = 10;
const height = 720;
var yearSlice;

const title_margin = 100;
const bottom_axis_margin = 40;

var leftScale;
var rightScale;
var y;

var tickDuration = 600;

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

    right_axis = d3.axisBottom()
            .scale(rightScale)
            .tickSize(tickSize)
            .tickFormat(d => d3.format(',')(d));

    left_axis = d3.axisBottom()
            .scale(leftScale)
            .tickSize(tickSize)
            .tickFormat(d => d3.format(',')(d));

    d3.select(".right.axis")
    .call(right_axis);

    d3.select(".left.axis")
    .call(left_axis);
}

function getYearData() {
    year_slice_left = data.filter(d => (d.date == display_year + "-" + display_month) && (d.name.includes("_china")))
                            .sort((a,b) => b.value - a.value)
                            .slice(0,top_n);

    year_slice_right = data.filter(d => (d.date == display_year + "-" + display_month) && (d.name.includes("_us")))
                            .sort((a,b) => b.value - a.value)
                            .slice(0,top_n);


    return year_slice_left.concat(year_slice_right);
}

function initializeChart() {
    yearSlice = getYearData();

    d3.select(".bars")
        .selectAll("g.bar-group")
        .data(yearSlice, d => d.name)
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
            return y(d.rank);
        })
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + centerOffset + ",0)";
            } else{
                return "translate(-" + centerOffset + ",0)";
            }
        })
        .attr("height", y(1)-y(0)-barPadding);

    d3.select(".bars")
        .selectAll('text.nameLabel')
        .data(yearSlice, d => d.name)
        .enter()
        .append('text')
        .attr("class", "nameLabel")
        .attr("text-anchor", function(d){
            if (d.name.includes("_us")){
                return "beg";
            } else{
                return "end";
            }
        })
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + centerOffset + ",0)";
            } else{
                return "translate(-" + centerOffset + ",0)";
            }
        })
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.value) + 5;
            } else{
                return leftScale(d.value) - 5 ;
            }
        })
        .attr("y", function(d){ 
            return y(d.rank) + (y(1)-y(0)-barPadding)/2; 
        })
        .text(function(d){
            return d.name; 
        } );

    d3.select(".bars")
        .selectAll('text.valueLabel')
        .data(yearSlice, d => d.name)
        .enter()
        .append('text')
        .attr("class", "valueLabel")
        .attr("text-anchor", function(d){
            if (d.name.includes("_us")){
                return "beg";
            } else{
                return "end";
            }
        })
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + valueLabelOffset + ",0)";
            } else{
                return "translate(-" + valueLabelOffset + ",0)";
            }
        })
        .attr("x", 0)
        .attr("y", function(d){ 
            return y(d.rank) + (y(1)-y(0)-barPadding)/2; 
        })
        .text(function(d){
            return d3.format('.2s')(d.value) + "%";
        });


    d3.select(".title")
    .text("Mobile Devices Market Proportions (" + display_year + "-" + display_month + ")");
}

function updateDate(){
    
    current_month = (current_month < 12) ? current_month + 1 : 1;
    current_year = (current_month == 1) ? current_year + 1 : current_year;
    display_year = "" + current_year;
    display_month = (current_month < 10) ? "0" + current_month  : "" + current_month;
}

function animate(){
    updateDate();
    yearSlice = getYearData();
    animate_axis()
    animate_bars()



    d3.select(".title")
    .text("Mobile Devices Market Proportions (" + display_year + "-" + display_month + ")");

}

function animate_bars(){

    let bars = d3.select(".bars").selectAll(".bar")
        .data(yearSlice, d => d.name)

                // d3.select(".bars")
                // .selectAll("g.bar-group")
                // .data(yearSlice, d => d.name)
                // .enter()
                // .append('rect')
                // .attr("class", "bar")
                // .attr("x", function(d){
                //     if (d.name.includes("_us")){
                //         return 0;
                //     } else{
                //         return leftScale(d.value);
                //     }
                // })
                // .attr("width", function(d){
                //     if (d.name.includes("_us")){
                //         return rightScale(d.value);
                //     } else{
                //         return -1*leftScale(d.value);
                //     }
                // })
                // .attr("y", function(d){
                //     return y(d.rank);
                // })
                // .attr("transform", function(d){
                //     if (d.name.includes("_us")){
                //         return "translate(" + centerOffset + ",0)";
                //     } else{
                //         return "translate(-" + centerOffset + ",0)";
                //     }
                // })
                // .attr("height", y(1)-y(0)-barPadding);


    bars.enter()
        .append('rect')
        .attr("class", function(d,i){ 
            return `bar ${d.name}`;
        })
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return 0;
            } else{
                return leftScale(d.lastValue);
            }
        })
        .attr("width", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.lastValue);
            } else{
                return -1*leftScale(d.lastValue);
            }
        })
        .attr("y", function(d){
            return y(top_n+1);
        })
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + centerOffset + ",0)";
            } else{
                return "translate(-" + centerOffset + ",0)";
            }
        })
        .attr("height", y(1)-y(0)-barPadding)
        .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                if (d.name.includes("_us")){
                    return 0;
                } else{
                    return leftScale(d.value);
                }
            })
            .attr("width", function(d,i){ 
                if (d.name.includes("_us")){
                return rightScale(d.value);
            } else{
                return -1*leftScale(d.value);
            }
            });

        bars
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                if (d.name.includes("_us")){
                    return 0;
                } else{
                    return leftScale(d.value);
                }
            })
            .attr("width", function(d,i){ 
                if (d.name.includes("_us")){
                    return rightScale(d.value);
                } else{
                    return -1*leftScale(d.value);
            }
            })
            .attr("y", function(d,i){ 
                return y(d.rank);
            })

        bars
          .exit()
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr("x", function(d){
                if (d.name.includes("_us")){
                    return 0;
                } else{
                    return leftScale(d.value);
                }
            })
            .attr("width", function(d,i){ 
                if (d.name.includes("_us")){
                    return rightScale(d.value);
                } else{
                    return -1*leftScale(d.value);
                }
            })
            .attr("y", y(top_n+1))
            .remove();

    // let bars = svg.selectAll('.bar').data(yearSlice, d => d.name);


        // bars
        //   .enter()
        //   .append('rect')
        //   .attr("class", function(d,i){ 
        //     return `bar ${d.name}`;
        // })
        //   .attr("x", x(0)+1)
        //   .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
        //   .attr("y", y(top_n+1)+5)
        //   .attr("height", y(1)-y(0)-barPadding)
        // //   .style("fill", function(d,i){ 
        // //     return d.colour;
        // // })
        //   .transition()
        //     .duration(tickDuration)
        //     .ease(d3.easeLinear)
        //     .attr("width", function(d,i){ return y(d.rank)+5;});


        // bars
        //   .transition()
        //     .duration(tickDuration)
        //     .ease(d3.easeLinear)
        //     .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
        //     .attr("y", function(d,i){ 
        //         return y(d.rank)+5;
        //     })

        // bars
        //   .exit()
        //   .transition()
        //     .duration(tickDuration)
        //     .ease(d3.easeLinear)
        //     .attr("width", function(d,i){ return x(d.value)-x(0)-1;})
        //     .attr("y", y(top_n+1)+5)
        //     .remove();
}

function animate_axis(){

    leftScale.domain([0, d3.max(yearSlice.filter(d => (d.name.includes("_china"))), d => d.value)]);
    rightScale.domain([0, d3.max(yearSlice.filter(d => (d.name.includes("_us"))), d => d.value)])

    d3.select(".left.axis")
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .call(left_axis);

    d3.select(".right.axis")
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .call(right_axis);
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
    initializeChart();

    let ticker = d3.interval(e => {
        animate();
    },tickDuration);
});