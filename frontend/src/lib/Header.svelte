
<style>
	
	.navbar{
		width: 100%;
		height: fit-content;
		background-color: #282c35;
		padding: 20px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
		z-index: 3;
/*		box-shadow: 0px 0px 20px rgba(0,0,0,1);*/
	}

	.navbar > *{
		z-index: 3;
/*		mix-blend-mode:difference;*/
	}

	.navbar .left,.navbar .right{
		width: fit-content;
		height: 50px;
		display: flex;
		justify-content: center;
		gap: 25px;
		align-items: center;
		flex-wrap: wrap;
		padding: 0px 15px;
	}

	h1{
		margin: 0px;
		padding:0px;
		color: #e5f4f3;
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

	li[button]{
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
		background-color: #e5f4f3;
		color: #009688;
		padding: 10px;
		border-radius: 10px;
		mix-blend-mode:normal;

	}

	@media screen and (min-width: 0px) and (max-width: 650px){
		li span{
			font-size: 1rem;
		}

		.navbar{
			padding: 20px 0px;
		}
		.navbar .left,.navbar .right {
			width: 100%;
			justify-content: flex-start;
			height: fit-content;
		}

		.navbar .left {
			padding: 20px;
		}

		li[button] {
			padding: 20px 20px;
			width: 100%;
			font-size: 1rem;
			font-weight: bold;
		}
	}

</style>

<script>
	import {user_data} from './stores'
	export let brand_name = "noname";

	let userData = {};
	user_data.subscribe(d => userData = d);
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
		<li button data-link href={`/${!userData.username? 'login' : 'logout'}`} style={`color: ${!userData.username? '#009688': '#e91e63'};background-color: ${!userData.username? '#e5f4f3': '#fce8ef'}`}>
			<i class="fa-solid fa-user"></i>
			<span data-link href={`/${!userData.username? 'login' : 'logout'}`}>{!userData.username? "login or register" : "logout"}</span>
		</li>
	</div>
</div>