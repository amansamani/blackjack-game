// Select dealer and player card elements
const dealerCards = document.querySelectorAll('.dealer .card');
const playerCards = document.querySelectorAll('.player .card');
const dealbutton = document.getElementById('deal-button');
const hitbutton = document.getElementById('hit-button');
const standbutton = document.getElementById('stand-button');
const resetbutton = document.getElementById('reset-button');
let playerscore = document.getElementById("playerscore");
let dealerscore = document.getElementById("dealerscore");
let totalamount = document.getElementById("totalamount");
let betamount = document.getElementById("betamount");
let fivedollars = document.getElementById("5coin");
let twentyfiveDollars = document.getElementById("25coin");
let seventyfiveDollars = document.getElementById("75coin");
let hundreadDollars = document.getElementById("100coin");
let playername = document.getElementById("playername");
const video = document.getElementById("winnervideo");
const resultText = document.getElementById("result-text");
let checkbox = document.getElementById("checkboxInput");
let Music = document.getElementById("music");
let bettingEnabled = true;

hitbutton.disabled = true;
standbutton.disabled = true;
resetbutton.disabled = true;

let dealerCard1, dealerCard2, playerCard1, playerCard2;
let sumofdealer = 0, sumofplayer = 0;
let currentBet = 0;
let totalAmountValue = 1000;
// Set default cards (0.png and 1.png)
function rulebutton(){
  document.getElementById("rulebox").style.display = "block";
}
function hiderule(){
  document.getElementById("rulebox").style.display = "none";
}
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    Music.play().catch((err) => console.log("Autoplay error:", err));
  } else {
    Music.pause();
  }
});
function startgame() {
  const name = document.getElementById("playerName").value.trim();
  playername.innerText = name;
  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  if (checkbox.checked) {
    Music.play().catch((err) => {
      console.log("Autoplay failed:", err);
    });
  }
  document.getElementById("startgamebackground").style.display = "none";
  document.getElementById("start-card").style.display = "none";
}

window.onload = () => {
  dealerCards[0].src = "assets/0.webp";
  dealerCards[1].src = "assets/1.webp";
  dealerCards[2].style.display = "none";

  playerCards[0].src = "assets/0.webp";
  playerCards[1].src = "assets/1.webp";
  playerCards[2].style.display = "none";

  totalamount.innerText = "Total Amount: $1000";
  betamount.innerText = "Bet Amount: $0";
};

function getCardImage(value) {
  return `assets/${value}.svg`;
}

function placeBet(amount) {
  if (!bettingEnabled) return;

  totalAmountValue += currentBet; // Reset current bet
  if (totalAmountValue < amount) {
    totalAmountValue -= currentBet;
    alert("You don't have enough money to place this bet.");
    return;
  }
  currentBet = amount;
  totalAmountValue -= amount;
  totalamount.innerText = `Total Amount: $${totalAmountValue}`;
  betamount.innerText = `Bet Amount: $${amount}`;
}

fivedollars.addEventListener("click", () => placeBet(5));
twentyfiveDollars.addEventListener("click", () => placeBet(25));
seventyfiveDollars.addEventListener("click", () => placeBet(75));
hundreadDollars.addEventListener("click", () => placeBet(100));

function checkBlackjackBonus(playerCard1, playerCard2) {
  // In your game, Ace = 10, King = 11
  const values = [playerCard1, playerCard2];
  return (values.includes(10) && values.includes(11));
}

function deal() {
  if (currentBet === 0) {
    alert("Please place your bet first!");
    return;
  }
  bettingEnabled = false;
  fivedollars.disabled = true;
  twentyfiveDollars.disabled = true;
  seventyfiveDollars.disabled = true;
  hundreadDollars.disabled = true;
  hitbutton.disabled = false;
  standbutton.disabled = false;
  resetbutton.disabled = false;
  resultText.innerText = "";

  document.querySelectorAll('.coin').forEach(c => c.classList.add("coin-disabled"));

  dealerCard1 = Math.floor(Math.random() * 10) + 2;
  dealerCard2 = Math.floor(Math.random() * 10) + 2;
  playerCard1 = Math.floor(Math.random() * 10) + 2;
  playerCard2 = Math.floor(Math.random() * 10) + 2;

  sumofdealer = dealerCard1 + dealerCard2;
  sumofplayer = playerCard1 + playerCard2;

  playerscore.innerText = `Player Score: ${sumofplayer}`;
  dealerscore.innerText = `Dealer Score: ${sumofdealer}`;

  dealerCards[0].src = getCardImage(dealerCard1);
  dealerCards[1].src = getCardImage(dealerCard2);
  dealerCards[2].style.display = "none";

  playerCards[0].src = getCardImage(playerCard1);
  playerCards[1].src = getCardImage(playerCard2);
  playerCards[2].style.display = "none";

  dealbutton.disabled = true;

  // BONUS: Blackjack Bonus
  if (checkBlackjackBonus(playerCard1, playerCard2)) {
    resultText.innerText = "Blackjack! You won with bonus payout!";
    totalAmountValue += currentBet * 2.5; // 3:2 payout = 1.5x profit
    currentBet = 0;
    totalamount.innerText = `Total Amount: $${totalAmountValue}`;
    betamount.innerText = `Bet Amount: $0`;
    hitbutton.disabled = true;
    standbutton.disabled = true;
    videoplay();
  }
}


