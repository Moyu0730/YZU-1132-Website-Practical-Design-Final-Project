def islogedin(nickname):
    return nickname is not None and nickname != ''

def open_profile(data):
    nickname = data.get('nickname', '')

    if islogedin(nickname):
        html = f"""
            <h2 style="text-align: center;">Welcome, {nickname}!</h2>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny">
                        <p class="mb0 bold" style="text-align: center">Your Profile</p>
                    </div>
                </div>
            </div>
            <div style="height: 50px; text-align: right;">
                <button class="my-btn back-btn" onclick="window.location.href='/logout'">Logout</button>
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