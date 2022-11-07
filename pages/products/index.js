import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Products({ allProducts }) {
	const { data: session } = useSession();
	const router = useRouter();
	const [products, setProducts] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// fetchProducts();
		setProducts(allProducts?.data);
	}, []);

	// console.log(session);

	const handleAddPost = async (e) => {
		setLoading(true);
		const newProduct = await fetch(
			'https://next-auth-mongodb-usages.vercel.app/api/products',
			{
				method: 'POST',
				body: JSON.stringify({
					title: title,
					content: content,
					author: {
						email: session?.user?.email
					}
				})
			}
		);
		newProduct = await newProduct.json();
		console.log(newProduct);

		setProducts([
			...products,
			{
				title,
				content
			}
		]);
		setTitle('');
		setContent('');
		setLoading(false);
	};

	const handleDeleteProduct = async (id) => {
		setLoading(true);

		const deleteProduct = await fetch(
			`https://next-auth-mongodb-usages.vercel.app/api/products/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		deleteProduct = await deleteProduct.json();
		console.log(deleteProduct);

		const removeProduct = products.filter((product) => id !== product._id);
		setProducts(removeProduct);

		setLoading(false);
	};

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
					<br />
					<br />
					<br />
					<div>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							type="text"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<button disabled={loading} onClick={handleAddPost}>
							Add
						</button>
					</div>
					<br />
					{products?.map((product, idx) => (
						<div key={idx}>
							<h3>{product.title}</h3>
							<p>{product.content}</p>
							<button onClick={() => handleDeleteProduct(product._id)}>
								Delete {product.title}
							</button>
						</div>
					))}
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

	if (!session) {
		return {
			redirect: { destination: '/auth/signin' }
		};
	}

	const res = await fetch(
		`https://next-auth-mongodb-usages.vercel.app/api/products/${session?.user?.email}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const allProducts = await res.json();

	return {
		props: { allProducts }
	};
};
