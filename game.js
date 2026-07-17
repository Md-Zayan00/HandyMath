//DOM for the frontend
let attackingHand = document.getElementById("attackingHand")
let usingHand = document.getElementById("usingHand")

//Creating integers to evaluate attacks
let attacking = 0
let using = 0

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

//Declare a function to set the emojis of both equal to their respective value
function endRound() {
    player.Left.innerText = emoji[player.lhs]
    player.Right.innerText = emoji[player.rhs]
    computer.Left.innerText = emoji[computer.lhs]
    computer.Right.innerText = emoji[computer.rhs]
    attacking = 0
    using = 0
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

    //Now set using Hand
    if(using === -1){
        usingHand.innerText = "Left"
    }
    else if(using === 1){
        usingHand.innerText = "Right"
    }
}
