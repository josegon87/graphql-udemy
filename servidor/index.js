import express from 'express';
//graphql
import { ApolloServer } from "apollo-server-express";
import { resolvers } from './data/resolvers';

import { importSchema } from "graphql-import";

async function schema() {
    const typeDefs = await importSchema('./data/schema.graphql'); //esto ahora regresa una promesa y se tiene que hacer await

    return typeDefs
}
schema().then(typeDefs => {

    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => console.log(`El servidor esta corriendo ${server.graphqlPath}`));
})

