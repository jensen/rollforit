import React from 'react';
import ReactDOM from 'react-dom';
import Ready from 'doc-ready';

import Template from './components/template';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Template/>
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
