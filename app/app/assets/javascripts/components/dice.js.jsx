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
                <div className="one-dice">
                    <span className="dot"></span>
                </div>
            );
        }
    }),
    React.createClass({
        displayName: 'TwoDice',
        render: function() {
            return (
                <div className="two-dice" draggable="true">
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
                <div className="three-dice">
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
                <div className="four-dice">
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
                <div className="five-dice">
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
                <div className="six-dice">
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

var Dice = React.createClass({
    render: function() {
        var diceValue = this.props.data;
        return React.createElement(AllDice[diceValue]);
    }
});
