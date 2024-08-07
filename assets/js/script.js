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
let opponentsLowerCardIndex;
let inPlayCard = [];
let inPlayDeck = [];
let playCardArray = [];
let opponentTurn;
let gameActive = false;
let opponentFirstTurn = false;
let playerTableCardClickEnabled = true;
let gameCardsClickEnabled = false;


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
        rulesHTML.classList.add('rules');
        rulesHTML.innerHTML = `
        <h2>Sh*tHead rules:</h2>
        <ul>
        <li>The deck will be shuffled and each player gets delt 1 card each until the both have 3 cards face down, 3 cards face up, and 3 to their hand.</li>
        <li>Player must play a higher card than last played unless it's a special card</li>
        <li>If you can't play a higher card then you must pick up the deck</li>
        <li>You must have a minimum of 3 cards in your hand until the deck is empty</li>
        <li>Once your hand is empty then you can play one of the 6 table cards you have (3 face down, 3 face up) using the face up cards first</li>
        <li>Before you start game you can swap your face up cards for cards you have in your hand if you wish</li>
        <li>If you have more than one card of the same value you may play them at the same time.</li>
        <li>Aces are High & Low.</li>
        </ul>
        <h2>Special cards:</h2>
        <ul>
        <li>2 - Can be played on any card</li>
        <li>5 - Can be played on any card, must be followed by a lower card.</li>
        <li>7 - Can be played on any card, next player skips a go.</li>
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
    opponentsHandDiv.classList.add('opponents-hand');
    containerDiv.appendChild(opponentsHandDiv);
    opponentsHandDiv = document.getElementById('opponents-hand'); // Re-assign to the new element
    // Add the opponents table cards div
    opponentsTableDiv = document.createElement('div');
    opponentsTableDiv.setAttribute('id', 'opponents-table');
    opponentsTableDiv.classList.add('opponents-table');
    containerDiv.appendChild(opponentsTableDiv);
    opponentsTableDiv = document.getElementById('opponents-table'); // Re-assign to the new element
    // Add div to hold thecentral gameplay area
    gamePlayDiv = document.createElement('div');
    gamePlayDiv.setAttribute('id', 'game-play');
    gamePlayDiv.classList.add('game-play');
    // Add the deck div to gameplay div
    deckDiv = document.createElement('div');
    deckDiv.setAttribute('id', 'deck');
    deckDiv.classList.add('deck');
    deckDiv.innerHTML = '52';
    deckDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
    gamePlayDiv.appendChild(deckDiv);
    // Add the score div to gameplay div
    scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'score');
    scoreDiv.classList.add('score');
    scoreDiv.innerHTML = '<h3>Wins:<br> 0</h3>';
    gamePlayDiv.appendChild(scoreDiv);
    // Add the loss div to gameplay div
    lossDiv = document.createElement('div');
    lossDiv.setAttribute('id', 'loss');
    lossDiv.classList.add('loss');
    lossDiv.innerHTML = '<h3>Losses:<br> 0</h3>';
    gamePlayDiv.appendChild(lossDiv);
    // Add the inPlay div to gameplay div
    inPlayDiv = document.createElement('div');
    inPlayDiv.setAttribute('id', 'in-play');
    inPlayDiv.classList.add('in-play');
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
    playerTableDiv.classList.add('player-table');
    containerDiv.appendChild(playerTableDiv);
    playerTableDiv = document.getElementById('player-table'); // Re-assign to the new element
    // Add the player hand div
    playerHandDiv = document.createElement('div');
    playerHandDiv.setAttribute('id', 'player-hand');
    playerHandDiv.classList.add('player-hand');
    containerDiv.appendChild(playerHandDiv);
    playerHandDiv = document.getElementById('player-hand'); // Re-assign to the new element
    // Add shuffle and Deal buttons
    shuffleButton = document.createElement('button');
    shuffleButton.setAttribute('id', 'shuffle-button');
    shuffleButton.classList.add('shuffle-button');
    shuffleButton.innerHTML = "Shuffle";
    containerDiv.appendChild(shuffleButton);
    shuffleButton = document.getElementById('shuffle-button'); // Re-assign to the new element
    shuffleButton.addEventListener('click', function () {  // Add event listener to the shuffle button
        shuffle();
    });
    dealButton = document.createElement('button');
    dealButton.setAttribute('id', 'deal-button');
    dealButton.classList.add('deal-button');
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
        opponentsTableCard.classList.add('opponents-table-card');
        opponentsTableCard.classList.add('table-card');
        opponentsTableDiv.appendChild(opponentsTableCard);
        opponentsTableCardArray.push(opponentsTableCard);
        let playerTableCard = document.createElement('div');
        playerTableCard.setAttribute('id', `player-table-card-${i}`);
        playerTableCard.classList.add('player-table-card')
        playerTableCard.classList.add('table-card');
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
        dealButton.classList.add('deal-button');
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
     * Reset some variables
     */
    selectedCards = [];
    playerHand = [];
    opponentsHand = [];
    playerTableCardsUp = [];
    playerTableCardsDown = [];
    opponentsTableCardsUp = [];
    opponentsTableCardsDown = [];
    gameDeck = [];
    inPlayCard = [];
    inPlayDeck = [];
    playCardArray = [];
    /**
     * Create and add game tips to the hero div
     */
    let containerDiv = document.getElementById('hero');
    tipDiv = document.createElement('div');
    tipDiv.setAttribute('id', 'tip');
    tipDiv.classList.add('tip');
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
            opponenetsHandUpdatable.classList.add('opponents-hand-card');
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
            playerHandUpdatable.classList.add('player-hand-card');
            playerHandUpdatable.setAttribute('suit', currentCardDelayed.suit);
            playerHandUpdatable.setAttribute('value', currentCardDelayed.value);
            playerHandUpdatable.style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerHandCount++;
            containerDiv.appendChild(playerHandUpdatable);
            // Add event listener to the player hand cards
            playerHandUpdatable.addEventListener('click', playerHandCardClick);
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
            playSelectedButton.classList.add('play-selected-button');
            playSelectedButton.onclick = function () { swap(); };
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
            swapSelectedButton.classList.add('swap-selected-button');
            swapSelectedButton.innerHTML = "Accept";
            swapSelectedButton.onclick = function () { accept(); };
            containerDiv.appendChild(swapSelectedButton);
            swapSelectedButton = document.getElementById('swap-selected-button');
            /**
             * Event listener for the player table cards
             */
            for (let i = 0; i < playerTableCardArray.length; i++) {
                playerTableCardClickEnabled = true;
                playerTableCardArray[i].addEventListener('click', playerTableCardClick);
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
        tipDiv.innerHTML = 'Please select the same number of cards from your hand as you have selected from the table';
    }
};
/**
 * Event Listener function for the player hand cards
 */
let playerHandCardClick = function () {
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
        // swapTableCards = true;
    }
    playerCardsElements = document.getElementsByClassName('player-hand-card'); // Get all the player hand cards
    selectedCardCount = 0; // Set the selected card count to 0
    for (let i = 0; i < playerCardsElements.length; i++) { // Loop through the selected cards
        if (playerCardsElements[i].style.border == "3px solid red") {
            selectedCardCount++;
        }
    }
    if (selectedCardCount == 0 && gameActive === false) { // If the player has not selected cards then disable the play selected button
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
};

/**
 * Event Listener function for the player table cards
 */
let playerTableCardClick = function () {
    if (playerTableCardClickEnabled) {
        let obj = new Card(this.getAttribute('suit'), this.getAttribute('value')); // Create a new card object
        if (this.style.border == "3px solid red") { // If the card is already selected then deselect it
            this.style.border = "1px solid black";
            console.log(obj.suit + ' , ' + obj.value + ' deselected');
            removeClassObject(selectedTableCards, obj);
        } else { // If the card is not selected then select it
            this.style.border = "3px solid red";
            selectedTableCards.push(obj);
            selectedTableCardsElements = document.getElementsByClassName('player-table-card'); // Get all the player table cards Elements
            selectedTableCardCount = 0; // Set the selected card count to 0
            for (let i = 0; i < selectedTableCardsElements.length; i++) { // Loop through the selected cards
                if (selectedTableCardsElements[i].style.border == "3px solid red") {
                    selectedTableCardCount++;
                }
            }
            if (selectedTableCardCount > 0 || gameActive) { // If the player has selected cards then enable the play selected button
                playSelectedButton.disabled = false;
                playSelectedButton.style.opacity = "1";
                playSelectedButton.style.backgroundColor = "green";
            } else { // If the player has not selected cards then disable the play selected button
                playSelectedButton.disabled = true;
                playSelectedButton.style.opacity = "0.5";
                playSelectedButton.style.backgroundColor = "grey";
            }
        }
    }
};

/**
 * Accept cards/Start game function
 */
function accept() {
    // Remove the play selected button
    playSelectedButton.innerHTML = 'Play Selected cards';
    playSelectedButton.onclick = function () { playSelected(); };
    playSelectedButton.disabled = false;
    playSelectedButton.style.opacity = "1";
    playSelectedButton.style.backgroundColor = "green";
    // Remove the swap selected button
    swapSelectedButton.remove();
    // Remove event listener from table cards
    for (let i = 0; i < playerTableCardArray.length; i++) {
        //playerTableCardArray[i].removeEventListener('click', playerTableCardClick);
        playerTableCardClickEnabled = false;
    }
    // Sort the player hand
    sortPlayersHand();
    // Sort the opponents hand
    sortOpponentsHand();
    // Remove the tip
    let opIsLower = false;
    let opponentCheck = array1Lower(opponentsHand, playerHand);
    if (opponentCheck !== false && opponentCheck.minValue != 2 && opponentCheck.minValue != 1) {
        console.log('Opponent has a lower card');
        tipDiv.innerHTML = 'Opponent has the lowest card...';
        opIsLower = true;
        opponentTurn = true;
        console.log('opponentsHand: ' + opponentsHand[array1Lower(opponentsHand, playerHand)].value + ' ' + opponentsHand[array1Lower(opponentsHand, playerHand)].suit);
        opponentFirstTurn = true;
        console.log('Opponent first turn: ' + opponentFirstTurn);
        opponentTurn = true;
        console.log('Opponent turn: ' + opponentTurn);
        playCard();
    } else {
        if (!opIsLower) {
            tipDiv.innerHTML = 'Opponent has no lower card, select lowest card to play';
            opponentTurn = false;
        }
    }
    // Disable listeners on the player table cards
    for (let i = 0; i < playerTableCardArray.length; i++) {
        //playerTableCardArray[i].removeEventListener('click', playerTableCardClick);
        playerTableCardClickEnabled = false;
    }
    // Add event listener to the game deck
    deckDiv.onclick = function () { playFromDeck(); };
    gameActive = true;
};

/**
 * Opponent play function
 */
function playCard() {
    if (opponentTurn === true) {
        console.log('Opponent turn');
        if (inPlayCard[0] == undefined) {
            console.log('No card in play');
            console.log('Checking if first turn');
            if (opponentFirstTurn) {
                console.log('First turn checking if opponent has a lower card');
                // Set the opponents lower card variable
                let opponentsLowerCardIndex = array1Lower(opponentsHand, playerHand);
                let opponentsLowerCard = opponentsHand[opponentsLowerCardIndex];
                // Move card out of opponentsHand and add to playCardArray
                console.log('Added ' + opponentsLowerCard.value + ' ' + opponentsLowerCard.suit + ' to playCardArray');
                playCardArray.unshift(opponentsLowerCard);
                // Change the inPlayDiv to show the opponents card REDACTED
                //inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${opponentsLowerCard.suit.toLowerCase()}_${opponentsLowerCard.value.toLowerCase()}.svg')`;
                //inPlayDiv.setAttribute('suit', opponentsLowerCard.suit);
                //inPlayDiv.setAttribute('value', opponentsLowerCard.value);
                tipDiv.innerHTML = `Opponent played a ${opponentsLowerCard.value} of ${opponentsLowerCard.suit}`;
                // Remove card from opponentsHand
                console.log('Removed ' + opponentsLowerCard.value + ' ' + opponentsLowerCard.suit + ' from opponents hand');
                removeClassObject(opponentsHand, opponentsLowerCard);
                // Move card from deck to opponentsHand
                if (gameDeck.length > 0) {
                    let pickedUpCard = gameDeck.pop();
                    opponentsHand.push(pickedUpCard);
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id', `opponents-hand-card-${opponentsHand.length}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
                    newDiv.setAttribute('suit', pickedUpCard.suit);
                    newDiv.setAttribute('value', pickedUpCard.value);
                    newDiv.classList.add('opponents-hand-card');
                    opponentsHandDiv.appendChild(newDiv);
                    console.log('Added ' + pickedUpCard.value + ' ' + pickedUpCard.suit + ' to opponents hand');
                    if (gameDeck.length == 0) {
                        console.log('Game deck is empty');
                        deckDiv.style.backgroundImage = ``;
                        deckDiv.removeAttribute('suit');
                        deckDiv.removeAttribute('value');
                    }
                }
                let opponentsHandDivCard = document.querySelector(`[suit="${opponentsLowerCard.suit}"][value="${opponentsLowerCard.value}"]`);
                opponentsHandDivCard.remove();
                opponentTurn = false;
                // Add card to inPlayCard
                addToInPlay(opponentsLowerCard);
                console.log('Opponents lower card: ' + opponentsLowerCard.value + ' ' + opponentsLowerCard.suit);
                // inPlayCard.unshift(opponentsLowerCard);
                // console.log('Added ' + opponentsLowerCard.value + ' ' + opponentsLowerCard.suit + ' to inPlayCard');
                opponentFirstTurn = false;
            } else {
                // Code for no card in play (Feedback loop)
                // Select lowest card from opponents hand and process
                console.log('No card in play');
                let opponentCard = getLowestValueObject(opponentsHand);
                // Move card out of opponentsHand and add to playCardArray
                console.log('Added ' + opponentCard.value + ' ' + opponentCard.suit + ' to playCardArray');
                playCardArray.unshift(opponentCard);
                addToInPlay(opponentCard);
                // Change the inPlayDiv to show the opponents card
                //inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${opponentCard.suit.toLowerCase()}_${opponentCard.value.toLowerCase()}.svg')`;
                //inPlayDiv.setAttribute('suit', opponentCard.suit);
                //inPlayDiv.setAttribute('value', opponentCard.value);
                tipDiv.innerHTML = `Opponent played a ${opponentCard.value} of ${opponentCard.suit}`;
                // Remove card from opponentsHand
                console.log('Removed ' + opponentCard.value + ' ' + opponentCard.suit + ' from opponents hand');
                removeClassObject(opponentsHand, opponentCard);
                // Move card from deck to opponentsHand
                if (gameDeck.length > 0) {
                    let pickedUpCard = gameDeck.pop();
                    opponentsHand.push(pickedUpCard);
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id', `opponents-hangameDeckd-card-${opponentsHand.length}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
                    newDiv.setAttribute('suit', pickedUpCard.suit);
                    newDiv.setAttribute('value', pickedUpCard.value);
                    newDiv.classList.add('opponents-hand-card');
                    opponentsHandDiv.appendChild(newDiv);
                    console.log('Added ' + pickedUpCard.value + ' ' + pickedUpCard.suit + ' to opponents hand');
                    if (gameDeck.length == 0) {
                        console.log('Game deck is empty');
                        deckDiv.style.backgroundImage = ``;
                        deckDiv.removeAttribute('suit');
                        deckDiv.removeAttribute('value');
                    }
                }
                opponentTurn = false;
                // Add card to inPlayCard
                console.log('Opponents card: ' + opponentCard.value + ' ' + opponentCard.suit);
                inPlayCard.unshift(opponentCard);
                console.log('Added ' + opponentCard.value + ' ' + opponentCard.suit + ' to inPlayCard');
            }
        } else if (inPlayCard[0] !== undefined) { // If there is a card in play
            //if (inPlayCard.length > 3) { // if there is more than 3 cards in play check if they are the same value
            //    console.log('3 cards in play');
            //if (inPlayCard[0].value == inPlayCard[1].value && inPlayCard[1].value == inPlayCard[2].value) {
            //    console.log('3 of the same card in play');
            // Code for same value cards in play
            //}
            //else { // If there are not 3 of the same card in play
            //    console.log('Not 3 of the same card in play');
            //}
            //} else {
            // Play the lowest card over the current card
            console.log('Current Card in play is ' + inPlayCard[0].value + ' ' + inPlayCard[0].suit);
            console.log('Opponents Lowest Valid Card is ' + getLowestValueOverNumber(opponentsHand, cardValueToNumber(inPlayCard[0].value)));
            let opponentCard = getLowestValueOverNumber(opponentsHand, cardValueToNumber(inPlayCard[0].value));
            if (!checkValidOpponentCard()) { // If the opponent has no cards to play
                // Pick up the deck
                console.log('Opponent picked up the deck!!!!');
                pickUpInPlayDeck('opponent');
                /* 
                let opponentHandSize = opponentsHand.length;
                for (let i = 0; i < inPlayDeck.length; i++) {
                    let newDiv = document.createElement('div');
                    opponentHandSize++;
                    newDiv.setAttribute('id', `opponents-hand-card-${opponentHandSize}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
                    newDiv.setAttribute('suit', inPlayDeck[i].suit);
                    newDiv.setAttribute('value', inPlayDeck[i].value);
                    newDiv.classList.add('opponents-hand-card');
                    opponentsHand.push(inPlayDeck[i]);
                    opponentsHandDiv.appendChild(newDiv);
                }
                inPlayDeck = [];
                for (let i = 0; i < inPlayCard.length; i++) {
                    let newDiv = document.createElement('div');
                    opponentHandSize++;
                    newDiv.setAttribute('id', `opponents-hand-card-${opponentHandSize}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
                    newDiv.setAttribute('suit', inPlayCard[i].suit);
                    newDiv.setAttribute('value', inPlayCard[i].value);
                    newDiv.classList.add('opponents-hand-card');
                    opponentsHand.push(inPlayCard[i]);
                    opponentsHandDiv.appendChild(newDiv);
                } */
                sortOpponentsHand();
                inPlayCard = [];
                tipDiv.innerHTML = 'Opponent picked up the deck';
                opponentTurn = false;
                inPlayDiv.innerHTML = '';
                inPlayDiv.style.backgroundImage = '';
                inPlayDiv.setAttribute('suit', '');
                inPlayDiv.setAttribute('value', '');
            } else if (opponentsHand.length > 0) { // If the opponent has a card to play
                // If the opponent has cards in their hand
                // Assign opponentCard as the lowest card in the opponents hand
                let lowest = minValue(opponentsHand);
                opponentCard = opponentsHand[lowest.minIndex];
                // Remove div containing the card from the opponents hand
                let opponentCardDiv = document.querySelector(`[suit="${opponentCard.suit}"][value="${opponentCard.value}"]`);
                opponentCardDiv.remove();
                console.log('Removed ' + opponentCard.value + ' ' + opponentCard.suit + ' from opponents hand div');
                // Move card from opponentsHand to inPlayCard
                addToInPlay(opponentCard);
                //inPlayCard.unshift(opponentCard);
                //console.log('Added ' + opponentCard.value + ' ' + opponentCard.suit + ' to inPlayCard');
                // Change the inPlayDiv to show the opponents card
                //inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${opponentCard.suit.toLowerCase()}_${opponentCard.value.toLowerCase()}.svg')`;
                //inPlayDiv.setAttribute('suit', opponentCard.suit);
                //inPlayDiv.setAttribute('value', opponentCard.value);
                tipDiv.innerHTML = `Opponent played a ${opponentCard.value} of ${opponentCard.suit}`;
                // Remove card from opponentsHand
                console.log('Removed ' + opponentCard.value + ' ' + opponentCard.suit + ' from opponents hand');
                removeClassObject(opponentsHand, opponentCard);
                // Move card from deck to opponentsHand
                if (gameDeck.length > 0) {
                    let pickedUpCard = gameDeck.pop();
                    opponentsHand.push(pickedUpCard);
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id', `opponents-hand-card-${opponentsHand.length}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
                    newDiv.setAttribute('suit', pickedUpCard.suit);
                    newDiv.setAttribute('value', pickedUpCard.value);
                    newDiv.classList.add('opponents-hand-card');
                    opponentsHandDiv.appendChild(newDiv);
                    console.log('Added ' + pickedUpCard.value + ' ' + pickedUpCard.suit + ' to opponents hand');
                    tipDiv.innerHTML = 'Opponent picked up a card';
                    if (gameDeck.length == 0) {
                        console.log('Game deck is empty');
                        deckDiv.style.backgroundImage = ``;
                        deckDiv.removeAttribute('suit');
                        deckDiv.removeAttribute('value');
                    }
                }
            }
            opponentTurn = false;
            // Check if opponentCard is a 10 and burn the pack
            if (opponentCard.value == '10') {
                burnPack();
                tipDiv.innerHTML = 'Opponent played a 10, pack burned';
                console.log('Opponent played a 10, pack burned');
                opponentTurn = true;
                console.log('Opponent turn true');
                playCard(); // Play another card
            }
            //}
            // move one card to the inPlayDeck
            while (inPlayCard.length > 3) {
                let movingToDeck = inPlayCard.pop();
                inPlayDeck.push(movingToDeck);
                console.log('Moved ' + movingToDeck.value + ' ' + movingToDeck.suit + ' to inPlayDeck');
            }
        }
    }
    // Sort the opponents hand
    sortOpponentsHand();
    opponentTurn = false;
    // Check is player has a playable card and enable Deck click if so
    if (checkValidPlayerCard()) {
        gameCardsClickEnabled = false;
    } else {
        gameCardsClickEnabled = true;
    }
    // Check if player has any cards left and enable selection of table cards
    if (playerHand.length == 0) {
        playerTableCardClickEnabled = true;
    } else if (playerHand.length > 0) {
        playerTableCardClickEnabled = false;
    }
};

