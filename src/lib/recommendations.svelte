<script lang="ts">
	import { onMount } from 'svelte';
	import type { RecommendationResponse } from '../../types';
	import MovieComponent from './movieComponent.svelte';
	export let id: number;
	let recommendations: RecommendationResponse;
	let hide = true;
	onMount(() => {
		getRecommendations();
	});
	const getRecommendations = async () => {
		const req = await fetch('http://localhost:3000/getRecommendations', {
			method: 'POST',
			body: JSON.stringify({ id }),

			headers: {
				'Content-Type': 'application/json'
			}
		});
		recommendations = await req.json();
		hide = recommendations.total_results == 0;

		animateInChildren();
	};
	const animateInChildren = () => {
		setTimeout(() => {
			Array.from(document.getElementById('movieCardContainer')?.children ?? []).forEach((el, i) => {
				el.classList.remove('fadeIn');
				setTimeout(() => {
					el.classList.add('fadeIn');
				}, 200 * i);
			});
		}, 1000);
	};
</script>

{#if !hide}
	<div id="recommendations">
		<h1 class=" text-9xl bg-gradient-to-b from-white to-[#3C3C3C] text-transparent bg-clip-text font-bold text-center pt-12">Recommendations</h1>
		<div id="movieCardContainer" class="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-6 mb-12 w-full h-full">
			{#if recommendations}
				{#each recommendations.results as recommendation, key}
					<MovieComponent movie={recommendation} {key} />
				{/each}
			{/if}
		</div>
	</div>
{/if}
