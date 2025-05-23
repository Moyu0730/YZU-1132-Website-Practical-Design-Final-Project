<?php
    define("FIVE_DAYS", 60 * 60 * 24 * 5);
    setcookie("account", '', time() + FIVE_DAYS );

    header("Location: index.php");
?>