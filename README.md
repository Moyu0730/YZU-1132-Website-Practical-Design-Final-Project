# YZU-1132-Website-Practical-Design-Final-Project

## bugfix: Coins picked by visitor will not accumulate

## v2.0 Finish

## feat: Add sql_query_coin_max API and Adjust Chart Indicator Upper Bound

* Affected Files  
    1. Modified  
        * `database/sql.py` : Added new function for `sql_query_coin_max` API to retrieve the maximum coin amount among all users  
        * `static/js/chart.js` : Changed indicator upper bound logic to use the highest coin amount from all users (fetched via the new API)
        * `static/js/index.js` : Add `logout` function to reset `accCoinAmount` into visitor mode
        * `app.py` : add `/api/sql_query_max_coin` for `sql_query_coin_max` API
    2. Created : None  
    3. Deleted : None  
* Features  
    1. **New API**: Added `sql_query_coin_max` API to backend for querying the maximum coin amount among all users  
    2. **Chart.js Enhancement**: The indicator's upper bound in `chart.js` now dynamically reflects the highest coin amount among all users, improving accuracy and user experience
* Project Progress Structure  
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   ├── calendar.css
    │   │   ├── production.css
    │   │   ├── profile.css
    │   │   ├── rpg.css
    │   │   └── sign.css
    │   ├── func/
    │   │   ├── account.py
    │   │   ├── ajax.py
    │   │   ├── data.py
    │   │   ├── llm.py
    │   │   └── profile.py
    │   ├── img/
    │   └── js/
    │       ├── calendar.js
    │       ├── chart.js (Modified)
    │       ├── index.js (Modified)
    │       ├── profile.js
    │       ├── rpg.js
    │       └── sign.js
    ├── material/
    │   └── map.json
    ├── templates/
    │   ├── index.html
    │   └── sign.html
    ├── database/
    │   └── sql.py (Modified)
    ├── app.py (Modified)
    ├── config.ini
    ├── README.md (Modified)
    └── .gitignore
    ```

## v1.0 Finish

## feat: Add RPG Game Logic, Map Switching, and Optimize Code Structure

* Affected Files  
    1. Modified  
        * `static/js/rpg.js` : Refactored to fetch map data via API instead of importing from a JS file  
        * `app.py` : Added `/api/rpg/get_map` endpoint to serve map data securely from the backend  
        * `templates/index.html` : Ensured frontend loads RPG as before, but now fetches map data via API  
    2. Created
        * `material/map.json` : New location for all RPG map data (moved from `static/js/rpg-map.js`)  
    3. Deleted  
        * `static/js/rpg-map.js` : Removed, as map data is now securely stored in the backend
        * `static/js/randopm.js` : Generate random value within lower and upper bound
* Features  
    1. Map data is no longer exposed in the frontend JS, preventing users from easily accessing or modifying map layouts  
    2. RPG map data is now stored in `material/map.json` and served via a Flask API endpoint
    3. **Code Structure Optimization** : Frontend RPG logic now fetches map data asynchronously, improving maintainability and separation of concerns  
    4. **No Breaking Changes** : RPG game logic and user experience remain unchanged, but map data is now protected and easier to manage  
* Project Progress Structure  
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   ├── production.css
    │   │   ├── rpg.css
    │   │   ├── profile.css
    │   │   └── calendar.css
    │   ├── js/
    │   │   ├── index.js
    │   │   ├── rpg.js (Modified)
    │   │   ├── chart.js (Modified)
    │   │   ├── calendar.js (Modified)
    │   │   └── profile.js
    │   ├── func/
    │   │   ├── account.py
    │   │   └── profile.py
    │   └── img/
    ├── material/
    │   └── map.json (Created)
    ├── templates/
    │   ├── index.html (Modified)
    │   └── sign.html
    ├── database/
    │   └── sql.py
    ├── app.py (Modified)
    ├── config.ini
    ├── README.md
    └── .gitignore
    ```

## feat: Add AJAX-based Login and Account Creation with PostgreSQL Integration

* Affected Files
    1. Modified
        * `templates/sign.html` : Updated navigation and login form, AJAX triggers for login and account creation
        * `static/js/sign.js` : Implemented AJAX logic for login, account creation, and PostgreSQL integration
        * `static/func/account.py` : Added account creation and login validation logic
        * `static/func/data.py` : Enhanced input validation and SQL injection prevention
        * `database/sql.py` : Added PostgreSQL logic for user creation and login query
        * `app.py` : Integrated new API endpoints for login and account creation
    2. Created
        * `static/func/ajax.py` : Backend logic to return login and account creation HTML for AJAX requests
    3. Deleted : None
* Features
    * Login and account creation forms are now loaded dynamically via AJAX without full page reloads
    * User registration and login are validated on the backend with Python, including SQL injection prevention and field checks
    * PostgreSQL is used for persistent user data storage; account creation and login both interact with the database
    * On successful login or registration, user is redirected to the homepage and a cookie is set for session management
    * Error and validation messages are displayed dynamically in the form area
    * Project structure further modularized for maintainability
