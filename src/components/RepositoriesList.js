import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, CardText, CardFooter, Error, Loading, Pagination } from './ui';
import { GET_TREND_REPOS } from '../graphql';

const REPOS_PER_PAGE = 10;

class RepositoriesList extends Component {

    _nextPage = data => {
        // Current page
        const page = parseInt(this.props.match.params.page, 10);
        // Total pages number
        const pagesNumber = data.search.repositoryCount / REPOS_PER_PAGE;
        // Next page handler
        if (page <= pagesNumber) {
            const nextPage = page + 1;
            this.props.history.push({
                pathname: `/page/${nextPage}`,
                state: {
                    pageInfo: data.search.pageInfo,
                    mode: 'next'
                }
            });
        }
    }

    _previousPage = data => {
        // Current page
        const page = parseInt(this.props.match.params.page, 10);
        // Previous page handler
        if (page > 1) {
            this.props.history.goBack();
        }
    }

    _getQueryVariables = () => {
        const isNewPage = this.props.location.pathname.includes('page');
        // Get the page info
        const pageInfo = this.props.location.state ? this.props.location.state.pageInfo : {};
        // Push mode: Previous or Next
        const mode = this.props.location.state ? this.props.location.state.mode : '';
        
        // Query variables        
        const after = pageInfo.endCursor || null;
        const before = pageInfo.endCursor || null;
        const query = 'stars:>10000';
        const type = 'REPOSITORY';
        const first = isNewPage ? REPOS_PER_PAGE : 100;
        const variables = { query, first, type };
        if (after && mode === 'next') variables.after = after;
        if (before && mode === 'prev') variables.before = before;
        return variables;
    }

    render() {
        return (
            <div className="bg-dark">
                <Query
                    query={GET_TREND_REPOS}
                    variables={this._getQueryVariables()}
                >
                    {
                        ({ loading, error, data }) => {
                            // Fetching data handler
                            if (loading) return <Loading />
                            // Error Handler
                            if (error) return <Error />
                            // Success Handler
                            return (
                                <div className="content">
                                    <ReposListViewer data={data} />
                                    <Pagination 
                                        nextHandler={() => this._nextPage(data)} 
                                        prevHandler={() => this._previousPage()} 
                                    />
                                </div>
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

const ReposListViewer = props => {
    return (
        <div className="container">
            <div className="row">
                {
                    props.data.search.edges.map(repo => {
                        repo = repo.node;
                        const ownerName = repo.owner ? repo.owner.login : '';
                        return (
                            <div key={repo.id} className="col-12">
                                <Link to={`/${ownerName}/${repo.name}`}>
                                    <Card>
                                        <CardHeader>{ownerName}</CardHeader>
                                        <CardBody>
                                            <CardTitle>{repo.name}</CardTitle>
                                            <CardText>{repo.description}</CardText>
                                        </CardBody>
                                        <CardFooter>{new Date(repo.createdAt).toString()}</CardFooter>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RepositoriesList;