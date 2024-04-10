import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => { 
    const pathname = event.url.pathname;
    const invalid = ['/movie', '/user']
    if (invalid.includes(pathname)) { 
        return redirect(307, '/')
    }
    const response = await resolve(event);
    return response;
}