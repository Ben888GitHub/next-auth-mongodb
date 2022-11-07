import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');

	const { query } = req;

	const allProducts = await products
		.find({ author: { email: query.email } })
		.toArray();
	res.json({ status: 200, data: allProducts });
	// res.json({ status: 200, data: req.query.email });
}
