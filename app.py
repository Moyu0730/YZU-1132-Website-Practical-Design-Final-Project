from flask import Flask, render_template, request
from static.func.account import create_account

app = Flask(__name__)

@app.route('/')
def move_to_index():
    return render_template("index.html")

@app.route('/sign')
def move_to_sign():
    return render_template("sign.html")

@app.route('/api/create_account', methods=['POST'])
def create():
    data = request.get_json()
    result = create_account(data)
    return result

if __name__ == '__main__':
    app.run(debug=True)