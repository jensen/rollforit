var Panel = React.createClass({
    getInitialState: function() {
        return { id: 0, slot: 0, name: '' };
    },
    componentDidMount: function() {
        this.getPlayerProfile();
    },
    getPlayerColor: function(slot) {
        var colors = [ '#BDC3C7', '#1ABC9C', '#3498DB', '#9B59B6', '#F1C40F', '#E67E22', '#E74C3C' ];
        return colors[slot];
    },
    getDiceTrayColor: function(slot) {
        var colors = [ '#95A5A6', '#16A085', '#2980B9', '#8E44AD', '#F39C12', '#D35400', '#C0392B' ];
        return colors[slot];
    },
    getPlayerProfile: function() {
        $.get(this.props.url, function(data) {
            this.setState(data);
        }.bind(this));
    },
    render: function() {
        var playerId = this.state.id;
        var playerSlot = this.state.slot;
        var playerName = this.state.name;
        var playerColor = this.getPlayerColor(playerSlot);
        var diceTrayColor = this.getDiceTrayColor(playerSlot);

        return (
            <div className="player-panel" style={{ backgroundColor: playerColor }}>
                <h1>{ this.state.name }</h1>
                <DiceTray url='/dice' emptyDiceColor={ diceTrayColor }/>
            </div>
        );
    }
});
