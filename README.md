# BloodSugar-Scriptable-Widget
![Widget Screenshot](https://raw.githubusercontent.com/maxmturner/BloodSugar-Scriptable-Widget/master/WidgetScreenshot.PNG)

This script is intended to be used in the Scriptable app for iOS, requires iOS 14 

It will create a widget that shows blood sugar readings from a Dexcom CGM and the Sugarmate app

Last updated to be used with Scriptable v1.5 and Sugarmate v2.6.23 

Future versions of Scriptable or Sugarmate could cause this script to not work properly

## To make Dexcom readings available and get the URL from Sugarmate follow these steps: 
- Download Sugarmate (available for iOS as well as other platforms)  
- Follow instructions to set up an account and add Sugarmate as a Follower 
- Go to a web browser (Required setting isn't available in the iOS app) and go to sugarmate.io and login to your account 
- Go to the settings page and scroll to the bottom 
- Turn on the switch for External JSON 
- Then save the URL

## To create the widget in Scriptable
- In scriptable, create a new script and copy/paste the contents of BloodSugarWidget.js
- Paste the URL from Sugarmate in the variable 'sugarmateURL' near the top of BloodSugarWidget.js
- You can run the script inside the app to see a preview of the widget
- Close the app and add a scriptable widget to your homescreen
- Edit the widget and select the script you made 
