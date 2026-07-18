//DOM for the frontend
let attackingHand = document.getElementById("attackingHand")
let usingHand = document.getElementById("usingHand")
let text = document.getElementById("log")

//Creating integers to evaluate attacks
let attacking = 0
let using = 0

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
        computer.lhs = evaluateAttack(true, player.lhs, computer.lhs)
    }
    else if(attacking === -1 && using === 1){
        computer.lhs = evaluateAttack(true, player.rhs, computer.lhs)
    }
    else if(attacking === 1 && using === -1){
        computer.rhs = evaluateAttack(true, player.lhs, computer.rhs)
    }
    else if(attacking === 1 && using === 1){
        computer.rhs = evaluateAttack(true, player.rhs, computer.rhs)
    }

    //End the player's turn
    endTurn()
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
    //If not, is it a 10 or above?
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
}