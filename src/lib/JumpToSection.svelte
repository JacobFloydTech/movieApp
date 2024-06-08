<script lang="ts">
	export let categories: number[];
	import { onMount } from 'svelte';
	import type { Keyword } from '../../types';
	import { serverAddress } from '../routes/store';
	let blur = true;
	let categoriesNames: String[] = [];
	let keywords: Keyword[] = [];
	export let id: number;
	var sections = ['Header', 'Cast/Crew', 'Gallery'];
	var currentSection = 'Header';
	const handleClick = (section: string) => {
		document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
	};
	onMount(() => {
		setTimeout(() => {
			['Reviews', 'Recommendations'].forEach((e) => {
				if (!!document.getElementById(e.toLowerCase())) {
					sections = [...sections, e];
				}
			});
			blur = false;
		}, 1000);
		checkScroll();
		document.addEventListener('scroll', checkScroll);
		getCategories();
		getKeywords(id);
	});

	const getCategories = async () => {
		const request = await fetch(`${$serverAddress}/convertCategoriesToWords`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ids: categories })
		});
		let { categories: data } = await request.json();
		categoriesNames = data;
	};
	const getKeywords = async (id: number) => {
		const request = await fetch(`${$serverAddress}/getKeywords`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		const { keywords: data } = await request.json();
		keywords = data;
	};

	const checkScroll = () => {
		sections
			.map((e) => document.getElementById(e.toLowerCase()))

			.forEach((e) => {
				if (isElementTouchingTop(e)) {
					currentSection = e?.id + '';
				}
			});
	};
	function isElementTouchingTop(element: HTMLElement | null) {
		if (!element) {
			return false;
		}
		const elementRect = element.getBoundingClientRect();
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

		// Calculate the vertical position of the element relative to the viewport
		const elementTop = elementRect.top;

		// Check if the element's top position is above the middle of the viewport
		return elementTop <= viewportHeight / 2;
	}
	const onHover = (c: String, category: boolean) => {
		const el = document.getElementById(category ? 'categories' : 'keywords');

		Array.from(el?.children ?? []).forEach((child) => {
			if (child.textContent == c) {
				child.classList.add('hover');
			} else {
				child.classList.add('dim');
			}
		});
	};
	const offHover = (category: boolean) => {
		const el = document.getElementById(category ? 'categories' : 'keywords');

		Array.from(el?.children ?? []).forEach((child) => {
			child.classList.remove('hover');
			child.classList.remove('dim');
		});
	};
</script>

<div class="md:sticky h-20 md:h-80 w-full md:w-auto fixed z-50 py-4 top-0">
	<div class="hidden md:block">
		<div style={`filter: ${blur ? 'blur(6px)' : 'blur(0px)'}`} class="absolute md:pt-12 md:space-y-6 top-0 left-0 flex-col flex px-4 md:px-0 md:justify-start justify-between">
			{#each sections as section}
				<button on:click={() => handleClick(section.toLowerCase())}>
					<p class={`text-left 2xl:text-lg text-sm md:pl-2 text-white sectionText ${section.toLowerCase() == currentSection ? 'highlighted' : '  '}`}>{section}</p>
				</button>
			{/each}
			<div>
				<h2 class="text-xl font-semibold text-white pb-4">Categories</h2>
				<div id="categories" class="flex flex-wrap break-words gap-3 categories">
					{#each categoriesNames as category}
						<a href={`/genre/${category.toLowerCase()}`} on:mouseleave={() => offHover(true)} on:mouseenter={() => onHover(category, true)} class="bg-gray-400 text-lg px-2 py-1 text-white rounded-md">{category}</a>
					{/each}
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold text-white pb-4">Keywords</h2>
				<div id="keywords" class="flex flex-wrap break-words gap-3 categories max-h-72 overflow-y-scroll">
					{#each keywords as keyword}
						<button on:click={() => (window.location.href = `/keyword/${keyword.id}`)} on:mouseleave={() => offHover(false)} on:mouseenter={() => onHover(keyword.name, false)} class="bg-gray-400 text-lg px-2 py-1 text-white rounded-md">{keyword.name}</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
