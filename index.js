let message = document.getElementById("message");
document.getElementById("newcard").style.display = "none";
document.getElementById("generate").style.display = "none";
document.getElementById("card3").style.display = "none";
document.getElementById("retry").style.display = "none";
document.querySelector(".card1").style.display = "none";
document.querySelector(".card2").style.display = "none";

let card1value, card2value, sum;

function startgame() {
  document.querySelector(".card1").style.display = "block";
  document.querySelector(".card2").style.display = "block";
  document.querySelector(".card1").src = getCardImage(0);
  document.querySelector(".card2").src = getCardImage(1);          
  document.getElementById("start").style.display = "none";
  document.getElementById("generate").style.display = "block";
  let music = document.getElementById("music");
  music.play();
}

function getCardImage(value) {
  if(value === 0){
    return `assets/${value}.png`;
  }
  if(value === 1){
    return `assets/${value}.png`;
  }
  return `assets/${value}.svg`;
}
let generateClicks = 0;
const maxTries = 3;
  
function generate() {
  document.body.style.backgroundColor = "white";
  generateClicks++;

  if (generateClicks > maxTries) {
    message.textContent = "Maximum tries reached. Please retry the game.";
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
    return;
  }
  card1value = Math.floor(Math.random() * 10) + 2;
  card2value = Math.floor(Math.random() * 10) + 2;
  sum = card1value + card2value;

  document.querySelector(".card1").src = getCardImage(card1value);
  document.querySelector(".card2").src = getCardImage(card2value);
  document.querySelector(".card3").src = "";
  document.getElementById("newcard").style.display = "block";
  if (sum < 21) {
    message.innerHTML = `Your total is ${sum}, you have to draw one more card to win<br>NOTE: only 3 chances available`;

  } else if (sum === 21) {
    message.textContent = "YOU WON !!!!!";
    document.body.style.backgroundColor = "lightgreen";
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
    videoplay();

  } else {
    message.textContent = "You LOST";
    document.body.style.backgroundColor = "red";
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
  }

  
}

function newcard() {
  document.getElementById("card3").style.display = "block";
  let card3value = Math.floor(Math.random() * 10) + 2;
  document.querySelector(".card3").src = getCardImage(card3value);
  sum += card3value;

  if (sum === 21) {
    message.textContent = "YOU WON !!!";
    document.body.style.backgroundColor = "lightgreen";
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
    videoplay();
  } else if (sum > 21) {
    message.textContent = `YOU LOST !!!!!, your total is : ${sum}`;
    document.body.style.backgroundColor = "red";
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
  } else {
    message.textContent = `TOTAL SUM IS : ${sum} — you can't draw more cards`;
    document.getElementById("generate").style.display = "none";
    document.getElementById("newcard").style.display = "none";
    document.getElementById("retry").style.display = "block";
  }
}

function retry() {
  document.getElementById("card3").style.display = "none";
  document.getElementById("retry").style.display = "none";
  document.getElementById("generate").style.display = "none";
  document.getElementById("newcard").style.display = "none";
  document.getElementById("start").style.display = "block";
  message.textContent = "";
  document.body.style.backgroundColor = "white";
  card1value = 0;
  card2value = 0;
  sum = 0;
  document.querySelector(".card1").style.display = "none";
  document.querySelector(".card2").style.display = "none";
  document.querySelector(".card1").src = "";
  document.querySelector(".card2").src = "";
  document.querySelector(".card3").src = "";
  generateClicks = 0;
  video.style.display = "none";
}
const video = document.getElementById("winnervideo");
function videoplay(){
  video.style.display = "block";
  video.currenttime = 0;
  video.play();
  video.addEventListener(`timeupdate`, () => {
    if(video.currenttime>= 6){
      video.pause();
      video.style.display = "none";
      video.currenttime = 0;
    }
  } , {once : true});
}