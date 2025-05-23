from .data import validate

def create_account(data):
    nickname = data.get('nickname', '')
    username = data.get('username', '')
    email = data.get('email', '')
    password = data.get('password', '')

    result = validate(nickname, username, email, password)

    match result:
        case "Validation successful.":
            html = f"""
            <h2 style="text-align: center;">Confirm AGAIN</h2>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">NickName</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto">{nickname}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">UserName</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto">{username}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">Email</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto">{email}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">Password</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto">{password}</p>
                    </div>
                </div>
            </div>
            <div class="grid-row">
                <div class="grid-column" style="padding-right: 3px;">
                    <button class="my-btn conti-btn" style="width: 100%">Continue</button>
                </div>
                <div class="grid-column" style="padding-left: 3px;">
                    <button class="my-btn back-btn" style="width: 100%" onclick="window.location.href='/sign'">Back</button>
                </div>
            </div>
            """
        case _:
            safe_result = str(result).replace('<', '&lt;').replace('>', '&gt;')
            html = f"""
            <h2 style="text-align: center;">Invalid Input</h2>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny">
                        <p class="mb0 bold" style="text-align: center">{safe_result}</p>
                    </div>
                </div>
            </div>
            <div style="height: 50px; text-align: right;">
                <button class="my-btn back-btn" onclick="window.location.href='/sign'">Back</button>
            </div>
            """
    return html
# End create