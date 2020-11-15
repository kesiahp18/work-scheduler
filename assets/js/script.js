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

$(document).ready(function(){
    //if there is nothing saved in the timeblocks
    if(!localStorage.getItem('timeBlocks')) {
        //initialize the empty time blocks to local storage
        localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
    } else {
      JSON.parse(localStorage.getItem('timeBlocks'));
    }
    //set date to current day at top of page
    $('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY'));

})

//save inputted content to local storage when save button is clicked
$("#save").click(function (event) {
    event.preventDefault();
    var hour = parseInt($(this).siblings("div").text().trim());
    var hourContent = $(this).siblings("textarea").val().trim();
    console.log(hour);
    console.log(hourContent);
});
