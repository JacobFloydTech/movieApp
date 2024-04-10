<script lang="ts">
	export let member: any;
	const link = 'https://image.tmdb.org/t/p/original';
</script>

<div class="flex flex-col relative pb-8 bg-black rounded-xl overflow-hidden">
	<div class="relative overflow-hidden">
		<div class=" bg-gradient-to-b from-transparent to-[rgba(0,0,0,1)] absolute z-10 w-full h-full" />
		<img src={`${link}${member.profile_path}`} alt="" class="-z-50" />
	</div>
	{#if Object.keys(member).includes('character')}
		<p class="text-left bottom-0 z-50 absolute p-4 break-words text-white">{member.name} - {member.character}</p>
	{:else}
		<p class="text-left bottom-0 z-50 absolute p-4 break-words text-white">{member.name} - {member.department}</p>
	{/if}
</div>
