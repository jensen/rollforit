var Game = React.createClass({
    render: function() {
        return (
            <div className="game">
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
