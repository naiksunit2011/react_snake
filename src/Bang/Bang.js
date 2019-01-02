import React, { Component } from 'react';
import './Bang.css';

class Bang extends Component {

    render() {
        return (
            <div className={'fireWork ' + this.props.showFireWork}>
                <div className="before"></div>
                <div className="after"></div>
            </div>
        );
    }
}
export default Bang;