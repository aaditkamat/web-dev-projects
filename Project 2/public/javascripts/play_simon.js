var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

const nextSequence = () => {
    $("h1").text(`Level ${gamePattern.length + 1}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
}

$("body").on("keypress", () => {
    if (gamePattern.length === 0 ) {
        console.log("Key pressed");
        nextSequence();
    }
});

$(".btn").on("click", (event) => {
    const userChosenColour = event.target.id;
    if (userChosenColour !== gamePattern[userClickedPattern.length]) {
        setGameOver();
    } else {
        playSound(userChosenColour); 
        animatePress(event.target);
        userClickedPattern.push(userChosenColour);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
});

const animatePress = (button) => {
    $(button).addClass("pressed");
    setTimeout(() => $(button).removeClass("pressed"), 100);
}

const playSound = (name) => {
    $("body").append(`<audio src="sounds/${name}.mp3" autoplay></audio>`);
    setTimeout(() => $("audio").remove(), 1000);
}

const setGameOver = () => {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
}