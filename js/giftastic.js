// Global variables
const giphy_API_Key = 'wbAm7mfVgl724955m2TtsvfFZ2UKtM2v';
const giphyURL = 'https://api.giphy.com/v1/gifs/search?';

var animals = [
                'dog',
                'cat',
                'mouse',
                'rabbit',
                'wolf',
                'leopard',
                'frog',
                'lion'
            ];

// This function creates buttons and add them to button-container div element
function createButtons() {
    var buttonContainer = $('#button-container');
    buttonContainer.empty();
    for( var i = 0; i < animals.length; i++ ) {
        $('<button>').addClass('giphyBtn').text( animals[i] ).val( animals[i] ).appendTo( buttonContainer );
    }
}   

// Adding image to some container
function addImage( container, still, animate  ){
    $('<img>').attr({
        'src':still,
        'data-still': still,
        'data-animate': animate,
        'data-state': 'still',
        'width': '200',
        'height': '200'
    }).addClass('animatedGIF').appendTo( container );
}

// Toggle animation function
function gifClick( event ){
    console.log( $(this).attr('data-still') );
    var gif = $(this);
    if ( gif.attr( 'data-state' ) === 'still' ) {
        gif.attr( 'data-state', 'animate' );
        gif.attr( 'src', gif.attr('data-animate') );
    }else
    if ( gif.attr( 'data-state' ) === 'animate' ) {
        gif.attr( 'data-state', 'still' );
        gif.attr( 'src', gif.attr('data-still') );
    }
}

// Function for the on-click event of the button class giphyBtn
function giphyBtnClick( event ) {
    var animal = $(this).val();

    console.log( animal );

    $.ajax({
        url: giphyURL  + 'api_key=' + giphy_API_Key + '&q=' + animal + '&limit=10',
        method: 'GET'
    }).done( function(response) {
        
        console.log( response );

        var data = response.data;

        $('#gif-container').empty;

        for ( var i = 0; i < data.length; i++) {
            var stillImage = data[i].images.downsized_still.url;
            var animateImage = data[i].images.downsized.url;
            var imageRating = data[i].rating;

            console.log( stillImage );
            console.log( animateImage );
            console.log( imageRating );

            addImage( $('#gif-container'), stillImage, animateImage );
        }
    });
}

//Function to add new animals
function addAnimal( event ) {
    event.preventDefault();
    var animalInput = $('#animal-input');
    if ( animalInput.val().trim() != '' ) {
        animals.push( animalInput.val().trim() );
        createButtons();
        animalInput.val( '' );
    }
}

$( document ).ready( function() {

    // render the buttons
    createButtons();

    // Adding click event listener to the submit button of the form
    $('#addAnimal').click( addAnimal );

    // Adding click event listeners to all elements with a class of "giphyBtn"
    $(document).on( 'click', '.giphyBtn', giphyBtnClick );

    //Adding click event listeners to all elements with tha class of "animatedGIF"
    $(document).on( 'click', '.animatedGIF', gifClick );

} );            