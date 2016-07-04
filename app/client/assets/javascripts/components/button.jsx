import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(event) {
        event.preventDefault()
        this.props.onClick();
    }

    render() {
        return (
            <a href="#"
                className={ this.props.className }
                onClick={ this.onClick.bind(this) }>
                { this.props.children }
            </a>
        );
    }
}

export default Button;
