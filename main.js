
	
	var cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	var suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
	var theDeck = [];
	var multiplePlayers = [];
	var currentPlayer = 0;
		var player =  {};
			var dealer = {};

// iterating the value of each card and the different suits through an array for the deck.
// Using parseInt to convert a string to a number and then assign 10 to King, Queen and Jack.
//and 11 for Ace
function makeDeck() {
	theDeck = new Array();
		for (var i = 0; i < cardValues.length; i++) {
			for (var x = 0; x < suits.length; x++) {
				var blackJack = parseInt(cardValues[i]);
				if (cardValues[i]== "J" || cardValues[i] == "Q" || cardValues[i] == "K") {
					blackJack = 10;
				}
				if (cardValues[i]=="A"){
					blackJack = 11;
				}
				else {
					console.log('loop works!')
				}
			var card = {suit: suits[x], value: cardValues[i],  blackJack : blackJack};
			
					theDeck.push(card);
		
				
				console.log('it works');
				
					

			}
		
			
		}


}


// Creating the player hand and players by iterating their information into the multiple player function with a dealer and player 1.
function makePlayers(num) {
	multiplePlayers = [];
	for (var i = 1; i <= num; i++) {
		var Hand = [];
		var player = {name: 'player', ID: 'Player 1', score: 0, Hand : Hand};
		var dealer = {name: 'dealer', ID: 'Dealer', score: 0, Hand : Hand};
			
					multiplePlayers.push(player);
					// multiplePlayers.push(dealer);
				
				console.log('this is hard');
	}
}


// creating the location where the cards will be kept and what they should print.
function playerUI() {

document.getElementById('player working').innerHTML = ' Dealer';
document.getElementById('player').innerHTML = ' Player 1 ';

for (var i = 0; i < multiplePlayers.length; i++) {
	var divPlayer1 = document.createElement('div');
	var divPlayerHand = document.createElement('div');
	var divScore = document.createElement('div');
	var divPlayerId = document.createElement('div');
	var divDealer = document.createElement('div');
	var divDealerId = document.createElement('div');

	divScore.className = 'score';
	divScore.id = 'scores' + i;
	divPlayer1.id = 'player';
	divPlayer1.className = 'player1';
	divPlayerHand.className = 'hand';
	divPlayerHand.id = 'hand' + i;
	divDealer.id = 'player working';
	divDealer.className = 'dealer';

	divPlayerId.innerHTML= multiplePlayers[i].ID;
	divPlayer1.appendChild(divPlayerId);
	divPlayer1.appendChild(divScore);
	divPlayer1.appendChild(divPlayerHand);
	document.getElementById('players').appendChild(divPlayer1);
	divDealer.innerHTML = multiplePlayers[i].ID;
	divDealer.appendChild(divDealerId);
	divDealer.appendChild(divScore);
	divDealer.appendChild(divPlayerHand);
	document.getElementById('players').appendChild(divDealer);
	console.log('we got this');
}
}

// shuffling the deck for every 100 turns, switch values of cards
function shuffleCards() {
	for (var i = 0; i < 100; i++) {
		var cardPlacement1 = Math.floor((Math.random() * theDeck.length));
		var cardPlacement2 = Math.floor((Math.random() * theDeck.length));
		var spot = theDeck[cardPlacement1];

		theDeck[cardPlacement1] = theDeck[cardPlacement2];
		theDeck[cardPlacement2] = spot;
	}
		
	}


function startGame() {
	
	currentPlayer = 0;
	makeDeck();
	shuffleCards();
	makePlayers(2);
	playerUI();
	dealHand();
	// document.getElementById('player working' + currentPlayer).addClass('dealer');
	// document.getElementById('player' + currentPlayer).addClass('player1');
	console.log('works');

}

// give two cards to each player by alternating them
function dealHand() {
	for (var i = 0; i< 2; i++) {
		for (var x = 0; x < multiplePlayers.length; x++) {
			var card = theDeck.pop();
			Hand = new Array();
			multiplePlayers[x].Hand.push(card);
			multiplePlayers[x].Hand.push(card);
			renderCard(card, x);
			updateScore();
		}
	}
	updateDeck();
}


function renderCard(card, player) {
		cardUI(card);
		
	
}


function cardUI(card) {
	var hand1 = document.getElementById('hand1');
	var hand2 = document.getElementById('hand2');
	var element1 = document.createElement('div');
	var element2 = document.createElement('div');
	var element3 = document.createElement('div');
	var element4 = document.createElement('div');
	element1.className = ('card');
	element1.id = ('card1');
	element1.innerHTML= card.suit + ' ' + card.value;
	hand1.appendChild(element1);
	element2.className = ('card');
	element2.id = ('card2');
	element2.innerHTML = card.suit + ' ' + card.value;
	hand1.appendChild(element2);
	element3.className = ('card');
	element3.id = ('card3');
	element3.innerHTML = card.suit + ' ' + card.value;
	hand2.appendChild(element3);
	element4.className = ('card');
	element4.id = ('card4');
	element4.innerHTML = card.suit + ' ' + card.value;
	hand2.appendChild(element4);
}


// This should return the number that a player has in a hand
function scoreKeeper(player) {
	var score = 0;
	var player1 = 0;
	var card = {suit: suits[x], value: cardValues[i],  blackJack : blackJack};
	for (var i = 0; i < multiplePlayers[1].Hand.length; i++) { 
		for (var x = 0; x < multiplePlayers[0].Hand.length; i++) {
		 multiplePlayers[1].Hand[i].card[2];
		 multiplePlayers[0].Hand[x].card[2];
		
			}
	}

	multiplePlayers[1].score = score;
	multiplePlayers[0].score = score;
	
}

function updateScore() {
	for (var i = 0; i < multiplePlayers.length; i++) {
		scoreKeeper(i);
		document.getElementById('scores' + i).textContent = multiplePlayers[i].score;
	}
}

// provide a card from the deck to a current player with the hit function
function hit() {
		
		var card = theDeck.pop();
		console.log(multiplePlayers);
		multiplePlayers[currentPlayer].Hand.push(card);
		multiplePlayers[currentPlayer].Hand.push(card);
		renderCard(card, currentPlayer);
		updateScore();
		loser();
		updateDeck();


}

// move to next person
function stay() {
	if (currentPlayer != multiplePlayers.length - 1) {
		document.getElementById('players' + currentPlayer).classList.remove('dealer');
		currentPlayer += 1;
		document.getElementById('players' + currentPlayer).classList.add('dealer');
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
	if (multiplePlayers[currentPlayer].score > 21) {
		alert("Loser: " + multiplePlayers[currentPlayer].ID);
	}
}


function updateDeck() {
	document.getElementById('deckCounter').innerHTML = theDeck.length;
};

//window.onload = function () {
	var startButton = document.getElementById('starter');

startButton.addEventListener('click', startGame);

var hitButton = document.getElementById('hitBtn');

hitButton.addEventListener('click', hit);

var stayButton = document.getElementById('stayBtn');


// stayButton.addEventListener('click', stay);
	console.log('buttons work');
	makeDeck();
	shuffleCards();
	makePlayers(1);
// };


















