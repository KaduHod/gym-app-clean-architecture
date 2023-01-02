import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import resolvers from '../Resolvers/index'

const typeDefs = `
    type User {
        name: String
        nickname: String
        email : String
        password : String
        cellphone: String
    }

    type Personal {
        user : User
    }

    type Aluno {
        user : User
    }

    type Query {
        users: [User]
        
    }
`


const server = new ApolloServer({
    typeDefs,
    resolvers
})


const init = (async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at: ${url}`);
})()

