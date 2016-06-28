import React from 'react';

class Dice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className="dice">{ this.props.dots }</span>
        );
    }
}

export default Dice;
