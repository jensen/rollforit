var Game = React.createClass({
    render: function() {
        return (
            <div className="game">
                <GameBoard />
                <Panel />
            </div>
        );
    }
});

var ready = function() {
    ReactDOM.render(
        <Game />,
        document.getElementById('app')
    );
};

$(document).ready(ready);
