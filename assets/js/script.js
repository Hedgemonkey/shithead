/**
 * Variables required cross multiple functions
 */
let deck;
let opponentsHandDiv;
let playerHandDiv;
let opponentsTableDiv;
let playerTableDiv;
let gamePlayDiv;
let deckDiv;
let inPlayDiv;
let scoreDiv;
let lossDiv;
let opponentsTableCardArray = [];
let playerTableCardArray = [];
let shuffleButton;
let dealButton;
let cardBack = 'midjourney_design.jpg';
let opponentsTableCardsDown = [];
let playerTableCardsDown = [];
let opponentsTableCardsUp = [];
let playerTableCardsUp = [];
let opponentsHand = [];
let playerHand = [];
let gameDeck = [];
let opponentsHandCount = 0;
let playerHandCount = 0;
let tipDiv;
let playSelectedButton;
let swapSelectedButton;
let selectedCards = [];
let playerCardsElements = [];
let selectedCardCount = 0;
let swapTableCards = false;
let selectedTableCards = [];
let selectedTableCardsElements = [];
let selectedTableCardCount = 0;


/**
 * rules() function checks if div ID "rules" exists and removes that element if it does,
 * otherwise it creates a div element with the rules of the game and appends it to the hero div
 */
function rules() {
    // check if rules div exists
    if (document.getElementById('rules')) {
        // if it does then remove it
        document.getElementById('rules').remove();
        document.getElementById('rules-button').innerHTML = "Rules";
    } else {
        // set containerDiv to the div to contain new HTML
        let containerDiv = document.getElementById('hero');
        // create new div element to contain rules
        let rulesHTML = document.createElement('div');
        rulesHTML.setAttribute('id', 'rules');
        rulesHTML.setAttribute('class', 'rules');
        rulesHTML.innerHTML = `
        <h2>Sh*tHead rules:</h2>
        <ul>
        <li>The deck will be shuffled and each player            opponentsTableCardArray[dealCountDelayed].setAttribute('suit', currentCardDelayed.suit);
        opponentsTableCardArray[dealCountDelayed].setAttribute('value', currentCardDelayed.value); gets delt 1 card each until the both have 3 cards face down, 3 cards face up, and 3 to their hand.</li>
        <li>Player must play a higher card than last played unless it's a special card</li>
        <li>If you can't play a higher card then you must pick up the deck</li>
        <li>You must have a minimum of 3 cards in your hand until the deck is empty</li>
        <li>Once your hand is empty then you can play one of the 6 table cards you have (3 face down, 3 face up) using the face up cards first</li>
        <li>Before you start game you can swap your face up cards for cards you have in your hand if you wish</li>
        <li>If you have more than one card of the same value you may play them at the same time.</li>
        <li>If 4 cards of the same value are played in a row then the current pack gets burned and taken out of play.</li>
        <li>Aces are High & Low.</li>
        </ul>
        <h2>Special cards:</h2>
        <ul>
        <li>2 - Can be played on any card</li>
        <li>5 - Can be played on any card, must be followed by a lower card.</li>
        <li>7 - Can be played on any card, next player skips a go.</li>
        <li>8 - Can be played on any card, is invisible (Next player must play game from previous card)</li>
        <li>10 - Can be played on any card, burns the pack and allows player to play another card.</li>
        </ul>`;
        // prepend rulesHTML to containerDiv
        containerDiv.prepend(rulesHTML);
        document.getElementById('rules-button').innerHTML = "Close Rules";
    }
};
/** 
 * play() function initialises the game and sets up the deck, players, and game state.
 */
