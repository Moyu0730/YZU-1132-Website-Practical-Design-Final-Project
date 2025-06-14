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
                INSERT INTO account (username, nickname, email, password, coin)
                VALUES (%s, %s, %s, %s, '0')
    """

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (username, nickname, email, password))
            conn.commit()
            return json.dumps({'status': 'success', 'nickname': nickname, 'username': username, 'email': email, 'password': password})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Create User Failed', 'errortype': str(e)})
    finally:
        conn.close()



def sql_query_user(data):
    username = data.get('username', '')
    password = data.get('password', '')
    email = data.get('email', '')

    # Validate input data
    validation_result = check_login_data(username, password, email)
    if validation_result != "Validation successful.":
        return json.dumps({'status': 'validate_error', 'message': validation_result})

    query = """
        SELECT * FROM account 
        WHERE username = %s AND password = %s AND email = %s
    """

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (username, password, email))
            user = cursor.fetchone()
            if user:
                # Assuming the columns are: id, username, nickname, email, password, coin
                username = user[1]
                nickname = user[2]
                email = user[3]
                password = user[4]
                return json.dumps({'status': 'success', 'nickname': nickname, 'username': username, 'email': email, 'password': password})
            else:
                return json.dumps({'status': 'error', 'message': 'User Not Found'})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Query User Failed', 'errortype': str(e)})
    finally:
        conn.close()



def sql_query_coin_amount(data):
    username = data.get('username', '')
    password = data.get('password', '')
    email = data.get('email', '')
    
    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})
    
    query = """
        SELECT * FROM account 
        WHERE username = %s AND password = %s AND email = %s
    """

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (username, password, email))
            user = cursor.fetchone()
            if user:
                # Assuming the columns are: id, username, nickname, email, password, coin
                coin = user[5]
                return json.dumps({'status': 'success', 'coin': coin})
            else:
                return json.dumps({'status': 'error', 'message': 'Coin User Not Found'})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Query Failed', 'errortype': str(e)})
    finally:
        conn.close()



def sql_update_coin_amount(data):
    username = data.get('username', '')
    password = data.get('password', '')
    email = data.get('email', '')

    try:
        newValue = int(data.get('newValue', 0))
    except (ValueError, TypeError):
        return json.dumps({'status': 'error', 'message': 'Invalid coin value'})

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    query = """
        UPDATE account 
        SET coin = %s
        WHERE username = %s AND password = %s AND email = %s
    """

    try:
        with conn.cursor() as cursor:
            cursor.execute(query, (newValue, username, password, email))
            if cursor.rowcount > 0:
                conn.commit()
                return json.dumps({'status': 'success', 'message': 'Update Successful'})
            else:
                conn.rollback()
                return json.dumps({'status': 'error', 'message': 'User Not Found'})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Query Failed', 'errortype': str(e)})
    finally:
        conn.close()



def sql_query_max_coin_amount():

    conn = get_db_connection()
    if not conn:
        return json.dumps({'status': 'error', 'message': 'Database Connection Failed'})

    query = """
        SELECT MAX(coin)
        FROM account;
    """

    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
            maxvalue = result[0] if result else None

            if maxvalue is not None:
                return json.dumps({'status': 'success', 'message': 'Query Successful', 'result': maxvalue})
            else:
                return json.dumps({'status': 'error', 'message': 'No coin values found'})
    except Exception as e:
        conn.rollback()
        return json.dumps({'status': 'error', 'message': 'Query Failed', 'errortype': str(e)})
    finally:
        conn.close()