
let playerCount = 0;
let computerCount = 0;

 function getComputerChoices() {
    let choices = ['rock', 'paper', 'scissor'] //computer choices
    let random = Math.floor(Math.random() * choices.length); //length of the array + 1 giver the perfect numbering for 1,2,3

    if(random === 1){
        return 'rock';
    }else if(random === 2){
        return 'paper';
    }else if(random === 0){
        return 'scissor';
    }
} 

// console.log(getComputerChoices()) 
// return random computer choices


function playRound(playerSelection, computerSelection){
    
   if(playerSelection === "rock" && computerSelection === "paper"){
    computerCount++
    return "You Lose! Paper beats Rock"
    
   }else if (playerSelection === "rock" && computerSelection === "scissor"){
    playerCount++
    return "You win!!!"
   }else if(playerSelection === "paper" && computerSelection === "scissor"){
    computerCount++
    return "You Lose! Scissor beats Paper"
   }else if (playerSelection === "paper" && computerSelection === "rock"){
    playerCount++
    return "You win!!!"
   }if(playerSelection === "scissor" && computerSelection === "rock"){
    computerCount++
    return "You Lose! Rock beats Scissor"
   }else if (playerSelection === computerSelection ){
    return "Its a draw!"
   }
}

 //radom input from this function as computer choice
// console.log(computerSelection);
// let playerSelection  = "rock";

// console.log(playRound(playerSelection, computerSelection));


function game(){
   

    for(let i=0 ; i<5 ; i++){
        let playerSelection  = prompt("Please throw Rock Paper or Scissor").toLowerCase();
        let computerSelection = getComputerChoices();
       console.log(playRound(playerSelection, computerSelection));  
    }
    if( playerCount > computerCount){
        return "Great! You are smart indeed!";
    }else if (playerCount < computerCount ){
        return "The machines are taking Over :[";
    }else{
        return "We are Equal!";
    }
}

console.log(game());