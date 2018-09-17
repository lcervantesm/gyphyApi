var initGifs = ["Friends", "Cats", "Dogs", "Laugh", "Random"];
renderBtns(); //Display initial array of gifs to search

//Add Button on click
$("#add").on("click", function (event) {
  event.preventDefault();
  addBtn( $("#item").val());
});

//Add button when eneter pressed and there is text in the input filed
$('#item').on('keyup', function (e) {
  var gifVal = $("#item").val();

  if ((e.keyCode === 13) && gifVal) {
    addBtn(gifVal);
  }
});

// Get Gifs from API on click
$(document).on("click", ".btn", function (event) {
  event.preventDefault();
  $('#gifShow').empty();
  
  var gif = $(this).attr("data-gif").toLowerCase();
  var gifSearch = gif.replace(" ","+"); //adapating value to API link format
  var limit = 10; //Search results limit;
  
  var apiKey = 'adKjcH4ilmeoTFKHM9RsmIhj4q39Q70T';
  var url = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key="+apiKey+"&limit="+limit;

  $.ajax({
    url: url,
    method: "GET"
  }).then(function (response) {
    var j = Object.keys(response.data).length; //Number of images to show

    if(j > 0){ //Eror Handler
      for(var i = 0; i < j; i++){ //Create and Display images
        var img = $('<img>');
        var imgStill = response.data[i].images.original_still.url;
        var imgAnim = response.data[i].images.original.url;
        var rating = response.data[i].rating;
        var slug = response.data[i].slug;
  
        img.attr("src",imgStill);
        img.attr("alt",slug);
        img.attr("data-still",imgStill);
        img.attr("data-rating",rating);
        img.attr("data-animate",imgAnim);
        img.attr("data-state","still");
        img.attr("title","Rating: "+rating.toUpperCase());
        img.addClass("gif");
        
        $('#gifShow').prepend(img);
      }  
    }else{
      var h1 = $('<h1>');

      h1.addClass("lead m-5")
      h1.text("Sorry! We couldn't find any GIFS for this topic...");
      $('#gifShow').html(h1);
    }
  });
});


// Play / pause
$(document).on("click", ".gif", function (event) {
  var state = $(this).attr("data-state"); //variable to toggle play/pause
  if (state === "still"){
    $(this).attr("data-state","animate");
    $(this).attr("src",$(this).attr("data-animate"));
  } else {
    $(this).attr("data-state","still");
    $(this).attr("src",$(this).attr("data-still"));
  }
});

// Function for displaying initial Gifs buttons
function renderBtns() {
  for (var i = 0; i < initGifs.length; i++) {
    var btn = $('<button>');

    btn.attr("data-gif", initGifs[i]);
    btn.addClass("btn m-1");
    btn.text(initGifs[i]);
    $('#gifBtns').append(btn);
  }
}

// Function for adding button
function addBtn (add){
  var gif = add.trim();
  var btn = $('<button>');
  initGifs.push(add);

  btn.attr("data-gif", gif);
  btn.addClass("btn m-1");
  btn.text(gif);
  $('#gifBtns').append(btn);

  $("#item").val("");
}