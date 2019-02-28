// Initial array of animals
var animals = ["cat", "falcon", "dog", "rat", "rabbit", "turtle", "crab", "frog", "shark", "goldfish",
    "chicken", "goat"
];
$(document).ready(function () {
    $(document.body).on("click", "button", function () {
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
            response.data.forEach(element => {
                $("#gifs-appear-here")
                    .append(
                        `<div class="col-sm-3 ml-4">
                    <h4>Rating: ${element.rating}</h4>
                    <img src ="${element.images.fixed_height_still.url}"
          data-still="${element.images.fixed_height_still.url}"
          data-animate="${element.images.fixed_height.url}"
          data-state="still" class="gif">
                    </div>`
                    )
            $('h4').css("color","green");
                });
        });
    });

    $(document.body).on("click", "reset", function () {
        $("#buttons-view").empty();
    });

    $(document.body).on("click", ".gif", function () {
        ($(this).attr("data-state") === "still") ? $(this)
            .attr("data-state", "animate")
            .attr("src", $(this).attr("data-animate")): $(this)
            .attr("data-state", "still")
            .attr("src", $(this).attr("data-still"));
    });

    
    // Function for displaying Animals gifs 
    function renderButtons() {
        $("#buttons-view").empty();
        // Looping through the array of animal
        animals.forEach((myanimal) => {
            $("#buttons-view")
                .append(`<button type ="button" class ="btn btn-primary animal mr-2 mb-2"  data-name=${myanimal}>${myanimal}</button>`);
        });
    }

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animalName = $('#animal-input').val().trim();
        animalName = animalName.replace(/\s/, "");

        if ((animalName.match(/^$/g)) || animalName.match(/\s/gm)) alert("Animal Name is mandate");
        else {
            if (animals.includes(animalName)) {
                alert("Animal already in the list ! Add another");
                $('#animal-input').val('');
                return;
            }
            // The animal from the textbox is then added to our array
            animals.push(animalName);
            $('#animal-input').val('');
            // Calling renderButtons which handles the processing of our animal array
            renderButtons();
        }
    });
    renderButtons();
});