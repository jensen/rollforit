import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Dice from './dice';

class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ 'grid-col-2 player-color-' + this.props.playerId }>
                <div className="header">
                    <h3>{ this.props.playerName }</h3>
                    <p>{ this.props.playerScore }</p>
                </div>
            </div>
        );
    }
}

export default PlayerInfo;
