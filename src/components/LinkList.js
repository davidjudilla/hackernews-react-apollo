import React, { Component } from 'react'
import Link from './Link'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          createdAt
          description
          url
        }
      }
    }
`

class LinkList extends Component {
  render() {
    const linksToRender = [
      {
        id: '1',
        description: 'Prisma turns your database into a GraphQL API 😎 😎',
        url: 'https://www.prismagraphql.com',
      },
      {
        id: '2',
        description: 'The best GraphQL client',
        url: 'https://www.apollographql.com/docs/react/',
      },
    ]

    return (
        <Query query={FEED_QUERY}>
          {({loading, error, data}) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error...</div>

            const links = data && data.feed && data.feed.links;

            return (
                <div>{links.map(link => <Link key={link.id} link={link} />)}</div>
            )
          }}
        </Query>
    )
  }
}

export default LinkList