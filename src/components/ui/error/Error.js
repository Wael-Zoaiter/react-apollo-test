import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, CardText } from '../../ui';

import './style.scss';

export const Error = props => {
    const status = props.status || '';
    const message = props.message || 'Something went wrong';

    return (
        <Card className="error-viewer">
            <CardHeader>
                <CardTitle className="text-danger">Error {status}</CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>{message}</CardText>
                <Link to="/" className="btn btn-info">Go to home page</Link>
            </CardBody>
        </Card>
    )
}