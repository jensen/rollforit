var AllDice = [
    React.createClass({
        displayName: 'BlankDice',
        render: function() {
            return ( <div className="blank-dice"></div> );
        }
    }),
    React.createClass({
        displayName: 'OneDice',
        render: function() {
            return (
                <div className="one-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <span className="dot"></span>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'TwoDice',
        render: function() {
            return (
                <div className="two-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'ThreeDice',
        render: function() {
            return (
                <div className="three-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'FourDice',
        render: function() {
            return (
                <div className="four-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'FiveDice',
        render: function() {
            return (
                <div className="five-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="dice-column">
                        <span className="dot"></span>
                    </div>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'SixDice',
        render: function() {
            return (
                <div className="six-dice"
                     draggable={ this.props.draggable }
                     onDragStart={ this.props.ondragstart }
                     onDragEnd={ this.props.ondragend }>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                    <div className="dice-column">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            );
        }
    })
];

var DraggableDice = React.createClass({
    dragDiceStart: function(event) {
    },
    dragDiceEnd: function(event) {
    },
    render: function() {
        var diceValue = this.props.data;
        var draggableProperties = { draggable: true, ondragstart: this.dragDiceStart, ondragend: this.dragDiceEnd };
        return React.createElement(AllDice[diceValue], Object.assign({}, this.props, draggableProperties));
    }
});

var Dice = React.createClass({
    render: function() {
        var diceValue = this.props.data;
        return React.createElement(AllDice[diceValue]);
    }
});
