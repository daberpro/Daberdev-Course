import { writable } from 'svelte/store';

let show_basket = writable(false);
let show_details = writable(false);
let show_confirm = writable({show: false, data: {}});
let details_info = writable({
	title: "title",
	description: "description",
	price: 0
})
export {
	show_details,
	details_info,
	show_basket,
	show_confirm
}