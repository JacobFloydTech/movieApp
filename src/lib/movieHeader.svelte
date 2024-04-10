<script lang="ts">
	import type { serverData } from '../../types';
	import AddComponent from './addComponent.svelte';
	const link = 'https://image.tmdb.org/t/p/w200';
	const highResLink = 'https://image.tmdb.org/t/p/original';
	export let data: serverData;
</script>

<div id="header" class="movieBackground h-[1000px] md:h-[500px] 2xl:h-[750px] flex items-center relative w-full overflow-hidden" style={`background-image: url(${link}${data.images.backdrops[0]?.file_path})`}>
	<button on:click={() => (window.location.href = '/')} class="absolute top-4 left-4 text-2xl text-white font-semibold transition-all duration-100 hover:scale-105 px-2 py-1 border-2 border-white rounded-full">
		<p>Go to homepage</p>
	</button>

	<div class="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-[#3C3C3C] -z-40" />
	<div class="flex pt-12 flex-col md:flex-row 2xl:w-3/4 md:backdrop-blur-3xl bg-[rgba(60,60,60,0.1)] rounded-2xl items-center justify-center w-full relative p-4 mx-auto h-full md:h-3/4 md:space-x-2">
		<img alt="" class=" drop-shadow-2xl h-[50%] pt-12 md:h-[100%] 2xl:h-[90%] md:p-4 aspect-[2/3]" src={`${highResLink}${data.basicMovieData.poster_path}`} />
		<iframe allowfullscreen class=" aspect-video h-3/4 hidden md:block" title="movieTrailer" src={`https://youtube.com/embed/${data.trailer.key}`}> </iframe>
		<div class="text-white text-center flex flex-col">
			<p class="text-4xl md:text-2xl xl:text-4xl text-center font-bold">{data.basicMovieData.title}</p>
			<p class="text-center italic text-sm md:text-xl">Average Vote: {data.basicMovieData.vote_average.toFixed(1)}</p>
			<div id="votes" class="text-2xl lg:text-4xl w-auto mx-auto flex bg-clip-text text-transparent">
				<p>★★★★★</p>
			</div>

			<p class="p-4 text-left md:text-sm lg:text-base italic">{data.basicMovieData.overview}</p>
			<AddComponent movie={data.basicMovieData} />
		</div>
		<iframe allowfullscreen class="w-full py-2 aspect-video block md:hidden" title="movieTrailer" src={`https://youtube.com/embed/${data.trailer.key}`}> </iframe>
	</div>
</div>
