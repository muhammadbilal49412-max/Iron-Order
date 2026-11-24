// Start screen//
const start = document.getElementById("yes"); // ready button//
const dis = document.querySelector(".head"); // h1 above ready button//
//CONTROLS//
const play = document.querySelector(".play"); //Entire class//
const ro = document.getElementById("ro"); //Rock//
const pa = document.getElementById("pa"); //Paper//
const sc = document.getElementById("sc"); //Scissors//
// central screen//
const gm = document.querySelector(".game"); //Entire display class//
const move = document.getElementById("move"); // Center Text//
const comp = document.getElementById("comp"); // computer side//
const you = document.getElementById("you"); // player side//
// scoreboard//
const hud = document.querySelector(".hud"); //Entire HUD class//
const result = document.getElementById("result"); //Top h2 for final result//
const XP = document.getElementById("score1"); //player score//
const CP = document.getElementById("score2"); //computer score//
const round_no = document.getElementById("round"); //no.of rounds//
const again = document.getElementById("again"); //replay button//
// dictionaries
const res = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK",
}; // dictionary for checking win condition
const choices = ["ROCK", "PAPER", "SCISSORS"]; // list of computer choices//
const rep = {
  ROCK: "✊",
  PAPER: "✋",
  SCISSORS: "✌️",
}; // dictionary for word to symbol//
// variables//
var turns = 0;
var rounds = roundsgen(1, 10);
var xp = 0;
var cp = 0;
let isPlaying = false; // checks if the player is playing//
//Functions
function roundsgen(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //function to generate random no. of rounds
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //js version of time.sleep()//
async function load() {
  let times = 10;
  turns += 1;
  while (times > 0) {
    play.style.display = "none";
    move.textContent = `Round ${turns}`;
    comp.textContent = "✋";
    you.textContent = "✋";
    await sleep(100);
    comp.textContent = "✌️";
    you.textContent = "✌️";
    await sleep(100);
    comp.textContent = "✊";
    you.textContent = "✊";
    await sleep(100);
    times -= 1;
  }
  comp.textContent = "";
  you.textContent = "";
  move.textContent = `CHOOSE`;
  play.style.display = "flex";
  isPlaying = false;
} // f(x) for load screen/animation
async function play_game(player_choice) {
  if (isPlaying || rounds <= 0) return;
  isPlaying = true;
  const comp_choice = choices[Math.floor(Math.random() * choices.length)];
  comp.textContent = rep[comp_choice];
  you.textContent = rep[player_choice];
  play.style.display = "none";
  if (player_choice === comp_choice) {
    move.textContent = `YOU TIED`;
    cp += 5;
    xp += 5;
  } else if (res[comp_choice] === player_choice) {
    move.textContent = `!!!YOU WON!!!`;
    xp += 10;
  } else {
    move.textContent = `YOU LOST`;
    cp += 10;
  }
  rounds -= 1;
  await sleep(500);
  if (rounds > 0) {
    await load();
    isPlaying = false;
  } else {
    play.style.display = "none";
    gm.style.display = "none";
    hud.style.display = "flex";
    XP.textContent = `Player Score.................${xp}`;
    CP.textContent = `Comp Score.................${cp}`;
    round_no.textContent = `Rounds Played................${turns}`;
    if (xp === cp) {
      result.textContent = `TIE`;
    } else if (xp > cp) {
      result.textContent = `VICTORY`;
    } else {
      result.textContent = `DEFEAT`;
    }
  }
}
//Button Events
start.addEventListener("click", () => {
  load();
  gm.style.display = "flex";
  dis.style.display = "none";
}); //Start the game
ro.addEventListener("click", () => play_game("ROCK")); //choose rock//
pa.addEventListener("click", () => play_game("PAPER")); //choose paper//
sc.addEventListener("click", () => play_game("SCISSORS")); //choose scissors//
again.addEventListener("click", () => {
  xp = 0;
  cp = 0;
  turns = 0;
  rounds = roundsgen(1, 10);
  hud.style.display = "none";
  gm.style.display = "flex";
  load();
  ro.addEventListener("click", () => play_game("ROCK")); //choose rock//
  pa.addEventListener("click", () => play_game("PAPER")); //choose paper//
  sc.addEventListener("click", () => play_game("SCISSORS")); //choose scissors//
});//Game restart button//
