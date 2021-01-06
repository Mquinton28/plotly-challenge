function getPlot(id) {
 
    // Using the D3 library to load our samples.json file
    d3.json('data/samples.json').then((bellyButtonData) => {
        console.log(bellyButtonData)

        var washingFreq = bellyButtonData.metadata.map(wash => wash.washingFreq)
        console.log(`The washing frequency is: ${washingFreq}`)

        var sampleValues = bellyButtonData.sampleValues.filter(sample => sample.id.toString() === id)[0];
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
            y: IdOtu,
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

        var dataGuage = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washingFreq,
                title: {text: 'Washing Frequency'},
                type: 'indicator',
                mode: 'guage+number',
                guage: {
                    axis: { range: [null, 14] },
                    steps: [
                    { range: [0, 2], color: 'pink' },
                    { range: [2, 4], color: 'navy' },
                    { range: [4, 6], color: 'yellow' },
                    { range: [6, 8], color: 'royal' },
                    { range: [8, 9], color: 'green' },
                    { range: [9, 10], color: 'red' },
                    { range: [10, 11], color: 'cyan' },
                    { range: [11, 12], color: 'purple' },
                    { range: [12, 13], color: 'orange' },
                    { range: [13, 14], color: 'lime' }
                    ],
                    threshold: {
                        line: {color: 'black', width: 4 },
                        thickness: 0.75,
                        value: 13
                    }
                }
            }
        ];

        var layoutGuage = { 
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0 }
        };
        Plotly.newPlot('guage', dataGuage, layoutGuage);

    });

}  