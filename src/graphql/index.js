import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import config from './config';
// TODO: Pass the token as enviroment variable
const token = config.token;

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
    "User-Agent": "Wael-Zoaiter"
  }
});

export const GET_TREND_REPOS = gql`
query trendRepos($query: String!, $first: Int, $type: SearchType!, $after: String) {
  search(query: $query, type: $type, first: $first, after: $after) {
   repositoryCount
   pageInfo {
    endCursor
    startCursor
    hasNextPage
   }
   edges {
    cursor
    node {
     ... on Repository {
      id
      name
      createdAt 
      description
      owner {
       login
       id
       url
      }
     }
    }
   }
  }
 }
`;

export const GET_DETAILED_REPO = gql`
  query detaildRepo($name: String!, $owner: String!, $moreDetail: Boolean = false) {
    repository(owner: $owner, name: $name) {
      id
      name
      createdAt 
      description 
      isArchived
      isPrivate
      url
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      owner {
        login
        id
        url
      }
      licenseInfo @include(if: $moreDetail) {
        key
      }
      defaultBranchRef @include(if: $moreDetail) {
        target {
        ... on Commit {
          history(first:10) {
            totalCount
            edges {
              node {
                ... on Commit {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
}
`;