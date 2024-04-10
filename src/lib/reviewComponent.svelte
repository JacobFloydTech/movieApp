<script lang="ts">
	import { onMount } from 'svelte';
	import ReviewCard from '$lib/reviewCard.svelte';
	import type { Review, ReviewResponse } from '../../types';
	export let id: number;
	let reviews: ReviewResponse;
	let hide: boolean = false;
	onMount(() => {
		getReviews();
	});
	const getReviews = async () => {
		const req = await fetch('http://localhost:3000/getReviews', {
			method: 'POST',
			body: JSON.stringify({ id }),

			headers: {
				'Content-Type': 'application/json'
			}
		});
		reviews = await req.json();
		hide = reviews.total_results == 0;
	};
</script>

{#if !hide}
	<div id="reviews">
		<h1 class="text-5xl md:text-7xl xl:text-9xl bg-gradient-to-b from-white to-[#3C3C3C] text-transparent bg-clip-text font-bold text-center pt-12">Reviews</h1>
		{#if reviews}
			<div class="flex flex-col space-y-4 md:w-3/4 p-12 rounded-xl bg-[rgba(0,0,0,0.2)] mx-auto">
				{#each reviews.results as review}
					<ReviewCard {review} />
				{/each}
			</div>
		{:else}
			<div>Loading......</div>
		{/if}
	</div>
{/if}