/**
 * Function to play the selected cards
 */
function playSelected() {
    if (playerHand.length == 0) {
        selectedCards = selectedTableCards;
    }
    // Check if multiple selected cards that they are the same value
    if (selectedCards.length > 1) {
        //for (let i = 0; i < selectedCards.length; i++) {
        //    for (let j = 0; j < selectedCards.length; j++) {
        //        if (i !== j) {
        //            if (selectedCards[i].value !== selectedCards[j].value) {
        //                tipDiv.innerHTML = 'You can only play cards of the same value';
        //            }
        //        }
        //    }
        tipDiv.innerHTML = 'You can only play one card at a time';
    } else {
        for (let i = 0; i < selectedCards.length; i++) {
            if (inPlayCard[0] == undefined) {
                let div = document.querySelector(`[suit="${selectedCards[i].suit}"][value="${selectedCards[i].value}"]`);
                removeClassObject(playerHand, selectedCards[i]);
                console.log('Removed ' + selectedCards[i].value + ' ' + selectedCards[i].suit + ' from player hand');
                if (gameDeck.length > 0) {
                    let newCard = gameDeck.pop(); // Get new card from deck
                    deckDiv.innerHTML = gameDeck.length; // Update new number of cards in deck
                    playerHand.push(newCard); // Add new card to player hand
                    console.log('Added ' + newCard.value + ' ' + newCard.suit + ' to player hand');
                    // Add the card to the players hand div
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id', `player-hand-card-${playerHand.length}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/fronts/${newCard.suit.toLowerCase()}_${newCard.value.toLowerCase()}.svg')`;
                    newDiv.setAttribute('suit', newCard.suit);
                    newDiv.setAttribute('value', newCard.value);
                    newDiv.classList.add('player-hand-card');
                    playerHandDiv.appendChild(newDiv);
                    newDiv.addEventListener('click', playerHandCardClick);
                    if (gameDeck.length == 0) {
                        deckDiv.style.backgroundImage = ``;
                        deckDiv.removeAttribute('suit');
                        deckDiv.removeAttribute('value');
                    }
                }
                addToInPlay(selectedCards[i]);
                /** Change the card in the inPlay div
                * inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
                * inPlayDiv.setAttribute('suit', selectedCards[i].suit);
                * inPlayDiv.setAttribute('value', selectedCards[i].value);
                * inPlayCard.unshift(selectedCards[i]);
                * if (inPlayCard.length > 3) {
                *   inPlayDeck.push(inPlayCard.pop());
                * } else { inPlayDeck.push(selectedCards[i]); }
                */
                tipDiv.innerHTML = `You played a ${selectedCards[i].value}`;
                //console.log('Added ' + selectedCards[i].value + ' ' + selectedCards[i].suit + ' to inPlayCard');
                opponentTurn = true;
                clearSelected();
                sortPlayersHand();
                playCard();
            } else if (cardValueToNumber(selectedCards[i].value) == 1 || selectedCards[i].value == 2 || selectedCards[i].value == 5 || selectedCards[i].value == 7 || selectedCards[i].value == 10) {
                let playAgain = false; // Set playAgain to false
                console.log('Selected card is a special card');
                // Remove the selected card from the players hand
                let div = document.querySelector(`[suit="${selectedCards[i].suit}"][value="${selectedCards[i].value}"]`);
                div.remove();
                // Change the card in the inPlay div
                addToInPlay(selectedCards[i]);
                //inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
                //inPlayDiv.setAttribute('suit', selectedCards[i].suit);
                //inPlayDiv.setAttribute('value', selectedCards[i].value);
                //inPlayCard.unshift(selectedCards[i]); // Add the selected card to the inPlayCard array
                //console.log('Added ' + selectedCards[i].value + ' ' + selectedCards[i].suit + ' to inPlayCard');
                // Remove from playerHand Array
                removeClassObject(playerHand, selectedCards[i]);
                console.log('Removed ' + selectedCards[i].value + ' ' + selectedCards[i].suit + ' from player hand');
                //if (inPlayCard.length > 3) {
                //    console.log('More than 3 cards in play removing bottom card from inPlayCard and adding to inPlayDeck');
                //    let movingCard = inPlayCard.pop();
                //    inPlayDeck.push(movingCard);
                //    console.log('Moved ' + movingCard.value + ' ' + movingCard.suit + ' to inPlayDeck');
                //}
                tipDiv.innerHTML = `You played a ${selectedCards[i].value}`;
                if (selectedCards[i].value == 10) {
                    playAgain = true; // Set playAgain to true
                    burnPack();
                    console.log('Burned the pack');
                    tipDiv.innerHTML = `You played a ${selectedCards[i].value} and burned the pack go again`;
                }
                if (selectedCards[i].value == 7) {
                    tipDiv.innerHTML = `You played a ${selectedCards[i].value} and go again`;
                    playAgain = true; // Set playAgain to true
                }
                if (selectedCards[i].value == 2) {
                    tipDiv.innerHTML = `You played a ${selectedCards[i].value} which can be played on any card`;
                }
                if (selectedCards[i].value == 1) {
                    tipDiv.innerHTML = `You played an Ace which can be played on any card`;
                }
                // Pick up new card from deck and add to player hand if currently holding less than
                if (playerHand.length < 3) {
                    if (gameDeck.length > 0) {
                        let newCard = gameDeck.pop();
                        deckDiv.innerHTML = gameDeck.length;
                        playerHand.push(newCard);
                        console.log('Added ' + newCard.value + ' ' + newCard.suit + ' to player hand');
                        // Add the card to the players hand div
                        let newDiv = document.createElement('div');
                        newDiv.setAttribute('id', `player-hand-card-${playerHand.length}`);
                        newDiv.style.backgroundImage = `url('assets/images/cards/fronts/${newCard.suit.toLowerCase()}_${newCard.value.toLowerCase()}.svg')`;
                        newDiv.setAttribute('suit', newCard.suit);
                        newDiv.setAttribute('value', newCard.value);
                        newDiv.classList.add('player-hand-card');
                        playerHandDiv.appendChild(newDiv);
                        newDiv.addEventListener('click', playerHandCardClick);
                        if (gameDeck.length == 0) {
                            deckDiv.style.backgroundImage = ``;
                            deckDiv.removeAttribute('suit');
                            deckDiv.removeAttribute('value');
                        }
                    }
                    clearSelected();
                    if (!playAgain) {
                        opponentTurn = true;
                        playCard();
                    }
                }
            } else if (cardValueToNumber(selectedCards[i].value) >= cardValueToNumber(inPlayCard[0].value) || (inPlayCard[0].value == 5 && cardValueToNumber(selectedCards[i].value) <= 5)) { // If selected card is higher than the card in play
                console.log('Selected card is higher than card in play');
                // Remove the selected card from the players hand div
                let div = document.querySelector(`[suit="${selectedCards[i].suit}"][value="${selectedCards[i].value}"]`);
                div.remove();
                // Set the inPlayDiv to show the selected card
                addToInPlay(selectedCards[i]);
                //inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${selectedCards[i].suit.toLowerCase()}_${selectedCards[i].value.toLowerCase()}.svg')`;
                //inPlayDiv.setAttribute('suit', selectedCards[i].suit);
                //inPlayDiv.setAttribute('value', selectedCards[i].value);
                //inPlayCard.unshift(selectedCards[i]);
                //if (inPlayCard.length > 3) { // If there are more than 3 cards in play
                //   console.log('More than 3 cards in play removing bottom card from inPlayCard and adding to inPlayDeck');
                //    let movingCard = inPlayCard.pop();
                //    inPlayDeck.push(movingCard);
                //    console.log('Moved ' + movingCard.value + ' ' + movingCard.suit + ' to inPlayDeck');
            }
            // Remove the selected card from the players hand array
            removeClassObject(playerHand, selectedCards[i]);
            console.log('Removed ' + selectedCards[i].value + ' ' + selectedCards[i].suit + ' from player hand');
            // Pick up card from deck and add to player hand if the player hand is less than 3 and there are still cards in the deck
            if (playerHand.length < 3) {
                if (gameDeck.length > 0) {
                    let newCard = gameDeck.pop();
                    deckDiv.innerHTML = gameDeck.length;
                    playerHand.push(newCard);
                    console.log('Added ' + newCard.value + ' ' + newCard.suit + ' to player hand');
                    // Add the card to the players hand div
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id', `player-hand-card-${playerHand.length}`);
                    newDiv.style.backgroundImage = `url('assets/images/cards/fronts/${newCard.suit.toLowerCase()}_${newCard.value.toLowerCase()}.svg')`;
                    newDiv.setAttribute('suit', newCard.suit);
                    newDiv.setAttribute('value', newCard.value);
                    newDiv.classList.add('player-hand-card');
                    playerHandDiv.appendChild(newDiv);
                    newDiv.addEventListener('click', playerHandCardClick);
                    if (gameDeck.length == 0) {
                        deckDiv.style.backgroundImage = ``;
                        deckDiv.removeAttribute('suit');
                        deckDiv.removeAttribute('value');

                    }
                }
                tipDiv.innerHTML = `You played a ${selectedCards[i].value}`;
                opponentTurn = true;
                clearSelected();
                playCard();
            } else if (inPlayCard[0] == 5 && cardValueToNumber(selectedCards[i].value) > 5) {
                tipDiv.innerHTML = 'You must play a lower card than a 5';
                console.log('You must play a lower card than a 5');
            } else if (cardValueToNumber(inPlayCard[0].value) > cardValueToNumber(selectedCards[i].value) && inPlayCard[0].value != 5) { // If selected card is lower than the card in play
                console.log('Selected card is lower than card in play');
                tipDiv.innerHTML = 'You must play a higher card than the last card played';
            }
        }
    }
    // Check that the selected cards are higher than the last card played
    // If they are then play the cards
    // If they are not then alert the player that the cards are not higher
    // If the player has no higher cards then they must pick up the deck
    // If the player has no cards in their hand then they can play a card from the table
    // If the player has no cards in their hand or on the table then they have won the game
    sortPlayersHand();
};

