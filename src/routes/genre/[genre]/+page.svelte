<script lang="ts">
	import type { PageData } from './$types';
	import type { MovieDiscoverResult, MovieDiscover } from '../../../../types';
	import MovieComponent from '$lib/movieComponent.svelte';
	import { serverAddress, sessionID } from '../../../routes/store';
	export let data: PageData;
	let results = data.results.results as MovieDiscoverResult[];
	let currentData: MovieDiscover = data.results;
	let page = 1;

	const getData = async (page: number) => {
		document.querySelectorAll('.movieCard').forEach((el) => {
			el.classList.add('imageLoad');
		});
		const request = await fetch(`${$serverAddress}/getBestOfCategory`, {
			method: 'POST',
			body: JSON.stringify({ page, genre: data.id }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { results } = await request.json();
		currentData = results;
	};
	const animateInChildren = () => {
		Array.from(document.getElementById('movieCardContainer')?.children ?? []).forEach((el, i) => {
			el.classList.remove('fadeIn');
			setTimeout(() => {
				el.classList.add('fadeIn');
			}, 150 * i);
		});
	};
</script>

<div class="pt-4">
	<div class="flex w-full relative items-center">
		<button on:click={() => (window.location.href = '/')} class="text-2xl absolute left-8 text-white font-semibold transition-all duration-100 hover:scale-105 px-2 py-1 border-2 border-white rounded-full">
			<p>Go to homepage</p>
		</button>

		<h1 class="font-bold text-9xl flex-1 bg-gradient-to-b from-white to-[#3C3C3C] text-transparent bg-clip-text text-center">{data.genre.slice(0, 1).toUpperCase() + data.genre.slice(1)} movies</h1>
	</div>
	<div id="movieCardContainer" class="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-6 mb-12">
		{#each currentData.results as movie, key}
			<MovieComponent {movie} {key} />
		{/each}
	</div>
	{#if results.length > 17}
		<div class={`flex items-center pt-12 pb-10 justify-center z-50 mb-12 mx-auto space-x-4 w-full text-white`}>
			<button
				class={`${page > 1 ? ' opacity-1' : ' opacity-0 pointer-events-none'}`}
				on:click={() => {
					page -= 1;
					getData(page);
					animateInChildren();
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}>Previous Page</button
			>
			<p>{page}</p>
			<button
				class={`${page == currentData.total_pages ? ' opacity-0 pointer-events-none' : 'opacity-1'}`}
				on:click={() => {
					page += 1;
					getData(page);
					animateInChildren();
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}>Next Page</button
			>
		</div>
	{/if}
</div>
