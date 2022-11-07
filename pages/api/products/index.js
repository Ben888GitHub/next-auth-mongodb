import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');
	const { body } = req;

	let bodyObject = JSON.parse(body);
	// console.log(bodyObject);

	const newProduct = await products.insertOne(bodyObject);
	res.json({ status: 200, data: newProduct });
}
