<?php
    include("data.php");

    $nickname = $_POST["nickname"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

        $result = valid($nickname, $username, $email, $password);
    
        switch ($result) {
            case "Validation successful.":
                echo <<<HTML
                <h2 style="text-align: center;">Confirm AGAIN</h2>
                <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                    <div class="grid-row">
                        <div class="grid-column align--center-on-tiny" style="width: 40%;">
                            <p class="mb0 bold">NickName</p>
                        </div>
                        <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                            <p class="mb0" style="font-family: Roboto">{$nickname}</p>
                        </div>
                    </div>
                </div>
                <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                    <div class="grid-row">
                        <div class="grid-column align--center-on-tiny" style="width: 40%;">
                            <p class="mb0 bold">UserName</p>
                        </div>
                        <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                            <p class="mb0" style="font-family: Roboto">{$username}</p>
                        </div>
                    </div>
                </div>
                <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                    <div class="grid-row">
                        <div class="grid-column align--center-on-tiny" style="width: 40%;">
                            <p class="mb0 bold">Email</p>
                        </div>
                        <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                            <p class="mb0" style="font-family: Roboto">{$email}</p>
                        </div>
                    </div>
                </div>
                <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                    <div class="grid-row">
                        <div class="grid-column align--center-on-tiny" style="width: 40%;">
                            <p class="mb0 bold">Password</p>
                        </div>
                        <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                            <p class="mb0" style="font-family: Roboto">{$password}</p>
                        </div>
                    </div>
                </div>

                <div class="grid-row">
                    <div class="grid-column" style="padding-right: 3px;">
                        <button class="my-btn conti-btn" style="width: 100%">Continue</button>
                    </div>
                    <div class="grid-column" style="padding-left: 3px;">
                        <button class="my-btn back-btn" style="width: 100%" onclick="location.href='sign.php'">Back</button>
                    </div>
                </div>
                HTML;
                break;
            default:
                // Error message from valid()
                $safeResult = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
                echo <<<HTML
                <h2 style="text-align: center;">Invalid Input</h2>
                <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                    <div class="grid-row">
                        <div class="grid-column align--center-on-tiny">
                            <p class="mb0 bold" style="text-align: center">{$safeResult}</p>
                        </div>
                    </div>
                </div>
                <div style="height: 50px; text-align: right;">
                    <button class="my-btn back-btn" onclick="location.href='sign.php'">Back</button>
                </div>
                HTML;
                break;
        }
    
        return;
?>
