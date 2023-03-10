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

	.container b{
		font-family: 'Poppins', sans-serif;
		font-weight: bold;
		color: white;

	}


</style>

<script>
	import {onMount} from 'svelte'
	export let order_id = "";
	let status = "";

	onMount(_=>{

		const data = JSON.parse(localStorage.getItem('daberdev-payment'));
		const {token} = JSON.parse(localStorage.getItem('daberdev-tokens'));
		fetch(`http://${location.hostname}:8083/order-status`,{
			method: "POST",
			headers:{
				"Content-Type": "application/json",
				"Authorization": 'Bearer '+ token
			},
			body: JSON.stringify(data)
		})
		.then(d => d.json())
		.then(d => {

			status = d.status;

		})
		.catch(console.log);


	});

</script>

<div class="container">
	<h1>Payment Success</h1>
	<b>
		status {status}
	</b>
	<p>
		order id : {order_id}
	</p>
	<span data-link href="/">Back to HomePage</span>
</div>