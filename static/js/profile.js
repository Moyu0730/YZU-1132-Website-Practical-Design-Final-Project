var rank = {};



async function ajax_open_profile() {
    const data = {
        log_status: getCookie('nickname') != '' ? 'Loged In' : 'Visitors',
        nickname: getCookie('nickname'),
        username: getCookie('username'),
        email: getCookie('email'),
        password: getCookie('password'),
    };

    $.ajax({
        url: "/profile",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: async function( output ) {
            $( "#main-blank" ).html(output);

            await getCoinRank();
            
            refreshCoinRank();
        },
        error: function(){ alert( "Request failed." ); }
    });
}



function getCoinRank(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/sql_query_coin_rank",
            contentType: "application/json",
            success: function(output) {
                resp = JSON.parse( output );
                rank = resp.result;
                resolve();
            },
            error: function() { 
                alert("getCoinRank() Request failed."); 
                reject();
            }
        });
    });
}



async function refreshCoinRank(){
    console.log("initCoinRank() Called");

    await getCoinRank();

    var email = getCookie('email');

    var rankDiv = document.getElementById('rankBoard');

    if( !rankDiv ){
        console.warn("There doesn't exist RankBoard");
        return;
    }

    rankDiv.innerHTML = '';

    if( Array.isArray(rank) ){
        for (const rankValue of rank) {
            const rankNode = document.createElement('div');

            rankValue.nickname = rankValue.nickname.charAt(0).toUpperCase() + rankValue.nickname.slice(1);

            if( rankValue.email == email ){
                rankNode.innerHTML = `
                    <h3 style="color: #c03b2b">Rank ${rankValue.rank}</h3>
                    <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                        <div class="grid-row">
                            <div class="grid-column align--center-on-tiny" style="width: 20%;">
                                <p class="mb0 bold" style="color: #c03b2b">${rankValue.nickname}</p>
                            </div>
                            <div class="grid-column align--right align--center-on-tiny" style="width: 80%;">
                                <p class="mb0" style="color: #c03b2b" id="check-password">${rankValue.coin} Coin(s)</p>
                            </div>
                        </div>
                    </div>
                `;
            }else{
                rankNode.innerHTML = `
                    <h3>Rank ${rankValue.rank}</h3>
                    <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                        <div class="grid-row">
                            <div class="grid-column align--center-on-tiny" style="width: 20%;">
                                <p class="mb0 bold">${rankValue.nickname}</p>
                            </div>
                            <div class="grid-column align--right align--center-on-tiny" style="width: 80%;">
                                <p class="mb0" id="check-password">${rankValue.coin} Coin(s)</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            rankDiv.appendChild(rankNode);
        }
    }
}