//Declare variables
let title = document.getElementById("title") //For changing the title of the page
let message = document.getElementById("rules")//For changing the message on the page
let button1 = document.getElementById("btn01")
let pages = true //For changing styling between pages


function startGame(){
    if(pages) { //Set the display to show the rules page
        title.innerText = "Handy Math 👋"
        button1.innerText = "Continue"
        message.innerText = "📝Rules:\n\n1. Both You & the Computer will be given two hands 🙌\n\n\
        2. Each hand will start with 1 point shown as (☝️)\n\n\
        3. A hand can die, representing 0 points as (✊)\n\n\
        4. For the start of each round, the player gets to choose an alive hand of the opponent\
        and themselves. When the round starts, the player's selected hand attacks the computer's hand.\
        Upon attacking, the value of the player's hand is added to the computer's hand. For example,\
        ☝️ + ☝️ = ✌️\n\n5. The computer plays as well, choosing their hand and the player's, before the round ends.\n\
        6. Any hand with 5 points (🖐️) dies and goes back to 0 (✊)\n\n\
        7. Any hand that reaches a value of 10(🤚) goes back to 1(☝️)\n\n\
        8. Any hand that goes above 10 points gets 9 deducted from it.\n\n\
        9. Both the player and the computer have the right to add their hands into one,\
        killing one hand in the process. For example, 2(✌️) & 4(🖖) can be added, resulting in \
        6(🤌) but one hand dies and it skips their turn.\n\n\
        10. Both the player and the computer can revive a hand by giving 1 point away. This skips their turn."
        pages = false
    }
    else { //Set the display to show the game page
        window.location.href = "game.html"
    }
}
