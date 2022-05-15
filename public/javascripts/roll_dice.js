const updatePage = () => {
  const heading = document.getElementsByTagName('h1')[0];
  const images = document.getElementsByTagName('img');
  const getRandomInt = (min, max) => Math.floor(Math.random() * max) + min;
  const scores = [];
  for (let i = 0; i < images.length; i += 1) {
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
};

updatePage();
