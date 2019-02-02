import React from 'react';
import './style.scss';

export const Loading = props => {
    const classname = props.className || '';
    return (
        <div className={`loading-viewer ${classname}`}>
            <div className="spinner-border" role="status"></div>
        </div>
    )
}