* Project Progress Structure
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   ├── production.css
    │   │   ├── rpg.css
    │   │   ├── profile.css
    │   │   ├── sign.css (Modified)
    │   ├── js/
    │   │   ├── index.js
    │   │   ├── rpg.js
    │   │   ├── sign.js (Modified)
    │   ├── func/
    │   │   ├── account.py (Modified)
    │   │   ├── data.py (Modified)
    │   │   ├── ajax.py (Created)
    │   │   └── profile.py
    │   └── img/
    ├── templates/
    │   ├── index.html
    │   └── sign.html (Modified)
    ├── database/
    │   └── sql.py (Modified)
    ├── app.py (Modified)
    ├── config.ini
    ├── README.md
    └── .gitignore
    ```

> [!NOTE]
> Login and registration are now fully AJAX-driven and backed by PostgreSQL with robust validation and error handling.

## feat: Complete Profile AJAX Functionality on Index Page

* Affected Files
    1. Modified
        * `templates/index.html` : Added AJAX call for profile display and updated navigation bar to trigger profile modal
    2. Created
        * `static/js/profile.js` : Implemented AJAX logic to fetch and render user profile dynamically
        * `static/css/profile.css` : Styles for profile modal and buttons
        * `static/func/profile.py` : Backend logic to return profile HTML based on login state
    3. Deleted : None
* Features
    * Clicking "My Profile" in the navigation bar now triggers an AJAX request to fetch and display the user's profile without reloading the page
    * Profile content is dynamically rendered based on the user's login state (shows welcome and logout if logged in, sign in prompt if not)
    * Improved user experience by avoiding full page reloads for profile access
    * Backend (`profile.py`) returns appropriate HTML for profile modal based on session/cookie
* Project Progress Structure
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   ├── production.css
    │   │   ├── rpg.css
    │   │   ├── sign.css
    │   │   └── profile.css (Created)
    │   ├── js/
    │   │   ├── index.js
    │   │   ├── rpg.js
    │   │   ├── sign.js
    │   │   └── profile.js (Created)
    │   ├── func/
    │   │   ├── account.py
    │   │   ├── data.py
    │   │   └── profile.py (Created)
    │   └── img/
    ├── templates/
    │   ├── index.html
    │   └── sign.html
    ├── database/
    │   └── sql.py
    ├── app.py
    ├── config.ini
    ├── README.md
    └── .gitignore
    ```

## feat: RPG Canvas Character and Grid Adjustment

* Affected Files
    1. Modified
        * `static/js/rpg.js` : Adjusted grid calculation and character rendering to fit an 8x8 grid
        * `templates/index.html` : Ensured canvas is displayed and sized for RPG grid
        * `static/css/rpg.css` : Canvas background and style adjustments
    2. Created : None
    3. Deleted : None
* Features
    * The RPG canvas is now divided into an 8x8 grid, regardless of the canvas pixel width
    * The main character's size is dynamically set to exactly match one grid cell
    * All map objects (mountain, enemy, coin, etc.) are rendered to fit one grid cell
    * Canvas and grid size calculations are now consistent and responsive to the canvas width
    * Improved code clarity for grid and character rendering
* Project Progress Structure
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   ├── production.css
    │   │   ├── rpg.css
    │   │   └── sign.css
    │   ├── js/
    │   │   ├── index.js
    │   │   ├── rpg.js
    │   │   └── sign.js
    │   ├── func/
    │   │   ├── account.py
    │   │   └── data.py
    │   └── img/
    │       ├── Enemy.png
    │       ├── grasses68.gif
    │       ├── material.png
    │       └── spriteSheet.png
    ├── templates/
    │   ├── index.html
    │   └── sign.html
    ├── database/
    │   └── sql.py
    ├── app.py
    ├── config.ini
    ├── README.md
    └── .gitignore
    ```

    - `css`: CSS stylesheets (production, RPG, sign)
    - `js`: JavaScript files for frontend logic (index, RPG, sign)
    - `func`: Python modules for backend logic (account creation, validation)
    - `img`: Image assets for RPG and UI
    - `templates`: HTML templates for Flask rendering
    - `database`: Database connection and SQL logic
    - `app.py`: Main Flask backend file
    - `config.ini`: Database and environment configuration
    - `README.md`: Project documentation
    - `.gitignore`: Git ignore rules

## feat: Integrate Flask Backend, Python Validation, and PostgreSQL Database

* Affected Files
    1. Modified
        * `templates/sign.html` : Updated to use AJAX for account creation and interact with Flask backend
        * `static/js/sign.js` : Added AJAX requests to Flask API and handled account creation logic
        * `static/js/index.js` : Dynamically displays login/logout button based on cookie status
        * `templates/index.html` : Navigation bar supports login/logout state display
    2. Created
        * `app.py` : Main Flask backend file, handles routing and API endpoints.
        * `static/func/account.py` : Handles account creation and validation HTML responses
        * `static/func/data.py` : Handles input validation and SQL injection prevention
        * `database/sql.py` : Connects to PostgreSQL and executes account data insertion
    3. Deleted : No file deleted
* Features
    * Switched backend to Flask for unified handling of registration, login, and logout processes
    * Registration now uses AJAX requests, with real-time feedback on the main page
    * On successful registration, sets cookie and redirects to homepage; 
        * homepage and navbar display nickname or login button based on cookie
    * Added PostgreSQL database integration for account data storage (`database/sql.py`)
    * Refactored project structure to separate backend logic, static resources, and templates
* Project Progress Structure
    ```
    YZU-1132-Website-Practical-Design-Final-Project/
    ├── static/
    │   ├── css/
    │   │   └── sign.css
    │   ├── js/
    │   │   ├── sign.js
    │   │   └── index.js
    │   ├── func/
    │   │   ├── account.py
    │   │   └── data.py
    │   └── img/
    ├── templates/
    │   ├── index.html
    │   └── sign.html
    ├── database/
    │   └── sql.py
    ├── app.py
    ├── README.md
    ```

    - `css`: CSS stylesheets
    - `js`: JavaScript files for frontend logic
    - `func`: Python modules for backend logic
    - `img`: Image assets
    - `templates`: HTML templates for Flask rendering
    - `database`: Database connection and SQL logic
    - `app.py`: Main Flask backend file
    - `README.md`: Project documentation

## style: Adjust README.md Format

* Features
    * Remove the remark of `Email format check`

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
        2. Email format check
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