import React from 'react';
import { Query } from 'react-apollo';
import { Card, CardBody, CardHeader, CardTitle, CardText, CardFooter, Error, Loading } from './ui';
import { GET_DETAILED_REPO } from '../graphql';

const RepositoryDetail = ({ match: { params: { owner, name } } }) => {
    return (
        <div className="bg-dark single-card">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Query
                            query={GET_DETAILED_REPO}
                            variables={{
                                name,
                                owner
                            }}
                        >
                            {
                                ({ loading, error, data }) => {
                                    if (loading) return <Loading />
                                    if (error) return <Error />
                                    if (!data) return <Error message="There is no available data found" />
                                    console.log(data);
                                    const repo = data.repository || {};
                                    const owner = repo.owner ? repo.owner : {};
                                    const stars = repo.stargazers && repo.stargazers.totalCount;
                                    const forks = repo.forks && repo.forks.totalCount;

                                    return (
                                        <Card key={repo.id}>
                                            <CardHeader>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <a href={owner.url}>{owner.login} </a>
                                                        <small className="text-muted">{repo.isPrivate ? 'Private' : 'Public'}</small>
                                                    </div>
                                                    <div className="col-4">stars: {stars}</div>
                                                    <div className="col-4">forks: {forks}</div>
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <CardTitle>
                                                    {repo.name}
                                                </CardTitle>
                                                <CardText>{repo.description}</CardText>
                                                <div className="row">
                                                    <div className="col-4">

                                                    </div>
                                                    {repo.isArchived && <div className="col-4">
                                                        Archived
                                                    </div>}
                                                </div>
                                            </CardBody>
                                            <CardFooter>
                                                <div className="row">
                                                    <div className="col-8">
                                                        {Date(repo.createdAt).toString()}
                                                    </div>
                                                    <div className="col-4">
                                                        <a href={repo.url} className="btn btn-primary">Github</a>
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    )
                                }
                            }
                        </Query>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RepositoryDetail;