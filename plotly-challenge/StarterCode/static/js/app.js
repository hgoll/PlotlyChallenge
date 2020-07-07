

// ========== Belly Code Sample
// d3.json("../data/samples.json", function(data) {
//     console.log(data);
// });

const importedData = "../data/samples.json";


bellyButton = d3.json(importedData)

var names = [];
var metdat = [];
var samples = [];


//dropdown
var dropdown = d3.select("#selDataset")
    .selectAll("option");

function init(){
    bellyButton.then((data)=> {

        names = data.names;
        metdat = data.metadata;
        samples = data.samples;

        
        var metdatObj = [];
        metdat.forEach((item, index)=>{
            metdatObj.push(item);
        var array1 =[item.id]

        dropdown.data([array1])
            .enter()
            .append("option")              
            .attr("value",function(name){
                return name})           
            .html(function(name){
                return name});

        });
    });

}

init();

//function for page change---- 
// (Uncaught ReferenceError: 
// optionChanged is not defined at HTMLSelectElement.onchange...html line 25)

function optionChanged(element){
    var sample_values = [];
    var otu_ids = [];
    var otu_labels = [];

    var ethnicity = `ethnicity: ${metdat[0].ethnicity}`;
    var gender = `gender: ${metdat[0].gender}`;
    var age = `age: ${metdat[0].age}`;
    var location = `location: ${metdat[0].location}`;
    var bbtype = `bbType: ${metdat[0].bbtype}`;
    var wfreq = `Wfreq: ${metdat[0].wfreq}`;    

    var array = [ethnicity, gender, age, location, bbtype, wfreq];
    var selectSampMD = d3.select("#sample-metadata").append("ul");
    
    selectSampMD.selectAll("li")
        .data(array)
        .enter()
        .append("li")
        .text(function(d) {
            return d
});

    
    samples.forEach((element, index) => {
        sample_values.push(element.sample_values.slice(0,10).reverse());
        otu_ids.push(element.otu_ids.slice(0, 10).reverse());
        otu_labels.push(element.otu_labels.slice(0, 10).reverse());
    })

    var trace = {
        x: sample_values[0],
        y: otu_ids[0],
    
        type: "bar",
        text: otu_labels[0],
        orientation: "h"
    };

    var chartData = [trace];

    var layout = {
        title: "OTU / bacteria",
        xaxis: { title: "OTU"},
        yaxis: { title: "bacteria"}
    };
    Plotly.newPlot("bar", chartData, layout);

    var trace2 = {
        x: otu_ids[0],
        y: sample_values[0],
        mode: 'markers',
        marker: { 
            size: sample_values[0],
            color: otu_ids[0]},
        text: otu_labels,
        type: "scatter"
    };

    var chart = [trace2];

    var layout2 = {
        title: 'Bubble Chart'
    };

    Plotly.newPlot('bubble', chart, layout2);
};

