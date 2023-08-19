var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        level = 0;
        gamePattern=[];
        started=true;
        nextSequence();
    }
})

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.round((((Math.random() * 10) % 3))); var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    document.activeElement.blur();
    
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game Over, Press any key to continue")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        started = false;
    }
}
