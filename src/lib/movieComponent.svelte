<script lang="ts">
	export let movie: MovieDiscoverResult;
	import { onMount } from 'svelte';
	export let key: number | null;
	let imageElement: HTMLImageElement;
	import type { MovieDiscoverResult } from '../../types';
	import { accountData, currentHover, serverAddress, sessionID } from '../routes/store';
	import AddComponent from './addComponent.svelte';
	let favourite: boolean | null = null;
	const link = 'https://image.tmdb.org/t/p/w45';
	const highResLink = 'https://image.tmdb.org/t/p/original';

	const handleClick = (e: any) => {
		const el = document.querySelector(`#movieCard${key} > div > div`);
		if (!el?.contains(e.target)) {
			window.location.href = `/movie/${movie.title.replaceAll(' ', '-')}`;
		}
	};
	onMount(() => {
		getFavourites();
	});
	const getFavourites = async () => {
		const sessionID = localStorage.getItem('session_id');
		const request = await fetch(`${$serverAddress}/containsFavourite`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sessionID: sessionID, movieID: movie.id, accountID: $accountData?.id || 1 })
		});
		const { result } = await request.json();
		favourite = result;
	};
	const addHover = () => document.getElementById(`movieCard${key}`)?.classList.add('hover');
	const removeHover = () => document.getElementById(`movieCard${key}`)?.classList.remove('hover');
	const handleImageLoad = () => {
		document.getElementById(`movieCard${key}`)?.classList.remove('imageLoad');
		imageElement.style.opacity = '1';
	};
</script>

<button on:mouseenter={() => addHover()} on:mouseleave={() => removeHover()} on:focusin={() => addHover()} on:focusout={() => removeHover()} on:click={(e) => handleClick(e)} id={`movieCard${key}`} style={`background-image: url(${link}${movie.poster_path})`} class={`movieCard cursor-pointer  shadow-slate-950 shadow-2xl rounded-xl overflow-hidden  `}>
	<img on:load={() => handleImageLoad()} bind:this={imageElement} src={`${highResLink}${movie.poster_path}`} alt="" class="w-full h-full opacity-0" />
	<div class="absolute z-50 top-0 left-0 flex flex-col space-y-4 justify-end w-full h-full bg-gradient-to-b from-transparent to-black to-60%">
		<h1 class="2xl:text-4xl xl:text-2xl lg:text-xl text-lg text-center font-bold text-white">{movie.title}</h1>
		<p class={`text-white hidden 2xl:block text-left px-4 text-[100px] max-[400px]:text-[15px] max-[500px]:text-[20px] md:text-[10px] max-[850px]:text-[13px] xl:text-base 2xl:text-sm  italic`}>
			{movie.overview.split('').slice(0, 250).join('')}
			{#if movie.overview.length > 250}
				<span>...</span>
			{/if}
		</p>
		<p class={`text-white 2xl:hidden text-left px-4 text-[100px] max-[400px]:text-[15px] max-[500px]:text-[20px] md:text-[10px] max-[850px]:text-[13px] xl:text-base 2xl:text-sm  italic`}>
			{movie.overview.split('').slice(0, 120).join('')}
			{#if movie.overview.length > 120}
				<span>...</span>
			{/if}
		</p>
		<AddComponent {movie} />
	</div>
</button>
