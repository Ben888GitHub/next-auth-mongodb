import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Products() {
	const { data: session } = useSession();
	const router = useRouter();

	console.log(session);

	return (
		<div
			style={{
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{session ? (
				<>
					<h1>Hi, {session?.user?.email || session?.user?.name}</h1>
					<h2>Your Products:...</h2>
					<br />
					<button onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default Products;

export const getServerSideProps = async (context) => {
	const { req } = context;
	const session = await getSession({ req });

	console.log(session);

	if (!session) {
		return {
			redirect: { destination: '/auth/signin' }
		};
	}

	return {
		props: { title: 'hello' }
	};
};
