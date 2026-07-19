//DOM for the frontend
let attackingHand = document.getElementById("attackingHand")
let usingHand = document.getElementById("usingHand")
let text = document.getElementById("log")
let roundDisplay = document.getElementById("roundDisplay")

//Creating integers to evaluate attacks
let attacking = 0
let using = 0

//Create counter for round number
let roundNo = 1

//Declare an array to store the last four messages
let textLog = ["","",
    "","",""]

let emoji = [ //Store all the emojis in an array
        "✊",
        "☝️",
        "✌️",
        "🤟",
        "🖖",
        "🖐️",
        "🤌",
        "👌",
        "🤞",
        "🫰",
        "🤚"
    ]

//Declare player object for all the data involving the player
let player = {
    lhs: 1,
    rhs: 1,
    Left: document.getElementById("playerLeft"),
    Right: document.getElementById("playerRight")

}

//Declare computer object for all the data involving the computer
let computer = {
    lhs: 1,
    rhs: 1,
    Left: document.getElementById("compLeft"),
    Right: document.getElementById("compRight")
}

//To finalize the data at the end of the player's turn
function endTurn() {

    player.Left.innerText = emoji[player.lhs]
    player.Right.innerText = emoji[player.rhs]
    computer.Left.innerText = emoji[computer.lhs]
    computer.Right.innerText = emoji[computer.rhs]
    attacking = 0
    using = 0
    setCheckboxes()
    //Start computer's turn
    compTurn()
}

//Choosing which hand to attack
function attack(x) {
    attacking = x
    setCheckboxes()
}

//Choosing which hand to use
function useHand(x){
    using = x
    setCheckboxes()
}

//Show the attacking hand and the using hand on the frontend
function setCheckboxes(){
    //Set attacking Hand first
    if(attacking === -1){
        attackingHand.innerText = "Left"
    }
    else if(attacking === 1){
        attackingHand.innerText = "Right"
    }
    else{
        attackingHand.innerText = ""
    }

    //Now set using Hand
    if(using === -1){
        usingHand.innerText = "Left"
    }
    else if(using === 1){
        usingHand.innerText = "Right"
    }
    else{
        usingHand.innerText = ""
    }
}

//Declare function to display the message log
function messageLog(x){
    text.innerText = ""
    textLog.unshift(x)
    textLog.pop()
    for(let i = 0; i < textLog.length; i++){
        text.innerText += textLog[i] + "\n"
    } 
}

//Declare function for the player's attack turn
function playerAttack() {
    //If attack is pressed without setting the moves
    if(attacking === 0 || using === 0){
        let temp = "Moves not set!"
        messageLog(temp)
    }
    //if the using hand is already dead
    else if((using === -1 && player.lhs === 0) || (using === 1 && player.rhs === 0)){
        let temp = "Hand is dead"
        messageLog(temp)
    }
    //If the attacking hand is already dead
    else if((attacking === -1 && computer.lhs === 0)  || (attacking === 1 && computer.rhs === 0)){
        let temp = "Hand is dead"
        messageLog(temp)
    }
    //For all other cases
    else if(attacking === -1 && using === -1){
        messageLog("___round start___")
        computer.lhs = evaluateAttack(true, player.lhs, computer.lhs)
        endTurn()
    }
    else if(attacking === -1 && using === 1){
        messageLog("___round start___")
        computer.lhs = evaluateAttack(true, player.rhs, computer.lhs)
        endTurn()
    }
    else if(attacking === 1 && using === -1){
        messageLog("___round start___")
        computer.rhs = evaluateAttack(true, player.lhs, computer.rhs)
        endTurn()
    }
    else if(attacking === 1 && using === 1){
        messageLog("___round start___")
        computer.rhs = evaluateAttack(true, player.rhs, computer.rhs)
        endTurn()
    }
}

//Declare function to evaluate attack and return it
function evaluateAttack(isPlayer, x, y){
    //Declare temp to store message
    let temp = ""

    //Declare total to store x + y
    let total = x + y

    //Check if the invoker is the player
    if(isPlayer){
        //Set the message
        temp = "Player: "  
    }
    else{
        //Set the message
        temp = "Computer: "
    }

    //Continue the message
    temp += emoji[x]+" + "+emoji[y]+" = "

    //Check if the resulting move is a 5
    if(total === 5){
        total = 0
    }
    //If not, is it a 14
    else if(total === 14){
        total = 0
    }
    //otherwise negate 9 from it
    else if(total >= 10){
        total -= 9
    }

    //Regardless of special cases,
    temp += emoji[total]
    messageLog(temp)
    return total
}

//Declare function for sacrificing hand
function sacrificeHand(){
    //Check if any hand is dead and return message
    if(player.lhs === 0 || player.rhs === 0){
        messageLog("Not available when hand is dead!")
    }
    //Check if the combining hand is 5
    else if(player.lhs + player.rhs === 5){
        messageLog("Resulting hand will die!")
    }
    //Normal cases
    else {
        //Add both hands into one and set the other to 0
        messageLog("___round start___")
        player.lhs = evaluateAttack(true, player.lhs, player.rhs)
        player.rhs = 0
        endTurn()
    }
}

