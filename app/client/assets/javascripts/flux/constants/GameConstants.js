class GameConstants {
    static mirror(list) {
        return list.reduce(function(object, value/*, index */) {
            object[value] = value;
            return object;
        }, {});
    }

    static get() {
        return GameConstants.mirror([
            'EVENT_CHANGE',
            'GAME_START',
            'GAME_END',
            'GAME_DEAL_CARDS',
            'GAME_PLAYER_ROLL_DICE',
            'GAME_PLAYER_NEXT_TURN',
            'GAME_PLAYER_TAKE_CARD',
            'TYPE_CARD',
            'TYPE_DICE'
        ]);
    }
}

export default GameConstants.get();
