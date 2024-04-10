<script lang="ts">
	import { currentPhotoSelected } from '../routes/store';
	export let link: string;
</script>

<button on:click={() => currentPhotoSelected.set(link.replace('w200', 'original'))}>
	<img alt="" src={link} />
</button>
