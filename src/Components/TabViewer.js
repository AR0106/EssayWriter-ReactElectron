import './Styles/TabViewer.css';
import React from 'react';
import GenView from '../Views/EssayGen.js';
import AnalView from '../Views/AnalysisGen';
import RevView from '../Views/ReviewView';

export default class TabViewer extends React.Component {
    // Renders Selected Tab
    render() {
        switch (this.props.view) {
            case 'gen':
                return (<GenView/>);

            case 'anal':
                return (<AnalView />);

            case 'rev':
                return (<RevView />);
        
            default:
                return (<RevView/>);
        }
    }
}