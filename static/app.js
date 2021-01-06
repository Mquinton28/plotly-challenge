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

    });

}  