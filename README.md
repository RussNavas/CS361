# Rubric Converter 📝
   
   
## The Mission 🎯
Help teachers who are transitioning from Google Classroom to Canvas save time.
Remaking rubrics while not necessisarily difficult is certianly time consuming.
If there is one thing teachers do not have enough of it is time.
I hope this small tool helps you feel supported and makes your day a little easier.

## How does it work? 🤨

This web app has a python backend that utilizes the flask framework.
The backend will handle the csv file from the user and process the csv to be in the correct format for Canvas.
The user will be served the transformed csv file that can be imported into Canvas through Canvas' interface.
   
The front end of this web app is done via React a javascript framework for making responsive web apps. 
The UI for this website is a single scrolling page whith a single button to click at each step of the process.  
The hope is that this will be as straightforward experience as possible for all you busy educators.

## The Steps to convert your rubric 🪜
### Step 0: Download your Google Classroom rubric as a csv file.
You will need to download your rubric as a csv from either Google Classroom or you can find your rubrics in your Google Drive.
For the uninitiated your rubrics will be a Google Sheet. Once you have your csv you are now ready to use the converter.

### Step 1: Choose file
select the csv file to be converted.
### Step 2: Click upload
upload the csv file to the server for processing.
### Step 3: Click download
download csv the processed file.
