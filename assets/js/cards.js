/**
 * Card class constructs a card object with a suit and value
 */
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

/**
 * Deck class constructs a deck of 52 cards
 * with 13 cards in each of the 4 suits
 * and provides methods to shuffle and deal cards
 * from the deck
 */
class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    deal() {
        return this.deck.pop();
    }
}