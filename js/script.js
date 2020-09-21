//calcGaus: calculates the y value of a x based on the gausian fucntion
function calcGaus(mean, stdev, x) {
    var part1 = 1 / (stdev * Math.sqrt(2 * Math.PI))
    var part2 = Math.exp(-1 * (Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))))
    return (part1 * part2)
}

//createGausDataset: creates a normal curve dataset to be added to the chart
function createGausDataset(mean, stdev, numdev, inc) {
    var dataset = []
    for (i = (numdev * -1); i < (numdev + inc); i += inc) {
        var xy = {}
        x = i * stdev + mean
        y = calcGaus(mean, stdev, x)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    return dataset
}

function createRight(z, mean, stdev, numdev, inc) {
    var dataset = []
    for (i = numdev; i > z; i -= inc) {
        x = i * stdev + mean
        y = calcGaus(mean, stdev, x)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    dataset.push({
        x: z * stdev + mean,
        y: calcGaus(mean, stdev, z * stdev + mean)
    })
    return dataset
}

function createLeft(z, mean, stdev, numdev, inc) {
    var dataset = []
    for (i = (numdev * -1); i < z; i += inc) {
        x = i * stdev + mean
        y = calcGaus(mean, stdev, x)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    dataset.push({
        x: z * stdev + mean,
        y: calcGaus(mean, stdev, z * stdev + mean)
    })
    return dataset
}

var pValueCanvas = document.getElementById('pValueChart').getContext('2d');
var pValueChart = new Chart(pValueCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#000',
                data: createGausDataset(0, 1, 3, 0.5)
            },
            {
                label: 'right',
                pointRadius: 0,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
                data: createRight(1.28, 0, 1, 3, 0.5)
            },
            {
                label: 'left',
                pointRadius: 0,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
                data: createLeft(-1.28, 0, 1, 3, 0.5)
            },
        ],
    },
    options: {
        title: {
            text: 'Alpha, Beta and Power',
            display: false,
        },
        legend: {
            position: 'bottom',
            labels: {
                filter: function (item, chart) {
                    removeList = []
                    if (removeList.includes(item.text)) {
                        return false
                    }
                    return true
                }
            }
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                display: true,
                ticks: {
                    display: true,
                    //suggestedMin: -6,
                    //suggestedMax: 6,
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    display: true,
                    //suggestedMax: 0.45,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 5.5,
            }
        },
        animation: {
            duration: 300
        },
    }
});