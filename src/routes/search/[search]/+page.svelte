<script lang="ts">
	import { onMount } from 'svelte';
	import type { MovieDiscover, MovieDiscoverResult } from '../../../../types';
	import MovieComponent from '$lib/movieComponent.svelte';
	import { serverAddress } from '../../store';
	type serverData = {
		searchQuery: MovieDiscover;
		query: string;
	};
	export let data: serverData;
	let page: number = 1;
	let query = data.searchQuery;
	$: {
		try {
			window.scrollTo({
				behavior: 'smooth',
				top: 0
			});

			getData(data.query.replaceAll('-', ' '), page);
			animateInChildren();
		} catch (e) {}
	}

	onMount(async () => {
		animateInChildren();
	});

	const animateInChildren = () => {
		Array.from(document.getElementById('movieCardContainer')?.children ?? []).forEach((el, i) => {
			el.classList.remove('fadeIn');
			setTimeout(() => {
				el.classList.add('fadeIn');
			}, 150 * i);
		});
	};
	const getData = async (searchQuery: string, page: number) => {
		const request = await fetch(`${$serverAddress}/search`, {
			method: 'POST',
			body: JSON.stringify({ query: searchQuery, page }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		query = await request.json();
	};
</script>

<svelte:head>
	<title>Results for "{data.query.replaceAll('-', ' ')}"</title>
</svelte:head>

<div>
	<div class="relative h-44 mb-12">
		<h1 class="font-bold flex items-center justify-center w-full absolute text-8xl py-12 z-50">{query.total_results} results for <span class="italic pl-4">"{data.query.replaceAll('-', ' ')}"</span></h1>
		<div class="dotBackground" />
	</div>
	<div id="movieCardContainer" class="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-6 mb-12">
		{#each query.results as movie, key}
			<MovieComponent {movie} {key} />
		{/each}
	</div>
	{#if query.total_results > 17}
		<div class={`flex items-center justify-center mb-12 mx-auto space-x-4 w-full text-white`}>
			<button class={`${page > 1 ? ' opacity-1' : ' opacity-0 pointer-events-none'}`} on:click={() => (page -= 1)}>Previous Page</button>
			<p>{page}</p>
			<button class={`${page == query.total_pages ? ' opacity-0 pointer-events-none' : 'opacity-1'}`} on:click={() => (page += 1)}>Next Page</button>
		</div>
	{/if}
</div>
