import React from 'react';
import ReactDOM from 'react-dom';
import Ready from 'doc-ready';

import PlayerLocal from './components/game/playerlocal';
import Spacer from './components/game/spacer';
import CardTray from './components/game/cardtray';
import PlayerInfo from './components/game/playerinfo';

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
        let players = [0, 1, 2, 3, 4, 5].map(function(value) {
            return <PlayerInfo key={value} playerId={value} playerName="Karl" playerScore="0"/>
        });

        return (
            <div className="grid">
                <PlayerLocal/>
                <Spacer gridColumns="2"/>
                <CardTray/>
                <Spacer gridColumns="1"/>
                { players }
            </div>
        );
    }
}

Ready(function() {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