function play() {
    // Set up HTML for gameplay
    // Remove Play and rules Buttons
    let containerDiv = document.getElementById('hero');
    // Clear the hero div
    for (let i = 0; containerDiv.children.length > 0; i++) {
        containerDiv.removeChild(containerDiv.children[0]);
    }
    // Add the opponents hand div
    opponentsHandDiv = document.createElement('div');
    opponentsHandDiv.setAttribute('id', 'opponents-hand');
    opponentsHandDiv.setAttribute('class', 'opponents-hand');
    containerDiv.appendChild(opponentsHandDiv);
    opponentsHandDiv = document.getElementById('opponents-hand'); // Re-assign to the new element
    // Add the opponents table cards div
    opponentsTableDiv = document.createElement('div');
    opponentsTableDiv.setAttribute('id', 'opponents-table');
    opponentsTableDiv.setAttribute('class', 'opponents-table');
    containerDiv.appendChild(opponentsTableDiv);
    opponentsTableDiv = document.getElementById('opponents-table'); // Re-assign to the new element
    // Add div to hold thecentral gameplay area
    gamePlayDiv = document.createElement('div');
    gamePlayDiv.setAttribute('id', 'game-play');
    gamePlayDiv.setAttribute('class', 'game-play');
    // Add the deck div to gameplay div
    deckDiv = document.createElement('div');
    deckDiv.setAttribute('id', 'deck');
    deckDiv.setAttribute('class', 'deck');
    deckDiv.innerHTML = '52';
    deckDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
    gamePlayDiv.appendChild(deckDiv);
    // Add the score div to gameplay div
    scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'score');
    scoreDiv.setAttribute('class', 'score');
    scoreDiv.innerHTML = '<h3>Wins:<br> 0</h3>';
    gamePlayDiv.appendChild(scoreDiv);
    // Add the loss div to gameplay div
    lossDiv = document.createElement('div');
    lossDiv.setAttribute('id', 'loss');
    lossDiv.setAttribute('class', 'loss');
    lossDiv.innerHTML = '<h3>Losses:<br> 0</h3>';
    gamePlayDiv.appendChild(lossDiv);
    // Add the inPlay div to gameplay div
    inPlayDiv = document.createElement('div');
    inPlayDiv.setAttribute('id', 'in-play');
    inPlayDiv.setAttribute('class', 'in-play');
    gamePlayDiv.appendChild(inPlayDiv);
    // Add gamePlayDiv to containerDiv
    containerDiv.appendChild(gamePlayDiv);
    // Re-assign to the new elements
    deckDiv = document.getElementById('deck');
    scoreDiv = document.getElementById('score');
    lossDiv = document.getElementById('loss');
    inPlayDiv = document.getElementById('in-play');
    gamePlayDiv = document.getElementById('game-play');
    // Add the player table cards div
    playerTableDiv = document.createElement('div');
    playerTableDiv.setAttribute('id', 'player-table');
    playerTableDiv.setAttribute('class', 'player-table');
    containerDiv.appendChild(playerTableDiv);
    playerTableDiv = document.getElementById('player-table'); // Re-assign to the new element
    // Add the player hand div
    playerHandDiv = document.createElement('div');
    playerHandDiv.setAttribute('id', 'player-hand');
    playerHandDiv.setAttribute('class', 'player-hand');
    containerDiv.appendChild(playerHandDiv);
    playerHandDiv = document.getElementById('player-hand'); // Re-assign to the new element
    // Add shuffle and Deal buttons
    shuffleButton = document.createElement('button');
    shuffleButton.setAttribute('id', 'shuffle-button');
    shuffleButton.setAttribute('class', 'shuffle-button');
    shuffleButton.innerHTML = "Shuffle";
    containerDiv.appendChild(shuffleButton);
    shuffleButton = document.getElementById('shuffle-button'); // Re-assign to the new element
    shuffleButton.addEventListener('click', function () {  // Add event listener to the shuffle button
        shuffle();
    });
    dealButton = document.createElement('button');
    dealButton.setAttribute('id', 'deal-button');
    dealButton.setAttribute('class', 'deal-button');
    dealButton.innerHTML = "Deal";
    containerDiv.appendChild(dealButton);
    dealButton = document.getElementById('deal-button'); // Re-assign to the new element
    dealButton.addEventListener('click', function () {  // Add event listener to the deal button
        deal();
    });
    dealButton.disabled = true; // Disable the deal button until the deck is shuffled
    dealButton.style.opacity = "0.5"; // Set the deal button to be transparent
    dealButton.style.backgroundColor = "grey"; // Set the deal button to be grey
    // Clear the table card arrays
    opponentsTableCardArray = [];
    playerTableCardArray = [];
    // Clear the table card divs
    opponentsTableDiv.innerHTML = '';
    playerTableDiv.innerHTML = '';
    // Populate the table cards
    populateTableCards();
};
/**
 * function to populate the table card divs with placeholders for the cards
 */
function populateTableCards() {
    // Clear the table card arrays
    opponentsTableCardArray = [];
    playerTableCardArray = [];
    // Clear the table card divs
    opponentsTableDiv.innerHTML = '';
    playerTableDiv.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        // Add the table cards to the divs
        let opponentsTableCard = document.createElement('div');
        opponentsTableCard.setAttribute('id', `opponents-table-card-${i}`);
        opponentsTableCard.setAttribute('class', 'opponents-table-card table-card');
        opponentsTableDiv.appendChild(opponentsTableCard);
        opponentsTableCardArray.push(opponentsTableCard);
        let playerTableCard = document.createElement('div');
        playerTableCard.setAttribute('id', `player-table-card-${i}`);
        playerTableCard.setAttribute('class', 'player-table-card table-card');
        playerTableDiv.appendChild(playerTableCard);
        playerTableCardArray.push(playerTableCard);
    }
};
/**
 * shuffle() function shuffles the deck of cards, and enables the deal button
 */
function shuffle() {
    // Create a new deck
    deck = new Deck();
    // Shuffle the deck
    deck.shuffle();
    // Clear game state
    playerHandDiv.innerHTML = '';
    opponentsHandDiv.innerHTML = '';
    populateTableCards();
    deckDiv.innerHTML = '';
    inPlayDiv.innerHTML = '';
    // Check if deal button exists and add it if it doesn't
    if (!document.getElementById('deal-button')) {
        dealButton = document.createElement('button');
        dealButton.setAttribute('id', 'deal-button');
        dealButton.setAttribute('class', 'deal-button');
        dealButton.innerHTML = "Deal";
        document.getElementById('hero').appendChild(dealButton);
        dealButton = document.getElementById('deal-button'); // Re-assign to the new element
        dealButton.addEventListener('click', function () {  // Add event listener to the deal button
            deal();
        });
    }
    // Enable the deal button
    dealButton.disabled = false;
    dealButton.style.opacity = "1";
    dealButton.style.backgroundColor = "green";
    shuffleButton.innerHTML = "Start Again"; // Change the shuffle button to start again
    shuffleButton.addEventListener('click', function () {  // Add event listener to the shuffle button
        play();
    });
};

/**
 * deal() function deals the cards to the players and sets up the game
 */
