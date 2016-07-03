import React from 'react';

import Drag from '../../utility/drag'

import GameActions from '../../flux/actions/GameActions';

import Dice from './dice';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCard(dice, values, visible) {
        dice = dice.toString();
        values = values.map(v => v.toString());
        visible = visible || false;

        switch(dice) {
            case "2": return (
                <div className={ 'two-card' + (visible ? ' card-color-2' : '') }>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[0] }/>
                    </div>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[1] }/>
                    </div>
                </div>
            );
            case "3": return (
                <div className={ 'three-card' + (visible ? ' card-color-3' : '') }>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[0] }/>
                    </div>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[1] }/>
                    </div>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[2] }/>
                    </div>
                </div>
            );
            case "4": return (
                <div className={ 'four-card' + (visible ? ' card-color-4' : '') }>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[0] }/>
                        <Dice diceSize="small" dotCount={ values[2] }/>
                    </div>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[1] }/>
                        <Dice diceSize="small" dotCount={ values[3] }/>
                    </div>
                </div>
            );
            case "6": return (
                <div className={ 'six-card' + (visible ? ' card-color-6' : '') }>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[0] }/>
                        <Dice diceSize="small" dotCount={ values[1] }/>
                        <Dice diceSize="small" dotCount={ values[2] }/>
                    </div>
                    <div className="card-column">
                        <Dice diceSize="small" dotCount={ values[3] }/>
                        <Dice diceSize="small" dotCount={ values[4] }/>
                        <Dice diceSize="small" dotCount={ values[5] }/>
                    </div>
                </div>
            )
            default: return <div></div>;
        }
    }

    render() {
        var cardRender = this.renderCard(this.props.diceCount, this.props.diceData, this.props.backgroundVisible);

        if(this.props.allowDrop) {
            return React.cloneElement(cardRender, {
                id: this.props.id,
                onDrop: Drag.GetInstance().onDrop,
                onDragOver: Drag.GetInstance().onDragOver
            })
        }

        return cardRender;
    }
}

export default Card;
