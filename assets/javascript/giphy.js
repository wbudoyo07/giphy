//  Homework -6 
// Due, June, 23 2018
//  last Edited  June, 20 2018 

//VARIABLES

// string an array that hold all the names of anime
var topic=["Naruto", "Bleach","One Piece Anime", "Dragon Ball", "Death Note", "Attack of Titan"];

//=========================================================================================================
// FUNCTION

//  function for displaying  the buttons
function renderButtons(){

     // Deleting the  buttons prior to adding new  buttons
    // (this is necessary otherwise we will have repeat buttons)
        $("#animeButtons").empty();

    //iterate all strings in the array then make a button for each string
    // for(i=0;  i<topic.length; i++){
    //     $("#animeButtons").append("<button type='button' name='btn-"+i+"' value='"+topic[i]+"'>"+topic[i]+"</button>" );
    // };// end for  ( DONT MIND THIS COMMENT. THIS COMMENT FOR MY REFERENCES)
      

    //iterate all strings in the array then make a button for each string
        for(i=0; i<topic.length; i++){
            //creating button using jquary: it create (<button> and close </button)
            var addButton= $("<button>");
            // add class call anime
            addButton.addClass("anime");
            // creating attribute inside button bracket  ex: <button data-name="stringholder">
            addButton.attr("data-name",topic[i]);
            //add the text on each button
            addButton.text(topic[i]);
            // adding the button to html and append them
            $("#animeButtons").append(addButton);

        }// end for

    

};// end addButton

// this function handles events when submit buttons is click, it store the value to our array
function submitButtonToArray (){
   

    // everything it clicksubmit button, we add the text to the topic array
    $("#addAnime").on('click', function(){
    
        // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
     
      // This line will grab the text from the input box
      var addSubmitText= $("#anime-input").val().trim();

      // add the text from input box to topic array
      topic.push(addSubmitText);

      // calling renderButtons to reloaded all the buttons
      renderButtons();

    })// end click event 

}// end submitButtonToArray



// function  that call the giphy after click the button
function buttonRenderGiphy(){

    // event click listener  to all buttons
    $(document).on("click",".anime", function(){
    
         $("#animes").empty();
        // grabbing and storing to thisButton the value from the button
        var thisButton = $(this).attr("data-name");

         // Constructing a queryURL using the thisButton
        var queryURL= "https://api.giphy.com/v1/gifs/search?q=";
         var apiKey= "&api_key=eeDIH2DnsckEQM6XfYmbGhZxGy3gu09A";
    
         // combine all the url this button value and api key.
         queryURL=queryURL+thisButton+apiKey;

         // performing an AJAX request with the queryURl
         $.ajax({
             url:queryURL,
             method: "GET"

         })// end ajax

         // After data comes back from the request
        .then(function(response){

            console.log(queryURL);
            console.log(response);

            var result = response.data;
            //looping only 10 gif 
            for( var i=1; i<=10; i++){
               
                // create and storing a div tag
                var animeDiv=$("<div>");

            //     // Creating a paragraph tag with the result item's rating
               var p = $("<p>").text( i+" ) Rating: "  + result[i].rating);

              // Creating and storing an image tag
              var animeImage = $("<img>");

              // Setting the src attribute of the image to a property pulled off the result item (must be still for default)
              animeImage.attr("src",result[i].images.fixed_height_still.url);

              //setting the attr data still from result item. this will be use to pause gif
              animeImage.attr("data-still",result[i].images.fixed_height_still.url);

            // set data state to still. this will be use to pause gif
             animeImage.attr("data-state","still");

             // set data-animate from result images. this will be use to animate the image
             animeImage.attr("data-animate", result[i].images.fixed_height.url);

             // set data-state to animate. this will be use to animate the image
             animeImage.attr("data-state", "animate");

             // add class to image
             animeImage.addClass("gif");
            
            
             // Appending the paragraph and image tag to the animalDiv
            animeDiv.append(p);
            animeDiv.append(animeImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#animes").append(animeDiv);

            }// end for

            //call stillOrAnimateImg
            stillOrAnimateImg();
             
        });// end (response)

    });//end button click listener

}// end buttonRenderGiphy

//function to turn still image to gif  or turn gif to still image
function stillOrAnimateImg(){

    //click event to image 
    $(".gif").on("click", function(){
        console.log("you click image");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");

        // if the image on still  state then we update the image src to data animate
      if(state==="still"){
        $(this).attr("src",$(this).attr("data-animate") );
        // change the data-state to animate
        $(this).attr("data-state","animate");

      }
      // else if the image on animate state then update the image src to data still
      else{
        $(this).attr("src",$(this).attr("data-still") );
        // change the data-state to animate
        $(this).attr("data-state","still");
      }

    })// end click event

}// end stillOrAnimateImg

//=========================================================================================================
// MAIN PROCESS

renderButtons();
submitButtonToArray ();
buttonRenderGiphy();

//=========================================================================================================