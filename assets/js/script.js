var timeBlocks = {
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": ""
}
var presentHour = moment().hour();

$(document).ready(function(){
    //if there is nothing saved in the timeblocks
    if(!localStorage.getItem('timeBlocks')) {
        //save timeblocks for the first time
      setText(timeBlocks);
    } else {
        //get existing content
      setText(JSON.parse(localStorage.getItem('timeBlocks')));
    }
    //set date to current day at top of page
    $('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY'));
  })
  //when a save button is clicked
  $(".saveBtn").click(function(event) {
    event.preventDefault()
    //get the user input from the textarea and save it with the hour
    value = $(this).siblings("textarea").val();
    schedule = $(this).siblings("div").text();
    save(schedule, value);
  });
  
  //loads time blocks from local storage
  function loadTimeBlocks() {
    result = localStorage.getItem('timeBlocks')
    return (timeBlocks);
  }
  //saves to local storage
  function saveToLocalStorage(dayData) {
    localStorage.setItem('timeBlocks', JSON.stringify(dayData));
  }
  //initializes local storage if nothing has been saved yet
  function save(schedule, val) {
    if(!localStorage.getItem('timeBlocks')) {
        localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
    }
    let workHours = JSON.parse(localStorage.getItem('timeBlocks'));
    workHours[schedule] = val
    saveToLocalStorage(workHours);
  }
  //gets the text from the 
  function setText(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
//convert time blocks to array
timeBlocksArray = Object.keys(timeBlocks)
//iterate over the array
for (let i = 0; i < timeBlocksArray.length; i++) {
    var blockId = "row" + i
    var timeString = $(blockId).text()
    var blockTime = i + 9
    //if the block's hour is before the current one mark as past
    if (presentHour > blockTime) {
        $("#row" + i).addClass("past")
    } else if (presentHour < blockTime) {
        //if the block's hour is after the current one mark as future
        $("#row" + i).addClass("future")
    } else{
        //otherwise mark as present
        $("#row" + i).addClass("present")
    }
}
   