/**
 * Function to burn the pack
 */
function burnPack() {
    console.log(`Burn ${inPlayDeck.length + inPlayCard.length} cards`);
    inPlayDeck = [];
    inPlayDiv.innerHTML = '';
    inPlayDiv.style.backgroundImage = ``;
    inPlayDiv.setAttribute('suit', '');
    inPlayDiv.setAttribute('value', '');
    inPlayCard = [];
    inPlayDeck = [];
    tipDiv.innerHTML = 'The pack has been burned';
};

/**
 * Function to play from game deck
 */
function playFromDeck() {
    if (gameDeck.length > 0) {
        let newCard = gameDeck.pop();
        deckDiv.innerHTML = gameDeck.length;
        if (cardValueToNumber(newCard.value) == 10) {
            addToInPlay(newCard);
            setTimeout(function () { burnPack(); }, 2500);
            tipDiv.innerHTML = 'Game deck card was a 10, pack burned';
        } else if (cardValueToNumber(newCard.value) == 7) {
            tipDiv.innerHTML = 'Game deck card was a 7, go again';
            addToInPlay(newCard);
        } else if (cardValueToNumber(newCard.value) == 1) {
            tipDiv.innerHTML = 'Game deck card was an Ace';
            addToInPlay(newCard);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 2500);
        } else if (cardValueToNumber(newCard.value) == 2) {
            tipDiv.innerHTML = 'Game deck card was a 2';
            addToInPlay(newCard);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 2500);
        } else if (cardValueToNumber(newCard.value) == 5) {
            tipDiv.innerHTML = 'Game deck card was a 5 opponent must play lower card';
            addToInPlay(newCard);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 2500);
        } else if (inPlayCard[0] == undefined) {
            tipDiv.innerHTML = 'Game deck card was a ' + newCard.value;
            addToInPlay(newCard);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 2500);
        } else if (cardValueToNumber(newCard.value) >= cardValueToNumber(inPlayCard[0].value) || (cardValueToNumber(inPlayCard[0].value) == 5 && cardValueToNumber(newCard.value) <= 5)) {
            tipDiv.innerHTML = 'Game deck card was a ' + newCard.value;
            addToInPlay(newCard);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 2500);
        } else if (cardValueToNumber(newCard.value) < cardValueToNumber(inPlayCard[0].value)) {
            tipDiv.innerHTML = 'Game deck card was lower than the last card played pick up the deck';
            addToInPlay(newCard);
            setTimeout(function () { pickUpInPlayDeck(); }, 2500);
            opponentTurn = true;
            setTimeout(function () { playCard(); }, 5000);
        }
    }
    else {
        tipDiv.innerHTML = 'Game deck is empty';
    }
    if (gameDeck.length == 0) {
        deckDiv.style.backgroundImage = ``;
        deckDiv.removeAttribute('suit');
        deckDiv.removeAttribute('value');
    }
};

