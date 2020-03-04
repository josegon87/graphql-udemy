import { importSchema } from "graphql-import";

async function schema() {
    const typeDefs = await importSchema('./data/schema.graphql'); //esto ahora regresa una promesa y se tiene que hacer await

    return typeDefs
}
module.exports = schema();