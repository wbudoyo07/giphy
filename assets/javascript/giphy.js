//  Homework -6 
// Due, June, 23 2018
//  last Edited  June, 20 2018 

//VARIABLES

// string an array that hold all the names of anime
var topic=["Naruto", "Bleach","One Piece", "Dragon Ball", "Death Note", "Attack of Titan"];




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
    // };// end for
      

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

}// end inputString

//=========================================================================================================
// MAIN PROCESS

renderButtons();
submitButtonToArray ();


//=========================================================================================================