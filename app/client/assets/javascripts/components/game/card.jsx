import React from 'react';

import GameActions from '../../flux/actions/GameActions';

import Button from '../button';
import Dice from './dice';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    onTakeCardClick() {
        GameActions.takeCard(this.props.id);
    }

    render() {
        let dice = this.props.data.map(function(value, index) {
            return ( <Dice key={ index } dots={ value } /> );
        });

        return (
            <div className="card">
                { dice }
                <Button className="button" onClick={ this.onTakeCardClick.bind(this) }>Take</Button>
            </div>
        );
    }
}

export default Card;
