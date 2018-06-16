// Global variables
const gifTastic_API_Key = 'wbAm7mfVgl724955m2TtsvfFZ2UKtM2v';

var animals = [
                'dog',
                'cat',
                'mouse',
                'rabbit',
                'wolf',
                'leppard',
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

// Function for the on-click event of the button class giphyBtn
function giphyBtnClick( event ) {
    console.log( $(this).val() );
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

} );            