
// Creating Deck

const cards = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", 
"9", "10", "J", "Q", "K"];


// Assigning values and colors to suits with use of a for .. in loop
for (s in suits) {
    const suit = suits[s][0].toUpperCase();
    const backgroundColor = (suit == "S" || suit == "C") ? "black" : "red"
    for (n in numbers) { 
   const value = (n > 9) ? 10 : parseInt(n) + 1 
   const card = {
        suit: suit,
        icon: suits[s],
        backgroundColor: backgroundColor,
        cardNumber: numbers[n],
        value: value
    }
    cards.push(card);

    }
}

console.log(cards);

//  Creating random card function which creates a random card with the styling and color for each card is in the function

function randomCard() {
    

const randomNum = Math.floor((Math.random()*52));
display.innerHTML += "<span style= 'color: " + " " + cards[randomNum].backgroundColor + "'>" + " " + cards[randomNum].icon + " " + 
cards[randomNum].cardNumber + "</span>  ";

}

randomCard();