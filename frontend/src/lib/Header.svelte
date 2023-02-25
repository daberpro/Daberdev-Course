
<style>
	
	.navbar{
		width: 100%;
		height: fit-content;
		background-color: #282c35;
		padding: 10px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
/*		box-shadow: 0px 0px 20px rgba(0,0,0,1);*/
	}

	.navbar .left,.navbar .right{
		width: fit-content;
		height: 50px;
		display: flex;
		justify-content: center;
		gap: 30px;
		align-items: center;
		flex-wrap: wrap;
		padding: 0px 15px;
	}

	h1{
		margin: 0px;
		padding:0px;
		color: #009688;
	}

	li{
		list-style: none;
		font-family: 'Poppins', sans-serif;
		color: rgba(255,255,255,0.75);
		cursor: pointer;
		font-weight: 300;
		display: flex;
		justify-content: center;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;

	}

	@media screen and (min-width: 0px) and (max-width: 650px){
		li span{
			font-size: 12px;
		}
	}

</style>

<script>
	export let brand_name = "noname";
</script>

<div class="navbar">
	<div class="left">
		<h1>{brand_name}</h1>	
	</div>
	<div class="right">
		<li>
			<i class="fa-solid fa-circle-info"></i>
			<span data-link href="/about">about</span>
		</li>
		<li>
			<i class="fa-brands fa-github"></i>
			<span>repo</span>
		</li>
		<li>
			<i class="fa-brands fa-youtube"></i>
			<span>youtube</span>
		</li>
	</div>
</div>