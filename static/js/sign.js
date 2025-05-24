function create_account() {
    const data = {
        nickname: $("#sign-nickname").val(),
        username: $("#sign-username").val(),
        email: $("#sign-email").val(),
        password: $("#sign-password").val()
    };

    $.ajax({
        url: "/api/create_account",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( output ) { $( "#main-blank" ).html(output); },
        error: function(){ alert( "Request failed." ); }
    });
}

function sql_create_account(){
    const data = {
        nickname: document.getElementById("check-nickname").innerText,
        username: document.getElementById("check-username").innerText,
        email: document.getElementById("check-email").innerText,
        password: document.getElementById("check-password").innerText
    };

    $.ajax({
        url: "/api/sql_create_account",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( return_data ) { create_account_reflect(return_data); },
        error: function(){ alert( "Request failed." ); }
    });
}

function logIn() {
    const data = {
        username: $("#sign-username").val(),
        password: $("#sign-password").val()
    };

    $.ajax({
        url: "/api/ogin",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( output ) { $( "#main-blank" ).html(output); },
        error: function(){ alert( "Request failed." ); }
    });
}

function create_account_reflect(return_data) {
    return_data = JSON.parse(return_data);

    if (return_data.status == "success" ){
        $("#main-blank").html(  
            `
                <div>
                    <h2 style="text-align: center;">Account Created Successfully!</h2>
                    <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                        <p class="mb0" style="font-family: Roboto; text-align: center">
                            We will now redirect you to home page!
                        </p>
                    </div>
                </div>
            `);
        sign_setCookie(return_data.nickname);
        setTimeout(function() {
            window.location.href = "/";
        }, 4500);
    } else {
        $("#main-blank").html(  
            `
                <div>
                    <h2 style="text-align: center;">An Error Occurred!</h2>
                    <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                        <p class="mb0" style="font-family: Roboto; text-align: center">${return_data.message}</p>
                    </div>
                </div>
            `);
        setTimeout(function() {
            window.location.href = "/sign";
        }, 3000);
    }
}

function sign_setCookie(nickname){
    const FIVE_DAYS = 60 * 60 * 24 * 5; // seconds in five days
    const expires = new Date(Date.now() + FIVE_DAYS * 1000).toUTCString();
    document.cookie = `nickname=${encodeURIComponent(nickname)}; expires=${expires}; path=/`;
}