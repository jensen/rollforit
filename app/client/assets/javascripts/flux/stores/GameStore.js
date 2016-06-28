import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameStoreHelper {
    static shuffleDeck() {
        let cards = [
            [2, 2],
            [4, 4],
            [1, 3],
            [4, 4],
            [4, 5],
            [4, 3],
            [4, 3, 3],
            [3, 1, 3],
            [3, 2, 2],
            [3, 3, 4],
            [4, 5, 1],
            [3, 2, 1],
            [3, 3, 1],
            [4, 2, 3],
            [4, 2, 3],
            [4, 4, 2],
            [5, 4, 5],
            [2, 1, 1],
            [4, 2, 2, 5],
            [3, 3, 2, 3],
            [3, 1, 3, 5],
            [2, 4, 1, 1],
            [3, 5, 2, 4],
            [2, 1, 1, 1],
            [1, 5, 5, 5],
            [2, 1, 5, 2],
            [3, 1, 4, 1, 4, 2],
            [4, 2, 3, 1, 2, 2],
            [2, 1, 5, 4, 5, 2],
            [3, 5, 4, 2, 1, 3]
        ];

        return cards;
    }
}

class GameStore extends EventEmitter {
    constructor() {
        super();

        this.game = {};
        this.game.deck = GameStoreHelper.shuffleDeck();
        this.game.current_player = 0;
        this.game.players = [
            {name: "Karl", dice: [1, 1, 2, 2, 3, 3 ], cards: []}
        ];

        this.game.cards = [];

        let playerCount = this.game.players.length;

        this.game.cardCount = playerCount < 5 ? 3 : 4;
        for(let c = 0; c < this.game.cardCount; ++c) {
            this.game.cards.push(this.game.deck.shift());
        }

        AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    dispatcherCallback(action) {
        switch(action.actionType) {
            case GameConstants.GAME_PLAYER_TAKE_CARD:
                this.takeCard(action.card);
                this.emitChange();
                break;
        }
    }

    emitChange() {
        this.emit(GameConstants.EVENT_CHANGE);
    }

    addChangeListener(callback) {
        this.on(GameConstants.EVENT_CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(GameConstants.EVENT_CHANGE, callback);
    }

    getCards() {
        return this.game.cards;
    }

    getDice() {
        return this.game.players[this.game.current_player].dice;
    }

    getPlayerCards() {
        return this.game.players[this.game.current_player].cards;
    }

    takeCard(card) {
        this.game.players[this.game.current_player].cards.push(this.game.cards[card]);
        this.replaceCard(card);
    }

    replaceCard(card) {
        if(this.game.deck.length == 0) {
            this.game.deck = GameStoreHelper.shuffleDeck();
        }

        this.game.cards[card] = this.game.deck.shift();
    }
}

export default GameStore;
