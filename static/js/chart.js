var accCoinAmount = 0;

function initCoinAmount(){
    if( getCookie('username') != '' ) sql_query_coin();
    else accCoinAmount = 0;
}

function updateCoinAmount( newAmount ){
    if( getCookie('username') != '' ) sql_update_coin( newAmount );
    else accCoinAmount = newAmount;

    updateTrend( newAmount );
}

function getCoinAmount(){
    if( getCookie('username') != '' ) sql_query_coin();

    return accCoinAmount;
}

function sql_update_coin( newValue ){
    const data = {
        username: getCookie('username'),
        email: getCookie('email'),
        password: getCookie('password'),
        newValue: newValue
    };

    console.log("newValue", newValue);

    $.ajax({
        url: "/api/sql_update_coin",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function(output) {
            resp = JSON.parse( output );
            console.log(resp.message);
        },
        error: function() { alert("sql_update_coin() Request failed."); }
    });

    getCoinAmount();
}

function sql_query_coin(){
    const data = {
        username: getCookie('username'),
        email: getCookie('email'),
        password: getCookie('password'),
    };

    $.ajax({
        url: "/api/sql_query_coin",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function(output) {
            resp = JSON.parse( output );
            accCoinAmount = resp.coin;
        },
        error: function() { alert("sql_query_coin() Request failed."); }
    });
}

function ajax_open_trend(){
    const data = {
        log_status: getCookie('nickname') != '' ? 'Loged In' : 'Visitors',
        nickname: getCookie('nickname'),
        username: getCookie('username'),
        email: getCookie('email'),
        password: getCookie('password'),
    };

    $.ajax({
        url: "/trend",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function(output) {
            $("#main-blank").html(output);
            showCoinsChart();
        },
        error: function() { alert("ajax_open_trend() Request failed."); }
    });
}

function showCoinsChart() {
    console.log("showCoinsChart() Called");

    const dashboard = document.getElementById('dashboard');

    if ( !dashboard ) {
        console.error("Could not find dashboard");
        return;
    }
    
    dashboard.style.display = "block";

    const data = [{
        type: "indicator",
        mode: "gauge+number",
        value: getCoinAmount(),
        gauge: {
            axis: { 
                range: [0, 100] 
            },
            bar: { 
                color: "#8B0000" 
            },
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
                value: getCoinAmount()
            }
        },
        number: { 
            font: { 
                size: 28, 
                color: "#8B0000" 
            } 
        }
    }];

    const layout = {
        title: { 
            text: "Accumulated Coins", 
            font: { size: 24, color: "#8B0000" } 
        },
        width: 500,
        height: 375,
        paper_bgcolor: "#F5F5F5"
    };

    const config = {
        responsive: true,
        displayModeBar: true
    };

    Plotly.newPlot('dashboard', data, layout, config);

    window.addEventListener('resize', () => {
        Plotly.Plots.resize( dashboard );
    });
}

function updateTrend( newValue ){
    console.log("updateTrend() Called");
    console.log("newValue", newValue);

    const dashboard = document.getElementById('dashboard');

    if( !dashboard ) {
        console.warn("There doesn't exist Dashboard");
        return;
    }

    const update = {
        value: newValue,
        "gauge.threshold.value": newValue
    };

    Plotly.update('dashboard', update);
}