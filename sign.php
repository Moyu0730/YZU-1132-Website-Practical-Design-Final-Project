<!DOCTYPE html>
<html lang="en">

<!-- start Head -->
    <head>
        <!-- Meta -->
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">

        <title>Viking Tours</title>
        <meta name="description" content="">

        <!-- The compiled CSS file -->
        <link rel="stylesheet" href="css/production.css">

        <!-- Web fonts -->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700|Playfair+Display:900" rel="stylesheet">

        <!-- favicon.ico. Place these in the root directory. -->
        <link rel="shortcut icon" href="favicon.ico">

        <!-- CSS -->
        <link rel="stylesheet" href="css/sign.css">

        <!-- JS -->
        <script src="js/sign.js"></script>

        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
<!-- end Head -->


<!-- start Body -->
    <body>
        <!-- start Header -->
        <header class="header full-width">
            <!-- Logo -->
            <h1 class="hide-on-mobile logo-container absolute block full-width align--center"><img class="logo--desktop" src="./img/desktop-logo.svg" alt="Viking Tours" title="Viking Tours"></h1>
            
            <!-- Social links -->
            <ul class="pt1 no-bullets align--center hide-on-mobile">
                <li><a class="link link--default" href="https://www.twitter.com"><img class="icon" src="./img/facebook.svg" alt="Facebook"></a></li>
                <li><a class="link link--default" href="https://www.instagram.com"><img class="icon" src="./img/instagram.svg" alt="Instagram"></a></li>
                <li><a class="link link--default" href="https://www.facebook.com"><img class="icon" src="./img/twitter.svg" alt="Twitter"></a></li>
            </ul>
        </header>
        <!-- end Header -->


        <!-- start Left Decoration -->
        <div class="hero" style="background:rgba(0,0,0,0) url(./img/1.jpg) no-repeat scroll center center/cover"></div>
        <!-- end Left Decoration -->

        <!-- start Sign -->
        <div class="body full-width">
            <div class="full-width full-height pb1 pl2 pr2 pt1">


                <!-- start Navigation -->
                <nav class="navigation border--bottom pt1">
                    <ul class="no-bullets list--inline pb1 bold" style="text-align: center;">
                        <!-- start Sign In Button -->
                        <li class="small mr2"><a class="link link--text current" href="./sign.php">Create Account</a></li>
                        <!-- end Sign In Button -->

                        <!-- start Sign In Button -->
                        <li class="small mr2">
                            <a class="link link--text">
                                <button style="all: unset;" onclick="signIn()">Sign In</button>
                            </a>
                        </li>
                        <!-- end Sign In Button -->
                        
                        <li class="small"><a class="link link--text" href="./index.php">Back Home</a></li>
                    </ul>
                </nav>

                <main class="content pt2 pb2" id="create">
                    <h2>Welcome</h2>

                    <!-- start NickName and UserName -->
                    <div class="div">
                            <div class="div-nickname" style="width: 50%;">
                                <label class="label "><p class="mb0 bold">NICKNAME</label>
                                <input class="input-box" id="sign-nickname">
                            </div>

                            <div class="div-username" style="width: 50%;">
                                <label class="label"><p class="mb0 bold">USERNAME</p></label>
                                <input class="input-box" id="sign-username">
                            </div>
                    </div>
                    <!-- end NickName and UserName -->


                    <!-- start Email -->
                    <div class="div">
                            <div class="div-nickname" style="width: 100%;">
                                <label class="label"><p class="mb0 bold">EMAIL</p></label>
                                <input type="email" class="input-box" id="sign-email">
                            </div>
                    </div>
                    <!-- end Email -->
                    

                    <!-- start Password and Create Button -->
                    <div class="div">
                            <div class="div-nickname" style="width: 50%;">
                                <label class="label"><p class="mb0 bold">PASSWORD</p></label>
                                <input class="input-box" id="sign-password" type="password">
                            </div>

                            <div class="div-username" style="width: 50%;">
                                <label class="label">&nbsp;</label>
                                <button class="submit-btn" onclick="create_account()">REGISTER <b>RIGHT NOW</b></button>
                            </div>
                    </div>
                    <!-- end Password and Create Button -->
                </main>
            </div>
        </div>
        <!-- end Sign -->

    </body>
<!-- end Body -->

</html>