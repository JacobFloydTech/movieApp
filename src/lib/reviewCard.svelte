<script lang="ts">
	import type { Review } from '../../types';
	import { onMount } from 'svelte';
	let showMore: boolean = false;
	let voteEl: HTMLElement;
	let limit: number = 0;
	$: {
		currentContent = showMore ? review.content : review.content.split('').slice(0, 600).join('');
	}
	export let review: Review;
	const imgLink = review.author_details.avatar_path == null ? '/defaultUser.svg' : 'https://image.tmdb.org/t/p/original' + review.author_details.avatar_path;
	let currentContent = review.content.split('').slice(0, limit).join('');
	onMount(() => {
		setLimit();
		window.addEventListener('resize', setLimit);
	});
	const setLimit = () => (limit = window.innerWidth <= 500 ? 200 : 600);
</script>

<div class="text-white">
	<div class="flex space-x-4 items-center">
		<p class="text-xl md:text-2xl font-semibold">{review.author}</p>
		<img class="h-12 rounded-full aspect-square" src={imgLink} alt="" />
		{#if review.author_details.rating != null}
			<div bind:this={voteEl} style={`background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23353434' /%3E%3Crect width='${review.author_details.rating * 10}%25' height='200' x='0' y='0' fill='%23FFD700'/%3E%3C/svg%3E");`} class="text-xl md:text-2xl lg:text-4xl w-auto mx-auto bg-clip-text text-transparent">
				<p>★★★★★</p>
			</div>
		{/if}
	</div>
	<p class="text-lg py-4">
		{@html currentContent}

		<button on:click={() => (showMore = !showMore)} class={`${review.content.length > 600 ? 'inline' : 'hidden'} `}> <span class="font-bold">{showMore ? 'Hide' : '... Expand '}</span></button>
	</p>
</div>
