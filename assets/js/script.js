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
      saveTasks(timeBlocks);
    } else {
      saveTasks(JSON.parse(localStorage.getItem('timeBlocks')));
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
  //saves 
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
  //
  function saveTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }