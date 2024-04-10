<script lang="ts">
	import { onMount } from 'svelte';
	import type { FavouriteResult, User } from '../../../types';
	let favourites: FavouriteResult | null = null;
	let watchList: FavouriteResult | null = null;
	let account: User | null = null;
	let ratedMovies: any = null;
	let link = '';
	onMount(() => {
		getData();
	});

	const getData = async () => {
		const sessionID = localStorage.getItem('session_id');
		const userID = localStorage.getItem('userID');
		const [fav, watch, acc, rate] = await Promise.all([
			fetch('http://localhost:3000/getFavourites', { method: 'POST', body: JSON.stringify({ sessionID, userID }), headers: { 'content-type': 'application/json' } }).then((e) => e.json()),
			fetch('http://localhost:3000/getFavourites', { method: 'POST', body: JSON.stringify({ sessionID, userID }), headers: { 'content-type': 'application/json' } }).then((e) => e.json()),
			fetch('http://localhost:3000/getAccount', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionID, userID }) }).then((e) => e.json()),
			fetch('http://localhost:3000/getRatedMovies', { method: 'POST', body: JSON.stringify({ sessionID, userID }), headers: { 'content-type': 'application/json' } }).then((e) => e.json())
		]);
		favourites = fav;
		watchList = watch;
		account = acc;
		console.log(rate);
		if (account?.avatar.tmdb.avatar_path) {
			link = 'https://image.tmdb.org/t/p/original/' + account.avatar.tmdb.avatar_path;
		} else {
			link = '/defaultUser.svg';
		}
	};
</script>

<div>
	<div class="h-96 overflow-hidden relative w-full">
		{#if account}
			<div class="w-full h-full flex items-center justify-center">
				<img src={link} alt="" class="object-contain h-1/2 my-auto" />
				{#if account.name}
					<p>Name:{account.name}</p>
				{/if}
				<p>Username: {account.username}</p>
			</div>
		{/if}
		<div class="dotBackground" />
	</div>
</div>
