import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Products() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div
			style={{
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<h1>Products</h1>
		</div>
	);
}

export default Products;

export const getServerSideProps = async (context) => {
	const { req } = context;
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: { destination: '/auth/signin' }
		};
	}

	return {
		props: { title: 'hello' }
	};
};
