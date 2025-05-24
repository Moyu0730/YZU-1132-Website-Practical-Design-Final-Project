import re

# Start validation
def validate(nickname, username, email, password):
    try:
        # Check if data is empty
        if not nickname or not username or not email or not password:
            raise Exception("All Fields are Required.")

        # Check if email is valid
        if not re.match(r"^(s\d{7}@mail|[A-Za-z0-9]+@saturn)\.yzu\.edu\.tw$", email):
            raise Exception("Invalid Email Format.")

        # Check if nickname longer than 1 characters
        if len(nickname) > 7:
            raise Exception("Nickname Must be Less than 7 Characters.")

        # Check if username longer than 25 characters
        if len(username) > 25:
            raise Exception("Username Must be Less than 25 Characters.")

        # Check if password longer than 25 characters
        if len(password) > 25:
            raise Exception("Password Must be Less than 25 Characters.")

        # Check if password shorter than 5 characters
        if len(password) < 5:
            raise Exception("Password Must be Longer than 5 Characters.")

        # Check if password doesn't contain special characters
        if not re.search(r"[!@#$%^&*()_+|~=`{}\[\]:\";'<>?,./]", password):
            raise Exception("Password Must Contain Special Characters.")

        # Prevent SQL Injection
        if (if_sql_injection(nickname) or if_sql_injection(username) or
            if_sql_injection(email) or if_sql_injection(password)):
            raise Exception("Stop Doing SQL Injection. \nWe Are Watching You.")

        return "Validation successful."
    except Exception as e:
        return str(e)
# End validation


# Start SQL Injection Prevention
def if_sql_injection(input_str):
    patterns = [
        r"' ?or ?'1'='1",
        r'" ?or ?"1"="1',
        r"' ?--",
        r"--",
        r"; ?drop",
        r"union ?select",
        r"' ?or ?1=1",
    ]
    for pattern in patterns:
        if re.search(pattern, input_str, re.IGNORECASE):
            return True
    return False
# End SQL Injection Prevention