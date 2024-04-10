<script lang="ts">
	import JumpToSection from '$lib/JumpToSection.svelte';
	import PhotoGallery from '$lib/PhotoGallery.svelte';
	import CastComponent from '$lib/castComponent.svelte';
	import MovieHeader from '$lib/movieHeader.svelte';
	import Recommendations from '$lib/recommendations.svelte';
	import ReviewComponent from '$lib/reviewComponent.svelte';
	import SelectedPhoto from '$lib/selectedPhoto.svelte';
	import type { serverData } from '../../../../types';
	import { onMount } from 'svelte';
	export let data: serverData;

	const baseLink = 'https://www.themoviedb.org/movie/';
	onMount(() => {
		const title = data.basicMovieData.original_title.replaceAll(' ', '-').replaceAll(':', '');
		console.log(`${baseLink}${data.basicMovieData.id}-${title}`);
		setVotesBackground();
	});
	function setVotesBackground() {
		const el = document.getElementById('votes');
		if (!el) return;
		const percent = parseFloat(data.basicMovieData.vote_average.toFixed(1)) * 10 + '';
		el.style.backgroundImage = getComputedStyle(el).backgroundImage.replace('backgroundWidthVal', percent);
	}
</script>

<svelte:head>
	<title>{data.basicMovieData.original_title}</title>
</svelte:head>

<div class="">
	<MovieHeader {data} />
	<div class="grid md:grid-cols-[88%_12%]">
		<div class="w-full pr-2">
			<CastComponent data={data.cast} />
			<PhotoGallery images={data.images} />
			<ReviewComponent id={data.basicMovieData.id} />
			<SelectedPhoto />
			<Recommendations id={data.basicMovieData.id} />
		</div>

		<JumpToSection id={data.basicMovieData.id} categories={data.basicMovieData.genre_ids} />
	</div>
</div>
