// Create function to plot data for our charts
function plot(id) {

// Using the D3 library to load our samples.json file
    d3.json('data/samples.json').then((bellyButtonData)=> {
        var data = bellyButtonData;
        console.log(data)

        var washingFreq = data.metadata.map(wash => wash.washingFreq)
        console.log(`The washing frequency is: ${washingFreq}`)

        var sampleValues = data.samples.filter(sample => sample.id.toString() === id)[0];
        console.log(sampleValues);

        // refine by top 10
        var topTen = sampleValues.sample_values.slice(0, 10).reverse();

        var topTenOtu = (sampleValues.otu_ids.slice(0, 10)).reverse();

        var IdOtu = topTenOtu.map(data => 'OTU' + data)
        console.log(IdOtu)

        // grab the labels for top 10 for the plots
        var labels = sampleValues.otu_labels.slice(0, 10);
        console.log(sampleValues)

    }
};