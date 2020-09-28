//normal distribution canvas and chart
var normDistCanvas = document.getElementById('normDistChart').getContext('2d')
var normDistChart = new Chart(normDistCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#4d4a4a',
                data: createGausDataset(0, 1, 3, 0.5)
            },
            {
                label: 'left',
                pointRadius: 0,
                borderWidth: 5,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
            },
            {
                label: 'right',
                pointRadius: 0,
                borderWidth: 5,
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
                    max: 0.45,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 5.5,
            }
        },
        animation: {
            duration: 200
        },
    }
})

//t distribution canvas and chart
var tDistCanvas = document.getElementById('tDistChart').getContext('2d')
var tDistChart = new Chart(tDistCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#4d4a4a',
                data: createTDataset(1, 4, 0.5)
            },
            {
                label: 'left',
                pointRadius: 0,
                borderWidth: 5,
                borderColor: '#C64C80',
                backgroundColor: '#C64C80',
            },
            {
                label: 'right',
                pointRadius: 0,
                borderWidth: 5,
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
                    removeList = ['Curve 1', 'left', 'right']
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
                    min: -4,
                    max: 4,
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    display: true,
                    max: 0.45,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 5.5,
            }
        },
        animation: {
            duration: 200
        },
    }
})

//f distribution canvas and chart
var fDistCanvas = document.getElementById('fDistChart').getContext('2d')
var fDistChart = new Chart(fDistCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#4d4a4a',
                data: createFDataset(5, 10, 5, 0.5)
            },
            {
                label: 'tail',
                pointRadius: 0,
                borderWidth: 5,
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
                    removeList = ['Curve 1', 'tail']
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
                    max: 6,
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
            duration: 200
        },
    }
})

//chi-square distribution canvas and chart
var chiDistCanvas = document.getElementById('chiDistChart').getContext('2d')
var chiDistChart = new Chart(chiDistCanvas, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Curve 1',
                pointRadius: 0,
                fill: false,
                borderColor: '#4d4a4a',
                data: createChiDataset(15, 60, 0.5)
            },
            {
                label: 'tail',
                pointRadius: 0,
                borderWidth: 5,
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
                    removeList = ['Curve 1', 'tail']
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
                    max: 60,
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
            duration: 200
        },
    }
})

//functions for normal
//createGausDataset: creates a normal curve dataset
function createGausDataset(mean, stdev, numdev, inc) {
    var dataset = []
    for (var i = (numdev * -1); i < (numdev + inc); i += inc) {
        var xy = {}
        var x = i * stdev + mean
        var y = jStat.normal.pdf(x, mean, stdev)
        xy = {
            x: x,
            y: y
        }
        dataset.push(xy)
    }
    return dataset
}

//createNormalTails: creates left and/or right tails for the normal curve
function createNormalTails(alpha, numTails, mean, stdev, numdev, inc) {
    var left = []
    var right = []
    var z = jStat.normal.inv(alpha, mean, stdev)

    if (numTails === 2) {
        z = jStat.normal.inv(alpha / 2, mean, stdev)
    }

    for (var i = (numdev * -1); i < z; i += inc) {
        var x = i * stdev + mean
        var y = jStat.normal.pdf(x, mean, stdev)
        var xy = {
            x: x,
            y: y
        }
        left.push(xy)
    }
    left.push({
        x: z * stdev + mean,
        y: jStat.normal.pdf(z * stdev + mean, mean, stdev)
    })

    if (numTails === 2) {
        z = z * -1

        for (var i = numdev; i > z; i -= inc) {
            var x = i * stdev + mean
            var y = jStat.normal.pdf(x, mean, stdev)
            var xy = {
                x: x,
                y: y
            }
            right.push(xy)
        }
        right.push({
            x: z * stdev + mean,
            y: jStat.normal.pdf(z * stdev + mean, mean, stdev)
        })
    }

    return [left, right]
}

//updateNormChart: changes the curve and or tails of the normal curve
function updateNormChart(stdev, alpha, numTails) {
    var newCurve = createGausDataset(0, stdev, 4, 0.5)
    var newTails = createNormalTails(alpha, numTails, 0, stdev, 4, 0.1)

    normDistChart.data.datasets[0].data = newCurve
    normDistChart.data.datasets[1].data = newTails[0]
    normDistChart.data.datasets[2].data = newTails[1]
    normDistChart.update()
}

//changeNormSettings: retives settings changes from normal sliders and radios
function changeNormSettings() {
    var sd = parseFloat(document.getElementById('normSDRange').value)
    var alpha = parseFloat(document.getElementById('normAlphaRange').value)

    if (document.getElementById('normOneTail').checked) {
        updateNormChart(sd, alpha, 1)
    } else if (document.getElementById('normTwoTail').checked) {
        updateNormChart(sd, alpha, 2)
    }

    document.getElementById('normSDDisplay').innerHTML = sd
    document.getElementById('normAlphaDisplay').innerHTML = alpha
}

