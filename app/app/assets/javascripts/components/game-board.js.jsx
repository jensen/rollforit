var GameBoard = React.createClass({
    render: function() {
        return (
            <div className="game-board">
                <CardTray url='/cards' />
            </div>
        );
    }
});
