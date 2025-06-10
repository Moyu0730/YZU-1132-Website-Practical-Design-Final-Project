import json

from flask import Flask, redirect, render_template, request, make_response, jsonify
from static.func.account import create_account
from database.sql import sql_create_user, sql_query_user
from static.func.profile import open_profile
from static.func.ajax import ajax_login, ajax_create
from static.func.llm import get_finish_response, get_npc_response

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

# Start RPG and RPG API
@app.route('/api/rpg/get_map', methods=['GET'])
def get_map_data():
    try:
        with open('material/map.json', 'r', encoding='utf-8') as map_json_file:
            mapList = json.load(map_json_file)
        return jsonify(mapList)
    except FileNotFoundError:
        return jsonify({'error': 'Map file not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# End RPG aand RPG API


# Start LLM API
@app.route("/call_llm2", methods=["POST"])
def call_llm2():
    try:
        response = get_finish_response()
        return response
    except Exception as e:
        print("Error:", str(e))
        return "I don't want to talk right now, come back later"

@app.route("/call_llm3", methods=["POST"])
def call_llm3():
    try:
        response = get_npc_response()
        return response
    except Exception as e:
        print("Error:", str(e))
        return "I don't want to talk right now, come back later"
# End LLM API


if __name__ == '__main__':
    app.run(debug=True, port=5001)