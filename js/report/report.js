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

function renderPieChart(data, htmlId, label, title) {
    const ctx = $(`#${htmlId}`)[0].getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: label,
                data: Object.values(data)
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    font: { weight: 'bold', size: 20 }, // Decreased font size
                    text: title
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, // Added responsive option
            aspectRatio: 3, // Adjusted aspectRatio to make the chart smaller
        }
    });
}

function renderTable(data, htmlId, slice=10, yellowRows=3) {
    const yellowStyle = ' style="font-weight: bold; background-color: rgb(255, 255, 153);"';
    const table = $(`#${htmlId}`);
    let sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    let rows = sortedData.slice(0, slice).map(([key, value], index) => `
        <tr>
            <td${index < yellowRows ? `${yellowStyle}`: ''}>${key}</td>
            <td${index < yellowRows ? `${yellowStyle}`: ''}>${value}</td>
        </tr>
    `);
    table.append(rows.join(''));
}



function loadData() {
    getMonthsData().then(data => {
        renderBarGraph(data, "months-graph", 'revenue',
            'Revenue per month', 'Months', 'Revenue');
    });
    getIngredientsData().then(data => {
        renderTable(data, "ingredients-table", 3, 0);
        renderPieChart(data, "ingredients-graph", 'Orders',
            'Ingredients distribution');
    });
    getCustomersData().then(data => {
        renderTable(data, "customers-table", 5);
    });
    getWeekdaysData().then(data => {
        renderBarGraph(data, "weekdays-graph", 'revenue',
            'Revenue per weekday', 'Weekdays', 'Revenue');
        renderBarGraph(data, "weekdays-graph1", 'orders',
            'Orders per weekday', 'Weekdays', 'Orders');
    });
    getHoursData().then(data => {
        renderBarGraph(data, "hours-graph", 'revenue',
            'Revenue per hour', 'Hours', 'Revenue');
        renderBarGraph(data, "hours-graph1", 'orders',
            'Orders per hour', 'Hours', 'Orders');
    });
}

window.onload = loadData;