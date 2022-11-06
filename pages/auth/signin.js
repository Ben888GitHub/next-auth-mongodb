import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignIn() {
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });
	const router = useRouter();

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
		if (res.message === 'Registered successfully') {
			const login = await signIn('credentials', {
				email: userInfo.email,
				password: userInfo.password,
				redirect: false
			});
			router.push('/products');
		} else {
			console.log(res?.error);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false
		});
		console.log(res);
		if (res?.error) {
			console.log(res.error);
		} else if (res.status === 200) {
			router.push('/products');
		}
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
			<button onClick={handleLogin}>Sign in</button>
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
