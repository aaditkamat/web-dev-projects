var updatePage = () => {
    let heading = document.getElementsByTagName('h1')[0];
    let images = document.getElementsByTagName('img');
    let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    } 
    let scores = [];
    for (let i = 0; i < images.length; i++) {
        scores[i] = getRandomInt(1, 6);
        images[i].src = `images/dice${scores[i]}.png`;
    }
    if (scores[0] > scores[1]) {
        heading.innerText = '🚩 Player 1 wins!';
    } else if (scores[1] > scores[0]) {
        heading.innerText = 'Player 2 wins! 🚩';
    } else {
        heading.innerText = 'Draw!';
    }
}

updatePage();