function deal() {
    /**
     * Create and add game tips to the hero div
     */
    let containerDiv = document.getElementById('hero');
    tipDiv = document.createElement('div');
    tipDiv.setAttribute('id', 'tip');
    tipDiv.setAttribute('class', 'tip');
    tipDiv.innerHTML = '<h4>Dealing cards...</h4>';
    containerDiv.appendChild(tipDiv);
    tipDiv = document.getElementById('tip'); // Re-assign to the new element
    let dealCount = 0; // Set the deal count to 0
    playerHandCount = 0; // Set the player hand count to 0
    opponentsHandCount = 0; // Set the opponents hand count to 0
    /**
    * Function to delay the dealing of the cards
    * @param {number} dealCountDelayed - The deal count
    * @param {object} currentCardDelayed - The current card
    */
    function delayDeal(dealCountDelayed, currentCardDelayed) {
        console.log(dealCountDelayed);
        console.log(currentCardDelayed);
        if (dealCountDelayed < 3) { // First 3 cards to opponents table face down
            opponentsTableCardArray[dealCountDelayed].style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table');
            opponentsTableCardsDown.push(currentCardDelayed);
        } else if (dealCountDelayed < 6) { // Next 3 cards to player table face down
            playerTableCardArray[dealCountDelayed - 3].style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table');
            playerTableCardsDown.push(currentCardDelayed);
        } else if (dealCountDelayed == 6) { // First up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 6].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            opponentsTableCardArray[dealCountDelayed - 6].setAttribute('suit', currentCardDelayed.suit);
            opponentsTableCardArray[dealCountDelayed - 6].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 8) { // Second up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 7].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            opponentsTableCardArray[dealCountDelayed - 7].setAttribute('suit', currentCardDelayed.suit);
            opponentsTableCardArray[dealCountDelayed - 7].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 10) { // Third up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 8].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            opponentsTableCardArray[dealCountDelayed - 8].setAttribute('suit', currentCardDelayed.suit);
            opponentsTableCardArray[dealCountDelayed - 8].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 7) {  // First up card to player table
            playerTableCardArray[dealCountDelayed - 7].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            playerTableCardArray[dealCountDelayed - 7].setAttribute('suit', currentCardDelayed.suit);
            playerTableCardArray[dealCountDelayed - 7].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 9) { // Second up card to player table
            playerTableCardArray[dealCountDelayed - 8].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            playerTableCardArray[dealCountDelayed - 8].setAttribute('suit', currentCardDelayed.suit);
            playerTableCardArray[dealCountDelayed - 8].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 11) { // Third up card to player table
            playerTableCardArray[dealCountDelayed - 9].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            playerTableCardArray[dealCountDelayed - 9].setAttribute('suit', currentCardDelayed.suit);
            playerTableCardArray[dealCountDelayed - 9].setAttribute('value', currentCardDelayed.value);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 12 || dealCountDelayed == 14 || dealCountDelayed == 16) { // Alternating cards to opponents hand
            let containerDiv = document.getElementById('opponents-hand');
            let opponenetsHandUpdatable = document.createElement('div');
            opponenetsHandUpdatable.setAttribute('id', `opponents-hand-card-${opponentsHandCount}`);
            opponenetsHandUpdatable.setAttribute('class', 'opponents-hand-card');
            opponenetsHandUpdatable.setAttribute('suit', currentCardDelayed.suit);
            opponenetsHandUpdatable.setAttribute('value', currentCardDelayed.value);
            opponentsHand.push(currentCardDelayed);
            opponenetsHandUpdatable.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            opponentsHandCount++;
            containerDiv.appendChild(opponenetsHandUpdatable);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents hand');
        } else if (dealCountDelayed == 13 || dealCountDelayed == 15 || dealCountDelayed == 17) { // Alternating cards to player hand
            let containerDiv = document.getElementById('player-hand');
            let playerHandUpdatable = document.createElement('div');
            playerHandUpdatable.setAttribute('id', `player-hand-card-${playerHandCount}`);
            playerHandUpdatable.setAttribute('class', 'player-hand-card');
            playerHandUpdatable.setAttribute('suit', currentCardDelayed.suit);
            playerHandUpdatable.setAttribute('value', currentCardDelayed.value);
            playerHandUpdatable.style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerHandCount++;
            containerDiv.appendChild(playerHandUpdatable);
            // Add event listener to the player hand cards
            playerHandUpdatable.addEventListener('click', function () {
                let obj = new Card(this.getAttribute('suit'), this.getAttribute('value')); // Create a new card object
                if (this.style.border == "3px solid red") { // If the card is already selected then deselect it
                    this.style.border = "1px solid black";
                    console.log(obj + ' deselected');
                    removeClassObject(selectedCards, obj);
                    if (selectedCards.length == 0) {
                        swapTableCards = false;
                    }
                } else { // If the card is not selected then select it
                    this.style.border = "3px solid red";
                    selectedCards.push(obj);
                    swapTableCards = true;
                }
                playerCardsElements = document.getElementsByClassName('player-hand-card'); // Get all the player hand cards
                selectedCardCount = 0; // Set the selected card count to 0
                for (let i = 0; i < playerCardsElements.length; i++) { // Loop through the selected cards
                    if (playerCardsElements[i].style.border == "3px solid red") {
                        selectedCardCount++;
                    }
                }
                if (selectedCardCount == 0) { // If the player has not selected cards then disable the play selected button
                    playSelectedButton.disabled = true;
                    playSelectedButton.style.opacity = "0.5";
                    playSelectedButton.style.backgroundColor = "grey";
                    // Reset the selected table cards
                    selectedTableCards = [];
                    selectedTableCardCount = 0;
                    for (let i = 0; i < selectedTableCardsElements.length; i++) { // Loop through the selected cards
                        selectedTableCardsElements[i].style.border == "1px solid black";
                    }
                }
            });
            playerHand.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player hand');
        } else if (dealCountDelayed == 51) { // Last card to deck
            gameDeck.push(currentCardDelayed);
            deckDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            deckDiv.innerHTML = gameDeck.length;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to deck');
            tipDiv.innerHTML = '<h4>Choose cards you want to swap.</h4>'; // Update the tip
            /**
             * Play/Swap Selected Button
             */
            playSelectedButton = document.createElement('button');
            playSelectedButton.setAttribute('id', 'play-selected-button');
            playSelectedButton.setAttribute('class', 'play-selected-button');
            playSelectedButton.innerHTML = "Swap";
            containerDiv.appendChild(playSelectedButton);
            playSelectedButton = document.getElementById('play-selected-button'); // Re-assign to the new element
            playSelectedButton.disabled = true; // Disable the play selected button until the player has selected cards
            playSelectedButton.style.opacity = "0.5"; // Set the play selected button to be transparent
            playSelectedButton.style.backgroundColor = "grey"; // Set the play selected button to be grey
            /**
             * Swap Selected Button
             */
            swapSelectedButton = document.createElement('button');
            swapSelectedButton.setAttribute('id', 'swap-selected-button');
            swapSelectedButton.setAttribute('class', 'swap-selected-button');
            swapSelectedButton.innerHTML = "Accept";
            containerDiv.appendChild(swapSelectedButton);
            swapSelectedButton = document.getElementById('swap-selected-button');
            /**
             * Event listener for the player table cards
             */
            for (let i = 0; i < playerTableCardArray.length; i++) {
                playerTableCardArray[i].addEventListener('click', function () {
                    let obj = new Card(this.getAttribute('suit'), this.getAttribute('value')); // Create a new card object
                    if (this.style.border == "3px solid red") { // If the card is already selected then deselect it
                        this.style.border = "1px solid black";
                        console.log(obj + ' deselected');
                        removeSubarray(selectedTableCards, obj);
                    } else { // If the card is not selected then select it
                        if (swapTableCards) {
                            this.style.border = "3px solid red";
                            selectedTableCards.push(obj);
                        }
                        selectedTableCardsElements = document.getElementsByClassName('player-table-card'); // Get all the player table cards Elements
                        selectedTableCardCount = 0; // Set the selected card count to 0
                        for (let i = 0; i < selectedTableCardsElements.length; i++) { // Loop through the selected cards
                            if (selectedTableCardsElements[i].style.border == "3px solid red") {
                                selectedTableCardCount++;
                            }
                        }
                        if (selectedTableCardCount > 0) { // If the player has selected cards then enable the play selected button
                            playSelectedButton.disabled = false;
                            playSelectedButton.style.opacity = "1";
                            playSelectedButton.style.backgroundColor = "green";
                        } else { // If the player has not selected cards then disable the play selected button
                            playSelectedButton.disabled = true;
                            playSelectedButton.style.opacity = "0.5";
                            playSelectedButton.style.backgroundColor = "grey";
                        }
                    }
                });
            }
        } else {
            gameDeck.push(currentCardDelayed);
            deckDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            deckDiv.innerHTML = gameDeck.length;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to deck');
        }
    }
    while (dealCount < 52) {
        let currentCard = deck.deal();
        let i = dealCount;
        setTimeout(function () { delayDeal(i, currentCard); }, 200 * (dealCount + 1));
        dealCount++;
    }
    dealButton.remove(); // Remove the deal button
};