/**
 * Function to add to the inPlayDeck
 */
function addToInPlay(card) {
    inPlayDiv.style.backgroundImage = `url('assets/images/cards/fronts/${card.suit.toLowerCase()}_${card.value.toLowerCase()}.svg')`;
    inPlayDiv.setAttribute('suit', card.suit);
    inPlayDiv.setAttribute('value', card.value);
    inPlayCard.unshift(card);
    console.log('Added ' + card.value + ' ' + card.suit + ' to inPlayCard');
    while (inPlayCard.length > 3) {
        console.log('More than 3 cards in play removing bottom card from inPlayCard and adding to inPlayDeck');
        let movingCard = inPlayCard.pop();
        inPlayDeck.push(movingCard);
        console.log('Moved ' + movingCard.value + ' ' + movingCard.suit + ' to inPlayDeck');
    }
};

/**
 * Function to clear the selected cards
 */
function clearSelected() {
    let cardElements = document.getElementsByClassName('player-hand-card');
    let selectedTableCardsElements = document.getElementsByClassName('player-table-card');
    for (let i = 0; i < cardElements.length; i++) {
        playerCardsElements[i].style.border = "1px solid black";
    }
    for (let i = 0; i < selectedTableCardsElements.length; i++) {
        selectedTableCardsElements[i].style.border = "1px solid black";
    }
    selectedCards = [];
    selectedTableCards = [];
    selectedCardCount = 0;
    selectedTableCardCount = 0;
};

