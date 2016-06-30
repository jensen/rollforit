import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Card from './card';

class CardTray extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cards = this.props.allCards.map(function(value, index) {
            return (<Card key={ index } diceCount={ value.length } diceData={ value } backgroundVisible={ true }/>);
        });

        return (
            <div className="grid-col-2">
                <div className="header"></div>
                { cards }
            </div>
        );
    }
}

export default CardTray;
