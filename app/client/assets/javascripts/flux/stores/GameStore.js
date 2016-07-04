import EventEmitter from 'events';

import Reqwest from 'reqwest';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameStoreHelper {
    static Request(url, method, cb) {
        // Development
        if (false) {
            url = '/api' + url;
        }

        Reqwest({
            url: url,
            method: method,
            success: cb
        });
    }

    static getRequest(url, cb) {
        GameStoreHelper.Request(url, 'get', cb);
    }

    static postRequest(url, cb) {
        GameStoreHelper.Request(url, 'post', cb);
    }

    static putRequest(url, cb) {
        GameStoreHelper.Request(url, 'put', cb);
    }
}

class GameStore extends EventEmitter {
    constructor() {
        super();

        this.requestState();

        AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    registerCableActions() {
        return {
            connected: this.cableConnected.bind(this),
            disconnected: this.cableDisconnected.bind(this),
            received: this.cableUpdated.bind(this)
        };
    }

    cableConnected() {}

    cableDisconnected() {}

    cableUpdated(data) {
        this.requestState();
    }

    requestState() {
        GameStoreHelper.getRequest('/store.json', function(r) {
            this.game = r;
            this.emitChange();
        }.bind(this));
    }

    dispatcherCallback(action) {
        switch (action.actionType) {
            case GameConstants.GAME_START:
                this.startGame();
                break;

            case GameConstants.GAME_PLAYER_ROLL_DICE:
                this.rollDice();
                break;

            case GameConstants.GAME_PLAYER_ASSIGN_DICE:
                this.assignDice(action.dice, action.card);
                break;

            case GameConstants.GAME_PLAYER_TAKE_CARD:
                this.takeCard();
                break;

            case GameConstants.GAME_PLAYER_RETRIEVE_DICE:
                this.retrieveDice();
                break;

            case GameConstants.GAME_PLAYER_END_TURN:
                this.endTurn();
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

    getPlayers() {
        return this.game.players;
    }

    getLocalPlayer() {
        return this.game.local_player;
    }

    getCurrentPlayer() {
        return this.game.current_player;
    }

    getClientValidation() {
        return this.game.validation;
    }

    startGame() {
        let url = '/games/' + this.game.game_id + '/start';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    rollDice() {
        let url = '/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/roll';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    assignDice(dice, card) {
        let url = '/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/assign/' + dice + '/' +
            card;

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    takeCard() {
        let url = '/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/take';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    retrieveDice() {
        let url = '/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/retrieve';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    endTurn() {
        let url = '/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/turn';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }
}

export default GameStore;
