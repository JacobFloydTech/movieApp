<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '../../../types';
	import { accountData, serverAddress } from '../../routes/store';
	let data: User | null = null;
	const link = $accountData?.avatar.tmdb.avatar_path ? 'https://image.tmdb.org/t/p/original/' + $accountData.avatar.tmdb.avatar_path : '/defaultUser.svg';
	const generateRequestToken = async () => {
		const req = await fetch(`${$serverAddress}/createRequestToken`);
		const { token } = await req.json();
		window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173`;
	};
	onMount(() => {
		session();
		setToken();
	});
	const setToken = () => {
		let params = new URL(document.location.href).searchParams;
		const token = params.get('request_token');
		if (token) {
			localStorage.setItem('request_token', token || '');
			session();
		}
	};
	const session = async () => {
		const session = localStorage.getItem('session_id');
		const token = localStorage.getItem('request_token');
		if (session && token) {
			getAccount(session);
		} else {
			generateNewSession(token + '');
		}
	};
	const generateNewSession = async (token: string) => {
		const requestSesionID = await fetch(`${$serverAddress}/createSessionID`, { method: 'POST', body: JSON.stringify({ token: token }), headers: { 'Content-Type': 'application/json' } });
		const response = await requestSesionID.json();
		console.log(response);
		if (response.success) {
			localStorage.setItem('session_id', response.session_id || '');
			getAccount(response.session_id);
		}
	};
	const getAccount = async (id: string) => {
		const accountRequest = await fetch(`${$serverAddress}/getAccount`, {
			method: 'POST',
			body: JSON.stringify({ sessionID: id }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { account } = await accountRequest.json();
		data = account;
		localStorage.setItem('userID', account.id);
		accountData.set(account);
	};
	const signOut = () => {
		localStorage.removeItem('session_id');
		localStorage.removeItem('request_token');
		location.reload();
	};
</script>

<div id="userComponent" class="absolute bg-[rgba(0,0,0,0.2)] rounded-full flex top-4 right-4 text-white text-2xl px-4 py-2">
	{#if data}
		<div class="flex z-50 items-center">
			<a href={`/myaccount`} class="text-base">{!data.name ? data.username : data.name}</a>
			<img alt="" class="w-8" src={link} />
		</div>
	{/if}
	<button class="border-2 mx-2 rounded-full px-4 py-2" on:click={() => (data?.id ? signOut() : generateRequestToken())}>{data?.id ? 'Sign out' : 'Log in'}</button>
</div>
