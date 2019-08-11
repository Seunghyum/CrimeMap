import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs as crime, resolvers as crimeResolvers, } from './crime';
import { merge } from 'lodash';

export const schema = makeExecutableSchema({
    typeDefs: [ crime ],
    resolvers: merge(crimeResolvers)
});
