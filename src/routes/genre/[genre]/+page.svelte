<script lang="ts">
	import type { PageData } from './$types';
	import type { MovieDiscoverResult } from '../../../../types';
	import MovieComponent from '$lib/movieComponent.svelte';
	import { onMount } from 'svelte';
	export let data: PageData;
	let results = data.results.results as MovieDiscoverResult[];
</script>

<div>
	<div class="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-6 mb-12">
		{#each results as movie, key}
			<MovieComponent {movie} {key} />
		{/each}
	</div>
</div>
