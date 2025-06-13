function ajax_create(){
    $.ajax({
        url: "/sign/create",
        type: "GET",
        contentType: "application/json",
        success: function( output ) { $( "#main-blank" ).html(output); },
        error: function(){ alert( "ajax_create() Request failed." ); }
    });
}

function ajax_login() {
    $.ajax({
        url: "/sign/login",
        type: "GET",
        contentType: "application/json",
        success: function( output ) { $( "#main-blank" ).html(output); },
        error: function(){ alert( "ajax_login() Request failed." ); }
    });
}

function login_account(){
    const data = {
        username: $("#login-username").val(),
        password: $("#login-password").val()
    };

    $.ajax({
        url: "/api/login_account",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( output ) { $( "#main-blank" ).html(output); },
        error: function(){ alert( "login() Request failed." ); }
    });
}

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

function sql_login_account(){
    const data = {
        username: $("#login-username").val(),
        password: $("#login-password").val(),
        email: $("#login-email").val()
    };

    $.ajax({
        url: "/api/sql_login_account",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( return_data ) { login_account_reflect(return_data); },
        error: function(){ alert( "sql_login_account() Request failed." ); }
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
        error: function(){ alert( "sql_create_account() Request failed." ); }
    });
}

function login_account_reflect( return_data ){
    return_data = JSON.parse( return_data );

    if (return_data.status == "success" ){
        $("#main-blank").html(  
            `
                <div>
                    <h2 style="text-align: center;">Welcome, ${return_data.nickname}</h2>
                    <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                        <p class="mb0" style="font-family: Roboto; text-align: center">
                            We will now redirect you to home page!
                        </p>
                    </div>
                </div>
            `);
        setCookie(return_data.nickname, return_data.username, return_data.password, return_data.email);
        setTimeout(function() {
            window.location.href = "/";
        }, 4500);
    } else if( return_data.status == "validate_error" ) {
        $("#main-blank").html(  
            `
                ${return_data.message}
            `);
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
        setCookie(return_data.nickname, return_data.username, return_data.password, return_data.email);
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
            ajax_create();
        }, 3000);
    }
}