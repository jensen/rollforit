var DiceTray = React.createClass({
    getInitialState: function() {
        return { dice: [0, 0, 0, 0, 0, 0] };
    },
    componentDidMount: function() {
        this.getDiceForPlayer();
    },
    componentWillUnmount: function() {
        console.log('Unmount DiceTray');
    },
    getDiceForPlayer: function() {
        $.get(this.props.url, function(data) {
            this.setState({ dice: data });
        }.bind(this));
    },
    render: function() {
        var diceState = this.state.dice.map(function(value, index) {
            return <div className="dice-wrapper" key={ index } style={{ backgroundColor: this.props.emptyDiceColor }} >
                        <DraggableDice data={ value } />
                   </div>
        }.bind(this));

        return (
            <div className="dice-tray">
                { diceState }
            </div>
        );
    }
});
