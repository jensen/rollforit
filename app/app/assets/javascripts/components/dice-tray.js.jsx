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
    dragDiceStart: function(event) {

    },
    dragDiceEnd: function(event) {

    },
    render: function() {
        var diceState = this.state.dice.map(function(value, index) {
            var draggable = value != 0 ? "true" : "false";
            return <div className="dice-draggable"
                        onDragStart={ this.dragDiceStart }
                        onDragEnd={ this.dragDiceEnd }
                        key={ index }
                        draggable={ draggable }>
                        <Dice data={ value } />
                    </div>
        }.bind(this));

        return (
            <div className="dice-tray">
                { diceState }
            </div>
        );
    }
});