/**
 * Swap cards function
 */
function swap() {
    // Check that same number of cards selected from hand and table
    if (selectedCards.length == selectedTableCards.length) {
        let selectedCardArray = [];
        let selectedTableCardArray = [];
        // 
        for (let i = 0; i < selectedCards.length; i++) {
            let selectedCard = selectedCards[i];
            // Get the selected card from the hand and assign it's element to a variable
            for (let j = 0; j < playerCardsElements.length; j++) {
                if (playerCardsElements[j].getAttribute('suit') == selectedCard.suit && playerCardsElements[j].getAttribute('value') == selectedCard.value) {
                    selectedCardArray.push(playerCardsElements[j]);
                }
            }
            // Get the selected card from the table and assign it's element to a variable
            let selectedTableCard = selectedTableCards[i];
            for (let j = 0; j < selectedTableCardsElements.length; j++) {
                if (selectedTableCardsElements[j].getAttribute('suit') == selectedTableCard.suit && selectedTableCardsElements[j].getAttribute('value') == selectedTableCard.value) {
                    selectedTableCardArray.push(selectedTableCardsElements[j]);
                }
            }
            // Swap the divs
            for (let j = 0; j < selectedCardArray.length; j++) {
                let selectedCardImg = `url('assets/images/cards/fronts/${selectedCardArray[j].getAttribute('suit').toLowerCase()}_${selectedCardArray[j].getAttribute('value').toLowerCase()}.svg')`;
                let selectedCardSuit = selectedCardArray[j].getAttribute('suit');
                let selectedCardValue = selectedCardArray[j].getAttribute('value');
                let selectedTableCardImg = `url('assets/images/cards/fronts/${selectedTableCardArray[j].getAttribute('suit').toLowerCase()}_${selectedTableCardArray[j].getAttribute('value').toLowerCase()}.svg')`;
                let selectedTableCardSuit = selectedTableCardArray[j].getAttribute('suit');
                let selectedTableCardValue = selectedTableCardArray[j].getAttribute('value');
                selectedCardArray[j].style.border = "1px solid black";
                selectedCardArray[j].style.backgroundImage = selectedTableCardImg;
                selectedCardArray[j].setAttribute('suit', selectedTableCardSuit);
                selectedCardArray[j].setAttribute('value', selectedTableCardValue);
                selectedTableCardArray[j].style.border = "1px solid black";
                selectedTableCardArray[j].style.backgroundImage = selectedCardImg;
                selectedTableCardArray[j].setAttribute('suit', selectedCardSuit);
                selectedTableCardArray[j].setAttribute('value', selectedCardValue);
                // Swap the card values in the player hand and table card arrays
                removeClassObject(playerHand, new Card(selectedTableCardArray[j].getAttribute('suit'), selectedTableCardArray[j].getAttribute('value')));
                console.log(selectedCardArray[j].getAttribute('suit') + ' , ' + selectedCardArray[j].getAttribute('value'));
                playerHand.push(new Card(selectedCardArray[j].getAttribute('suit'), selectedCardArray[j].getAttribute('value')));
                removeClassObject(playerTableCardsUp, new Card(selectedTableCardArray[j].getAttribute('suit'), selectedTableCardArray[j].getAttribute('value')));
                playerTableCardsUp.push(new Card(selectedTableCardArray[j].getAttribute('suit'), selectedTableCardArray[j].getAttribute('value')));
            }
        }
        // Clear the selected cards
        selectedCards = [];
        selectedTableCards = [];
        
        // Clear the selected card count
        selectedCardCount = 0;
    } else {
        alert('Please select the same number of cards from your hand as you have selected from the table');
    }
};

