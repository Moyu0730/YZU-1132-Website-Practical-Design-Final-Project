from flask import Flask, redirect, render_template, request, make_response
from static.func.account import create_account
from database.sql import sql_create_user, sql_query_user
from static.func.profile import open_profile
from static.func.ajax import ajax_login, ajax_create
from llm import get_start_response, get_finish_response, get_npc_response
app = Flask(__name__)

@app.route('/')
def move_to_index():
    return render_template("index.html")


# Start Profile
@app.route('/profile', methods=['POST'])
def open_my_profile():
    data = request.get_json()
    result = open_profile(data)
    return result
# End Profile


# Start Sign and Log API
@app.route('/sign')
def move_to_sign():
    return render_template("sign.html")

@app.route('/logout', methods=['GET', 'POST'])
def move_to_logout():
    resp = make_response(redirect('/'))
    resp.delete_cookie('nickname', path='/', domain=None)
    return resp

@app.route('/sign/create', methods=['GET'])
def move_to_create():
    result = ajax_create()
    return result

@app.route('/sign/login', methods=['GET'])
def move_to_login():
    result = ajax_login()
    return result

@app.route('/api/create_account', methods=['POST'])
def create():
    data = request.get_json()
    result = create_account(data)
    return result
# End Sign and Log API


# Start SQL API
@app.route('/api/sql_create_account', methods=['POST'])
def sql_insert():
    data = request.get_json()
    result = sql_create_user(data)
    return result

@app.route('/api/sql_login_account', methods=['POST'])
def sql_query():
    data = request.get_json()
    result = sql_query_user(data)
    return result
# End SQL API
@app.route("/call_llm1", methods=["POST"])
def call_llm1():
    try:
        response = get_start_response()
        return response
    except Exception as e:
        print("Error:", str(e))
        return "我現在不想跟你講話，待會再來"

@app.route("/call_llm2", methods=["POST"])
def call_llm2():
    try:
        response = get_finish_response()
        return response
    except Exception as e:
        print("Error:", str(e))
        return "我現在不想跟你講話，待會再來"

@app.route("/call_llm3", methods=["POST"])
def call_llm3():
    try:
        response = get_npc_response()
        return response
    except Exception as e:
        print("Error:", str(e))
        return "我現在不想跟你講話，待會再來"


if __name__ == '__main__':
    app.run(debug=True, port=5001)