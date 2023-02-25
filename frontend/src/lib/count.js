import { writable } from 'svelte/store';

let orderItems = writable([]);

export {
	orderItems
}