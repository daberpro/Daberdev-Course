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
		text-align: center;
		font-family: 'Poppins', sans-serif;
		color: white;
	}

	.container p{
		text-align:center;
		padding: 20px;
		color: silver;
		line-height: 1.6rem;
		font-family: 'Varela Round', sans-serif;
	}

	.container div{
		width: fit-content;
		height: fit-content;
		padding: 20px;
		gap: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.container div span{
		font-family: 'Poppins', sans-serif;
		cursor: pointer;
		background-color: #cbeae7;
		padding: 20px;
		border-radius: 10px;
		color: #009688;
	}

	.container div span[danger]{
		font-family: 'Poppins', sans-serif;
		color: #e91e63;
		cursor: pointer;
		background-color: #fce8ef;
		padding: 20px;
		border-radius: 10px;
	}

	b{
		color: white;
	}


</style>

<div class="container">
	<h1>Are you sure?</h1>
	<p>
		<b>Thankyou</b> for join with us,<br/><b>don't forget to share</b> what you got from us 
	</p>
	<div>
		<span on:click={async _=>{

			const tokens = JSON.parse(localStorage.getItem("daberdev-tokens")).refreshToken;

			const data = await fetch(`http://${location.hostname}:8083/logout`,{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer "+ tokens 
				}
			}).catch(d => console.log(d));

			if(data.status === 204){
				localStorage.clear();
				location.href = `http://${location.hostname}:5173/login`
			}

		}} danger>Bye daberdev</span>
		<span data-link href="/">No i want back</span>
	</div>
</div>