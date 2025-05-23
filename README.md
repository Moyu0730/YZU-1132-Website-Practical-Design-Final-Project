# YZU-1132-Website-Practical-Design-Final-Project

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