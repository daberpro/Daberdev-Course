
<script>
	import {onMount} from 'svelte'
	import {get} from 'svelte/store';
	import {orderItems} from "./count";
	import {show_basket,user_data} from "./stores";

	let userData = {};
	let orders = 0;
	let profile = null;
	user_data.subscribe(d => userData = d);
	orderItems.subscribe(d => {
		orders = d.length;
	});
	let container = null;

	// linearly maps value from the range (a..b) to (c..d)
	function mapRange (value, a, b, c, d) {
	    if (value > b - a) return c + (d - c); 
	    // first map value from (a..b) to (0..1)
	    value = (value - a) / (b - a);
	    // then map it from (0..1) to (c..d) and return it
	    return c + value * (d - c);
	}

	onMount(()=>{
		const observer = new IntersectionObserver( 
		  ([e]) =>{
		  	// console.log(e)
		  	let top = e.target.offsetTop;
		  	if(e.intersectionRatio < 1){
		  		window.onscroll = d => {

			  		 if ((document.body.scrollTop > 240 || document.documentElement.scrollTop > 240) || (document.body.scrollTop < 340 || document.documentElement.scrollTop < 340)) {
						 
					 	 // console.log(document.body.scrollTop||document.documentElement.scrollTop)
					 	 const t = 1 - mapRange(document.documentElement.scrollTop,0,340,0,0.75);
					 	 if(t >= 0.2) e.target.style.backgroundColor = `rgba(40,44,53,${t})`   
				  
					 }
				}
		  	}else{
		  		e.target.style.backgroundColor = "#282c35"
		  	}
		  },
		  { threshold: [1] }
		);
		observer.observe(container)
	});
</script>

<style>
	.orders-item{
		width:100%;
		height: fit-content;
		padding: 20px 40px;
		background-color: #282c35;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		z-index: 10;
		position: sticky;
		top: -1px;
		left: 0px;
	}

	.orders-item > * {
		z-index: 3;
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

	.orders-item .items[profile]{
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

	.orders-item .items[profile] img{
		width: 100%;
		height: 100%;
		border-radius: 100%;
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
		left: 0px;
		font-family: 'Varela Round', sans-serif;
	}

	.orders-item .items[primary]:before{
		content: attr(count);
		width: fit-content;
		padding: 0px 5px;
		height: 20px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		background-color: #efebf7;
		color: #673ab7;
		position: absolute;
		top: -10px;
		left: 0px;
		font-family: 'Varela Round', sans-serif;
	}

	.orders-item .items[profile]:before{
		display: none;
	}
</style>

<div class="orders-item" bind:this={container}>
	<div on:click={_=> show_basket.update(d => true)} class="items" count={orders}>
		<i style="color: white;font-size: 20px;" class="fa-solid fa-basket-shopping"></i>
	</div>
	<div primary class="items" count={0}>
		<i style="color: white;font-size: 20px;" class="fa-solid fa-bell"></i>
	</div>
	{#if userData.avatar}
		<div data-link href="/profile" class="items" bind:this={profile} profile>
			<img data-link href="/profile" alt={userData.avatar + ' avatar'} src={userData.avatar} style="width:100%;height:100%;border-radius:100%;"/>
		</div>
	{/if}
</div>