<?php
    $account = $_POST["account"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $identity = $_POST["identity"];

    if (!(preg_match( "/^[a-zA-Z0-9]{3,20}$/", $account ) ) ){
        echo 'Invalid Input';
        return;
    }

    if (!(preg_match( "/^[A-Za-z0-9]{6,12}$/", $password ) ) ){
        echo 'Invalid Input';
        return;
    }

    if (!(preg_match( "/^09\d{2}-\d{3}-\d{3}$/", $phone ) ) ){
        echo 'Invalid Input';
        return;
    }

    if ( !(preg_match( "/^(s\d{7}@mail|[A-Z a-z 0-9]+@saturn).yzu.edu.tw$/", $email ) ) ){
        echo 'Invalid Input';
        return;
    }

    $servername = "140.138.155.243";
    $username = "CS380B";
    $dbpassword = "YZUCS380B";
    $dbname = "CS380B";
    $tableName = "s1131524_User";
    $query = "INSERT INTO $tableName (`Account`,            `Password`,           `Phone`,           `Identity`,         `Email`) 
              VALUES                 ('" . $account . "',   '" . $password . "',  '" . $phone . "',  '" . $identity . "', '" . $email . "');";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

    $result = $conn->query($query);

    echo $result;

    define( "FIVE_DAYS", 60 * 60 * 24 * 5 ); // define constant
    setcookie( "account", $account, time() + FIVE_DAYS );

    $conn->close();
    
    return;
?>