//functions for t
//createTDataset creates a t curve dataset
function createTDataset(df, numT, inc) {
    var dataset = []

    for (var i = numT * -1; i < numT + inc; i += inc) {
        var y = jStat.studentt.pdf(i, df)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createTTails: creates left and/or right tails for the t curve
function createTTails(alpha, numTails, df, numT, inc) {
    var dataset1 = []
    var dataset2 = []
    var x = jStat.studentt.inv(alpha, df)

    if (numTails === 2) {
        x = jStat.studentt.inv(alpha / 2, df)
    }

    for (var i = numT * -1; i < x; i += inc) {
        var y = jStat.studentt.pdf(i, df)
        dataset1.push({ x: i, y: y })
    }
    dataset1.push({ x: x, y: jStat.studentt.pdf(x, df) })

    if (numTails === 2) {
        for (var i = numT; i > x * -1; i -= inc) {
            var y = jStat.studentt.pdf(i, df)
            dataset2.push({ x: i, y: y })
        }
        dataset2.push({ x: x * -1, y: jStat.studentt.pdf(x * -1, df) })
    }

    return [dataset1, dataset2]
}

//updateNormChart: changes the curve and or tails of the t curve
function updateTChart(df, alpha, numTails) {
    var newTCurve = createTDataset(df, 4, 0.5)
    var newTails = createTTails(alpha, numTails, df, 4, 0.1)

    tDistChart.data.datasets[0].data = newTCurve
    tDistChart.data.datasets[1].data = newTails[0]
    tDistChart.data.datasets[2].data = newTails[1]
    tDistChart.update()
}

//changeNormSettings: retives settings changes from normal sliders and radios
function changeTSettings() {
    var df = parseFloat(document.getElementById('tDFRange').value) 
    var alpha = parseFloat(tAlphaRange = document.getElementById('tAlphaRange').value)

    if (document.getElementById('tOneTail').checked) {
        updateTChart(df, alpha, 1)
    } else if (document.getElementById('tTwoTail').checked) {
        updateTChart(df, alpha, 2)
    }

    document.getElementById('tDFDisplay').innerHTML = df
    document.getElementById('tAlphaDisplay').innerHTML = alpha
}

//functions for f
//createFDataset creates a f curve dataset
function createFDataset(df1, df2, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.centralF.pdf(i, df1, df2)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createFTails: creates a tail for the f curve
function createFTail(alpha, df1, df2, endPoint, inc) {
    var tail = []
    var x = jStat.centralF.inv(1 - alpha, df1, df2)

    for (var i = endPoint; i > x; i -= inc) {
        var y = jStat.centralF.pdf(i, df1, df2)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.centralF.pdf(x, df1, df2) })

    return tail
}

//updateFChart: changes the curve and or tails of the t curve
function updateFChart(df1, df2, alpha) {
    var newF = createFDataset(df1, df2, 6, 0.1)
    var newTail = createFTail(alpha, df1, df2, 6, 0.1)

    fDistChart.data.datasets[0].data = newF
    fDistChart.data.datasets[1].data = newTail
    fDistChart.update()
}

//changeFSettings: retives settings changes from normal sliders and radios
function changeFSettings() {
    var df1 = parseFloat(fDF1Range.value)
    var df2 = parseFloat(fDF2Range.value)
    var alpha = parseFloat(fAlphaRange.value)

    updateFChart(df1, df2, alpha)

    document.getElementById('fDF1Display').innerHTML = df1
    document.getElementById('fDF2Display').innerHTML = df2
    document.getElementById('fAlphaDisplay').innerHTML = alpha
}

//functions for chi-square
function createChiDataset(df, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i += inc) {
        var y = jStat.chisquare.pdf(i, df)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

function createChiTail(alpha, df, endPoint, inc) {
    var tail = []
    var x = jStat.chisquare.inv(1 - alpha, df)

    for (var i = endPoint; i > x; i -= inc) {
        var y = jStat.chisquare.pdf(i, df)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.chisquare.pdf(x, df) })

    return tail
}

function updateChiChart(df, alpha) {
    var newChi = createChiDataset(df, 60, 0.1)
    var newTail = createChiTail(alpha, df, 60, 0.1)

    chiDistChart.data.datasets[0].data = newChi
    chiDistChart.data.datasets[1].data = newTail
    chiDistChart.update()
}

function changeChiSettings(){
    var df = parseFloat(document.getElementById('chiDFRange').value)
    var alpha = parseFloat(document.getElementById('chiAlphaRange').value)

    updateChiChart(df, alpha)

    document.getElementById('chiDFDisplay').innerHTML = df
    document.getElementById('chiAlphaDisplay').innerHTML = alpha
}

//normal options controls
document.getElementById('normSDRange').oninput = changeNormSettings
document.getElementById('normAlphaRange').oninput = changeNormSettings
document.getElementById('normOneTail').onclick = changeNormSettings
document.getElementById('normTwoTail').onclick = changeNormSettings

//t options controls
document.getElementById('tDFRange').oninput = changeTSettings
document.getElementById('tAlphaRange').oninput = changeTSettings
document.getElementById('tOneTail').onclick = changeTSettings
document.getElementById('tTwoTail').onclick = changeTSettings

//f options controls
document.getElementById('fDF1Range').oninput = changeFSettings
document.getElementById('fDF2Range').oninput = changeFSettings
document.getElementById('fAlphaRange').oninput = changeFSettings

//chi options controls
document.getElementById('chiDFRange').oninput = changeChiSettings
document.getElementById('chiAlphaRange').oninput = changeChiSettings

//initial setup 
changeNormSettings()
changeTSettings()
changeFSettings()
changeChiSettings()