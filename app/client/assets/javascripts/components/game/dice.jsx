import React from 'react';

import Drag from '../../utility/drag'

class Dice extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDice(size, dots) {
        dots = dots.toString();

        switch(dots) {
            case "1": return (
                <div className={ 'one-dice dice-' + size }>
                    <span className={ 'dot-' + size }></span>
                </div>
            );
            case "2": return (
                <div className={ 'two-dice dice-' + size }>
                    <span className={ 'dot-' + size }></span>
                    <span className={ 'dot-' + size }></span>
                </div>
            );
            case "3": return (
                <div className={ 'three-dice dice-' + size }>
                    <span className={ 'dot-' + size }></span>
                    <span className={ 'dot-' + size }></span>
                    <span className={ 'dot-' + size }></span>
                </div>
            );
            case "4": return (
                <div className={ 'four-dice dice-' + size }>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                </div>
            );
            case "5": return (
                <div className={ 'five-dice dice-' + size }>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                    </div>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                </div>
            );
            case "6": return (
                <div className={ 'six-dice dice-' + size }>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                    <div className="dice-column">
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                        <span className={ 'dot-' + size }></span>
                    </div>
                </div>
            );
            default: return <div className={ 'no-dice dice-' + size }>&nbsp;</div>;
        }
    }

    render() {
        var diceRender = this.renderDice(this.props.diceSize, this.props.dotCount);
        if(this.props.allowDrag == true) {
            return React.cloneElement(diceRender, {
                id: this.props.id,
                draggable: true,
                onDragStart: Drag.GetInstance().onDragStart,
                onDragEnd: Drag.GetInstance().onDragEnd
            });
        }
        return diceRender;
    }
}

export default Dice;