/**
 * Functions to sort Hands and propagate the changes to the divs
 */
/**
 * Function to sort the players hand
 */
function sortPlayersHand() {
    // First sort the players hand array by value
    let sortedPlayersHand = [];
    let tempPlayersHand = playerHand;
    console.log('Run loop to sort players hand');
    while (tempPlayersHand.length > 0) {
        let lowest = minValueIgnore(tempPlayersHand);
        //console.log('Lowest value: ' + lowest.minValue);
        //console.log('Lowest index: ' + lowest.minIndex);
        sortedPlayersHand.push(tempPlayersHand[lowest.minIndex]);
        tempPlayersHand.splice(lowest.minIndex, 1);
        //console.log('Temp players hand: ' + tempPlayersHand.value + ' ' + tempPlayersHand.suit);
        //console.log('Sorted players hand: ' + sortedPlayersHand.value + ' ' + sortedPlayersHand.suit);
    } // End of while loop
    console.log('Sorted players hand: ' + sortedPlayersHand);
    // Clear the players hand div
    playerHandDiv.innerHTML = '';
    // Loop through the sorted players hand array and add the cards to the players hand div
    for (let i = 0; i < sortedPlayersHand.length; i++) {
        // Create a new div for each card in the players hand
        let newDiv = document.createElement('div');
        newDiv.classList.add(`player-hand-card-${i + 1}`);
        newDiv.classList.add('player-hand-card');
        newDiv.style.backgroundImage = `url('assets/images/cards/fronts/${sortedPlayersHand[i].suit.toLowerCase()}_${sortedPlayersHand[i].value.toLowerCase()}.svg')`;
        newDiv.setAttribute('suit', sortedPlayersHand[i].suit);
        newDiv.setAttribute('value', sortedPlayersHand[i].value);
        playerHandDiv.appendChild(newDiv);
        newDiv.addEventListener('click', playerHandCardClick);
    }
    // Reassign the players hand array
    playerHand = sortedPlayersHand;
};
/**
 * Function to sort the opponents hand
 */
