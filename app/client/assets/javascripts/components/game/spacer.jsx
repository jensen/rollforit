import React from 'react';

import GameActions from '../../flux/actions/GameActions';

class Spacer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ 'grid-col-' + this.props.gridColumns }>&nbsp;</div>
        );
    }
}

export default Spacer;
