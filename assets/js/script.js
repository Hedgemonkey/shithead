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
        <li>The deck will be shuffled and each player gets delt 1 card each until the both have 3 cards face down, 3 cards face up, and 3 to their hand.</li>
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
    shuffleButton.setAttribute('onclick', 'shuffle()');
    shuffleButton.innerHTML = "Shuffle";
    containerDiv.appendChild(shuffleButton);
    shuffleButton = document.getElementById('shuffle-button'); // Re-assign to the new element
    dealButton = document.createElement('button');
    dealButton.setAttribute('id', 'deal-button');
    dealButton.setAttribute('class', 'deal-button');
    dealButton.setAttribute('onclick', 'deal()');
    dealButton.innerHTML = "Deal";
    containerDiv.appendChild(dealButton);
    dealButton = document.getElementById('deal-button'); // Re-assign to the new element
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
        opponentsTableCard.setAttribute('class', 'opponents-table-card');
        opponentsTableCard.setAttribute('class', 'table-card');
        opponentsTableDiv.appendChild(opponentsTableCard);
        opponentsTableCardArray.push(opponentsTableCard);
        let playerTableCard = document.createElement('div');
        playerTableCard.setAttribute('id', `player-table-card-${i}`);
        playerTableCard.setAttribute('class', 'player-table-card');
        playerTableCard.setAttribute('class', 'table-card');
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
        dealButton.setAttribute('onclick', 'deal()');
        dealButton.innerHTML = "Deal";
        document.getElementById('hero').appendChild(dealButton);
    }
    // Enable the deal button
    dealButton = document.getElementById('deal-button');
    dealButton.disabled = false;
    dealButton.style.opacity = "1";
    dealButton.style.backgroundColor = "green";
    shuffleButton.innerHTML = "Start Again"; // Change the shuffle button to start again
};

/**
 * deal() function deals the cards to the players and sets up the game
 */
function deal() {
    let dealCount = 0;
    playerHandCount = 0;
    opponentsHandCount = 0;
    function delayDeal(dealCountDelayed, currentCardDelayed) {
        console.log(dealCountDelayed);
        console.log(currentCardDelayed);
        if (dealCountDelayed < 3) { // First 3 cards to opponents table
            opponentsTableCardArray[dealCountDelayed].style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table');
            opponentsTableCardsDown.push(currentCardDelayed);
        } else if (dealCountDelayed < 6) { // Next 3 cards to player table
            playerTableCardArray[dealCountDelayed - 3].style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table');
            playerTableCardsDown.push(currentCardDelayed);
        } else if (dealCountDelayed == 6) { // First up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 6].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 8) { // Second up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 7].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 10) { // Third up card to opponents table
            opponentsTableCardArray[dealCountDelayed - 8].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            opponentsTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents table face up');
        } else if (dealCountDelayed == 7) {  // First up card to player table
            playerTableCardArray[dealCountDelayed - 7].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 9) { // Second up card to player table
            playerTableCardArray[dealCountDelayed - 8].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 11) { // Third up card to player table
            playerTableCardArray[dealCountDelayed - 9].style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            playerTableCardsUp.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player table face up');
        } else if (dealCountDelayed == 12 || dealCountDelayed == 14 || dealCountDelayed == 16) { // Alternating cards to opponents hand
            opponentsHandCount++;
            let containerDiv = document.getElementById('opponents-hand');
            let opponenetsHandUpdatable = document.createElement('div');
            opponenetsHandUpdatable.setAttribute('id', `opponents-hand-card-${opponentsHandCount}`);
            opponenetsHandUpdatable.setAttribute('class', 'opponents-hand-card');
            opponenetsHandUpdatable.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            containerDiv.appendChild(opponenetsHandUpdatable);
            opponentsHand.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to opponents hand');
        } else if (dealCountDelayed == 13 || dealCountDelayed == 15 || dealCountDelayed == 17) { // Alternating cards to player hand
            playerHandCount++;
            let containerDiv = document.getElementById('player-hand');
            let playerHandUpdatable = document.createElement('div');
            playerHandUpdatable.setAttribute('id', `player-hand-card-${playerHandCount}`);
            playerHandUpdatable.setAttribute('class', 'player-hand-card');
            playerHandUpdatable.style.backgroundImage = `url('assets/images/cards/fronts/${currentCardDelayed.suit.toLowerCase()}_${currentCardDelayed.value.toLowerCase()}.svg')`;
            containerDiv.appendChild(playerHandUpdatable);
            playerHand.push(currentCardDelayed);
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to player hand');
        } else if (dealCountDelayed == 51) { // Last card to deck
            gameDeck.push(currentCardDelayed);
            deckDiv.style.backgroundImage = `url('assets/images/cards/backs/${cardBack}')`;
            deckDiv.innerHTML = gameDeck.length;
            console.log(currentCardDelayed.suit + currentCardDelayed.value + ' to deck');
            /**
             * Add a game tips to the hero div
             */
            let containerDiv = document.getElementById('hero');
            tipDiv = document.createElement('div');
            tipDiv.setAttribute('id', 'tip');
            tipDiv.setAttribute('class', 'tip');
            tipDiv.innerHTML = '<h4>Choose cards you want to swap, Click Play when you are happy with your hand.</h4>';
            containerDiv.appendChild(tipDiv);
            tipDiv = document.getElementById('tip');
            /**
             * Play Selected Button
             */
            playSelectedButton = document.createElement('button');
            playSelectedButton.setAttribute('id', 'play-selected-button');
            playSelectedButton.setAttribute('class', 'play-selected-button');
            playSelectedButton.setAttribute('onclick', 'playSelected()');
            playSelectedButton.innerHTML = "Play Selected";
            containerDiv.appendChild(playSelectedButton);
            playSelectedButton = document.getElementById('play-selected-button');
            playSelectedButton.disabled = true; // Disable the play selected button until the player has selected cards
            playSelectedButton.style.opacity = "0.5"; // Set the play selected button to be transparent
            playSelectedButton.style.backgroundColor = "grey"; // Set the play selected button to be grey
            /**
             * Swap Selected Button
             */
            swapSelectedButton = document.createElement('button');
            swapSelectedButton.setAttribute('id', 'swap-selected-button');
            swapSelectedButton.setAttribute('class', 'swap-selected-button');
            swapSelectedButton.setAttribute('onclick', 'swapSelected()');
            swapSelectedButton.innerHTML = "Accept Cards";
            containerDiv.appendChild(swapSelectedButton);
            swapSelectedButton = document.getElementById('swap-selected-button');
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