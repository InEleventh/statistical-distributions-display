//functions for normal
//createNormalChart: creates a normal distribution chart in a specified canvas
function createNormChart(canvas) {
    normDistCanvas = document.getElementById(canvas).getContext('2d')
    normDistChart = new Chart(normDistCanvas, {
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
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'right', 'left']
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
                        min: -6,
                        max: 6,
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
}

//createGausDataset: creates a normal curve dataset
function createGausDataset(mean, stdev, numdev, inc) {
    var dataset = []
    for (var i = (numdev * -1); i < (numdev + inc); i += inc) {
        var xy = {}
        var x = i
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
        var x = i
        var y = jStat.normal.pdf(x, mean, stdev)
        var xy = {
            x: x,
            y: y
        }
        left.push(xy)
    }
    left.push({
        x: z,
        y: jStat.normal.pdf(z, mean, stdev)
    })

    if (numTails === 2) {
        z = z * -1

        for (var i = numdev; i > z; i -= inc) {
            var x = i
            var y = jStat.normal.pdf(x, mean, stdev)
            var xy = {
                x: x,
                y: y
            }
            right.push(xy)
        }
        right.push({
            x: z,
            y: jStat.normal.pdf(z, mean, stdev)
        })
    }

    return [left, right]
}

//updateNormChart: changes the curve and or tails of the normal curve
function updateNormChart(mean, stdev, alpha, numTails) {
    var newCurve = createGausDataset(mean, stdev, 6, 0.5)
    var newTails = createNormalTails(alpha, numTails, mean, stdev, 6, 0.1)

    normDistChart.data.datasets[0].data = newCurve
    normDistChart.data.datasets[1].data = newTails[0]
    normDistChart.data.datasets[2].data = newTails[1]
    normDistChart.update()
}

//changeNormSettings: retives settings changes from normal sliders and radios
function changeNormSettings() {
    var sd = parseFloat(document.getElementById('normSDRange').value)
    var alpha = parseFloat(document.getElementById('normAlphaRange').value)
    var mean = parseFloat(document.getElementById('normMeanRange').value)

    if (document.getElementById('normOneTail').checked) {
        updateNormChart(mean, sd, alpha, 1)

        var x = jStat.normal.inv(alpha, mean, sd).toFixed(2)
        var z = ((x - mean) / sd).toFixed(2)

        document.getElementById('normZDisplay').innerHTML = 'Critical z Value: ' + z
        document.getElementById('normZLeftDisplay').innerHTML = ''
        document.getElementById('normZRightDisplay').innerHTML = ''

        document.getElementById('normXDisplay').innerHTML = 'Critical x Value: ' + x
        document.getElementById('normXLeftDisplay').innerHTML = ''
        document.getElementById('normXRightDisplay').innerHTML = ''
    } else if (document.getElementById('normTwoTail').checked) {
        updateNormChart(mean, sd, alpha, 2)

        var xLeft = jStat.normal.inv(alpha / 2, mean, sd).toFixed(2)
        var zLeft = ((xLeft - mean) / sd).toFixed(2)
        var xRight = jStat.normal.inv(1 - alpha / 2, mean, sd).toFixed(2)
        var zRight = ((xRight - mean) / sd).toFixed(2)

        document.getElementById('normZLeftDisplay').innerHTML = 'Critical Left z Value: ' + zLeft
        document.getElementById('normZRightDisplay').innerHTML = 'Critical Right z Value: ' + zRight
        document.getElementById('normZDisplay').innerHTML = ''

        document.getElementById('normXLeftDisplay').innerHTML = 'Critical Left x Value: ' + xLeft
        document.getElementById('normXRightDisplay').innerHTML = 'Critical Right x Value: ' + xRight
        document.getElementById('normXDisplay').innerHTML = ''
    }

    document.getElementById('normSDDisplay').innerHTML = sd
    document.getElementById('normAlphaDisplay').innerHTML = alpha
    document.getElementById('normMeanDisplay').innerHTML = mean
}


//functions for normal proportion
//createNormalChart: creates a normal distribution chart in a specified canvas
function createNormPropChart(canvas) {
    normDistCanvas = document.getElementById(canvas).getContext('2d')
    normDistChart = new Chart(normDistCanvas, {
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
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'right', 'left']
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
                        min: 0,
                        max: 1,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        max: 10,
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
}

//updateNormChart: changes the curve and or tails of the normal curve
function updateNormPropChart(mean, stdev) {
    var newCurve = createGausDataset(mean, stdev, 3, 0.01)

    normDistChart.data.datasets[0].data = newCurve
    normDistChart.update()
}

//changeNormPropSettings: retives settings changes from normal sliders and radios
function changeNormPropSettings() {
    var p = parseFloat(document.getElementById('normPRange').value)
    var n = parseFloat(document.getElementById('normNRange').value)
    var sd = Math.sqrt((p * (1 - p)) / n)

    updateNormPropChart(p, sd)

    document.getElementById('normpropSDDisplay').innerHTML = 'SD = &radic;' + "(" + p.toFixed(2) + "*" + (1 - p).toFixed(2) + ")" + "/" + n + "=" + sd.toFixed(2)
    document.getElementById('normpropMeanDisplay').innerHTML = "Mean: " + p.toFixed(2)

    document.getElementById('normPDisplay').innerHTML = p
    document.getElementById('normNDisplay').innerHTML = n
}


//functions for t
//createTChart: creates a t distribution chart in a specified canvas
function createTChart(canvas) {
    tDistCanvas = document.getElementById(canvas).getContext('2d')
    tDistChart = new Chart(tDistCanvas, {
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
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'left', 'right']
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
}

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

//changeNormSettings: retives settings changes from t sliders and radios
function changeTSettings() {
    var df = parseFloat(document.getElementById('tDFRange').value)
    var alpha = parseFloat(tAlphaRange = document.getElementById('tAlphaRange').value)

    if (document.getElementById('tOneTail').checked) {
        updateTChart(df, alpha, 1)

        var x = jStat.studentt.inv(alpha, df).toFixed(2)

        document.getElementById('tXDisplay').innerHTML = 'Critical t Value: ' + x.toString()
        document.getElementById('tXLeftDisplay').innerHTML = ''
        document.getElementById('tXRightDisplay').innerHTML = ''
    } else if (document.getElementById('tTwoTail').checked) {
        updateTChart(df, alpha, 2)

        var xLeft = jStat.studentt.inv(alpha / 2, df).toFixed(2)
        var xRight = jStat.studentt.inv(1 - alpha / 2, df).toFixed(2)

        document.getElementById('tXLeftDisplay').innerHTML = 'Critical Left t Value: ' + xLeft.toString()
        document.getElementById('tXRightDisplay').innerHTML = 'Critical Right t Value: ' + xRight.toString()
        document.getElementById('tXDisplay').innerHTML = ''
    }

    document.getElementById('tDFDisplay').innerHTML = df
    document.getElementById('tAlphaDisplay').innerHTML = alpha
}


//functions for f
//createFChart: creates a f distribution chart in a specified canvas
function createFChart(canvas) {
    fDistCanvas = document.getElementById(canvas).getContext('2d')
    fDistChart = new Chart(fDistCanvas, {
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
                        var removeList = ['Curve 1', 'tail']
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
                        max: 1.2,
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
}

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

//updateFChart: changes the curve and/or tails of the t curve
function updateFChart(df1, df2, alpha) {
    var newF = createFDataset(df1, df2, 6, 0.1)
    var newTail = createFTail(alpha, df1, df2, 6, 0.1)

    fDistChart.data.datasets[0].data = newF
    fDistChart.data.datasets[1].data = newTail
    fDistChart.update()
}

//changeFSettings: retives settings changes from f sliders
function changeFSettings() {
    var df1 = parseFloat(fDF1Range.value)
    var df2 = parseFloat(fDF2Range.value)
    var alpha = parseFloat(fAlphaRange.value)
    var x = jStat.centralF.inv(1 - alpha, df1, df2).toFixed(2)

    updateFChart(df1, df2, alpha)

    document.getElementById('fDF1Display').innerHTML = df1
    document.getElementById('fDF2Display').innerHTML = df2
    document.getElementById('fAlphaDisplay').innerHTML = alpha
    document.getElementById('fXDisplay').innerHTML = 'Critical f Value: ' + x.toString()
}


//functions for chi-square
//createChiChart: creates a chi-square distribution chart in a specified canvas
function createChiChart(canvas) {
    chiDistCanvas = document.getElementById(canvas).getContext('2d')
    chiDistChart = new Chart(chiDistCanvas, {
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
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'tail']
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
                        suggestedMax: 0.1,
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
}

//createChiDataset creates a chi-square curve dataset
function createChiDataset(df, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i += inc) {
        var y = jStat.chisquare.pdf(i, df)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createChiTail: creates a tail for the chi-square curve
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

//updateChiChart: changes the curve and/or tails of the chi-square curve
function updateChiChart(df, alpha) {
    var newChi = createChiDataset(df, 60, 0.1)
    var newTail = createChiTail(alpha, df, 60, 0.1)

    chiDistChart.data.datasets[0].data = newChi
    chiDistChart.data.datasets[1].data = newTail
    chiDistChart.update()
}

//changeChiSettings: retives settings changes from chi-square sliders
function changeChiSettings() {
    var df = parseFloat(document.getElementById('chiDFRange').value)
    var alpha = parseFloat(document.getElementById('chiAlphaRange').value)
    var x = jStat.chisquare.inv(1 - alpha, df).toFixed(2)

    updateChiChart(df, alpha)

    document.getElementById('chiDFDisplay').innerHTML = df
    document.getElementById('chiAlphaDisplay').innerHTML = alpha
    document.getElementById('chiXDisplay').innerHTML = 'Critical Χ<sup>2</sup> Value: ' + x.toString()
}


//functions for gamma
//createGammaChart: creates a gamma distribution chart in a specified canvas
function createGammaChart(canvas) {
    gammaDistCanvas = document.getElementById(canvas).getContext('2d')
    gammaDistChart = new Chart(gammaDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                    data: createGammaDataset(9, 0.5, 10, 0.1)
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'tail']
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
                        suggestedMax: 0.15,
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
}

//createGammaDataset creates gamma curve dataset
function createGammaDataset(shape, scale, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.gamma.pdf(i, shape, scale)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createGammaTail: creates a tail for the gamma curve
function createGammaTail(alpha, shape, scale, endPoint, inc) {
    var tail = []
    var x = jStat.gamma.inv(1 - alpha, shape, scale)

    for (var i = endPoint; i > x; i -= inc) {
        var y = jStat.gamma.pdf(i, shape, scale)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.gamma.pdf(x, shape, scale) })

    return tail
}

//updateGammaChart: changes the curve and/or tails of the gamma curve
function updateGammaChart(shape, scale, alpha) {
    var newG = createGammaDataset(shape, scale, 100, 0.1)
    var newTail = createGammaTail(alpha, shape, scale, 100, 0.1)

    gammaDistChart.data.datasets[0].data = newG
    gammaDistChart.data.datasets[1].data = newTail
    gammaDistChart.update()
}

//changeGammaSettings: retives settings changes from gamma sliders
function changeGammaSettings() {
    var shape = parseFloat(document.getElementById('gammaShapeRange').value)
    var scale = parseFloat(document.getElementById('gammaScaleRange').value)
    var alpha = parseFloat(document.getElementById('gammaAlphaRange').value)
    var x = jStat.gamma.inv(1 - alpha, shape, scale).toFixed(2)

    updateGammaChart(shape, scale, alpha)

    document.getElementById('gammaShapeDisplay').innerHTML = shape
    document.getElementById('gammaScaleDisplay').innerHTML = scale
    document.getElementById('gammaAlphaDisplay').innerHTML = alpha
    document.getElementById('gammaXDisplay').innerHTML = 'Critical Γ Value: ' + x.toString()
}


//functions for beta
//createBetaChart: creates a beta distribution chart in a specified canvas
function createBetaChart(canvas) {
    betaDistCanvas = document.getElementById(canvas).getContext('2d')
    betaDistChart = new Chart(betaDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                    data: createGammaDataset(9, 0.5, 10, 0.1)
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        max: 1,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        suggestedMax: 5,
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
}

//createBetaDataset creates beta curve dataset
function createBetaDataset(shape1, shape2, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.beta.pdf(i, shape1, shape2)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createBetaTail: creates a tail for the beta curve
function createBetaTail(alpha, shape1, shape2, endPoint, inc) {
    var tail = []
    var x = jStat.beta.inv(1 - alpha, shape1, shape2)

    for (var i = endPoint; i > x; i = i - inc) {
        var y = jStat.beta.pdf(i, shape1, shape2)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.beta.pdf(x, shape1, shape2) })

    return tail
}

//updateBetaChart: changes the curve and/or tails of the beta curve
function updateBetaChart(shape1, shape2, alpha) {
    var newB = createBetaDataset(shape1, shape2, 3, 0.01)
    var newTail = createBetaTail(alpha, shape1, shape2, 3, 0.01)

    betaDistChart.data.datasets[0].data = newB
    betaDistChart.data.datasets[1].data = newTail
    betaDistChart.update()
}

//changeBetaSettings: retives settings changes from beta sliders
function changeBetaSettings() {
    var shape1 = parseFloat(document.getElementById('betaShape1Range').value)
    var shape2 = parseFloat(document.getElementById('betaShape2Range').value)
    var alpha = parseFloat(document.getElementById('betaAlphaRange').value)
    var x = jStat.beta.inv(1 - alpha, shape1, shape2).toFixed(2)

    updateBetaChart(shape1, shape2, alpha)

    document.getElementById('betaShape1Display').innerHTML = shape1
    document.getElementById('betaShape2Display').innerHTML = shape2
    document.getElementById('betaAlphaDisplay').innerHTML = alpha
    document.getElementById('betaXDisplay').innerHTML = 'Critical Β Value: ' + x.toString()
}


//functions for log-normal
//createLognormChart: creates a lognormal distribution chart in a specified canvas
function createLognormChart(canvas) {
    lognormDistCanvas = document.getElementById(canvas).getContext('2d')
    lognormDistChart = new Chart(lognormDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                    data: createLognormDataset(1, 1, 30, 0.1)
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        max: 70,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        suggestedMax: 0.1,
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
}

//createLognormDataset creates log-normal curve dataset
function createLognormDataset(mu, sigma, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.lognormal.pdf(i, mu, sigma)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createLognormTail: creates a tail for the log-normal curve
function createLognormTail(alpha, mu, sigma, endPoint, inc) {
    var tail = []
    var x = jStat.lognormal.inv(1 - alpha, mu, sigma)

    for (var i = endPoint; i > x; i -= inc) {
        var y = jStat.lognormal.pdf(i, mu, sigma)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.lognormal.pdf(x, mu, sigma) })

    return tail
}

//updateLognormChart: changes the curve and/or tails of the log-normal curve
function updateLognormChart(mu, sigma, alpha) {
    var newLN = createLognormDataset(mu, sigma, 80, 0.1)
    var newTail = createLognormTail(alpha, mu, sigma, 80, 0.1)

    lognormDistChart.data.datasets[0].data = newLN
    lognormDistChart.data.datasets[1].data = newTail
    lognormDistChart.update()
}

//changeLognormSettings: retives settings changes from log-normal sliders
function changeLognormSettings() {
    var mu = parseFloat(document.getElementById('lognormMuRange').value)
    var sigma = parseFloat(document.getElementById('lognormSigmaRange').value)
    var alpha = parseFloat(document.getElementById('lognormAlphaRange').value)
    var x = jStat.lognormal.inv(1 - alpha, mu, sigma).toFixed(2)

    updateLognormChart(mu, sigma, alpha)

    document.getElementById('lognormMuDisplay').innerHTML = mu
    document.getElementById('lognormSigmaDisplay').innerHTML = sigma
    document.getElementById('lognormAlphaDisplay').innerHTML = alpha
    document.getElementById('lognormXDisplay').innerHTML = 'Critical Value: ' + x.toString()
}


//functions for exponential 
//createExpoChart: creates a exponential distribution chart in a specified canvas
function createExpoChart(canvas) {
    expoDistCanvas = document.getElementById(canvas).getContext('2d')
    expoDistChart = new Chart(expoDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                    data: createExpoDataset(1, 10, 0.1)
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'tail']
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
                        max: 4,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        //suggestedMax: 5,
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
}

//createExpoDataset: creates a exponential curve dataset
function createExpoDataset(lambda, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i += inc) {
        var y = jStat.exponential.pdf(i, lambda)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//createExpoTail: creates a tail for the exponential curve
function createExpoTail(alpha, lambda, endPoint, inc) {
    var tail = []
    var x = jStat.exponential.inv(1 - alpha, lambda)

    for (var i = endPoint; i > x; i -= inc) {
        var y = jStat.exponential.pdf(i, lambda)
        tail.push({ x: i, y: y })
    }

    tail.push({ x: x, y: jStat.exponential.pdf(x, lambda) })

    return tail
}

//updateExpoChart: changes the curve and/or tails of the exponential curve
function updateExpoChart(lambda, alpha) {
    var newExpo = createExpoDataset(lambda, 10, 0.1)
    var newTail = createExpoTail(alpha, lambda, 10, 0.1)

    expoDistChart.data.datasets[0].data = newExpo
    expoDistChart.data.datasets[1].data = newTail
    expoDistChart.update()
}

//changeExpoSettings: retives settings changes from exponential sliders
function changeExpoSettings() {
    var lambda = parseFloat(document.getElementById('expoLambdaRange').value)
    var alpha = parseFloat(document.getElementById('expoAlphaRange').value)
    var x = jStat.exponential.inv(1 - alpha, lambda).toFixed(2)

    updateExpoChart(lambda, alpha)

    document.getElementById('expoLambdaDisplay').innerHTML = lambda
    document.getElementById('expoAlphaDisplay').innerHTML = alpha
    document.getElementById('expoXDisplay').innerHTML = 'Critical Value: ' + x.toString()
}


//functions for binomial
//createExpoChart: creates a binomial distribution chart in a specified canvas
function createBinomialChart(canvas) {
    binomialDistCanvas = document.getElementById(canvas).getContext('2d')
    binomialDistChart = new Chart(binomialDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                    data: createBinomialDataset(1, 1, 60, 0.1)
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'tail']
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
                        max: 4,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        //suggestedMax: 5,
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
}

//createExpoDataset: creates a exponential binomial dataset
function createBinomialDataset(n, p, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.binomial.pdf(i, n, p)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//updateBinomialChart: changes the curve and/or tails of the binomial curve
function updateBinomialChart(n, p) {
    var newBi = createBinomialDataset(n, p, 40, 0.5)

    binomialDistChart.data.datasets[0].data = newBi
    binomialDistChart.update()
}

//changeBinomialSettings: retives settings changes from binomialsliders
function changeBinomialSettings() {
    var n = parseFloat(document.getElementById('binomialNRange').value)
    var p = parseFloat(document.getElementById('binomialPRange').value)

    updateBinomialChart(n, p)

    document.getElementById('binomialNDisplay').innerHTML = n
    document.getElementById('binomialPDisplay').innerHTML = p
}


//functions for createPoissonChart
//createPoissonChart: creates a poisson distribution chart in a specified canvas
function createPoissonChart(canvas) {
    poissonDistCanvas = document.getElementById(canvas).getContext('2d')
    poissonDistChart = new Chart(poissonDistCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curve 1',
                    pointRadius: 0,
                    fill: false,
                    borderColor: '#4d4a4a',
                },
                {
                    label: 'tail',
                    pointRadius: 0,
                    borderWidth: 1,
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
                        var removeList = ['Curve 1', 'tail']
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
                        max: 19,
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        display: true,
                        //suggestedMax: 5,
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
}

//createPoissonDataset: creates a poisson binomial dataset
function createPoissonDataset(lambda, endPoint, inc) {
    var dataset = []

    for (var i = 0; i < endPoint + inc; i = i + inc) {
        var y = jStat.poisson.pdf(i, lambda)
        dataset.push({ x: i, y: y })
    }

    return dataset
}

//updateBinomialChart: changes the curve and/or tails of the binomial curve
function updatePoissonChart(lambda) {
    var newBi = createPoissonDataset(lambda, 60, 1)

    poissonDistChart.data.datasets[0].data = newBi
    poissonDistChart.update()
}

//changeBinomialSettings: retives settings changes from binomialsliders
function changePoissonSettings() {
    var l = parseFloat(document.getElementById('poissonLambdaRange').value)

    updatePoissonChart(l)

    document.getElementById('poissonLambdaDisplay').innerHTML = l
}


//normal options controls
function setupNormControls() {
    document.getElementById('normMeanRange').oninput = changeNormSettings
    document.getElementById('normSDRange').oninput = changeNormSettings
    document.getElementById('normAlphaRange').oninput = changeNormSettings
    document.getElementById('normOneTail').onclick = changeNormSettings
    document.getElementById('normTwoTail').onclick = changeNormSettings
}

//t options controls
function setupTControls() {
    document.getElementById('tDFRange').oninput = changeTSettings
    document.getElementById('tAlphaRange').oninput = changeTSettings
    document.getElementById('tOneTail').onclick = changeTSettings
    document.getElementById('tTwoTail').onclick = changeTSettings
}

//f options controls
function setupFControls() {
    document.getElementById('fDF1Range').oninput = changeFSettings
    document.getElementById('fDF2Range').oninput = changeFSettings
    document.getElementById('fAlphaRange').oninput = changeFSettings
}

//chi options controls
function setupChiControls() {
    document.getElementById('chiDFRange').oninput = changeChiSettings
    document.getElementById('chiAlphaRange').oninput = changeChiSettings
}

//gamma options controls
function setupGammaControls() {
    document.getElementById('gammaShapeRange').oninput = changeGammaSettings
    document.getElementById('gammaScaleRange').oninput = changeGammaSettings
    document.getElementById('gammaAlphaRange').oninput = changeGammaSettings
}

//beta options controls
function setupBetaControls() {
    document.getElementById('betaShape1Range').oninput = changeBetaSettings
    document.getElementById('betaShape2Range').oninput = changeBetaSettings
    document.getElementById('betaAlphaRange').oninput = changeBetaSettings
}

//log-normal options controls
function setupLognormControls() {
    document.getElementById('lognormMuRange').oninput = changeLognormSettings
    document.getElementById('lognormSigmaRange').oninput = changeLognormSettings
    document.getElementById('lognormAlphaRange').oninput = changeLognormSettings
}

//exponential options controls
function setupExpoControls() {
    document.getElementById('expoLambdaRange').oninput = changeExpoSettings
    document.getElementById('expoAlphaRange').oninput = changeExpoSettings
}

//Binomial options controls
function setupBinomialControls() {
    document.getElementById('binomialNRange').oninput = changeBinomialSettings
    document.getElementById('binomialPRange').oninput = changeBinomialSettings
}

//Poisson options controls
function setupPoissonControls() {
    document.getElementById('poissonLambdaRange').oninput = changePoissonSettings
}

//Normal proportion options controls
function setupNormPropControls() {
    document.getElementById('normPRange').oninput = changeNormPropSettings
    document.getElementById('normNRange').oninput = changeNormPropSettings
}