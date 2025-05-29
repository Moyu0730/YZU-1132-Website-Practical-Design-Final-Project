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
                        <p class="mb0" style="font-family: Roboto" id="check-nickname">{nickname}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">UserName</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto" id="check-username">{username}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">Email</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto" id="check-email">{email}</p>
                    </div>
                </div>
            </div>
            <div class="border--full rounded pt1 pb1 pr2 pl2 mb1">
                <div class="grid-row">
                    <div class="grid-column align--center-on-tiny" style="width: 40%;">
                        <p class="mb0 bold">Password</p>
                    </div>
                    <div class="grid-column align--right align--center-on-tiny" style="width: 60%;">
                        <p class="mb0" style="font-family: Roboto" id="check-password">{password}</p>
                    </div>
                </div>
            </div>
            <div class="grid-row">
                <div class="grid-column" style="padding-right: 3px;">
                    <button class="my-btn blue-btn" style="width: 100%" onclick="sql_create_account()">Continue</button>
                </div>
                <div class="grid-column" style="padding-left: 3px;">
                    <button class="my-btn red-btn" style="width: 100%" onclick="ajax_create()">Back</button>
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
                <button class="my-btn red-btn" onclick="ajax_create()">Back</button>
            </div>
            """
    return html
# End create


# Start login
def check_login_data(username, password):
    result = validate('pass', username, 'pass', password)

    match result:
        case "Validation successful.":
            return 'Validation successful.'
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
                <button class="my-btn red-btn" onclick="ajax_login()">Back</button>
            </div>
            """
    return html
# Start login