import {writable} from 'svelte/store'

const dialog = writable(false);
const input_data = writable({});

export {
	dialog,
	input_data
}