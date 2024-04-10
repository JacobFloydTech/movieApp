import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const query = params.search;
    const searchQuery = await getData(query, 1);

    return {searchQuery, query};
}) satisfies PageServerLoad;
const getData = async (query: string, page: number) => {
	const request = await fetch('http://localhost:3000/search', {
		method: 'POST',
		body: JSON.stringify({ query, page }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await request.json();
};