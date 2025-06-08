import psycopg2
from psycopg2 import OperationalError
import configparser
import json
from static.func.account import check_login_data
import os

config = configparser.ConfigParser()

# For if the config.ini isn't exist
if(not os.path.exists('config.ini')):
    config['database'] = {
        'dbname': 'your_db_name',
        'user': 'your_db_user',
        'password': 'your_db_password',
        'host': 'your_host',
        'port': 'your_port'
    }
    with open('config.ini', 'w') as configfile:
        config.write(configfile)
    print(">>> `Config file` not found. Try 2 fill in the file.")
    exit(1)

else:
    config.read('config.ini')

DB_CONFIG = {
    'dbname': config.get('database', 'dbname'),
    'user': config.get('database', 'user'),
    'password': config.get('database', 'password'),
    'host': config.get('database', 'host'),
    'port': config.get('database', 'port')
}


def get_db_connection():
    try:
        return psycopg2.connect(**DB_CONFIG)
    except OperationalError as e:
        return None


def sql_create_user(data):
    nickname = data.get('nickname', '')
    username = data.get('username', '')
    email = data.get('email', '')
    password = data.get('password', '')
    query = """
                INSERT INTO account (username, nickname, email, password)
                VALUES (%s, %s, %s, %s)
    """

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (username, nickname, email, password))
            conn.commit()
            return json.dumps({'status': 'success', 'nickname': nickname, 'username': username})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Create User Failed', 'errortype': str(e)})
    finally:
        conn.close()


def sql_query_user(data):
    username = data.get('username', '')
    password = data.get('password', '')

    # Validate input data
    validation_result = check_login_data(username, password)
    if validation_result != "Validation successful.":
        return json.dumps({'status': 'validate_error', 'message': validation_result})

    query = """
        SELECT * FROM account 
        WHERE username = %s AND password = %s
    """

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (username, password))
            user = cursor.fetchone()
            if user:
                # Assuming the columns are: id, username, nickname, email, password
                nickname = user[2]
                return json.dumps({'status': 'success', 'nickname': nickname})
            else:
                return json.dumps({'status': 'error', 'message': 'User Not Found'})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Query User Failed', 'errortype': str(e)})
    finally:
        conn.close()