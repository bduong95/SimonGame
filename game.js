//alert("Game js is connected!");
// This entire application uses jquery

let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let userChosenColour;
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function startGame() {
    gameStarted = true;
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    // Generate random number from 0-3 (inclusive)
    var randomNumber = Math.round(Math.random() * 3);

    randomChosenColour = buttonColours[randomNumber];

    // Add random colour to the patterns array
    gamePattern.push(randomChosenColour);

    // Increase level
    level++;
    $("h1").text("Level " + level);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    console.log("Game Pattern " + gamePattern + " Most recent = " + gamePattern[currentLevel]);
    console.log("User Pattern " + userClickedPattern + " Most recent = " + userClickedPattern[currentLevel]);
    console.log("Current Level: " + currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("Success");
        // Gives more time for the user to respond
        setTimeout(function(){}, 1000);
    }
    else {
        console.log("Wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }

    // Check if urser sequence is done
    if (currentLevel + 1 === level)
    {
        console.log("Level Done");
        userClickedPattern = [];
        setTimeout(nextSequence, 2000);
    }
}

$(document).on("keypress", function() {
    startGame();
    nextSequence();
});

$(".btn").on("click", function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

