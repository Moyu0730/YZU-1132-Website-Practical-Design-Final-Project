# YZU-1132-Website-Practical-Design-Final-Project

## feat: Add Flask Backend and Python Validation

* Affected Files
    1. Modified
        * `templates/sign.html` : Updated to use AJAX for account creation.
        * `static/js/sign.js` : Changed AJAX URL and logic for new backend.
    2. Created
        * `app.py` : Flask backend main file.
        * `static/func/account.py` : Handles account creation and confirmation HTML.
        * `static/func/data.py` : Handles input validation and SQL injection prevention.
    3. Deleted : No file deleted
* Features
    * Added Flask backend (`app.py`) to handle routing and API endpoints
    * Added Python validation logic in `static/func/data.py` and account creation logic in `static/func/account.py`
    * Integrated AJAX-based account creation with `/api/create_account` endpoint
    * Updated `sign.html` and `sign.js` to use new backend API for account creation and validation
    * Ensured validation includes
        1. Empty field check
        2. Email format check (YZU student/staff)
        3. Nickname, username, password length limits
        4. Password must contain special characters
        5. Simple SQL injection prevention
* Project Progress Structure
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   └── sign.css
    │   ├── js/
    │   │   └── sign.js
    │   ├── func/
    │   │   ├── account.py
    │   │   └── data.py
    │   └── img/
    ├── templates/
    │   ├── index.html
    │   └── sign.html
    ├── app.py
    ├── README.md
    ```

    - `static/css/`: CSS stylesheets
    - `static/js/`: JavaScript files for frontend logic
    - `static/func/`: Python modules for backend logic (account creation, validation)
    - `static/img/`: Image assets
    - `templates/`: HTML templates for Flask rendering
    - `app.py`: Main Flask backend file
    - `README.md`: Project documentation

> [!NOTE]
> Now using Flask and Python for backend validation and account creation. All validation and confirmation are handled server-side.

## feat: Adjust Folder Structure

* Features
    * Added `static` and `templates` Folders
        * In `static` Folder, there has
            1. `js` Folder
            2. `func` Folder
            3. `img` Folder
            4. `img` Folder
        * In `templates` Folder, there has
            1. All .html and .php Files

## feat: Finish Data Confirmation Page and New Data Validation

* Affected Files
    1. Modified
        * `css\sign.css`
        * `js\sign.js`
        * `func\data.php`
        * `func\create.php`
        * `sign.php`
    2. Created
        * `func` ( Folder )
    3. Deleted : No File Deleted
* Features
    1. `css\sign.css`
        1. `.input-box` : height changed to 45px
        2. `.div-nickname` & `.div-username` : width changed from 20% to 50%
        3. `.my-btn`
            * Create to give the general element characteristic of buttons
            * Seperate some characteristic from `.submit-btn`, `.conti-btn`, and `.back-btn`
    2. `js\sign.js` : Change the url of ajax of `create_account()`
    3. `func\data.php`
        1. Add More Validations, such as **Length Validation** and **Simple SQL Injection Validation** of 4 Variables and the **Validation if Password Contains Special Characters**
        2. Brief Description of SQL Injection Validation
            * Use Loop to Check Whether Input Matchs Follow Patterns
                ```php
                $patterns = [
                    "/' ?or ?'1'='1/i",
                    '/" ?or ?"1"="1/i',
                    "/' ?--/",
                    "/--/",
                    "/; ?drop/i",
                    "/union ?select/i",
                    "/' ?or ?1=1/i",
                ];
                ```
    4. `func\create.php`: Finish Designing the Page of Data Confirmation and Invalid Input Page
    5. `func` ( Folder ) : In ordered to Collect .php Files which Doesn't Shows Directly to Website Page

> [!NOTE]
> Simple SQL Injection Validation Added

## style: Adjust README.md Format

* Features
    * Change the position of CAUTION

## feat: Finish Create Account Page and Data Validation

* Features
    * Affected Files
        1. Modified
            * `sign.php`
        2. Created
            * `css\sign.css` : The Formation of `sign.php`
            * `js\sign.js` : Deal With the Functions from `sign.php` ( Currently : Ajax )
            * `data.php` : For Data Validation ( 2 Exceptions : 1 For Empty Input, 1 For Invalid Email )
            * `create.php` : In Order to Deal With Data Validaiton ( Using try-catch )
    * Expected Progress
        1. Finishing Data Confirmation in `create.php`
        2. Connecting to Data Base ( Maybe using PostgreSQL )

> [!CAUTION]
> There is NO SQL INJECTION EXCEPTION

## feat: Move Files to the XAMPP Folder and Configure It to Use PHP as the Primary Language

* Features
    * Affected Files
        1. Modified : `index.html`
        2. Created : 
            * `sign.php`
            * `signin.php`
            * `signout.php`
            * `signup.php`

## feat: Adjust index Page Elements

## feat: Upload Website Template

* [Free CSS Template Reference Link](https://www.free-css.com/free-css-templates/page285/viking)：https://www.free-css.com/free-css-templates/page285/viking

## feat: Initialize Repo and Test Commit