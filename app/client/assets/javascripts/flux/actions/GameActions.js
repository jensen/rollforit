import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

class GameActions {
    constructor() {
    }

    static takeCard(card) {
        AppDispatcher.dispatch({
            actionType: GameConstants.GAME_PLAYER_TAKE_CARD,
            card: card
        });
    }
}

export default GameActions;
