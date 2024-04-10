<script lang="ts">
	import SearchIcon from '$lib/icons/searchIcon.svelte';
	import StarIcon from '$lib/icons/starIcon.svelte';

	import type { MovieDiscoverResult } from '../../types';
	import { accountData } from '../routes/store';
	import { onMount } from 'svelte';

	let favourite: boolean | null = null;
	let watchList: boolean | null = null;
	export let movie: MovieDiscoverResult;

	onMount(() => {
		getFavourites();
		getWatclist();
	});

	const addTo = async (type: boolean) => {
		const session = localStorage.getItem('session_id');
		const request = await fetch('http://localhost:3000/addTo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sessionID: session, movieID: movie.id, watchList: type })
		});
		const { result } = await request.json();

		type ? (watchList = result) : (favourite = result);
	};

	const getFavourites = async () => {
		const sessionID = localStorage.getItem('session_id');
		const request = await fetch('http://localhost:3000/containsFavourite', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sessionID: sessionID, movieID: movie.id, accountID: $accountData?.id || 1 })
		});
		const { result } = await request.json();
		favourite = result;
	};

	const getWatclist = async () => {
		const sessionID = localStorage.getItem('session_id');
		const request = await fetch('http://localhost:3000/containsWatchlist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sessionID: sessionID, movieID: movie.id, accountID: $accountData?.id || 1 })
		});
		const { result } = await request.json();
		watchList = result;
	};
</script>

<div style={`filter: ${favourite == null ? 'blur(4px)' : 'blur(0px)'}`} class="flex w-full py-2 justify-around text-white">
	<button on:click={() => addTo(true)} class="items-center justify-between rounded-full space-x-2 flex transition-all duration-100 hover:scale-105"
		><SearchIcon />
		<p>{watchList ? 'Remove from watchlist' : 'Add to watchlist'}</p>
	</button>
	<button on:click={() => addTo(false)} class="items-cente rjustify-between space-x-2 transition-all duration-100 hover:scale-105 flex text-sm">
		<StarIcon />
		<p>{favourite ? 'Remove from Favourites' : 'Add to Favourites'}</p>
	</button>
</div>
