import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Card from './card';

class CardTray extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid-col-2">
                <div className="header"></div>
                <Card diceCount="2" diceData={ [1, 6] } backgroundVisible={ true } />
                <Card diceCount="3" diceData={ [2, 4, 6] } backgroundVisible={ true }/>
                <Card diceCount="4" diceData={ [1, 2, 5, 6] } backgroundVisible={ true }/>
                <Card diceCount="6" diceData={ [1, 2, 3, 4, 5, 6] } backgroundVisible={ true }/>
            </div>
        );
    }
}

export default CardTray;
