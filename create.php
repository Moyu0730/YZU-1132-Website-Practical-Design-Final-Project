<?php
    include("./data.php");

    $nickname = $_POST["nickname"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $result = valid($nickname, $username, $email, $password);

    if( $result == "Validation successful.") {
        echo '<br>Success</br>';
        return;
    } else {
        // Error message from valid()
        echo "<br>Error: " . addslashes($result) . "</br>";
    }

    return;
?>
