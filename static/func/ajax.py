def ajax_login():
    html = f"""
        <h2>Welcome Back</h2>

        <!-- start UserName -->
        <div class="div" style="width: 100%;">
            <div class="div-left" style="width: 100%; align-items: flex-start;">
                <label class="label"><p class="mb0 bold">USERNAME</p></label>
                <input class="input-box" id="login-username">
            </div>
        </div>
        <!-- end UserName -->

        <!-- start Password -->
        <div class="div" style="width: 100%;">
            <div class="div-left" style="width: 100%; align-items: flex-start;">
                <label class="label"><p class="mb0 bold">PASSWORD</p></label>
                <input class="input-box" id="login-password" type="password">
            </div>
        </div>
        <!-- end Password -->

        <!-- start Email -->
        <div class="div">
            <div class="div-left" style="width: 100%;">
                <label class="label"><p class="mb0 bold">EMAIL</p></label>
                <input type="email" class="input-box" id="login-email">
            </div>
        </div>
        <!-- end Email -->
        
        </br>

        <!-- start Login Button -->
        <div style="height: 50px; text-align: right;">
            <button class="my-btn blue-btn" onclick="sql_login_account()">LOGIN <b>NOW</b></button>
        </div>
        <!-- end Login Button -->
    """
    return html



def ajax_create():
    html = f"""
        <h2 style="text-align: center">Welcome</h2>

        <!-- start NickName and UserName -->
        <div class="div">
            <div class="div-left">
                <label class="label"><p class="mb0 bold">NICKNAME</p></label>
                <input class="input-box" id="sign-nickname">
            </div>

            <div class="div-right">
                <label class="label"><p class="mb0 bold">USERNAME</p></label>
                <input class="input-box" id="sign-username">
            </div>
        </div>
        <!-- end NickName and UserName -->


        <!-- start Email -->
        <div class="div">
                <div class="div-left" style="width: 100%;">
                    <label class="label"><p class="mb0 bold">EMAIL</p></label>
                    <input type="email" class="input-box" id="sign-email">
                </div>
        </div>
        <!-- end Email -->
        

        <!-- start Password and Create Button -->
        <div class="div">
                <div class="div-left" style="width: 50%;">
                    <label class="label"><p class="mb0 bold">PASSWORD</p></label>
                    <input class="input-box" id="sign-password" type="password">
                </div>

                <div class="div-right" style="width: 50%;">
                    <label class="label">&nbsp;</label>
                    <button class="my-btn submit-btn" onclick="create_account()">REGISTER <b>RIGHT NOW</b></button>
                </div>
        </div>
        <!-- end Password and Create Button -->
    """
    return html



def ajax_empty_message(data):
    cntDayCount = data.get('cntDayCount', '')

    html = f"""
        <h2 style="text-align: center;">Welcome</h2>

        <br>        

        <div id="calendar">
            <div id="day-{cntDayCount}">
                <p style="font-family: 'Playfair Display', Times, serif; text-align: center; font-size: 40px; color: #666;">Day {cntDayCount}</p>
                <hr style="border: none; border-top: 1px dashed;">
                <div style="padding-top: 10px; padding-left: 20px;"></div>
            </div>
        </div>
    """
    return html



def ajax_trend(data):
    log_status = data.get('log_status', '')
    nickname = data.get('nickname', '')

    if log_status == 'Loged In':
        html = f"""
            <h2>Hello, {nickname.capitalize()}</h2>

            <div id='dashboard'></div>
            <div id='linechart'></div>
        """
    else:
        html = f"""
            <h2 style="text-align: center">Visitor Mode</h2>

            <div id='dashboard'></div>
            <div id='linechart'></div>
        """
    return html



def ajax_open_profile(data):
    log_status = data.get('log_status', '')
    nickname = data.get('nickname', '')

    if log_status == 'Loged In':
        html = f"""
            <h2>Hello, {nickname.capitalize()}</h2>

            <br>

            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div id="rankBoard"></div>
            </div>
            """
    else:
        html = f"""
            <h2 style="text-align: center;">Invalid</h2>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny">
                        <p class="mb0 bold" style="text-align: center">Sign In or Log In to Access</p>
                    </div>
                </div>
            </div>
            <div style="height: 50px; text-align: right;">
                <button class="my-btn redirect-btn" onclick="window.location.href='/sign'">Sign In</button>
            </div>
            """

    return html