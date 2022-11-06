import { getSession, signIn, signOut } from 'next-auth/react';

function SignIn() {
	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/products' });
	};

	return (
		<div
			style={{
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<h1>Sign in</h1>
			<br />
			<input type="email" placeholder="email" />
			<br />
			<br />
			<input type="password" placeholder="password" />
			<br />
			<br />
			<button>Sign in</button>
			<br />
			<br />
			<button>Sign up</button>
			<br />
			<br />
			<button onClick={handleGoogleSignIn}>Google Sign In</button>
		</div>
	);
}

export default SignIn;

export async function getServerSideProps(context) {
	// const csrfToken = await getCsrfToken(context);
	const { req } = context;
	const session = await getSession({ req });

	// Protected Page
	if (session) {
		return {
			redirect: { destination: '/products' }
		};
	}

	return {
		props: { title: 'hello' }
	};
}
