function create_account() {
    var nickname = $("#sign-nickname").val();
    var username = $("#sign-username").val();
    var email = $("#sign-email").val();
    var password = $("#sign-password").val();

    $.ajax({
        url: "create.php",
        data: { 
            nickname: nickname, 
            username: username,
            email: email,
            password: password 
        },
        type: "POST",
        datatype: "html",
        success: function( output ) { $( "#create" ).html(output); },
        error: function(){ alert( "Request failed." ); }
    });
}

function signIn() {
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