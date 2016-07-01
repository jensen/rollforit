import EventEmitter from 'events';

import Reqwest from 'reqwest';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameStoreHelper {
    static getRequest(url, cb) {
        Reqwest({ url: url, method: 'get', success: cb });
    }

    static postRequest(url, cb) {
        Reqwest({ url: url, method: 'post', success: cb });
    }

    static putRequest(url, cb) {
        Reqwest({ url: url, method: 'put', success: cb });
    }
}

class GameStore extends EventEmitter {
    constructor() {
        super();

        this.requestState();

        AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    requestState(cb) {
        GameStoreHelper.getRequest('/api/store.json/', function(r) {
            this.game = r;
            this.emitChange();
        }.bind(this));
    }

    dispatcherCallback(action) {
        switch(action.actionType) {
            case GameConstants.GAME_START:
                this.startGame();
                break;

            case GameConstants.GAME_PLAYER_ROLL_DICE:
                this.rollDice();
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

    startGame() {
        let url = '/api/games/' + this.game.game_id + '/start';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    rollDice() {
        let url = '/api/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/roll';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }

    endTurn() {
        let url = '/api/games/' + this.game.game_id + '/players/' + this.game.local_player.id + '/turn';

        GameStoreHelper.putRequest(url, function(r) {
            this.requestState();
        }.bind(this));
    }
}

export default GameStore;
