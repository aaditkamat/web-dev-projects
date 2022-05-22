const pressButton = (buttons, colors, index) => {
  buttons[index].addClass("pressed"); // button of specified color (selected at random) is pressed
  setTimeout(() => {
    buttons[index].removeClass("pressed");
  }, 100);
  $("body").append(`<audio src="sounds/${colors[index]}.mp3" autoplay></audio>`);
  $("audio").remove();
};

$(document).on("keypress", () => {
  $("#level-title").replaceWith(`<div id="level-title">Level 1</div>`);
  const globalStates = [];
  let gameOver = false;
  do {
    const getNewState = (min, max) => Math.floor(Math.random() * max) + min;
    const newState = getNewState(0, 3);
    globalStates.push(newState);
    const colors = ["green", "red", "yellow", "blue"];
    const buttons = colors.map((color) => $(`#${color}`));
    pressButton(buttons, colors, newState);
    for (let i = 1; i < globalStates.length; i++) {
      $("button").on("click", (index) => {
          pressButton(buttons, colors, index);
          if (globalStates[i] !== index) {
            gameOver = true;
            $("#level-title").replaceWith(
              `<div id="level-title">Game Over, Press Any Key to Restart</div>`
            );
            $("body").addClass("game-over");
            setTimeout(() => {
              $("body").removeClass("game-over");
            }, 100);
            return;
          }
      });
    }
    if (!gameOver) {
      $("#level-title").replaceWith(
        `<div id="level-title">Level ${globalStates.length}</div>`
      );
    }
  } while (!gameOver);
});
