import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');

	const { body } = req;

	console.log(body);

	const registeredUser = await db
		.collection('users')
		.findOne({ email: body.email });

	if (registeredUser) {
		res.status(200).json({ message: 'User already registered' });
		return;
	}

	// generate salt to hash password
	const salt = await bcrypt.genSalt(10);
	// now we set user password to hashed password
	const hashpass = await bcrypt.hash(body.password, salt);

	const bodyObject = { email: body.email, password: hashpass };
	console.log(bodyObject);
	const newUser = await db.collection('users').insertOne(bodyObject);
	// res.status(200).json({ name: 'John Doe' })
	res.json({
		status: 200,
		message: 'Registered successfully',
		newUser: newUser
	});
}
