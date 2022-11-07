import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');

	const { query, method, body } = req;

	if (method === 'GET') {
		const allProducts = await products
			.find({ author: { email: query.email } })
			.toArray();
		res.json({ status: 200, data: allProducts });
	} else if (method === 'DELETE') {
		const deleteProduct = await products.deleteOne({
			_id: ObjectId(query.email)
		});
		res.json({ status: 200, data: deleteProduct });
	}

	// res.json({ status: 200, data: req.query.email });
}
