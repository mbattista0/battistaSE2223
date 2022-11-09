// Graph CSV data using chart.js

async function getData() {
    const response = await fetch('data/se_rp_experiment_trial_data.csv');
    const data = await response.text(); // CSV in text format

    const bothHandsAttach = [];         // two hand can attachment time
    const bothHandsDetach = [];         // two hand can detachment time
    const oneHandAttach = [];           // one hand can attachment time
    const oneHandDetach = [];           // one hand can detachment time
    const x = [];                       // x-axis labels

    const table = data.split('\r\n').slice(1);    // split by line and remove the header row

    table.forEach(row => {              // iterate through each row
        const columns = row.split(','); // split each row into columns
        
        // push data to arrays
        bothHandsAttach.push(columns[0]);
        bothHandsDetach.push(columns[1]);
        oneHandAttach.push(columns[2]);
        oneHandDetach.push(columns[3]);
        x.push('');
    })
    return {x, bothHandsAttach, bothHandsDetach, oneHandAttach, oneHandDetach};
}

async function createChart() {
    const data = await getData();    // createChart will wait until getData processes

    const ctx = document.getElementById('results-graph');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.x,
            datasets: [
                {
                    label: 'Both hands, attachment',
                    data: data.bothHandsAttach,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Both hands, detachment',
                    data: data.bothHandsDetach,
                    backgroundColor: 'rgba(0, 99, 20, 0.2)',
                    borderColor: 'rgba(0, 99, 20, 1)',
                    borderWidth: 1
                },
                {
                    label: 'One hand with prototype, attachment',
                    data: data.oneHandAttach,
                    backgroundColor: 'rgba(0, 0, 132, 0.2)',
                    borderColor: 'rgba(0, 0, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'One hand with prototype, detachment',
                    data: data.oneHandDetach,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {

                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Time (s)',
                        font: {
                            size: 20
                        },
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Time to Attach and Detach Can to/from Can Opener',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();