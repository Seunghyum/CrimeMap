import { Router } from 'express';

export default () => {
	let api = Router();
	api.use('/');


	// , GraphqlHttp({
	// 	schema,
	// 	rootValue: root,
	// 	graphiql: true
	// })

	return api;
}
