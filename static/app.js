// Create function to plot data for our charts
function plot(id) {

// Using the D3 library to load our samples.json file
    d3.json('data/samples.json').then((bellyButtonData)=> {
        var data = bellyButtonData;
        console.log(data)

        var washingFreq = data.metadata.map(d => d.washingFreq)
        console.log(`The washing frequency is: ${washingFreq}`)

        
    }
};