d3.json('data/samples.json').then(bellybuttonData) => {
    window.bellybuttonData = bellybuttonData;
    console.log(bellybuttonData);
    var data = bellybuttonData;

    var idList = data.names;
    for (var i = 0; i < idList.length; i++) {
        SelectionBox = d3.select('#selDataset');
        SelectionBox.append('option').text(idList[i]);
    }
}