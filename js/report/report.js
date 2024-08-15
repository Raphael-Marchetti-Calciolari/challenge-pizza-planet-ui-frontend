async function getMonthsData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/months');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function getIngredientsData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/ingredients');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function getCustomersData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/customers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function getWeekdaysData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/weekdays');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function getHoursData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/report/hours');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

function renderBarGraph(data, htmlId, valueKey,
    title, xLabel, yLabel) {
    const ctx = $(`#${htmlId}`)[0].getContext('2d')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: valueKey,
                data: Object.values(data).map(item => item[valueKey]),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    font: { weight: 'bold', size: 20 },
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xLabel
                    }
                },
                y: {
                    beginAtZero: true, title: {
                        display: true, text: yLabel
                    }
                }
            }
        }
    });
}

function loadMonthsGraph() {
    console.log("Loading months graph")
    getMonthsData().then(data => {
        console.log(JSON.stringify(data));
        renderBarGraph(data, "months-graph", 'revenue',
            'Revenue per month', 'Months', 'Revenue');
    });
}

window.onload = loadMonthsGraph;