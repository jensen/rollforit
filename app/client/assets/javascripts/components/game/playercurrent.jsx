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

    takeCard() {
        GameActions.takeCard();
    }

    retrieveDice() {
        GameActions.retrieveDice();
    }

    endTurn() {
        GameActions.endTurn();
    }

    endGame() {
        GameActions.endGame();
    }

    renderButton(label, index, callback) {
        return <Button key={ index } className="button" onClick={ callback }>{ label }</Button>;
    }

    render() {
        let allowDrag, dice;

        if(this.props.currentPlayer) {
            allowDrag = this.props.localPlayer.id == this.props.currentPlayer.id;
            dice = this.props.currentPlayer.dice_available.map(function(value, index) {
                return <Dice
                    key={ index }
                    id={ 'dice-draggable-' + index }
                    diceSize="big"
                    dotCount={ value }
                    allowDrag={ allowDrag }/>;
            });
        }

        let buttons = [
            {
                label: 'Start Game',
                valid: this.props.availableActions.start_game,
                callback: this.startGame
            },
            {
                label: 'Roll Dice',
                valid: this.props.availableActions.roll_dice,
                callback: this.rollDice
            },
            {
                label: 'Take Card',
                valid: this.props.availableActions.take_card,
                callback: this.takeCard
            },
            {
                label: 'Retrieve All',
                valid: this.props.availableActions.retrieve_dice,
                callback: this.retrieveDice
            },
            {
                label: 'End Turn',
                valid: this.props.availableActions.end_turn,
                callback: this.endTurn
            },
            {
                label: 'End Game',
                valid: this.props.availableActions.end_game,
                callback: this.endGame
            }
        ]
        .filter((value) => value.valid == true)
        .map((value, index) => this.renderButton(value.label, index, value.callback));

        let color = this.props.currentPlayer ? 'player-color-' + this.props.currentPlayer.slot : 'current_player';

        return (
            <div className={ 'grid-col-2 ' + color }>
                { buttons }
                { dice }
            </div>
        );
    }
}

export default PlayerCurrent;
