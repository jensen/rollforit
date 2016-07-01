import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameActions {
    constructor() {
    }

    static startGame() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_START
        });
    }

    static rollDice() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_ROLL_DICE
        });
    }

    static endTurn() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_END_TURN
        });
    }
}

export default GameActions;
