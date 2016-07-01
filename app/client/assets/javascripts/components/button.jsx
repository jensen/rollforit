import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="#"
                className={ this.props.className }
                onClick={ this.props.onClick }>
                { this.props.children }
            </a>
        );
    }
}

export default Button;