function sortOpponentsHand() {
    // First sort the opponents hand array by value
    let sortedOpponentsHand = [];
    let tempOpponentsHand = opponentsHand;
    console.log('Run loop to sort opponents hand');
    while (tempOpponentsHand.length > 0) {
        let lowest = minValueIgnore(tempOpponentsHand);
        //console.log('Lowest value: ' + lowest.minValue);
        //console.log('Lowest index: ' + lowest.minIndex);
        sortedOpponentsHand.push(tempOpponentsHand[lowest.minIndex]);
        tempOpponentsHand.splice(lowest.minIndex, 1);
        //console.log('Temp opponents hand: ' + tempOpponentsHand);
        //console.log('Sorted opponents hand: ' + sortedOpponentsHand);
    } // End of while loop
    console.log('Sorted opponents hand: ' + sortedOpponentsHand);
    // Clear the opponents hand div
    opponentsHandDiv.innerHTML = '';
    // Loop through the sorted opponents hand array and add the cards to the opponents hand div
    for (let i = 0; i < sortedOpponentsHand.length; i++) {
        // Create a new div for each card in the opponents hand
        let newDiv = document.createElement('div');
        newDiv.classList.add(`opponents-hand-card-${i + 1}`);
        newDiv.classList.add('opponents-hand-card');
        newDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
        newDiv.setAttribute('suit', sortedOpponentsHand[i].suit);
        newDiv.setAttribute('value', sortedOpponentsHand[i].value);
        opponentsHandDiv.appendChild(newDiv);
    }
    // Reassign the opponents hand array
    opponentsHand = sortedOpponentsHand;
}

