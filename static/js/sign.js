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
        success: function( output ) { $( "#create" ).html(output); },
        error: function(){ alert( "Request failed." ); }
    });
}

function logIn() {
    // var account = $("#signin-account").val();
    // var password = $("#signin-password").val();

    // $.ajax({
    //     url: "signin.php",
    //     data: { account: account, password: password },
    //     type: "POST",
    //     datatype: "html",
    //     success: function( output ) {
    //         if( output == 'Invalid Input' ){
    //             alert("Invalid Input. Please Try Again.");
    //         }else if( output == 'Not Found' ){
    //             alert("Account Not Found. Please Try Again.");
    //         }else if( output == 'Found' ){
    //             alert("Sign In Successfully.");
    //             window.location.replace("index.php"); 
    //         }
    //     },
    //     error: function(){ alert( "Request failed." ); }
    // });
}

function signUp() {
    var account = $("#create-account").val();
    var password = $("#create-password").val();
    var phone = $("#create-phone").val();
    var email = $("#create-email").val();
    var identity = $("#create-identity").val();

    $.ajax({
        url: "signup.php",
        data: { account: account, password: password, phone: phone, email: email, identity: identity },
        type: "POST",
        datatype: "html",
        success: function( output ) {
            if( output == 'Invalid Input' ){
                alert("Invalid Input. Please Try Again.");
            }else{
                alert("Sign Up Successfully.");
                window.location.replace("index.php"); 
            }
        },
        error: function(){ alert( "Request failed." ); }
    });
}