import React from 'react'
import './style.scss';

export const Card = props => {
    let classname = props.className || '';
    return (
        <div className={`card ${classname}`}>
            {props.children}
        </div>
    )
}

export const CardHeader = props => {
    let classname = props.className || '';
    return (
        <div className={`card-header ${classname}`}>
            {props.children}
        </div>
    )
}

export const CardTitle = props => {
    const classname = props.className || '';
    const Tag = props.tag || 'h4';
    return (
        <Tag className={`card-title ${classname}`}>
            {props.children}
        </Tag>
    )
}

export const CardText = props => {
    const classname = props.className || '';
    return (
        <p className={`card-text ${classname}`}>
            {props.children}
        </p>
    )
}

export const CardBody = props => {
    let classname = props.className || '';
    return (
        <div className={`card-body ${classname}`}>
            {props.children}
        </div>
    )
}

export const CardFooter = props => {
    let classname = props.className || '';
    return (
        <div className={`card-footer ${classname}`}>
            {props.children}
        </div>
    )
}