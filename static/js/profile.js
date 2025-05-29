function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

function ajax_open_profile() {
    const data = {
        nickname: getCookie('nickname')
    };

    $.ajax({
        url: "/profile",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: function( output ) { 
            // alert(output);
            $( "#main-blank" ).html(output); 
        },
        error: function(){ alert( "Request failed." ); }
    });
}