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
            allPlayers: this.store.getPlayers(),
            currentPlayer: this.store.getCurrentPlayer()
        };
    }

    render() {
        let players = this.state.allPlayers.map(function(value, index) {
            let id = value.id;
            let name = value.name;
            let score = value.score;
            let dice = value.dice.assigned;

            return <PlayerInfo key={ index } playerId={ id } playerName={ name } playerScore={ score } playerDice={ dice }/>
        });

        return (
            <div className="grid">
                <PlayerLocal data={ this.state.currentPlayer }/>
                <Spacer gridColumns="2"/>
                <CardTray allCards={ this.state.allCards }/>
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
