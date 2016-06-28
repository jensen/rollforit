import React from 'react';

import GameConstants from '../../flux/constants/GameConstants';

import Card from './card';
import Dice from './dice';

class Rack extends React.Component {
    constructor(props) {
        super(props);
    }

    displayCards(data) {
        return data.map(function(value, index) {
            return ( <Card key={ index } id={ index } data={ value } /> );
        });
    }

    displayDice(data) {
        return data.map(function(value, index) {
            return ( <Dice key={ index } dots={ value } /> );
        });
    }

    render() {
        if(this.props.data.length === 0) {
            return ( <div className='rack rack-empty'></div> );
        }

        if( this.props.type === GameConstants.TYPE_CARD) {
            return (
                <div className='rack'>
                    { this.displayCards(this.props.data) }
                </div>
            );
        } else if( this.props.type === GameConstants.TYPE_DICE) {
            return (
                <div className='rack'>
                    { this.displayDice(this.props.data) }
                </div>
            );
        }
    }
}

export default Rack;
