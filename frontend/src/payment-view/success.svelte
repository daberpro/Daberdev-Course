<style>
	
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.container h1{
		font-family: 'Poppins', sans-serif;
		color: white;
	}

	.container p{
		color: silver;
		font-family: 'Varela Round', sans-serif;
		margin-bottom: 30px;
		background-color: #1c1e25;
		color: white;
		padding: 20px;
		border-radius: 10px;
	}

	.container span{
		font-family: 'Poppins', sans-serif;
		color: white;
		cursor: pointer;
		background-color: #cbeae7;
		padding: 20px;
		border-radius: 10px;
		color: #009688;
	}


</style>

<script>
	import {onMount} from 'svelte'
	export let order_id = "";

	onMount(_=>{

		const tokens = JSON.parse(localStorage.getItem('daberdev-payment'));
		fetch(`http://${location.hostname}:8083/order-status`,{
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({tokens})
		})
		.then(d => d.json())
		.then(console.log)
		.catch(console.log);


	});

</script>

<div class="container">
	<h1>Payment Success</h1>
	<p>
		order id : {order_id}
	</p>
	<span data-link href="/">Back to HomePage</span>
</div>