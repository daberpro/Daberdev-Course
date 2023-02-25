
<script>
	
	import {get} from 'svelte/store';
	import {orderItems} from "./count";
	import {show_basket} from "./stores";

	let orders = 0;
	orderItems.subscribe(d => {
		orders = d.length;
	});
</script>

<style>
	.orders-item{
		width:100%;
		height: fit-content;
		padding: 10px 20px;
		background-color: #282c35;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
	}

	.orders-item .items{
		width: 50px;
		height: 50px;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		background-color: #2f3e4c;
		cursor: pointer;
		position: relative;
	}

	.orders-item .items:before{
		content: attr(count);
		width: fit-content;
		padding: 0px 5px;
		height: 20px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		background-color: #e91e63;
		position: absolute;
		top: -10px;
		left: -10px;
		font-family: 'Varela Round', sans-serif;
	}
</style>

<div class="orders-item">
	<div on:click={_=> show_basket.update(d => true)} class="items" count={orders}>
		<i style="color: white;font-size: 20px;" class="fa-solid fa-basket-shopping"></i>
	</div>
</div>