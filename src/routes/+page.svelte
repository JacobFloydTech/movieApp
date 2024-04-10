<script lang="ts">
	type CustomType = Event & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	import { onMount } from 'svelte';
	import type { MovieDiscover, User } from '../../types';
	import MovieComponent from '$lib/movieComponent.svelte';
	import { serverAddress, sessionID } from '../routes/store';
	import UserComponent from '$lib/icons/userComponent.svelte';

	type customData = {
		data: MovieDiscover;
		token: string;
	};
	let page: number = 1;
	export let data: customData;
	let currentData = data.data;
	let search: string = '';
	let focus: boolean = false;

	const handleSearchInput = (e: CustomType) => (search = (e.target as HTMLInputElement).value);
	onMount(() => {
		animateInChildren();
		document.addEventListener('keydown', ({ code }) => {
			if (code == 'Enter' && focus && search != '') {
				window.location.href = `/search/${search.replaceAll(' ', '-')}`;
			}
		});
	});

	const getData = async (page: number) => {
		const request = await fetch(`${$serverAddress}/discover`, {
			method: 'POST',
			body: JSON.stringify({ page }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		currentData = await request.json();
	};
	const animateInChildren = () => {
		Array.from(document.getElementById('movieCardContainer')?.children ?? []).forEach((el, i) => {
			el.classList.remove('fadeIn');
			setTimeout(() => {
				el.classList.add('fadeIn');
			}, 200 * i);
		});
	};
</script>

<svelte:head>
	<title>Movie App</title>
</svelte:head>

<div>
	<div class="flex h-96 relative justify-center items-center flex-col">
		<div class="dotBackground" />
		<UserComponent />
		<p class="font-bold z-40 text-center text-3xl xl:text-4xl 2xl:text-8xl bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">The Movie Database</p>
		<div class="pt-12 flex-col md:flex-row flex space-y-4 md:space-y-0 md:space-x-2 z-50">
			<input on:focusin={() => (focus = true)} on:focusout={() => (focus = false)} on:input={(e) => handleSearchInput(e)} class="text-black py-1 px-2 outline-none rounded-full overflow-hidden" />
			<button class="text-white bg-blue-500 rounded-full px-2 py-1 text-xl">Search</button>
		</div>
	</div>
	<div id="movieCardContainer" class="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-6 mb-12 w-full h-full">
		{#each currentData.results as movie, key}
			<MovieComponent {movie} {key} />
		{/each}
	</div>
	{#if currentData.total_results > 17}
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
