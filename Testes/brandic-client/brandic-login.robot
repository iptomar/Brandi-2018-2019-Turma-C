*** Settings ***
Test Timeout  2 minutes
Documentation

Force Tags  BRANDIC  MCPEREIRA  LGOMES  VANESSA

Library   SeleniumLibrary
Resource  ./resources/brandic-resources.robot

Suite Setup     Open Browser
Suite Teardown  Close Browser

*** Variables ***
   ${browser}   chrome
   ${login-url}   http://brandic.devll.eu:61080/login/login


*** Test Cases ***
BRANDI-C-LOGIN - Success
    [Documentation]

    Open Browser To Login Page
    Input Username    admin@admin.pt
    Input Password    admin
    Submit Credentials
    Welcome Page Should Be Open

#-------------------------------------------------------------------------------
BRANDI-C-LOGIN - Invalid password
    [Documentation]

    Open Browser To Login Page
    Input Username    admin@admin.pt
    Input Password    mode
    Submit Credentials
    #ERROR - Welcome Page Should Be Open

#-------------------------------------------------------------------------------