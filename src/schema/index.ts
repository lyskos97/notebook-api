import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
// @ts-ignore
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, 'typeDefs')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, 'resolvers')));

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
