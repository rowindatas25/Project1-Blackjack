// Creating Deck

const cards = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const numbers = ["A", "1", "2", "3", "4", "5", "6", "7", "8", 
"9", "10", "J", "Q", "K"];
const display = document.getElementById("display");
const randomNum = Math.floor((Math.random()*52) + 1);



for (s in suits) {
    for (n in numbers) {
        console.log(suits[s] + numbers[n]);
    }
}