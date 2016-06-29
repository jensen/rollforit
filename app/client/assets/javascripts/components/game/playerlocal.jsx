import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Dice from './dice';

class PlayerLocal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dice = [1, 2, 3, 4, 5, 6].map(function(value) {
            return <Dice key={ value } diceSize="big" dotCount={ value }/>;
        });

        return (
            <div className="grid-col-2 player-color-0">
                <div className="header"></div>
                { dice }
            </div>
        );
    }
}

export default PlayerLocal;
