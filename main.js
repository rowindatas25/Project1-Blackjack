// Creating Deck

const cards = [];
var playerCard = [];
var dealerCard = [];
var counter = 0;
var dollars = 100;
var endPlay = false;
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const numbers = ["A", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "J", "Q", "K"];
const message = document.getElementById("message");
const display = document.getElementById("display");
const playerHand = document.getElementById("playerHand");
const dealerHand = document.getElementById("dealerHand");
var playerValue = document.getElementById("playerValue");
var dealerValue = document.getElementById("dealerValue");
var dollarValue = document.getElementById("dollars");


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
    document.getElementById("start").style.display = 'none';
    document.getElementById("dollars").innerHTML = dollars;
 

}

// Deal out cards function with a for loop involving two cards

function dealCard() {
    playerCard = [];
    dealerCard = [];
    playerHand.innerHTML = "";
    dealerHand.innerHTML = ""; 

    // selecting bet input to subtract value of bet from 100 dollar total

    var betValue = document.getElementById("bet").value;
    dollars = dollars - betValue;
    document.getElementById("dollars").innerHTML = dollars;
    document.getElementById("actions").style.display = 'block';
    message.innerHTML = "Get up to 21 and beat the dealer to win!<br>Your Current Bet is $"+betValue;
    document.getElementById("bet").disabled = true;
    document.getElementById("max-bet").disabled = true;
    deal();

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
        counter++
        playerCard.push(cards[counter]);
        playerHand.innerHTML += cardRendering(counter, y);
        counter++
    }

    playerValue.innerHTML = checkTotal(playerCard);
    console.log(dealerCard);
    console.log(playerCard);
}


// function to render multiple cards

function cardRendering(n, y) {

    return '<div class="card '+cards[n].icon+'"> <div class="top-card suit">'+cards[n].cardNumber+'<br></div> <div class="middle-card suit"></div> <div class="bottom-card suit">'+cards[n].cardNumber+'<br></div></div>';
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
        case 'double':
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
function stopPlay() {
    endPlay = true; 
    document.getElementById("cover").style.display = 'none';
    document.getElementById("actions").style.display = 'none';
    document.getElementById("deal-button").style.displayCard = 'block';
    document.getElementById("bet").disabled = false;
    document.getElementById("max-bet").disabled = false;
    message.innerHTML = "Game Over ";
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
     if(playerVal == 21 && playerCard.length == 21) {
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



     playerValue.innerHTML = dealerVal;
     dollarValue.innerHTML = dollars;
    
}

// function to check the total score of the player and dealer

function checkTotal(arr) {  
    var valHolder = 0;
    var aceCounter = false;
    for (var i in arr) {
        if(arr[i].cardNumber == 'A' && !aceCounter) {
            aceCounter = true;
            valHolder = valHolder + 10;
        }
            valHolder = valHolder + arr[i].value;
    }
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









