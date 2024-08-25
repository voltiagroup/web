// chartAnimation.js

// Function to zoom in on a specific datapoint and fade out others
function zoomToDatapoint(chart, label) {
    console.log("Zooming to:", label);
    const index = chart.data.labels.indexOf(label);
    console.log("Index:", index);
    if (index !== -1) {
        const meta = chart.getDatasetMeta(9); // Assuming 'Average distance' is dataset 9
        const dataPoint = meta.data[index];

        // Update dataset opacity
        chart.data.datasets.forEach((dataset, i) => {
            dataset.backgroundColor = dataset.backgroundColor.map((color, j) => {
                return j === index ? color : 'rgba(0,0,0,0)'; // Fade out other bars
            });
        });

        // Zoom and pan to the specific datapoint
        chart.zoom(3); // Increased zoom level
        chart.pan({
            x: chart.chartArea.width / 2 - dataPoint.x,
            y: chart.chartArea.height / 2 - dataPoint.y
        }, undefined, 'default');

        // Update the chart with animation
        chart.update({
            duration: 1000,
            easing: 'easeOutQuart'
        });
    } else {
        console.log("Label not found in data");
    }
}

function setupZooming(chart, label, delay) {
    setTimeout(() => {
        console.log("Timeout triggered");
        zoomToDatapoint(chart, label);
    }, delay);
}

// Function to add zoom plugin to chart options
function addZoomPlugin(chartOptions) {
    if (!chartOptions.plugins) {
        chartOptions.plugins = {};
    }
    chartOptions.plugins.zoom = {
        pan: {
            enabled: true,
            mode: 'xy',
        },
        zoom: {
            wheel: {
                enabled: true,
            },
            pinch: {
                enabled: true
            },
            mode: 'xy',
        }
    };
}

// Main function to setup chart animation
function setupChartAnimation(chartInstance, targetLabel = "BT782XS", delay = 5000) {
    addZoomPlugin(chartInstance.options);
    chartInstance.update(); // Update the chart to apply the new options
    setupZooming(chartInstance, targetLabel, delay);
}

// Export the setup function
window.setupChartAnimation = setupChartAnimation;