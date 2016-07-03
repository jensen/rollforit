import React from 'react';
import ReactDOM from 'react-dom';
import Ready from 'doc-ready';

import PlayerCurrent from './components/game/playercurrent';
import Spacer from './components/game/spacer';
import CardTray from './components/game/cardtray';
import PlayerInfo from './components/game/playerinfo';

import GameConstants from './flux/constants/GameConstants';
import GameStore from './flux/stores/GameStore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.store = new GameStore();
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
            localPlayer: this.store.getLocalPlayer(),
            currentPlayer: this.store.getCurrentPlayer(),
            clientValidation: this.store.getClientValidation()
        };
    }

    render() {
        if(this.state == null) {
            return (<div className="loader"></div>);
        }

        let players = this.state.allPlayers.map(function(value, index) {
            let slot = value.slot;
            let name = value.name;
            let score = value.score;
            let dice = value.dice.assigned;
            let current = value.is_current;

            return (
                <PlayerInfo
                    key={ index }
                    playerCurrent={ current }
                    playerSlot={ slot }
                    playerName={ name }
                    playerScore={ score }
                    playerDice={ dice }/>
            );
        });

        return (
            <div className="grid">
                <PlayerCurrent
                    currentPlayer={ this.state.currentPlayer }
                    availableActions={ this.state.clientValidation.actions }/>
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
