/**
 * rules() function checks if div ID "rules" exists and removes that element if it does
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