var data;
var display_year = "2010", current_year = 2010, display_month = "04", current_month = 4, isPlaying = false;
var barHeight = 20, barWidth = 450, centerOffset = 60;
var valueLabelOffset = 2
const top_n = 10;
const height = 720;
var yearSlice;

const title_margin = 30;
const bottom_axis_margin = 20;

var leftScale;
var rightScale;
var y;

var tickDuration = 1400;
var tickSize = 20;

//inside graph
const margin = {
    top: 0,
    right: 0,
    bottom: 5,
    left: 10
};
let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);

let image_width = 50;
let image_height = 24;
let extra_image_height_gap = -7;

var unique_names = [];
var flags = [];

// ["Nokia", "Apple", "Sony", "Samsung", "RIM", "Motorola", "Google", "LG", 
// "HTC", "T-Mobile", "Palm", "Nintendo", "Huawei", "ZTE", "Xiaomi", 
// "Lenovo", "Coolpad", "K-Touch", "Oppo", "BBK", "Alcatel", "Meizu", "Kyocera", 
// "Mobicel", "LeEco", "QiKU", "OnePlus", "Hisense", "Vivo", "Smartisan"]
const images_logo = [
{"name" : "K-Touch", "width" : 50, "height" : 24, "left_offset" : 100, "right_offset" : 100, "y_offset" : 0},

    {"name" : "Nokia", "width" : 100, "height" : 25, "left_offset" : -165, "right_offset" : 65, "y_offset" : -15},
    {"name" : "Apple", "width" : 50, "height" : 50, "left_offset" : -110, "right_offset" : 60, "y_offset" : -28},
    {"name" : "Sony", "width" : 85, "height" : 24, "left_offset" : -150, "right_offset" : 65, "y_offset" : -10},
    {"name" : "Samsung", "width" : 120, "height" : 75, "left_offset" : -185, "right_offset" : 67, "y_offset" : -40},
    {"name" : "RIM", "width" : 160, "height" : 240, "left_offset" : -226, "right_offset" : 65, "y_offset" : -117},
    {"name" : "Motorola", "width" : 200, "height" : 240, "left_offset" : -260, "right_offset" : 60, "y_offset" : -118},
    {"name" : "Google", "width" : 175, "height" : 24, "left_offset" : -190, "right_offset" : -45,"y_offset" : -10},
    {"name" : "LG", "width" : 170, "height" : 300, "left_offset" : -235, "right_offset" : 65, "y_offset" : -150},
    {"name" : "HTC", "width" : 75, "height" : 24, "left_offset" : -140, "right_offset" : 10, "y_offset" : -10},
    {"name" : "T-Mobile", "width" : 250, "height" : 24, "left_offset" : 100, "right_offset" : 23, "y_offset" : -10},
    {"name" : "Palm", "width" : 38, "height" : 70, "left_offset" : 100, "right_offset" : 70, "y_offset" : -30},
    {"name" : "Nintendo", "width" : 110, "height" : 240, "left_offset" : 100, "right_offset" : 70, "y_offset" : -120},
    {"name" : "Huawei", "width" : 100, "height" : 120, "left_offset" : -115, "right_offset" : 12, "y_offset" : -60},
    {"name" : "ZTE", "width" : 100, "height" : 24, "left_offset" : -90, "right_offset" : -10, "y_offset" : -10},
    {"name" : "Xiaomi", "width" : 40, "height" : 60, "left_offset" : -50, "right_offset" : 10, "y_offset" : -28},
    {"name" : "Lenovo", "width" : 110, "height" : 60, "left_offset" : -118, "right_offset" : 10, "y_offset" : -30},
    {"name" : "Coolpad", "width" : 100, "height" : 60, "left_offset" : -110, "right_offset" : 100, "y_offset" : -30},
    {"name" : "Oppo", "width" : 90, "height" : 50, "left_offset" : -100, "right_offset" : 10, "y_offset" : -20},
    {"name" : "BBK", "width" : 85, "height" : 60, "left_offset" : -100, "right_offset" : 100, "y_offset" : -30},
    {"name" : "Alcatel", "width" : 120, "height" : 60, "left_offset" : 100, "right_offset" : 10, "y_offset" : -30},
    {"name" : "Meizu", "width" : 100, "height" : 60, "left_offset" : -108, "right_offset" : 100, "y_offset" : -30},
    {"name" : "Kyocera", "width" : 120, "height" : 70, "left_offset" : 100, "right_offset" : 5, "y_offset" : -35},
    {"name" : "Mobicel", "width" : 100, "height" : 70, "left_offset" : -115, "right_offset" : 100, "y_offset" : -40},
    {"name" : "LeEco", "width" : 65, "height" : 120, "left_offset" : -80, "right_offset" : 100, "y_offset" : -60},
    {"name" : "QiKU", "width" : 45, "height" : 120, "left_offset" : -90, "right_offset" : 100, "y_offset" : -60},
    {"name" : "OnePlus", "width" : 120, "height" : 120, "left_offset" : -135, "right_offset" : 15, "y_offset" : -60},
    {"name" : "Hisense", "width" : 130, "height" : 120, "left_offset" : -150, "right_offset" : 100, "y_offset" : -60},
    {"name" : "Vivo", "width" : 75, "height" : 120, "left_offset" : -140, "right_offset" : 100, "y_offset" : -65},
    {"name" : "Smartisan", "width" : 95, "height" : 60, "left_offset" : -80, "right_offset" : 100, "y_offset" : -30},
    {"name" : "Doov", "width" : 120, "height" : 120, "left_offset" : 100, "right_offset" : 100, "y_offset" : 0},
];

