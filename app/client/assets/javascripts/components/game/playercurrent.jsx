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

        let actions = [];

        if(this.props.availableActions.start_game) {
            actions.push(<Button className="button" onClick={ this.startGame }>Start Game</Button>);
        } else if(this.props.availableActions.roll_dice) {
            actions.push(<Button className="button" onClick={ this.rollDice }>Roll Dice</Button>);
        } else if(this.props.availableActions.end_turn) {
            actions.push(<Button className="button" onClick={ this.endTurn }>End Turn</Button>);
        }

        return (
            <div className={ 'grid-col-2 player-color-' + this.props.currentPlayer.slot }>
                { actions }
                { dice }
            </div>
        );
    }
}

export default PlayerCurrent;