//Declare function for reviving dead hand
function reviveHand(){
    //Start creating the message
    let temp = "Player: "
    
    //Check if both hands are alive
    if(player.rhs > 0 && player.lhs > 0){
        messageLog("All hands are alive!")
    }
    //Check if a hand dies upon reviving the other
    else if(player.rhs === 6 || player.lhs === 6){
        messageLog("Proceeding will kill a hand!")
    }
    //check if the only alive hand is 1
    else if(player.lhs === 1 || player.rhs === 1){
        messageLog("Cannot Revive Hand!")
    }
    //otherwise proceed
    else if(player.rhs === 0){
        temp += emoji[player.lhs] + " = "
        player.lhs -= 1
        player.rhs += 1
        temp += emoji[player.lhs] + " + " + emoji[player.rhs]
        messageLog("___round start___")
        messageLog(temp)
        endTurn()
    }
    else if(player.lhs === 0){
        temp += emoji[player.rhs] + " = "
        player.rhs -= 1
        player.lhs += 1
        temp += emoji[player.rhs] + " + " + emoji[player.lhs]
        messageLog("___round start___")
        messageLog(temp)
        endTurn()
    }
    
}

//Declare function to evaluate computer's moves
function compTurn(){
    //Priority 1: Kill a hand
    //Check if the sum of any combination will give a 5
    if(computer.lhs + player.lhs === 5){
        player.lhs = evaluateAttack(false, computer.lhs, player.lhs)
    }
    else if(computer.rhs + player.lhs === 5){
        player.lhs = evaluateAttack(false, computer.rhs, player.lhs)
    }
    else if(computer.lhs + player.rhs === 5){
        player.rhs = evaluateAttack(false, computer.lhs, player.rhs)
    }
    else if(computer.rhs + player.rhs === 5){
        player.rhs = evaluateAttack(false, computer.rhs, player.rhs)
    }
    //Priority 2: Weaken a hand
    //Check if the sum of any combination yields a 10 or above
    else if(computer.lhs + player.lhs >= 10){
        player.lhs = evaluateAttack(false, computer.lhs, player.lhs)
    }
    else if(computer.rhs + player.lhs >= 10){
        player.lhs = evaluateAttack(false, computer.rhs, player.lhs)
    }
    else if(computer.lhs + player.rhs >= 10){
        player.rhs = evaluateAttack(false, computer.lhs, player.rhs)
    }
    else if(computer.rhs + player.rhs >= 10){
        player.rhs = evaluateAttack(false, computer.rhs, player.rhs)
    }
    //Priority 3: Revive a hand if possible
    //Check if a hand is dead, no hand yields a 6, and no combination can kill it
    else if(computer.lhs === 0 && computer.rhs !== 6 && 
        player.lhs + computer.rhs - 1 !== 5 && 
        player.rhs + computer.rhs - 1 !== 5 && 
        player.lhs + 1 !== 5 && computer.rhs > 1 && 
        player.rhs + 1 !== 5){
            let temp = "Computer: " + emoji[computer.rhs] + " = "
            computer.rhs -= 1
            computer.lhs += 1
            temp += emoji[computer.rhs] + " + " + emoji[computer.lhs]
            messageLog(temp)
        }
    else if(computer.rhs === 0 && computer.lhs !== 6 && 
        player.lhs + computer.lhs - 1 !== 5 && 
        player.rhs + computer.lhs - 1 !== 5 && 
        player.lhs + 1 !== 5 && computer.lhs > 1 && 
        player.rhs + 1 !== 5){
            let temp = "Computer: " + emoji[computer.lhs] + " = "
            computer.lhs -= 1
            computer.rhs += 1
            temp += emoji[computer.lhs] + " + " + emoji[computer.rhs]
            messageLog(temp)
        }
    //Priority 4: Attack any hand at random
    else{
        randomChoice()
    }
    endRound()
}

//Declare function to end the round
function endRound(){
    roundNo++
    roundDisplay.innerText = "Round: "+roundNo
    player.Left.innerText = emoji[player.lhs]
    player.Right.innerText = emoji[player.rhs]
    computer.Left.innerText = emoji[computer.lhs]
    computer.Right.innerText = emoji[computer.rhs]

    //Check if any one has lost
    if(computer.lhs === 0 && computer.rhs === 0){
        window.location.href = "endgame.html"

    }
    else if(player.lhs === 0 && player.rhs === 0){
        window.location.href = "lose.html"
    }
    messageLog("___round end___")
}

//Declare a function to randomly choose for the computer
function randomChoice(){
    //Declare two hands
    let handA = Math.floor(Math.random()*2) + 1
    let handB = Math.floor(Math.random()*2) + 1

    //Check if the player only has one hand
    if(player.lhs === 0){
        handB = 2
    }
    else if(player.rhs === 0){
        handB = 1
    }

    //Check if the computer only has one hand
    if(computer.lhs === 0){
        handA = 2
    }
    else if(computer.rhs === 0){
        handA = 1
    }
    
    //Attack the randomly chosen hands
    if(handA === 1 && handB === 1){
        player.lhs = evaluateAttack(false, computer.lhs, player.lhs)
    }
    else if(handA === 1 && handB === 2){
        player.rhs = evaluateAttack(false, computer.lhs, player.rhs)
    }
    else if(handA === 2 && handB === 1){
        player.lhs = evaluateAttack(false, computer.rhs, player.lhs)
    }
    else if(handA === 2 && handB === 2){
        player.rhs = evaluateAttack(false, computer.rhs, player.rhs)
    }
}

//Declare function to play again
function playAgain(){
    window.location.href = "game.html"
}

//Declare function to go back home
function backHome(){
    window.location.href = "index.html"
}