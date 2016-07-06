import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameActions {
    constructor() {}

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

    static assignDice(dice, card) {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_ASSIGN_DICE,
            dice: dice,
            card: card
        });
    }

    static takeCard() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_TAKE_CARD
        })
    }

    static retrieveDice() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_RETRIEVE_DICE
        })
    }

    static endTurn() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_END_TURN
        });
    }

    static endGame() {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_END_GAME
        });
    }
}

export default GameActions;
