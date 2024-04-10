import type { PageServerLoad } from './$types';

export const load = (async ({params, url}) => {
    const request = await fetch(`http://localhost:3000/discover`, {
        method: "POST", headers: { 
        'Content-Type': 'application/json'
        }, body: JSON.stringify({ page: 1 })
    });
    const token = (url.searchParams.get('request_token'));
    const data = await request.json();
    return {token, data}
}) satisfies PageServerLoad;