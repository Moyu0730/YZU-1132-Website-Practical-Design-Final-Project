// 全域變數，讓 rpg.js 也能存取
window.currentCoins = 30;
window.maxCoins = 100;

function showCoinsChart() {
    console.log("開始畫儀錶盤");

    document.getElementById("talkBox").style.display = "none";

    const chartDiv = document.getElementById("coinsChart");
    const closeBtn = document.getElementById("closeChartBtn");
    if (!chartDiv || !closeBtn) {
        console.error("Could not find coinsChart or closeChartBtn!");
        return;
    }
    chartDiv.style.display = "block";
    closeBtn.style.display = "block";

    const data = [{
        type: "indicator",
        mode: "gauge+number",
        value: window.currentCoins,
        gauge: {
            axis: { range: [0, window.maxCoins] },
            bar: { color: "#8B0000" },
            bgcolor: "#F5F5F5",
            borderwidth: 2,
            bordercolor: "#8B0000",
            steps: [
                { range: [0, 25], color:"#6699FF" },
                { range: [25, 50], color:"#66CC66" },
                { range: [50, 75], color:"#FFCC66" },
                { range: [75, 100], color:"#FF6666" }
            ],
            threshold: {
                line: { color: "black", width: 4 },
                thickness: 0.75,
                value: window.currentCoins
            }
        },
        number: { font: { size: 28, color: "#8B0000" } }
    }];

    const layout = {
        title: { text: "金幣儀錶板", font: { size: 24, color: "#8B0000" } },
        width: 450,
        height: 350,
        paper_bgcolor: "#F5F5F5"
    };

    const config = {
        responsive: true,
        displayModeBar: true
    };

    if (typeof Plotly === 'undefined') {
        console.error("Plotly.js 沒有載入！");
        return;
    }

    Plotly.newPlot('coinsChart', data, layout, config);

    window.addEventListener('resize', () => {
        Plotly.Plots.resize(chartDiv);
    });
}

// 更新儀錶盤數值的函式（暴露到全域讓 rpg.js 調用）
window.updateCoinsChart = function(newValue) {
    if (newValue > window.maxCoins) newValue = window.maxCoins;
    window.currentCoins = newValue;

    const update = {
        value: [window.currentCoins],
        "gauge.threshold.value": [window.currentCoins]
    };

    Plotly.update('coinsChart', update);
}

function hideCoinsChart() {
    const chartDiv = document.getElementById("coinsChart");
    const closeBtn = document.getElementById("closeChartBtn");
    if (chartDiv && closeBtn) {
        chartDiv.style.display = "none";
        closeBtn.style.display = "none";
        Plotly.purge(chartDiv);
    }
    document.getElementById("talkBox").style.display = "block";
    document.getElementById("welcomeTitle").style.display = "block";

    window.removeEventListener('resize', Plotly.Plots.resize);
}