var focus_testing = "OnePlus"

/* Event handling */
function handleYearInputChange() {
  isPlaying = false;
  displayYear = +this.value;
  updateChart();
}

function myColor(i, name){
    if( name.includes("_china")){
      return d3.scaleLinear().domain([0,top_n])
              .range([ "#A38640", "#A8A595"])(i)
    } else {
      return d3.scaleLinear().domain([0,top_n])
              .range(["#211C1C", "#A38640"])(i)
    }
}

function find_image_by_name(name){
    for(let i =0; i < images_logo.length; i++){
        if (images_logo[i]["name"] == name){
            return images_logo[i]
        }
    }
    console.log(name)
    return -1;
}


/* Initialization */
function initializeAxes() {

    leftScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([0, -barWidth]);

    rightScale = d3.scaleLinear()
                 .domain([0, d3.max(data, d => d.value)])
                 .range([0, barWidth]);
    y = d3.scaleLinear()
          .domain([top_n, 1])
          .range([height - 150, margin.top + title_margin]);

    right_axis = d3.axisTop()
            .scale(rightScale)
            .ticks(5)
            .tickSize(tickSize)
            .tickFormat(d => d3.format(',')(d));

    left_axis = d3.axisTop()
            .scale(leftScale)
            .ticks(5)
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

    data_extracted = year_slice_left.concat(year_slice_right)

    // for(i = 0; i < data_extracted.length; i++){
    //     if (focus_testing == data_extracted[i]["name"].split("_")[0]){
    //         console.log("THERE");
    //     }
    // }

    return data_extracted;

    // var left = data.filter(d => (d.name.includes("_china")) && (d.name.includes(focus_testing)))

    // var right = data.filter(d => (d.name.includes("_us")) && (d.name.includes(focus_testing)))

    // return left.concat(right)
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
        .attr("height", y(1)-y(0)-barPadding)
        .style("fill", function(d){ return myColor( d.rank, d.name ) ; });

    d3.select(".bars")
        .selectAll('image')
        .data(yearSlice, d => d.name)
        .enter()
        .append("svg:image")
        .attr("class", "imageLabel")
        .attr('width', function(d){
            return find_image_by_name(d.name.split("_")[0])["width"];
        })
        .attr('height', function(d){
            return find_image_by_name(d.name.split("_")[0])["height"];
        })
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.value) + find_image_by_name(d.name.split("_")[0])["right_offset"];
            } else{
                return leftScale(d.value) + find_image_by_name(d.name.split("_")[0])["left_offset"];
            }
        })
        .attr("y", function(d){ 
            return y(d.rank) + (y(1)-y(0)-barPadding)/2 + find_image_by_name(d.name.split("_")[0])["y_offset"]; 
        })
        .attr("xlink:href", function(d){ 
            return"images/" + d.name.split("_")[0] +".png"; 
        })

    // d3.select(".bars")
    //     .selectAll('text.nameLabel')
    //     .data(yearSlice, d => d.name)
    //     .enter()
    //     .append('text')
    //     .attr("class", "nameLabel")
    //     .attr("text-anchor", function(d){
    //         if (d.name.includes("_us")){
    //             return "beg";
    //         } else{
    //             return "end";
    //         }
    //     })
    //     .attr("transform", function(d){
    //         if (d.name.includes("_us")){
    //             return "translate(" + centerOffset + ",0)";
    //         } else{
    //             return "translate(-" + centerOffset + ",0)";
    //         }
    //     })
    //     .attr("x", function(d){
    //         if (d.name.includes("_us")){
    //             return rightScale(d.value) + 5;
    //         } else{
    //             return leftScale(d.value) - 5 ;
    //         }
    //     })
    //     .attr("y", function(d){ 
    //         return y(d.rank) + (y(1)-y(0)-barPadding)/2; 
    //     })
    //     .text(function(d){
    //         return d.name.split("_")[0]; 
    //     } );

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
        .style("fill", function(d){ return myColor( d.rank, d.name ) ; })
        .attr("x", 0)
        .attr("y", function(d){ 
            return y(d.rank) + (y(1)-y(0)-barPadding)/2; 
        })
        .text(function(d){
            return d3.format('.2s')(d.value) + "%";
        });

    d3.select(".bars")
        .selectAll("image_left")
        .data([0])
        .enter()
        .append("svg:image")
        .attr('x', -640)
        .attr('y', 300)
        .attr('width', 210)
        .attr('xlink:href', 'images/China.png');

    d3.select(".bars")
        .selectAll("image_right")
        .data([0])
        .enter()
        .append("svg:image")
        .attr('x', 350)
        .attr('y', 300)
        .attr('width', 250)
        .attr('xlink:href', 'images/United States.png');


    d3.select(".title")
    .text("Mobile Devices Market Shares (" + display_year + "-" + display_month + ")");
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

    //append company names not used before (retrieving images and logo)
    // for(i = 0; i< yearSlice.length; i++){
    //     if( !flags[yearSlice[i].name.split("_")[0]]){
    //         flags[yearSlice[i].name.split("_")[0]] = true;
    //         unique_names.push(yearSlice[i].name.split("_")[0]);
    //     }
    // }

    animate_axis()
    animate_bars()
    animate_text()

    d3.select(".title")
    .text("Mobile Devices Market Shares (" + display_year + "-" + display_month + ")");

}

