<script lang="ts">
	import type { CastCollection, Cast, Crew } from '../../types';
	let limit: number = 0;
	import ShowMoreSVG from '$lib/icons/showMoreSVG.svelte';
	import CastCard from './castCard.svelte';
	import { onMount } from 'svelte';
	export let data: CastCollection;
	let showMoreCast: boolean = false;
	let showMoreCrew: boolean = false;
	$: {
		currentCast = showMoreCast ? cast : cast.slice(0, limit);
		currentCrew = showMoreCrew ? crew : crew.slice(0, limit);
	}
	const cast = data.cast.filter((e) => e.profile_path != null).sort((a, b) => b.popularity - a.popularity);
	const crew = combineResults(data.crew.filter((e) => e.profile_path != null).sort((a, b) => b.popularity - a.popularity));
	let currentCrew = crew.slice(0, limit);
	let currentCast = cast.slice(0, limit);
	function combineResults(arr: Array<Crew>) {
		let uniqueArray: Array<Crew> = [];
		arr.forEach((x) => {
			if (!uniqueArray.some((e) => e.name == x.name)) {
				uniqueArray.push(x);
			} else {
				const department = x.department;
				const index = uniqueArray.indexOf(uniqueArray.filter((e) => e.name == x.name)[0]);
				const pastCredits = uniqueArray[index].department.split(' ');
				if (!pastCredits.some((e) => e == department)) {
					uniqueArray[index].department += ` ${department}`;
				}
			}
		});
		return uniqueArray;
	}
	onMount(() => {
		setLimit();
		window.addEventListener('resize', setLimit);
		animateHeadings();
	});
	const setLimit = () => {
		if (window.innerWidth <= 700) {
			limit = 6;
		} else {
			limit = 10;
		}
	};
	const animateHeadings = () => {
		Array.from(document.getElementsByClassName('cast')).forEach((e, i) => {
			setTimeout(
				() => {
					e.classList.add('fadeIn');
				},
				150 + 400 * i
			);
		});
	};
</script>

<div class="grid w-full md:grid-cols-2 overflow-x-hidden text-white md:gap-x-12 xl:gap-x-24">
	<div id="cast/crew" class="flex flex-col items-center">
		<h1 class="cast text-4xl p-2 pl-4 font-semibold">Casting</h1>
		<div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-4">
			{#each currentCast as member}
				<CastCard {member} />
			{/each}
		</div>
		{#if cast.length > 10}
			<button on:click={() => (showMoreCast = !showMoreCast)} class="w-12 my-2 aspect-square">
				<ShowMoreSVG showMore={showMoreCast} />
			</button>
		{/if}
	</div>
	<div class="flex flex-col items-center">
		<h1 class="cast text-4xl p-2 pl-4 font-semibold">Crew</h1>
		<div class=" grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{#each currentCrew as member}
				<CastCard {member} />
			{/each}
		</div>
		{#if crew.length > 10}
			<button on:click={() => (showMoreCrew = !showMoreCrew)} class="w-12 my-2 aspect-square">
				<ShowMoreSVG showMore={showMoreCrew} />
			</button>
		{/if}
	</div>
</div>
