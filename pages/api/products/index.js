import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');
	const { body, method } = req;

	if (method === 'GET') {
		console.log(body);
		const allProducts = await products
			.find({ author: { email: 'alanturing@gmail.com' } })
			.toArray();
		res.json({ status: 200, data: allProducts });
	} else if (method === 'POST') {
		let bodyObject = JSON.parse(body);
		// console.log(bodyObject);

		const newProduct = await products.insertOne(bodyObject);
		res.json({ status: 200, data: newProduct });
	}
}
