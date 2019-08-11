import { gql } from 'apollo-server-express';
import crime from '../models/crime';


const crimeInstance = new crime();
// root 쿼리가 필요하다.
// mutation: 자료를 변형시킨다.
export const typeDefs = gql`
    type Crime {
        id: Int!
        type: Int!
        regionName: String!
    }

    type Query {
        crime: [Crime]
    }
`;

export const resolvers = {
    Query: {
        async crime() {
            const result = await crimeInstance.fetchList();
            return result;
        }
    }
};
