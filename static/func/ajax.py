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