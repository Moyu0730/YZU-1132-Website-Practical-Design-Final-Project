<?php
function valid($nickname, $username, $email, $password) {
    try {
        // Check if data is empty
        if( empty($nickname) || empty($username) || empty($email) || empty($password) ){
            throw new Exception("All Fields are Required.");
        }

        // Check if email is valid
        if( !(preg_match( "/^(s\d{7}@mail|[A-Z a-z 0-9]+@saturn).yzu.edu.tw$/", $email) ) ){
            throw new Exception("Invalid Email Format.");
        }

        // Check if nickname longer than 25 characters
        if( strlen($nickname) > 25 ){
            throw new Exception("Nickname Must be Less than 25 Characters.");
        }

        // Check if username longer than 25 characters
        if( strlen($username) > 25 ){
            throw new Exception("Username Must be Less than 25 Characters.");
        }

        // Check if password longer than 25 characters
        if( strlen($password) > 25 ){
            throw new Exception("Password Must be Less than 25 Characters.");
        }

        // Check if password shorter than 5 characters
        if( strlen($password) < 5 ){
            throw new Exception("Password Must be Longer than 5 Characters.");
        }

        // Check if password doesn't contains special characters
        if( !(preg_match( "/[!@#$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]/", $password) ) ){
            throw new Exception("Password Must Contains Special Characters.");
        }

        // Prevent SQL Injection
        if( ifSQLInjection($nickname) || ifSQLInjection($username) || ifSQLInjection($email) || ifSQLInjection($password) ){
            throw new Exception("Stop Doing SQL Injection. <br> We Are Watching You.");
        }

        return "Validation successful.";
    } catch (Exception $e) {
        return $e->getMessage();
    }
}

function ifSQLInjection($input) {
    $patterns = [
        "/' ?or ?'1'='1/i",
        '/" ?or ?"1"="1/i',
        "/' ?--/",
        "/--/",
        "/; ?drop/i",
        "/union ?select/i",
        "/' ?or ?1=1/i",
    ];


    foreach ($patterns as $pattern) {
        if( preg_match($pattern, $input) ){
            return true;
        }
    }

    return false;
}
?>