/**
 * Function to pick up the inPlayDeck
 */
function pickUpInPlayDeck(x) {
    if (x == 'opponent') {
        let tempInPlayDeck = inPlayDeck;
        while (inPlayDeck.length > 0) {
            opponentsHand.push(inPlayDeck.pop());
        }
        while (inPlayCard.length > 0) {
            opponentsHand.push(inPlayCard.pop());
        }
        sortOpponentsHand();
        inPlayDiv.style.backgroundImage = '';
        inPlayDiv.removeAttribute('suit');
        inPlayDiv.removeAttribute('value');
        tipDiv.innerHTML = 'Opponent picked up the deck';
        opponentTurn = false;
    }
    else {
        let tempInPlayDeck = inPlayDeck;
        while (inPlayDeck.length > 0) {
            playerHand.push(inPlayDeck.pop());
        }
        while (inPlayCard.length > 0) {
            playerHand.push(inPlayCard.pop());
        }
        sortPlayersHand();
        inPlayDiv.style.backgroundImage = '';
        inPlayDiv.removeAttribute('suit');
        inPlayDiv.removeAttribute('value');
        tipDiv.innerHTML = 'You picked up the deck';
        opponentTurn = true;
        setTimeout(() => {
            playCard();
        }, 3000);
    }
};