function stand() {
  if (sumofdealer < sumofplayer) {
    const dealerCard3 = Math.floor(Math.random() * 10) + 2;
    sumofdealer += dealerCard3;
    dealerscore.innerText = `Dealer Score: ${sumofdealer}`;
    dealerCards[2].src = getCardImage(dealerCard3);
    dealerCards[2].style.display = "block";
  }

  setTimeout(() => {
    if (sumofplayer > 21) {
      resultText.innerText = "You busted! Dealer wins!";
    } else if (sumofdealer > 21) {
      resultText.innerText = "Dealer busted! You win!";
      totalAmountValue += currentBet * 2;
      videoplay();
    } else if (sumofplayer > sumofdealer) {
      resultText.innerText = "You won!";
      totalAmountValue += currentBet * 2;
      videoplay();
    } else if (sumofplayer < sumofdealer) {
      resultText.innerText = "Dealer wins!";
    } else {
      resultText.innerText = "It's a tie!";
      totalAmountValue += currentBet;
    }
      currentBet = 0;
      totalamount.innerText = `Total Amount: $${totalAmountValue}`;
      betamount.innerText = `Bet Amount: $0`;
      fivedollars.disabled = true;
      twentyfiveDollars.disabled = true;
      seventyfiveDollars.disabled = true;
      hundreadDollars.disabled = true;
      hitbutton.disabled = true;
      standbutton.disabled = true;
      resetbutton.disabled = false;
    }, 1000);
  }

function hit() {
  const playerCard3 = Math.floor(Math.random() * 10) + 2;
  sumofplayer += playerCard3;
  playerscore.innerText = `Player Score: ${sumofplayer}`;
  playerCards[2].src = getCardImage(playerCard3);
  playerCards[2].style.display = "block";

  if (sumofplayer > 21) {
    resultText.innerText = "You busted! Dealer wins!";
    currentBet = 0;
    betamount.innerText = `Bet Amount: $0`;
    hitbutton.disabled = true;
    standbutton.disabled = true;
    resetbutton.disabled = false;
    return;
  }

  setTimeout(() => {
    if (sumofdealer <= sumofplayer) {
      const dealerCard3 = Math.floor(Math.random() * 10) + 2;
      sumofdealer += dealerCard3;
      dealerscore.innerText = `Dealer Score: ${sumofdealer}`;
      dealerCards[2].src = getCardImage(dealerCard3);
      dealerCards[2].style.display = "block";
    }
  }, 400);

  setTimeout(() => {
    if (sumofdealer > sumofplayer && sumofdealer <= 21) {
      resultText.innerText = "Dealer wins!";
    } else if (sumofdealer === sumofplayer) {
      resultText.innerText = "It's a tie!";
      totalAmountValue += currentBet;
    } else if (sumofdealer > 21) {
      resultText.innerText = "Dealer busts! You won!";
      totalAmountValue += currentBet * 2;
      videoplay();
    } else {
      resultText.innerText = "You won!";
      totalAmountValue += currentBet * 2;
      videoplay();
    }

    currentBet = 0;
    totalamount.innerText = `Total Amount: $${totalAmountValue}`;
    betamount.innerText = `Bet Amount: $0`;
    fivedollars.disabled = true;
    twentyfiveDollars.disabled = true;
    seventyfiveDollars.disabled = true;
    hundreadDollars.disabled = true;
    hitbutton.disabled = true;
    standbutton.disabled = true;
    resetbutton.disabled = false;
  }, 1000);
}

function cleardeal() {
  dealbutton.disabled = false;
  hitbutton.disabled = true;
  standbutton.disabled = true;
  dealerCards[0].src = "assets/0.webp";
  dealerCards[1].src = "assets/1.webp";
  dealerCards[2].style.display = "none";
  playerCards[0].src = "assets/0.webp";
  playerCards[1].src = "assets/1.webp";
  playerCards[2].style.display = "none";
  playerscore.innerText = "Player Score: 0";
  dealerscore.innerText = "Dealer Score: 0";
  resultText.innerText = "";
  resetbutton.disabled = true;
  video.pause();
  video.style.display = "none";
  fivedollars.disabled = false;
  twentyfiveDollars.disabled = false;
  seventyfiveDollars.disabled = false;
  hundreadDollars.disabled = false;
  bettingEnabled = true;
  document.querySelectorAll('.coin').forEach(c => c.classList.remove("coin-disabled"));
}

function videoplay() {
  video.style.display = "block";
  video.currentTime = 0;
  video.play();
  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= 2) {
      video.pause();
      video.style.display = "none";
    }
  }, { once: true });
}
