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
	export let order_id = "";
</script>

<div class="container">
	<h1>Payment Success</h1>
	<p>
		order id : {order_id}
	</p>
	<span data-link href="/">Back to HomePage</span>
</div>