/**
 * Function to check if player has a playable card
 */
function checkValidPlayerCard() {
    let currentPlayCard = inPlayCard[0];
    let resultTrue = false;
    for (let i = 0; i < playerHand.length; i++) {
        if (cardValueToNumber(playerHand[i].value) >= cardValueToNumber(currentPlayCard.value)) {
            resultTrue = true;
            break;
        } else if (cardValueToNumber(playerHand[i].value) == '1' || cardValueToNumber(playerHand[i].value) == '2' || cardValueToNumber(playerHand[i].value) == '5' || cardValueToNumber(playerHand[i].value) == '7' || cardValueToNumber(playerHand[i].value) == '10') {
            resultTrue = true;
            break;
        }
    }
    if (!resultTrue) {
        return false;
    } else {
        return true;
    }
};

/**
 * Function to check if opponent has a playable card
 */
function checkValidOpponentCard() {
    let currentPlayCard = inPlayCard[0];
    let resultTrue = false;
    for (let i = 0; i < opponentsHand.length; i++) {
        if (cardValueToNumber(opponentsHand[i].value) >= cardValueToNumber(currentPlayCard.value)) {
            resultTrue = true;
            console.log('Opponent has a playable card' + opponentsHand[i].value + ' of ' + opponentsHand[i].suit);
            break;
        } else if (cardValueToNumber(opponentsHand[i].value) == '1' || cardValueToNumber(opponentsHand[i].value) == '2' || cardValueToNumber(opponentsHand[i].value) == '5' || cardValueToNumber(opponentsHand[i].value) == '7' || cardValueToNumber(opponentsHand[i].value) == '10') {
            resultTrue = true;
            console.log('Opponent has a playable special card' + opponentsHand[i].value + ' of ' + opponentsHand[i].suit);
            break;
        }
    }
    if (!resultTrue) {
        return false;
    } else {
        return true;
    }
}


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
        if (cardValueToNumber(opponentCard.value) < cardValueToNumber(playerHand[i].value) && cardValueToNumber(playerHand[i].value) != '2' && cardValueToNumber(playerHand[i].value) != '5' && cardValueToNumber(playerHand[i].value) != '7' && cardValueToNumber(playerHand[i].value) != '10') {
            return true;
            // opponentsLowerCardIndex = varCard;
        }
    }
};

/**
 * get the lowest value card over a specified number
 */
function getLowestValueOverNumber(array, number) {
    return array.filter(item => cardValueToNumber(item.value) >= number)
        .reduce((lowest, current) => {
            return (lowest == null || cardValueToNumber(current.value) < cardValueToNumber(lowest.value)) ? current : lowest;
        }, null);
};

/**
 * get the lowest value card from an array 
 */
function getLowestValueObject(array) {
    return array.reduce((lowest, current) => {
        return (lowest == null || cardValueToNumber(current.value) < cardValueToNumber(lowest.value)) ? current : lowest;
    }, null);
};
/**
 * Alternate function to check if array has a lower value card
 * returns which array has the lower card and the index of the card
 * this function returns false if array 1 has a special card
 */
function minValue(array) {
    let minIndex = 0;
    let minValue = cardValueToNumber(array[0].value);
    while (minValue == 1 || minValue == 2) {
        if (minIndex == array.length) {
            return { minValue, minIndex };
        }
        minIndex++;
        minValue = cardValueToNumber(array[minIndex].value);
    }

    for (let i = 0; i < array.length; i++) {
        let currentValue = cardValueToNumber(array[i].value);
        if (currentValue == 1 || currentValue == 2) {
            continue;
        }
        if (currentValue < minValue) {
            minValue = currentValue;
            minIndex = i;
        }
    }
    return { minValue, minIndex };
};
/**
 * alternative minValue function ignoring special cards
 */
function minValueIgnore(array) {
    let minIndex = 0;
    let minValue = cardValueToNumber(array[0].value);
    for (let i = 0; i < array.length; i++) {
        let currentValue = cardValueToNumber(array[i].value);
        if (currentValue < minValue) {
            minValue = currentValue;
            minIndex = i;
        }
    }
    return { minValue, minIndex };
};

function array1Lower(array1, array2) {
    let min1 = minValue(array1);
    let min2 = minValue(array2);

    if (min1.minValue >= 3 && min1.minValue < min2.minValue) {
        return min1.minIndex;
    } else {
        return false;
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