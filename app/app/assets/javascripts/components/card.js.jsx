/* Key is equal to the number of dice on the card for easier lookup. */
var CardType = {
    0: React.createClass({
        displayName: 'BlankCard',
        render: function() {
            return (
                <div className="blank-card"></div>
            );
        }
    }),
    2: React.createClass({
        displayName: 'TwoCard',
        render: function() {
            return (
                <div className="two-point two-card">
                    { React.createElement(AllDice[this.props.dice[0]]) }
                    { React.createElement(AllDice[this.props.dice[1]]) }
                </div>
            );
        }
    }),
    3: React.createClass({
        displayName: 'ThreeCard',
        render: function() {
            return (
                <div className="five-point three-card">
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[0]]) }
                    </div>
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[1]]) }
                    </div>
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[2]]) }
                    </div>
                </div>
            );
        }
    }),
    4: React.createClass({
        displayName: 'FourCard',
        render: function() {
            return (
                <div className="ten-point four-card">
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[0]]) }
                        { React.createElement(AllDice[this.props.dice[1]]) }
                    </div>
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[2]]) }
                        { React.createElement(AllDice[this.props.dice[3]]) }
                    </div>
                </div>
            );
        }
    }),
    6: React.createClass({
        displayName: 'SixCard',
        render: function() {
            return (
                <div className="fifteen-point six-card">
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[0]]) }
                        { React.createElement(AllDice[this.props.dice[1]]) }
                        { React.createElement(AllDice[this.props.dice[2]]) }
                    </div>
                    <div className="card-column">
                        { React.createElement(AllDice[this.props.dice[3]]) }
                        { React.createElement(AllDice[this.props.dice[4]]) }
                        { React.createElement(AllDice[this.props.dice[5]]) }
                    </div>
                </div>
            );
        }
    })
}

var Card = React.createClass({
    render: function() {
        var cardType = this.props.data.length;
        var diceValue = this.props.data;

        return React.createElement(CardType[cardType], { dice: diceValue });
    }
});
