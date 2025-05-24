from flask import Flask, redirect, render_template, request, make_response
from static.func.account import create_account, login_account
from database.sql import sql_create_user

app = Flask(__name__)

@app.route('/')
def move_to_index():
    return render_template("index.html")

# Start Sign and Log API
@app.route('/sign')
def move_to_sign():
    return render_template("sign.html")

@app.route('/api/create_account', methods=['POST'])
def create():
    data = request.get_json()
    result = create_account(data)
    return result

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    result = login_account(data)
    return result

@app.route('/logout', methods=['GET', 'POST'])
def move_to_logout():
    resp = make_response(redirect('/'))
    resp.delete_cookie('nickname', path='/', domain=None)
    return resp
# End Sign and Log API


# Start SQL API
@app.route('/api/sql_create_account', methods=['POST'])
def sql_insert():
    data = request.get_json()
    result = sql_create_user(data)
    return result
# End SQL API


if __name__ == '__main__':
    app.run(debug=True)