import React from "react";
import './Styles/TabViewer.css'

export default class TabButton extends React.Component {
    constructor(props) {
        super(props);
        this.activeImg = props.activeImg;
        this.inactiveImg = props.inactiveImg;
        this.imgAlt = props.imgAlt;
        this.active = props.active;
        this.onClick = props.onClick.bind(this);
    }

    render() {
        let curSrc = this.inactiveImg;
        let classes = 'tabBtn';

        if (this.active) {
            classes += ' active';
            curSrc = this.activeImg;
        }

        return(
            <button id='genView' className={classes} onClick={this.onClick}>
                <img className='btnImg' alt={this.imgAlt} src={curSrc}/>
            </button>
        );
    }
}