/**
 * Accept cards/Start game function
 */
function accept() {
    // Remove the play selected button
    playSelectedButton.innerHTML = 'Play Selected cards';
    // Remove the swap selected button
    swapSelectedButton.remove();
    // Remove the tip
    for (let i = 0; i < opponentsHand.length; i++) {
        let opIsLower = false;
        if (checkOpponentCardLower(i)) {
            console.log('Opponent has a lower card');
            tipDiv.innerHTML = 'Oppoent had the lowest card...';
            opIsLower = true;
            // opponentPlayCard(opponentsHand[opponentsLowerCardIndex]);
        } else {
            if (!opIsLower) {
                tipDiv.innerHTML = 'Opponent has no lower card, select lowest card to play';
            }
        }
    }
    // Disable listeners on the player table cards
    for (let i = 0; i < playerTableCardArray.length; i++) {
        playerTableCardArray[i].removeEventListener('click', function () { });
    }
};
/**
 * Function to play the selected cards
 */
function playSelected() {
    // Check that the selected cards are higher than the last card played
    for (let i = 0; i < selectedCards.length; i++) {
        if ((cardValueToNumber(selectedCards[i].value) < inPlayDiv.getAttribute('value')) || (inPlayCard[0].value = '5')) {
            tipDiv.innerHTML = 'You must play a higher card than the last card played';
            if (inPlayCard[0].value == '7') {
                inPlayDiv.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
                inPlayDiv.setAttribute('suit', selectedCards[i].suit);
                inPlayDiv.setAttribute('value', selectedCards[i].value);
                inPlayCard.unshift(selectedCards[i]);
                inPlayDeck.push(inPlayCard.pop());
                tipDiv.innerHTML = `You played a ${selectedCards[i].value} on a 5`;
            }
        } else if (selectedCards[i].value == '2' || selectedCards[i].value == '7' || selectedCards[i].value == '8' || selectedCards[i].value == '10') {
            inPlayDiv.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
            inPlayDiv.setAttribute('suit', selectedCards[i].suit);
            inPlayDiv.setAttribute('value', selectedCards[i].value);
            inPlayCard.unshift(selectedCards[i]);
            inPlayDeck.push(inPlayCard.pop());
            tipDiv.innerHTML = `You played a ${selectedCards[i].value}`;
            if (selectedCards[i].value == '10') {
                burnPack();
                tipDiv.innerHTML = `You played a ${selectedCards[i].value} and burned the pack`;
            }
            if (selectedCards[i].value == '7') {
                //skipGo();
                tipDiv.innerHTML = `You played a ${selectedCards[i].value} and skipped the next go`;
            }
            if (selectedCards[i].value == '8') {
                //invisibleCard();
                tipDiv.innerHTML = `You played a ${selectedCards[i].value} and made the next card invisible`;
            }
        } else {
            inPlayDiv.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
            inPlayDiv.setAttribute('suit', selectedCards[i].suit);
            inPlayDiv.setAttribute('value', selectedCards[i].value);
            inPlayCard.unshift(selectedCards[i]);
            inPlayDeck.push(inPlayCard.pop());
            tipDiv.innerHTML = `You played a ${selectedCards[i].value}`;
        }
    }
    // If they are then play the cards
    // If they are not then alert the player that the cards are not higher
    // If the player has no higher cards then they must pick up the deck
    // If the player has no cards in their hand then they can play a card from the table
    // If the player has no cards in their hand or on the table then they have won the game
};

