import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Button from '../button';
import Dice from './dice';

class PlayerCurrent extends React.Component {
    constructor(props) {
        super(props);
    }

    startGame() {
        GameActions.startGame();
    }

    rollDice() {
        GameActions.rollDice();
    }

    endTurn() {
        GameActions.endTurn();
    }

    render() {
        let dice = this.props.currentPlayer.dice_available.map(function(value, index) {
            return <Dice key={ index } diceSize="big" dotCount={ value }/>;
        });

        return (
            <div className={ 'grid-col-2 player-color-' + this.props.currentPlayer.slot }>
                <Button className="button" onClick={ this.startGame }>Start Game</Button>
                <Button className="button" onClick={ this.rollDice }>Roll Dice</Button>
                <Button className="button" onClick={ this.endTurn }>End Turn</Button>
                { dice }
            </div>
        );
    }
}

export default PlayerCurrent;
