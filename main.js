	
// Creating the deck
	var cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
	var suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
	var theDeck = new Array();
	var multiplePlayers = new Array();
	var player1 = 0;


// iterating the value of each card and the different suits through an array for the deck.
// Using parseInt to convert a string to a number and then assign 10 to King, Queen and Jack.
// and 11 for Ace
function makeDeck() {
	deck = new Array();
		for (var i = 0; i < cardValues.length; i++) {
			for (var x = 0; x < suits.length; i++) {
				var blackJack = parseInt(cardValues[i]);
				if (cardValues[i]=== "Jack" || cardValues[i] === "Queen" || cardValues[i] === "King") {
					blackJack = 10;
				}
				if (cardValues[i]==="Ace"){
					blackJack = 11;
				}
				var card = {suit: suits[x], value: cardValues[i],  blackJack : blackJack};
				deck.push(card);
				console.log('iterated ya bish');
			}
		}

		return deck;
}


// Creating the player hand and players by iterating their information into the multiple player function with a dealer and player 1.
function makePlayers(num) {
	multiplePlayers = new Array();
	for (var i = 0; i <= num; i++) {
		var playerHand = new Array();
			var player = {name: 'player' + i, ID: i, score: 0, playerHand : playerHand};
				multiplePlayers.push(playerHand);

	}
}

// Using JQuery for building the user interface for easier notation and ability to add classes and elements.
$(document).ready(function playerUI() {

$("#multiplePlayers").html(" ");
for (var i = 0; i < multiplePlayers.length; i++) {
	var $divPlayer1 = $('<div>');
	var $divPlayerHand = $('<div>');
	var $divScore = $('<div>');
	var $divPlayerId = $('<div>');


	$divScore.add('score');
	$divScore.attr('id', 'score1');
	$divPlayer1.attr('id', 'player1');
	$divPlayer1.add('bjPlayer');
	$divplayerHand.attr('id', 'hand');

	$divPlayerId.html(multiplePlayers[i].ID);
	$divPlayer1.append($divPlayerId);
	$divPlayer1.append($divScore);
	$divPlayer1.append($divplayerHand);
	$('players').append($divPlayer1);
}
});
// shuffling the deck for every 100 turns, switch values of cards
function shuffleCards() {
	for (var i = 0 ; i < 100; i++) {
		var cardPlacement1 = Math.floor((Math.random() * deck.length));
		var cardPlacement2 = Math.floor((Math.random() * deck.length));
		var spot = deck[cardPlacement1];

		deck[cardPlacement1] = deck[cardPlacement2];
		deck[cardPlacement2] = spot;
	}
		
	}


function startGame() {
	// deal two cards to the player and dealer
	player1 = 0;
	makeDeck();
	shuffleCards();
	makePlayers(2);
	playerUI();
	dealHand();
	document.getElementById('player1' + player1.classList.add('working'));
}

// give two cards to each player by alternating them
function dealHand() {
	for (var i = 0; i< 2; i++) {
		for (var i = 0; i<multiplePlayers.length ; i++) {
			var card = deck.pop();
			multiplePlayers[x].playerHand.push(card);
			renderCard(card, x);
			updateScore();
		}
	}
	changeDeck();
}


function renderCard(card, player) {
	var hand = document.getElementById('hand' + player);
	hand.appendChild(cardUI(card));
}

//Using JQuery for user interface
$(document).ready(function cardUI(card) {
	var $element = $('<div>');
	$element.add('card');
	$element.html('card.suit' + ' ' + 'card.value');
	return $element;

});

// This should return the number that a player has in a hand
function scoreKeeper(player) {
	var wins = 0;
	for (var i = 0; i < multiplePlayers[player].playerHand.length; i++) {
		wins += multiplePlayers[player].playerHand[i].blackJack;
	}
	multiplePlayers[player].score = wins;
	return wins;
}
function updateScore() {
	for (var i = 0; i < multiplePlayers.length; i++) {
		scoreKeeper(i);
		document.getElementById('cardScore' + i).textContent = multiplePlayers[i].score;
	}
}

// provide a card from the deck to a current player with the hit function
function hit() {
		card = deck.pop();
		multiplePlayers[player1].playerHand.push(card);
		renderCard(card, player1);
		updateScore();
		loser();
		updateDeck();

}

// move to next person
function stay() {
	if (player1 != multiplePlayers.length - 1) {
		document.getElementById('player1' + player1).classList.remove('working');
		player1 += 1;
		document.getElementById('player1' + player1).classList.add('working');
	}
	else {
		endRound();
	}
}

function endRound() {
	var winner = -1;
	var total = 0;
	for (var i = 0; i < multiplePlayers.length; i++) {
			if (multiplePlayers.score > total && multiplePlayers[i].score < 22) {
					winner = i;
			}
					total = multiplePlayers[i].score;
	}

	alert ("Winner: " + multiplePlayers[winner].ID);
}

function loser() {
	if (multiplePlayers[player1].score > 21) {
		alert("Loser: " + multiplePlayers[player1].ID);
	}
}


function updateDeck() {
	document.getElementById('deckCounter').innerHTML = deck.length;
}




















