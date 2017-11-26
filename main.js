// Global Variables

const cards = [];
var playerCard = [];
var dealerCard = [];
var counter = 0;
var dollars = 100;
var endPlay = false;
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "J", "Q", "K"];
// Used to test for aces to make sure our values at 1 or 11 are working.

// const numbers = ["A", "A", "A", "A", "A", "A", "A", "A",
//     "A", "A", "A", "A", "A"];


// Variables for DOM manipuation

const message = document.getElementById('message');
const display = document.getElementById('display');
const playerHand = document.getElementById('playerHand');
const dealerHand = document.getElementById('dealerHand');
var playerValue = document.getElementById('playerValue');
var dealerValue = document.getElementById('dealerValue');
var dollarValue = document.getElementById('dollars');

// Event listener for betting

document.getElementById('bet').onchange = function () {
    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > dollars){
        this.value = dollars;
        message.innerHTML = "Bet changed to $"+this.value;
    }
}

// Creating Deck
// Assigning values and colors to suits with use of a for .. in loop

for (s in suits) {
    const suit = suits[s][0].toUpperCase();
    const backgroundColor = (suit == "S" || suit == "C") ? "black" : "red"
    for (n in numbers) {
        const value = (n > 9) ? 10 : parseInt(n) + 1
        // Used for ace test
        // const value = 1;
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
    
    shuffleCards(cards);
    dealCard();
    document.getElementById("start").style.display = 'none';
    dollarValue.innerHTML = dollars;
 

}

// function to reshuffle cards at any point when called upon

function redealCards() {
    counter++;
    if (counter > 40) {
    console.log("new deck!");
    shuffleCards(cards);
    counter = 0;
    message.innerHTML = "New Shuffle";
    }
}

// Deal out cards function with a for loop involving two cards

function dealCard() {
    dealerValue.innerHTML = "?";
    playerCard = [];
    dealerCard = [];
    playerHand.innerHTML = "";
    dealerHand.innerHTML = ""; 

    // selecting bet input to subtract value of bet from 100 dollar total

    var betValue = document.getElementById("bet").value;
    dollars = dollars - betValue;
    document.getElementById("dollars").innerHTML = dollars;
    document.getElementById("actions").style.display = 'flex';
    message.innerHTML = "Get up to 21 and beat the dealer to win!<br>Your Current Bet is $"+betValue;
    document.getElementById("bet").disabled = true;
    document.getElementById("max-bet").disabled = true;
    deal();
    // document.getElementById("deal-button").style.display = 'none';

}

 // Looping through each set of cards for the dealer and player


function deal() {
   console.log(cards);
    for (var y = 0 ; y < 2; y++) {
        dealerCard.push(cards[counter]);
        dealerHand.innerHTML += cardRendering(counter, y);
        if(y==0) {
            dealerHand.innerHTML += '<div id="cover"></div>'
        }
        redealCards();
        playerCard.push(cards[counter]);
        playerHand.innerHTML += cardRendering(counter, y);
        redealCards();
    }

    var playerVal = checkTotal(playerCard);
    if(playerVal == 21 && playerCard.length == 2) {
        stopPlay();
     }
    playerValue.innerHTML = checkTotal(playerCard);
    
}


// function to render multiple cards

function cardRendering(n, y) {

    return '<div class="card '+cards[n].icon+'"> <div class="top-card suit">'+cards[n].cardNumber+'<br></div> <div class="middle-card suit"></div> <div class="bottom-card suit">'+cards[n].cardNumber+'<br></div></div>';
}

// function for user to go "All in" and bet all their money

function maxBet() {
    document.getElementById("bet").value = dollars;
    message.innerHTML = "Bet changed to $" + dollars;
}

// function to set actions for the hit, double, or hold

function cardAction(act) {
    console.log(act);
    switch(act) {
        case 'hit':
            playCard(); // add new card to player's hand
            break;
        case 'hold':
            stopPlay(); // add cards to each other and calculate
            break;            
        case 'double': // grabbing the bet value and turning it into an integer while also allowing user to double their bet with this conditional statement.
            var betValue = parseInt(document.getElementById("bet").value);
            if((dollars - betValue < 0)) {
                betValue = betValue + dollars;
                dollars = 0;
            }else {
                dollars = dollars - betValue;
                betValue = betValue * 2;
            }

                document.getElementById("dollars").innerHTML = dollars;
                document.getElementById("bet").value = betValue; 
            // double current bet and remove value from dollars variable set to 100
            playCard();
            stopPlay();
            break;
        default:
            console.log('done');
            stopPlay();

    }
}

// adding a new card to the players hand if they hit

function playCard() {
        playerCard.push(cards[counter]);
        playerHand.innerHTML += cardRendering(counter, (playerCard.length - 1));
        counter++
        var val = checkTotal(playerCard);
        playerValue.innerHTML = val;

        if(val > 21) {
            message.innerHTML = "Busted!";
            stopPlay();
        }
}

// not allowing gameplay with this function (hold/stay)
// disable max bet input from being changed and hiding the buttons while in gameplay.
function stopPlay() {
    endPlay = true; 
    document.getElementById("cover").style.display = 'none';
    document.getElementById("actions").style.display = 'none';
    document.getElementById("deal-button").style.displayCard = 'flex';
    document.getElementById("bet").disabled = false;
    document.getElementById("max-bet").disabled = false;
    message.innerHTML = "Game Over <br> ";
    var blackjackPayout = 1;
    var dealerVal = checkTotal(dealerCard);
    dealerValue.innerHTML = dealerVal;

    // while loop for dealer when score is less than 17

    while (dealerVal < 17) {
        dealerCard.push(cards[counter]);
        dealerHand.innerHTML += cardRendering(counter, (dealerCard.length - 1));
        counter++;
        dealerVal = checkTotal(dealerCard);
        dealerValue.innerHTML = dealerVal;
    }

    // This is a conditional to payout the player if they get a 21 exactly

     var playerVal = checkTotal(playerCard);
     if(playerVal == 21 && playerCard.length == 2) {
        message.innerHTML = "Player Blackjack";
        blackjackPayout = 1.5;
     }

     // Conditionals to determine who wins game and paying out the player if they've won.

     var betValue = parseInt(document.getElementById("bet").value) * blackjackPayout;

     if ((playerVal < 22 && dealerVal < playerVal) || (dealerVal > 21 && playerVal < 22)) {
        message.innerHTML += 'You win! You won $' + betValue;
        dollars = dollars + (betValue * 2)
     }

     else if (playerVal > 21)  {
        message.innerHTML += 'Dealer wins, you lost!';
     }

     else if (playerVal == dealerVal) {
        message.innerHTML += 'PUSH';
        dollars = dollars + betValue;
     }

     else {
        message.innerHTML += 'Dealer wins, you lost!';
     }



     playerValue.innerHTML = playerVal;
     dollarValue.innerHTML = dollars;
    
}

// function to check the total score of the player and dealer

function checkTotal(arr) {  
    // container for value of the card to check the total
    var valHolder = 0;
    // set to false because we have yet to draw an ace yet
    var aceCounter = false;
    // looping through array that sets ace counter to true when an ace is drawn from array of cards. It adds 10 to the first ace drawn so it has a value of 11.
    for (var i in arr) {
        if(arr[i].cardNumber == 'A' && !aceCounter) {
            aceCounter = true;
            valHolder = valHolder + 10;
        }
            valHolder = valHolder + arr[i].value;
    }
    // This conditional sends the value for another ace back to 1 if there's already an ace in the hand. This will allow the user to not go over 21 if they have a second ace.
        if(aceCounter && valHolder > 21 ) {
            valHolder = valHolder - 10;
        }
        return valHolder;
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