function animate_bars(){

    let bars = d3.select(".bars").selectAll(".bar")
        .data(yearSlice, d => d.name)

    bars.enter()
        .append('rect')
        .attr("class", "bar")
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
            return y(top_n+1) + 100;
        })
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + centerOffset + ",0)";
            } else{
                return "translate(-" + centerOffset + ",0)";
            }
        })
        .style("fill", "#EAE7DC")
        .attr("height", y(1)-y(0)-barPadding)
        .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .style("fill", function(d){ return myColor( d.rank, d.name ) ; })
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
            return y(d.rank) ;
        })
        .style("fill", function(d){ return myColor( d.rank, d.name ) ; });

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
        .attr("y", y(top_n+1) + 100)
        .remove();
}

function animate_text(){
    let valueLabels = d3.select(".bars")
                        .selectAll('text.valueLabel')
                        .data(yearSlice, d => d.name);

    valueLabels
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
            return y(top_n+1) + 100; 
        })
        .text(function(d){
            return d3.format('.2')(d.value) + "%";
        })
        .style("fill", function(d){ return myColor( d.rank, d.name ) ; })
        .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr("y", function(d,i){ 
                return y(d.rank) + (y(1)-y(0)-barPadding)/2;
            });

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .style("fill", function(d){ return myColor( d.rank, d.name ) ; })
        .attr("x", 0)
        .attr("y", function(d,i){ 
            return y(d.rank) + (y(1)-y(0)-barPadding)/2;
        })
        .tween("text", function(d) {
          let i = d3.interpolateNumber(d.lastValue, d.value);
          return function(t) {
            this.textContent = d3.format('.1f')(i(t)) + "%";
          };
        });

    valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr("x",0)
        .attr("y", y(top_n+1)+100)
        .remove();


    let imageLabels = d3.select(".bars")
                        .selectAll('image.imageLabel')
                        .data(yearSlice, d => d.name);

    imageLabels
        .enter()
        .append("svg:image")
        .attr("class", "imageLabel")
        .attr("transform", function(d){
            if (d.name.includes("_us")){
                return "translate(" + centerOffset + ",0)";
            } else{
                return "translate(-" + centerOffset + ",0)";
            }
        })
        .attr('width', function(d){
            return find_image_by_name(d.name.split("_")[0])["width"];
        })
        .attr('height', function(d){
            return find_image_by_name(d.name.split("_")[0])["height"];
        })
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.value) + find_image_by_name(d.name.split("_")[0])["right_offset"];
            } else{
                return leftScale(d.value) + find_image_by_name(d.name.split("_")[0])["left_offset"];
            }
        })
        .attr("y", function(d){ 
            return y(top_n+1)+100 + find_image_by_name(d.name.split("_")[0])["y_offset"]; 
        })
        .attr("xlink:href", function(d){ 
            return"images/" + d.name.split("_")[0] +".png"; 
        })
        .transition()
            .duration(tickDuration*1.5)
            .ease(d3.easeLinear)
            .attr("y", function(d,i){ 
                return y(d.rank)+ (y(1)-y(0)-barPadding)/2 + find_image_by_name(d.name.split("_")[0])["y_offset"];
            });

    imageLabels
      .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.value) + find_image_by_name(d.name.split("_")[0])["right_offset"];
            } else{
                return leftScale(d.value) + find_image_by_name(d.name.split("_")[0])["left_offset"];
            }
        })
        .attr("y", function(d,i){ 
                return y(d.rank)+ (y(1)-y(0)-barPadding)/2 + find_image_by_name(d.name.split("_")[0])["y_offset"];
            })
        .attr("xlink:href", function(d){ 
            return"images/" + d.name.split("_")[0] +".png"; 
        });

    imageLabels
      .exit()
      .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr("x", function(d){
            if (d.name.includes("_us")){
                return rightScale(d.value) + find_image_by_name(d.name.split("_")[0])["right_offset"];
            } else{
                return leftScale(d.value) + find_image_by_name(d.name.split("_")[0])["left_offset"];
            }
        })
        .attr("y", function(d){
            return y(top_n+1)+100 + find_image_by_name(d.name.split("_")[0])["y_offset"];
        })
        .remove();
}

function animate_axis(){

    leftScale.domain([0, d3.max(yearSlice, d => d.value)]);
    rightScale.domain([0, d3.max(yearSlice, d => d.value)])

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

d3.csv("https://gist.githubusercontent.com/flexlev/ef88c3bd5d354473cc9b651eab9c0dc0/raw/bed1e301066a9d6f376f6d634659279c9708c80e/data_cellphone_device.csv").then( function(csv){
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
        if (current_year < 2019){
            animate();
        } else{
            if (current_month < 12){
                animate()
            } else{
                //nothing
            }
        }
        
    },tickDuration);
});