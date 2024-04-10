import type { PageServerLoad } from './$types';
import { SERVER_ADDRESS } from '$env/static/private';

export const load = (async ({ params }) => {
    const query = params.search;
    const searchQuery = await getData(query, 1);

    return {searchQuery, query};
}) satisfies PageServerLoad;
const getData = async (query: string, page: number) => {
	const request = await fetch(`${SERVER_ADDRESS}/search`, {
		method: 'POST',
		body: JSON.stringify({ query, page }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await request.json();
};