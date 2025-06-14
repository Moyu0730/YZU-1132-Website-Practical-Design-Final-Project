var accCoinAmount = 0, maxCoin;



function initCoinAmount(){
    if( getCookie('username') != '' ) sql_query_coin();
    else accCoinAmount = 0;

    sql_query_max_coin();
}



function updateCoinAmount( newAmount ){
    if( getCookie('username') != '' ) sql_update_coin( newAmount );
    else accCoinAmount = newAmount;
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
            getCoinAmount();
            sql_query_max_coin();
            updateTrend(newValue);
            refreshCoinRank();
        },
        error: function() { alert("sql_update_coin() Request failed."); }
    });
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



function sql_query_max_coin(){
    $.ajax({
        url: "/api/sql_query_max_coin",
        contentType: "application/json",
        success: function(output) {
            resp = JSON.parse( output );
            maxCoin = Math.max(accCoinAmount, resp.result);
        },
        error: function() { alert("sql_query_max_coin() Request failed."); }
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

    sql_query_max_coin();

    const data = [{
        type: "indicator",
        mode: "gauge+number",
        value: getCoinAmount(),
        gauge: {
            axis: {
                range: [0, maxCoin],
                tickvals: [0, maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )],
                ticktext: [0, maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )]
            },
            bar: { 
                color: "#8B0000" 
            },
            bgcolor: "#F5F5F5",
            borderwidth: 2,
            bordercolor: "#8B0000",
            steps: [
                { range: [maxCoin * ( 0 / 4 ), maxCoin * ( 1 / 4 )], color:"#6699FF" },
                { range: [maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 )], color:"#66CC66" },
                { range: [maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 )], color:"#FFCC66" },
                { range: [maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )], color:"#FF6666" }
            ],
            threshold: {
                line: { 
                    color: "black", 
                    width: 4
                },
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



async function updateTrend( newValue ){
    console.log("updateTrend() Called");
    console.log("newValue", newValue);

    const dashboard = document.getElementById('dashboard');

    if( !dashboard ) {
        console.warn("There doesn't exist Dashboard");
        return;
    }

    await new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/sql_query_max_coin",
            contentType: "application/json",
            success: function(output) {
                resp = JSON.parse(output);
                maxCoin = Math.max(accCoinAmount, resp.result);
                resolve();
            },
            error: function() { 
                alert("sql_query_max_coin() Request failed."); 
                reject();
            }
        });
    });

    console.log("Max Coin Value", maxCoin);

    const update = {
        value: newValue,
        gauge: {
            axis: {
                range: [0, maxCoin],
                tickvals: [0, maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )],
                ticktext: [0, maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )]
            },
            bar: { 
                color: "#8B0000" 
            },
            bgcolor: "#F5F5F5",
            borderwidth: 2,
            bordercolor: "#8B0000",
            steps: [
                { range: [maxCoin * ( 0 / 4 ), maxCoin * ( 1 / 4 )], color:"#6699FF" },
                { range: [maxCoin * ( 1 / 4 ), maxCoin * ( 2 / 4 )], color:"#66CC66" },
                { range: [maxCoin * ( 2 / 4 ), maxCoin * ( 3 / 4 )], color:"#FFCC66" },
                { range: [maxCoin * ( 3 / 4 ), maxCoin * ( 4 / 4 )], color:"#FF6666" }
            ],
            threshold: {
                line: { 
                    color: "black", 
                    width: 4
                },
                thickness: 0.75,
                value: getCoinAmount()
            }
        },
    };

    Plotly.update('dashboard', update);
}