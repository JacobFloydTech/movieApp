<script lang="ts">
	import type { ImagesResponse } from '../../types';
	import Photo from './photo.svelte';
	const highResLink = 'https://image.tmdb.org/t/p/w200';
	export let images: ImagesResponse;
</script>

<div id="gallery" class="relative w-full overflow-hidden my-12">
	<h1 class="text-5xl font-bold text-white text-center py-2">Photo Gallery</h1>
	<div class="grid md:grid-cols-3 gap-4 place-items-start items-center">
		<div class="w-full mx-auto">
			<h2 class="text-2xl text-white font-semibold italic text-center py-4">Backdrops</h2>
			<div class="grid overflow-scroll h-[300px] md:h-[600px] grid-cols-2 gap-2 items-center place-items-center">
				{#each images.backdrops as backdrop}
					<Photo link={`${highResLink}${backdrop.file_path}`} />
				{/each}
			</div>
		</div>
		<div class="w-full mx-auto">
			<h2 class="text-2xl text-white font-semibold italic text-center py-4">Posters</h2>
			<div class="grid overflow-scroll h-[300px] md:h-[600px] grid-cols-2 md:grid-cols-4 gap-2 items-center place-items-center">
				{#each images.posters as poster}
					<Photo link={`${highResLink}${poster.file_path}`} />
				{/each}
			</div>
		</div>
		<div class="w-full mx-auto">
			<h2 class="text-2xl text-white font-semibold italic text-center py-4">Logos</h2>
			<div class="grid overflow-scroll h-[300px] md:h-[600px] grid-cols-2 gap-2 items-center place-items-center">
				{#each images.logos as logo}
					<Photo link={`${highResLink}${logo.file_path}`} />
				{/each}
			</div>
		</div>
	</div>
</div>
