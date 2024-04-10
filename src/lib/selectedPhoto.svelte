<script lang="ts">
	import { onMount } from 'svelte';
	import { currentPhotoSelected } from '../routes/store';
	import CloseSVG from '$lib/icons/closeSVG.svelte';
	currentPhotoSelected.subscribe((e) => console.log(e));
	onMount(() => {
		document.addEventListener('keydown', ({ code }) => {
			if (code == 'Escape') {
				currentPhotoSelected.set(null);
			}
		});
	});
</script>

{#if $currentPhotoSelected != null}
	<button on:click={() => currentPhotoSelected.set(null)} class="bg-[rgba(0,0,0,0.6)] fixed z-50 top-0 left-0 w-full h-full">
		<img id="photo" src={$currentPhotoSelected} alt="" class="h-full object-contain mx-auto" />
		<button id="closeButton" on:click={() => currentPhotoSelected.set(null)} class="h-16 absolute right-8 top-8 xl:hidden aspect-square z-50">
			<CloseSVG />
		</button>
	</button>
{/if}