/**
 * Function to burn the pack
 */
function burnPack() {
    inPlayDiv.innerHTML = '';
    inPlayDiv.style.backgroundImage = ``;
    inPlayDiv.setAttribute('suit', '');
    inPlayDiv.setAttribute('value', '');
    inPlayCard = [];
    inPlayDeck = [];
    tipDiv.innerHTML = 'The pack has been burned';
};

/**
 * Function to convert the card value to a number
 */
function cardValueToNumber(cardValue) {
    switch (cardValue) {
        case 'Ace':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        case '10':
            return 10;
        case 'Jack':
            return 11;
        case 'Queen':
            return 12;
        case 'King':
            return 13;
    }
};

/**
 * Function to check if opponent has a lower card than in players hand
 */
function checkOpponentCardLower(varCard) {
    let opponentCard = opponentsHand[varCard];
    for (let i = 0; i < playerHand.length; i++) {
        if (opponentCard.value < playerHand[i].value && playerHand[i].value != '2' && playerHand[i].value != '5' && playerHand[i].value != '7' && playerHand[i].value != '8' && playerHand[i].value != '10') {
            return true;
            opponentsLowerCardIndex = varCard;
        }
    }
};


/**
 * DOM load event listener to add event listeners to the buttons
 */
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the rules button
    document.getElementById('rules-button').addEventListener('click', function () { // Add event listener to the rules button
        rules();
    });
    // Add event listener to the play button
    document.getElementById('play-button').addEventListener('click', function () {  // Add event listener to the play button
        play();
    });
});

/**
* Function to remove subarray from array 
*/
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
};

function removeSubarray(mainArray, subArray) {
    let index = mainArray.findIndex(arr => arraysEqual(arr, subArray));
    if (index !== -1) {
        mainArray.splice(index, 1);
    }
};

/**
 * Function to remove class object from array
 */
function removeClassObject(mainArray, subArray) {
    let index = mainArray.findIndex(arr => arr.suit === subArray.suit && arr.value === subArray.value);
    if (index !== -1) {
        mainArray.splice(index, 1);
    }
};