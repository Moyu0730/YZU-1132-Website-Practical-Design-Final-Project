import psycopg2
from psycopg2 import OperationalError
import configparser
import json

config = configparser.ConfigParser()
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
        return json.dumps({'status': 'error', 'message': 'Database connection failed'})

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