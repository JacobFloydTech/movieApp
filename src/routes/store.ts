import { writable } from "svelte/store";
import type { User } from "../../types";


export const currentHover = writable<number | null>(null);
export const currentPhotoSelected = writable<string | null>(null);
export const sessionID = writable<string | null>(null);
export const accountData = writable<User | null>();
export const serverAddress = writable<String>("http://3.27.27.220:3000")