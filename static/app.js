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

        // get top 10
        

    }
};