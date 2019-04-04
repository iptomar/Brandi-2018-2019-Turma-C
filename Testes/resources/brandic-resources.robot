*** Settings ***
Library                         ./brandic.py
Library                         Selenium2Library



Documentation  So this file is one big poop

*** Keywords ***
Open Browser To Login Page
    [Arguments]  ${login-url}  ${browser}
    [Documentation]

    Open Browser    ${login-url}    ${browser}
    Title Should Be    Login Page


#--------------------------------------------------------------------------------------------------
Input Username
    [Arguments]    ${username}
    [Documentation]

    Input Text    username_field    ${username}

#--------------------------------------------------------------------------------------------------
Input Password
    [Arguments]    ${password}
    [Documentation]

    Input Text    password_field    ${password}

#--------------------------------------------------------------------------------------------------
Submit Credentials
    [Documentation]

    Click Button    login_button

#--------------------------------------------------------------------------------------------------
Welcome Page Should Be Open
    [Documentation]

    Title Should Be    Welcome Page

#--------------------------------------------------------------------------------------------------