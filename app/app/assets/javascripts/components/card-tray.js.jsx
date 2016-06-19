var CardTray = React.createClass({
    getInitialState: function() {
        return { cards: [[], [], [], []] };
    },
    componentDidMount: function() {
        this.getCardsForGameBoard();
    },
    getCardsForGameBoard: function() {
        $.get(this.props.url, function(data) {
            this.setState({ cards: data });
        }.bind(this));
    },
    render: function() {
        var cardState = this.state.cards.map(function(value, index) {
            return ( <div className="card-wrapper" key={ index }><Card data={ value } /></div> );
        }.bind(this));

        return (
            <div className="card-tray">
                { cardState }
            </div>
        );
    }
});
