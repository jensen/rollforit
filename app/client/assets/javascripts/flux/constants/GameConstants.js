class GameConstants {
    static mirror(list) {
        return list.reduce(function(object, value /*, index */ ) {
            object[value] = value;
            return object;
        }, {});
    }

    static get() {
        return GameConstants.mirror([
            'EVENT_CHANGE',
            'EVENT_DROP_DICE',
            'GAME_START',
            'GAME_END',
            'GAME_DEAL_CARDS',
            'GAME_PLAYER_ROLL_DICE',
            'GAME_PLAYER_ASSIGN_DICE',
            'GAME_PLAYER_TAKE_CARD',
            'GAME_PLAYER_RETRIEVE_DICE',
            'GAME_PLAYER_END_TURN',
            'GAME_PLAYER_TAKE_CARD',
            'GAME_PLAYER_END_GAME',
            'TYPE_CARD',
            'TYPE_DICE'
        ]);
    }
}

export default GameConstants.get();
