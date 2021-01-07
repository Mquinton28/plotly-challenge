var dropDown = d3.select("#selDataset");


function getPlot(id) {
 
    // Using the D3 library to load our samples.json file
    d3.json('data/samples.json').then((bellyButtonData) => {
        console.log(bellyButtonData)

        var metadata = bellyButtonData.metadata;

        var filteredMetadata = metadata.filter(meta => meta.id.toString() === id)[0];

        var panel = d3.select('#sample-metadata');

        panel.html('');

        Object.entries(filteredMetadata).forEach((key) => {
            panel.append('h5').text(key[0].toUpperCase() + ': ' + key[1] + '\n');
        });

        var sampleValues = bellyButtonData.samples.filter(sample => sample.id.toString() === id)[0];
        console.log(sampleValues);

        // refine by top 10
        var topTen = sampleValues.sample_values.slice(0, 10).reverse();

        var OTU_topTen = (sampleValues.otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_topTen.map(data => 'OTU' + data)
        console.log(OTU_topTen)

        // grab the labels for top 10 for the plots
        var labels = sampleValues.otu_labels.slice(0, 10);
        console.log(sampleValues)

        // create the traces for my plots
        var traceBar = {
            x: topTen,
            y: OTU_id,
            text: labels,
            type: 'bar',
            orientation: 'h',
        };

        //data
        var data = [traceBar];

        //layout
        var layout = {
            title: 'Top Ten OTU Values',
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            }
        };

        Plotly.newPlot('bar', data, layout);

        var traceBubble = {
            x: sampleValues.otu_ids,
            y: sampleValues.sample_values,
            mode: 'markers',
            marker: {
                size: sampleValues.sample_values,
                color: sampleValues.otu_ids
            },
            text: sampleValues.otu_labels
        };

        var layoutBubble = {
           xaxis:{title: 'OTU ID'},
           height: 600,
           width: 1000 
        };

        var dataBubble = [traceBubble];

        Plotly.newPlot('bubble', dataBubble, layoutBubble);

    });
}  
function init() {
    d3.json('data/samples.json').then((bellyButtonData) => {
        var idNames = bellyButtonData.names
        idNames.forEach(d => {
            dropDown.append('option').text(d).property('value', d)
        });

    }) 


getPlot('940')
}
init()