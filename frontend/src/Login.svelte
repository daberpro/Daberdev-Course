<style>
	.login{
		width: 400px;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		border-radius: 20px;
		background-color: #282c35;

		/*position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;*/
		margin: auto;
		gap: 15px;
	}

	.login h1{
		width: 100%;
		font-size: 2.5rem;
		width: 100%;
		margin: 0px;
		padding: 0px;
		color: white;
		text-align: center;
		/*background: -webkit-linear-gradient(90deg, #b7f8db 0%, #50a7c2 100%);
		  -webkit-background-clip: text;
		  -webkit-text-fill-color: transparent;*/
	}

	.login p{
		width: 100%;
		font-family: 'Varela Round', sans-serif;
		color: gray;
	}

	.login b{
		font-family: 'Varela Round', sans-serif;
		color: white;
		font-size: 1rem;
	}

	.login span{
		cursor: pointer;
		font-family: 'Varela Round', sans-serif;
		color: white;
		font-size: 1rem;
		padding: 20px 0px;
	}

	.login button[login]{
		width: 100%;
		padding: 15px;
		outline: none;
		border: none;
		border-radius: 15px;
		font-size: 1rem;
		font-family: 'Poppins', sans-serif;
		cursor: pointer;
		background-color: #e5f4f3;
		color: #009688;
		font-weight: bold;
	}

	.login button[google]{
		width: 100%;
		padding: 15px;
		outline: none;
		border: none;
		border-radius: 15px;
		font-size: 1rem;
		font-family: 'Poppins', sans-serif;
		cursor: pointer;
		background: #fce8ef;
		color: #e91e63;
		font-weight: bold;
	}

	.login button[github]{
		width: 100%;
		padding: 15px;
		outline: none;
		border: none;
		border-radius: 15px;
		font-size: 1rem;
		font-family: 'Poppins', sans-serif;
		cursor: pointer;
		background: #eaebed;
		color: #2f3e4c;
		font-weight: bold;
	}

	@media screen and (min-width: 0px) and (max-width: 400px){
		.login{
			width: 100%;
			border-radius: 0px;
		}
	}
</style>
<script>
	import TextField from './lib/TextField.svelte'
	let test = "";
</script>
<div class="login">
	<h1>Login <small>to daberdev</small></h1>
	<p>
		* use google or github if you already signup with them
	</p>
	<TextField label="Email" getValue={d => test = d} />
	<TextField label="Password" getValue={d => test = d} />
	<button login>Login</button>
	<b>- or -</b>
	<button google on:click={_=>{
		location.href = `http://${location.hostname}:8082/auth/google`;
	}}>Login with Google <i class="fa-brands fa-google"></i></button>
	<button github on:click={_=>{
		location.href = `http://${location.hostname}:8082/auth/github`;
	}}>Login with Github <i class="fa-brands fa-github"></i></button>
	<span>doesn't have account yet? click me</span>
</div>