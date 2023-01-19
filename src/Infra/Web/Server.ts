import { createSchema, createYoga } from 'graphql-yoga'
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import express from 'express';
import resolvers from './resolvers';

const PORT = 49000;
const yoga = createYoga({
    graphqlEndpoint: '/',
    schema:createSchema({
        typeDefs: readFileSync(
            join(__dirname, 'schema.graphql'),
            'utf8'
        ),
        resolvers
    })
})

const app = express()

app.use('/', yoga)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

