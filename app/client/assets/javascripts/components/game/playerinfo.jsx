import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Card from './card';

class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cards = this.props.playerDice.map(function(value, index) {
            return ( <Card key={ index } diceCount={ value.length } diceData={ value } />)
        });

        let selected = this.props.playerCurrent ? 'current_player' : '';

        return (
            <div className={ 'grid-col-2 player-color-' + this.props.playerSlot }>
                <div className={ 'header ' + selected }>
                    <h3>{ this.props.playerName }</h3>
                    <p>{ this.props.playerScore }</p>
                </div>
                { cards }
            </div>
        );
    }
}

export default PlayerInfo;
