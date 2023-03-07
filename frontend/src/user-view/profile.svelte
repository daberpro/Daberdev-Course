<svelte:head>
	<style>
		#app{
			background-color: #2f3e4c !important;
		}
	</style>
</svelte:head>

<style>

	.wrap{
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 20px;
	}

	.container{
		width: 600px;
		height: fit-content;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px 20px;
		background-color: #1c1e25;
		border-radius: 20px;
		z-index: 3;
	}

	.container > *{
		z-index: 3;
	}

	.container .cover{
		position: absolute;
		left: 0px;
		width: 100%;
		height: 105px;
		background: #e5f4f3;
		top: 0px;
		z-index: 2;
		border-radius: 20px 20px 0px 0px;
	}

	.container .cover span{
		font-family: 'Poppins', sans-serif;
		color: #009688;
		position: absolute;
		right: 20px;
		bottom: 10px;
		font-size: 2rem;
		font-weight: bold;
	}

	.container .head{
		width: calc(50% - 80px);
		height: fit-content;
		padding: 10px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 5px;
	}

	.container .head > *{
		font-family: 'Poppins', sans-serif;
	}

	.container .head img{
		width: 150px;
		height: 150px;
		border-radius: 100%;
		background-color: white;
		text-align: center;
		color: white;
/*		border: 3px solid #009688;*/
	}

	.container .head h3{
		color: white;
		margin: 0px;
		padding: 0px;
	}

	.container .head span{
		color: gray;
		width: 90%;
		word-wrap: break-word;
		text-align: center;
	}

	.container .body{
		width: calc(50% - 80px);
		height: fit-content;
		padding: 10px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 5px;
		padding-top: 105px;
	}

	.container .body > *{
		font-family: 'Varela Round', sans-serif;
	}

	.container .body > *{
		width: 100%;
		color: silver;
		font-size: 14px;
	}

	span[btn]{
		font-family: 'Poppins', sans-serif;
		color: white;
		cursor: pointer;
		background-color: #cbeae7;
		padding: 20px;
		border-radius: 10px;
		color: #009688;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-wrap:wrap;
		gap: 20px;
	}

	span[warning]{
		color:#673ab7;
		background-color:#efebf7;
	}

	.action{
		width:100%;
		height: fit-content;
		padding:20px;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-wrap:wrap;
		gap: 20px;
	}
        
</style>
<div class="wrap">
	<div class="container">
		<div class="cover">
			<span>
				Daberdev
			</span>
		</div>
		<div class="head">
			<img alt={`{userData.avatar} avatar`} src={userData.avatar} loading="lazy"/>
			<h3>{userData.name}</h3>
			<span>#{userData.username}</span>
		</div>
		<div class="body">
			<span>{userData.email}</span>
			<b>course:</b>
			<span>{userData.courses?.courses?.length}</span>
		</div>
		{#if Object.keys(userData).length > 0}
			<QR mt={105} codeValue={JSON.stringify({
				name:userData.name,
				username:userData.username,
				email:userData.email,
			},null,4)} squareSize={70} />
		{/if}
	</div>
	<div class="my-course">
		<div></div>
	</div>
	<div class="action">
		<span btn data-link href="/">
			<i class="fa-solid fa-house"></i>
			Back to HomePage
		</span>
		{#if userData.admin}
			<span btn warning on:click={_=>{
				const tokens = JSON.parse(localStorage.getItem('daberdev-tokens'));
				location.href = `http://127.0.0.1:5174/?token=${tokens.token}&refreshToken=${tokens.refreshToken}`;
			}}>
				<i class="fa-solid fa-user"></i>
				Open admin dashboard
			</span>
		{/if}
	</div>
</div>
<script>
	import {get} from 'svelte/store'
	import {user_data} from '../lib/stores'
	import { onMount } from 'svelte';
	import QR from '../lib/QR.svelte';
	export let tokens = {};
	let userData = get(user_data);

	onMount(async () => {

		if(Object.keys(userData).length === 0){
			if(tokens.token){
				localStorage.setItem("daberdev-tokens",JSON.stringify(tokens));
				location.href = `http://${location.hostname}:5173/profile`;
			}else{

				if(!localStorage.hasOwnProperty('daberdev-tokens')) return location.href = `http://${location.hostname}:5173/login`;	
				const tokens = JSON.parse(localStorage.getItem("daberdev-tokens"));
				
				let data = await fetch("http://127.0.0.1:8083/profile",{
				    method: "GET",
				    headers:{
				        "Content-Type":"application/json",
				        "Authorization":"Bearer "+tokens.token
				    }
				}).catch(d => console.log(""));

				if(data.ok) return userData = await data.json().catch(d => console.log(d));

				data = await fetch("http://127.0.0.1:8083/token",{
				    method: "GET",
				    headers:{
				        "Content-Type":"application/json",
				        "Authorization":"Bearer "+tokens.refreshToken
				    }
				}).catch(d => console.log(""));

				if(data.ok){
					const result = await data.json().catch(d => console.log(d));
					localStorage.setItem("daberdev-tokens",JSON.stringify({token: result.token,refreshToken: tokens.refreshToken}));
					
					data = await fetch("http://127.0.0.1:8083/profile",{
					    method: "GET",
					    headers:{
					        "Content-Type":"application/json",
					        "Authorization":"Bearer "+tokens.token
					    }
					}).catch(d => console.log(""));

					if(data.ok) return userData = await data.json().catch(d => console.log(d));


				};

				location.href = `http://${location.hostname}:5173/login`;

			}

		}

	});

</script>