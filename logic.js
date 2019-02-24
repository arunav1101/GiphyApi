$(document.body).on("click", "button", function () {
    console.log("in button")
    var animalSearch = $(this).attr("data-name");
    console.log(animalSearch);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch +
        "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((response) => {
        $("#gifs-appear-here").empty();
        if (!response.data.length) {
            alert('No record found')
            return;
        }
        console.log(response.data[0]);
        response.data.forEach(element => {
            $("#gifs-appear-here")
                .prepend(
                    `<div><p>Rating: ${element.rating}</p> 
          <img src ="${element.images.fixed_height_still.url}"
          data-still="${element.images.fixed_height_still.url}"
          data-animate="${element.images.fixed_height.url}"
          data-state="still" class="gif">`
                );
        });

    });
});

$(document.body).on("click", ".gif", function () {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});

// Initial array of animals

var animals = ["cat", "falcon", "dog", "cat", "rabbit", "turtle", "crab", "frog", "shark", "goldfish",
    "chicken", "goat"
];



// Function for displaying Animals gifs 
function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of animal
    animals.forEach((myanimal) => {
        $("#buttons-view")
            .append(`<button class ="animal" data-name=${myanimal}>${myanimal}</button>`);
    });
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var newAnimal = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
    animals.push(newAnimal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();