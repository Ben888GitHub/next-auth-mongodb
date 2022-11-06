import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
	pages: {
		signIn: '/auth/signin'
	},
	database: process.env.MONGODB_URI
});
