<?php
function valid($nickname, $username, $email, $password) {
    try {
        // Check if data is empty
        if( empty($nickname) || empty($username) || empty($email) || empty($password) ){
            throw new Exception("All fields are required.");
        }

        // Check if email is valid
        if( !(preg_match( "/^(s\d{7}@mail|[A-Z a-z 0-9]+@saturn).yzu.edu.tw$/", $email) ) ){
            throw new Exception("Invalid email format.");
        }

        return "Validation successful.";
    } catch (Exception $e) {
        return $e->getMessage();
    }
}
?>
