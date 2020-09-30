// This script is intended to be used in the Scriptable app for iOS, requires iOS 14 
// It will create a widget that shows blood sugar readings from a Dexcom CGM and the Sugarmate app

// Last updated to be used with Scriptable v1.5 and Sugarmate v2.6.23 
// Future versions of Scriptable or Sugarmate could cause this script to not work properly

// To make Dexcom readings available and get the URL from Sugarmate follow these steps: 
// Download Sugarmate (available for iOS as well as other platforms)  
// Follow instructions to set up an account and add Sugarmate as a Follower 
// Go to a web browser (Required setting isn't available in the iOS app) and go to sugarmate.io and login to your account 
// Go to the settings page and scroll to the bottom 
// Turn on the switch for External JSON 
// Then copy the URL
// Paste the URL from Sugarmate inside the quotes here.
let sugarmateURL = ""

let glucoseReading = await loadGlucose(sugarmateURL)

// Create the widget 
let widget = await createWidget(glucoseReading)

// Check if the script is running in
// a widget. If not, show a preview of
// the widget to easier debug it.
if (!config.runsInWidget) {
  await widget.presentMedium()
}

// Tell the system to show the widget.
Script.setWidget(widget)
Script.complete()

async function createWidget(glucoseReading) {
  // Set color based on glucose value  
  var mainColor
  var reading = glucoseReading.value // Manually set glucose value here to test the colors example: var reading = 300 
  

  if(reading < 75) {
    mainColor = "#d41e1e" // Red
  } else if( reading < 180 ) {
    mainColor = "00d2ff" // Blue
  } else if( reading < 250 ) {
    mainColor = "#ebc934" // Yellow
  } else {
    mainColor = "#d41e1e" // Red
  }
  
  // Creates a gradient from mainColor to Red 
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color(mainColor),
    new Color("#d41e1e")
  ]

  // Create the widget 
  let w = new ListWidget()
  
  // Set the gradient
  w.backgroundGradient = gradient

  // Add spacer above content to center it vertically.
  w.addSpacer()
  
  // Add glucose reading text
  let readingTxt = w.addText(glucoseReading.value.toString())
  readingTxt.font = Font.boldSystemFont(32)
  readingTxt.textColor = Color.black()
  readingTxt.centerAlignText()
  
  // Add Trend arrow and Change from last reading text
  let subTxtStr = glucoseReading.trend_symbol + " " + glucoseReading.delta
  let subTxt = w.addText(subTxtStr)
  subTxt.font = Font.boldSystemFont(24)
  subTxt.textColor = Color.black()
  subTxt.centerAlignText()
  
  // Add the time reading was taken text
  // Updating the widget is handled by iOS so it can vary. 
  // Having the time here lets you see how long ago this reading was taken. 
  // Generally 2-10 minutes in my experience
  let timeTxt = w.addText(glucoseReading.time)
  timeTxt.font = Font.boldSystemFont(24)
  timeTxt.textColor = Color.black()
  timeTxt.centerAlignText()
  
  // Add spacing below content to center it vertically.
  w.addSpacer()

  return w
}
  
async function loadGlucose(url) {
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}
