import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SERVER_ADDRESS } from '$env/static/private';
export const load = (async ({ params }) => {
    try { 
		const movie = params.movie;
        const basicMovieData = await getBasicData(movie);
        const [images, cast, trailer] = await Promise.all([
            await getImages(basicMovieData.id),
            await getCast(basicMovieData.id),
            await getMovieTrailer(basicMovieData.id),
		])

        return {
            basicMovieData, images, cast, trailer, 
        };
    } catch (error) { return redirect(307, '/')}

}) satisfies PageServerLoad;


	const getBasicData = async (movie: string) => {
		const request = await fetch(`${SERVER_ADDRESS}/getMovie`, {
			method: 'POST',
			body: JSON.stringify({ movie }),

			headers: { 'Content-Type': 'application/json' }
        });
        return await request.json();
	};
	const getImages = async (id: number) => {
		const request = await fetch('http://localhost:3000/getImages', {
			method: 'POST',
			body: JSON.stringify({ id}),

			headers: { 'Content-Type': 'application/json' }
		});
		return await request.json();
	};
	const getCast = async (id: number) => {
		const request = await fetch('http://localhost:3000/getCast', {
			method: 'POST',
			body: JSON.stringify({id }),

			headers: { 'Content-Type': 'application/json' }
		});
	    return await request.json();
	};
	const getMovieTrailer = async (id: number) => {
		const request = await fetch('http://localhost:3000/getMovieTrailer', {
			method: 'POST',
			body: JSON.stringify({ id}),

			headers: { 'Content-Type': 'application/json' }
        });
        return await request.json();
	};