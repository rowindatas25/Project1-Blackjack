// Creating Deck

const cards = [];
var playerCard = [];
var dealerCard = [];
var counter = 0;
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "J", "Q", "K"];
const display = document.getElementById("display");
const playerHand = document.getElementById("playerHand");
const dealerHand = document.getElementById("dealerHand");


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

// Creating start game function by calling display card function twice with another function to shuffle cards in between.


function start() {
    
    shuffleCards(cards)
    dealCard();
 

}

// Deal out cards function with a for loop involving two cards

function dealCard() {
    playerCard = [];
    dealerCard = [];
    playerHand.innerHTML = "";
    dealerHand.innerHTML = ""; 
    for (var y = 0 ; y < 2; y++) {
        dealerCard.push(cards[counter]);
        dealerHand.innerHTML += cardRendering(counter, y);
        counter++
        playerCard.push(cards[counter]);
        playerHand.innerHTML += cardRendering(counter, y);
        counter++
    }
    console.log(dealerCard);
    console.log(playerCard);
}

// function to render multiple cards

function cardRendering(n, y) {
    const hpos = (y > 0) ? y * 60 + 100 : 100;
    return '<div class="card '+cards[n].icon+'"> <div class="top-card suit">'+cards[n].cardNumber+'<br></div> <div class="middle-card suit"></div> <div class="bottom-card suit">'+cards[n].cardNumber+'<br></div></div>';
}

// function that shuffles the deck

function shuffleCards(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        const holder = array[i];
        array[i] = array[x];
        array[x] = holder; 
    }
    return array;
}

// function that display one individual card

function displayCard() {
    display.innerHTML += "<span style= 'color: " + " " + cards[counter].backgroundColor + "'>" + " " + cards[counter].icon + " " + cards[counter].cardNumber + "</span>  ";
}









