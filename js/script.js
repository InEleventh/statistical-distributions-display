var pValueCanvas = document.getElementById('pValueChart').getContext('2d')
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
                borderWidth: 2,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
            },
            {
                label: 'left',
                pointRadius: 0,
                borderWidth: 2,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
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
                    removeList = ['Curve 1', 'right', 'left']
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
            duration: 500
        },
    }
})

var tDistCanvas = document.getElementById('tDistChart').getContext('2d')
var tDistChart = new Chart(tDistCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#000',
                data: createTDataset(1, 3, 0.5)
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
            duration: 500
        },
    }
})

//createGausDataset: creates a normal curve dataset to be added to the chart
function createGausDataset(mean, stdev, numdev, inc) {
    var dataset = []
    for (i = (numdev * -1); i < (numdev + inc); i += inc) {
        var xy = {}
        x = i * stdev + mean
        y = jStat.normal.pdf(x, mean, stdev)
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
        y = jStat.normal.pdf(x, mean, stdev)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    dataset.push({
        x: z * stdev + mean,
        y: jStat.normal.pdf(z * stdev + mean, mean, stdev)
        
    })
    return dataset
}

function createLeft(z, mean, stdev, numdev, inc) {
    var dataset = []
    for (i = (numdev * -1); i < z; i += inc) {
        x = i * stdev + mean
        y = jStat.normal.pdf(x, mean, stdev)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    dataset.push({
        x: z * stdev + mean,
        y: jStat.normal.pdf(z * stdev + mean, mean, stdev)
    })
    return dataset
}

function addTails(z, tail) {
    if (tail === 'two') {
        right = createRight(Math.abs(z), 0, 1, 3, 0.5)
        left = createLeft(Math.abs(z) * -1, 0, 1, 3, 0.5)
        pValueChart.data.datasets[1].data = right
        pValueChart.data.datasets[2].data = left

        displayPValue(jStat.ztest(z, 2))
    } else if (tail === 'right') {
        right = createRight(z, 0, 1, 3, 0.5)
        left = []
        pValueChart.data.datasets[1].data = right
        pValueChart.data.datasets[2].data = left

        p = jStat.ztest(z, 1)

        if (z <= 0) {
            displayPValue(1 - p)
        } else {
            displayPValue(p)
        }
    } else if (tail === 'left') {
        right = []
        left = createLeft(z, 0, 1, 3, 0.5)
        pValueChart.data.datasets[1].data = right
        pValueChart.data.datasets[2].data = left

        p = jStat.ztest(z, 1)

        if (z >= 0) {
            displayPValue(1 - p)
        } else {
            displayPValue(p)
        }
    }

    pValueChart.update()
}

function displayPValue(p) {
    var pValueDisplay = document.getElementById('pValueDisplay')
    pValueDisplay.innerHTML = p.toFixed(2)
}

function createTDataset(df, numT, inc) {
    dataset = []
    for (i = numT*-1; i<numT+inc; i+=inc){
        y = jStat.studentt.pdf(i, df)
        dataset.push({x: i, y: y})
    }

    return dataset
}

var pValueButton = document.getElementById('pValueButton')
pValueButton.onclick = function () {
    z = document.getElementById('zInput').value
    radioLeft = document.getElementById('radioLeft')
    radioRight = document.getElementById('radioRight')
    radioTwo = document.getElementById('radioTwo')

    if (radioLeft.checked) {
        addTails(z, 'left')
    } else if (radioRight.checked) {
        addTails(z, 'right')
    } else if (radioTwo.checked) {
        addTails(z, 'two')
    }
}