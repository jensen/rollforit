var Game = React.createClass({
    render: function() {
        return (
            <div className="game">
                <Header />
                <GameBoard />
                <Panel url='/player' />
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
