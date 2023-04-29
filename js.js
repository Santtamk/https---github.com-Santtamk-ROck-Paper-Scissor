const cpuChoices = document.querySelector('#computerchoice');//id for the computer option 
let cpuChoicesParagraph = document.createElement('p');//creating a new paragraph for cpu input
cpuChoices.appendChild(cpuChoicesParagraph);//adding it to #computerchoice



function getComputerChoices() {//finction to get a random cpu output
  let choices = ["rock", "paper", "scissor"]; //computer choices
  let random = Math.floor(Math.random() * choices.length); //random output from "choices" from Math.random() and Math.floor rounds up the integer to get a random choice within the choices length
  cpuChoices.removeChild(cpuChoicesParagraph);//removes the existing paragraph that shows the cpu output
  cpuChoicesParagraph = document.createElement('p');//creates a new paragraph
  cpuChoicesParagraph.textContent = choices[random];//adds a text content
  cpuChoicesParagraph.setAttribute('style', 'font-size:30px; color:red;')//simple styling to the text output
  cpuChoices.appendChild(cpuChoicesParagraph);//adds it to the dom
//this will make sure that on every round the output shown is refreshed 
  

  return choices[random];//output of the function 
}

const winningCombinations = {//an object that has all the possible outcomes of the game 
  "rock-paper": "You Lose! Paper beats Rock",
  "rock-scissor": "You win!!!",
  "paper-scissor": "You Lose! Scissor beats Paper",
  "paper-rock": "You win!!!",
  "scissor-rock": "You Lose! Rock beats Scissor",
  "scissor-paper": "You win!!!",
  "draw": "Its a draw!",
};

const playerOption = () => {//this is the player side to select between 3 buttons
  return new Promise((resolve) => {//creating a promise for event listeners 
    const RockButton = document.querySelector("#RockButton");//button for rock
    const PaperButton = document.querySelector("#PaperButton");//button for paper
    const ScissorButton = document.querySelector("#ScissorButton");//button for scissor

    RockButton.addEventListener("click", () => {//clcick event that resolves the promise
      resolve("rock");
    });

    PaperButton.addEventListener("click", () => {//clcick event that resolves the promise
      resolve("paper");
    });

    ScissorButton.addEventListener("click", () => {//clcick event that resolves the promise
      resolve("scissor");
    });
  });
};

async function playRound(playerSelection, computerSelection, playerCount, computerCount) {//plays one single round, have included counts and selections 
  let result;//initializing a variable for  storing the outcome of a singe game
  if (playerSelection === computerSelection) { //edge case 
    result = "Its a draw!";
  } else {
    const combination = `${playerSelection}-${computerSelection}`;//this is extracted from object winningCombinations line 21 right side is player input
    result = winningCombinations[combination];//assigning the variable to the combination as per inputs from player and computer 
    if (result.includes("win")) {//this is for keeping the count 
      playerCount++;
    } else if (result.includes("Lose")) {
      computerCount++;
    }
  }
  const resultOfTheRound = document.querySelector("#result");//time to add it to the dom 
  const newResultParagraph = document.createElement("p");//a new tag to show the outcome of throws 
  newResultParagraph.textContent = result;//content of the tag
  resultOfTheRound.appendChild(newResultParagraph);//finally the result for one game is updated 

  return [playerCount, computerCount];//we get a count on who won as well 
}

async function game() {//this is a finction to run 5 round 
  let playerCount = 0;//initializing counts 
  let computerCount = 0;

  const movesleft = document.querySelector(".movesleft");// dom to show the number of moves available
  movesleft.textContent = `Moves Left: ${5}`;
//future update - user must be able to set the number of rounds 

  for (let i = 0; i < 5; i++) {//loop for the rounds
    playerSelection = await playerOption();//loop stops here and waits for the player to click
    computerSelection = getComputerChoices();//just the above function from line 7

    [playerCount, computerCount] = await playRound(playerSelection, computerSelection, playerCount, computerCount);//run the function from line 51
    
  }

  let result = document.querySelector("#result");//selecting tag
  let finalresult = document.createElement("p");//creating p tag for final output 
  finalresult.setAttribute('style', 'color: purple; font-size: 2rem;')//styling the text output

  if (playerCount > computerCount) {//if the player count is greater 
    finalresult.textContent = "Great! You are smart indeed!";

  } else if (playerCount < computerCount) {//if the computer count is more
    finalresult.textContent = "The machines are taking Over :[";
  } else {//great! equals
    finalresult.textContent = "We are Equal!";
  }
  result.appendChild(finalresult);//now available on the page 

  document.querySelector("#RockButton").disabled = true;//disables the buttons after the loop ends 
document.querySelector("#PaperButton").disabled = true;//so that there is no further inputs
document.querySelector("#ScissorButton").disabled = true;
}
window.addEventListener("load", () => {//runs the game 
  game();
});
