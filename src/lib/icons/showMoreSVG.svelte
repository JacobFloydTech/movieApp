<script lang="ts">
	export let showMore: boolean;
</script>

<svg class="border-2 rounded-full" style={`${showMore ? 'transform: rotate(180deg);' : ' '}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<line x1="25" x2="50" y1="25" y2="75" stroke="white" stroke-width="4" stroke-linecap="round" />
	<line x1="75" x2="50" y1="25" y2="75" stroke="white" stroke-width="4" stroke-linecap="round" />
</svg>
