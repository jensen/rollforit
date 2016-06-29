import React from 'react';
import ReactDOM from 'react-dom';
import Ready from 'doc-ready';

import Rack from './components/game/rack';

import GameConstants from './flux/constants/GameConstants';
import GameStore from './flux/stores/GameStore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.store = new GameStore();
        this.state = this.retrieveState();
    }

    componentDidMount() {
        this.store.addChangeListener(this.onChange.bind(this));
    }

    componentWillUnmount() {
        this.store.removeChangeListener(this.onChange.bind(this));
    }

    onChange() {
        this.setState(this.retrieveState());
    }

    retrieveState() {
        return {
            allCards: this.store.getCards(),
            playerDice: this.store.getDice(),
            playerCards: this.store.getPlayerCards()
        };
    }

    render() {
        return (
            <div className="grid"></div>
        );
    }
}

Ready(function() {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
