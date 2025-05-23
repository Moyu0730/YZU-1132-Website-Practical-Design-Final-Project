<?php
    $account = $_POST["account"];
    $password = $_POST["password"];

    if (!(preg_match( "/^[a-zA-Z0-9]{3,20}$/", $account ) ) ){
        echo 'Invalid Input';
        return;
    }

    if (!(preg_match( "/^[A-Za-z0-9]{6,12}$/", $password ) ) ){
        echo 'Invalid Input';
        return;
    }

    $servername = "140.138.155.243";
    $username = "CS380B";
    $dbpassword = "YZUCS380B";
    $dbname = "CS380B";
    $tableName = "s1131524_User";
    $query = "SELECT * FROM `s1131524_User` WHERE `Account` LIKE '" . $account . "' AND `Password` LIKE '" . $password . "'";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

    if( mysqli_num_rows( $conn->query($query) ) == 0 ) echo 'Not Found';
    else echo 'Found';

    define( "FIVE_DAYS", 60 * 60 * 24 * 5 ); // define constant
    setcookie( "account", $account, time() + FIVE_DAYS );

    $conn->close();
    
    return;
?>