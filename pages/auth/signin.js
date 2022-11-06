import { getSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

function SignIn() {
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });

	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/products' });
	};

	const handleSignUp = async () => {
		console.log(userInfo);
		const res = await fetch('/api/create-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInfo)
		});
		res = await res.json();
		console.log(res);
		setUserInfo({ email: '', password: '' });
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
			<input
				type="email"
				placeholder="email"
				value={userInfo.email}
				onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
			/>
			<br />
			<br />
			<input
				type="password"
				placeholder="password"
				value={userInfo.password}
				onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
			/>
			<br />
			<br />
			<button>Sign in</button>
			<br />
			<br />
			<button onClick={handleSignUp}>Sign up</button>
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
