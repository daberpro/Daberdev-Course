<style>
	
	.confirm{
		width: 300px;
		height: fit-content;
		max-height: 90%;
		min-height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		border-radius: 20px;
		background-color: #24272f;

		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;

		gap: 15px;
		z-index: 9999;

	}

	.confirm > *{
		font-family: 'Poppins', sans-serif;
	}

	.confirm .title{
		font-size: 1rem;
		width: 100%;
		color: white;
	}

	.confirm .head{
		width: 100%;
		height: fit-content;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10px;
	}

	.confirm .head h3{
		color: white;
	}

	.confirm .head p{
		color: silver;
	}

	.confirm .head code{
		color: gray;
		font-size: 1rem;
		background-color: #1c1e25;
		padding: 20px;
		border-radius: 10px;
		width: 100%;
		word-wrap: break-word;
		text-align: center;
	}

	.confirm .body{
		width: 100%;
		height: fit-content;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	.confirm .body button[primary]{
		width: 45%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		background: linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%);
		color: #282c35;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		color: black;
	}

	.confirm .body button[danger]{
		width: 45%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		background: #e91e63;
		color: #282c35;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		color: black;
	}

	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0px;
		left: 0px;
		z-index: 9999;
		background-color: rgba(0,0,0,0.25);
	}

</style>

<script>
	import {show_confirm} from './stores'
	export let data = {
		title: "",
		link: ""
	};
	let show = true;

	show_confirm.subscribe(d => {
		show = d.show;
		data = d.data;
	})
</script>

{#if show}
<div class="bg" on:click={_=> show_confirm.update(d => ({...d,show: false}))} ></div>
<div class="confirm">
	<b class="title">{data.title}</b>
	<div class="head">
		<h3>this your link</h3>
		<code on:click={_=> navigator.clipboard.writeText(data.link)}>
			{data.link}
		</code>
		<p>
			or<br/>
			you can click pruchase 
		</p>
	</div>
	<div class="body">
		<button primary on:click={_=> window.location.href = data.link}>
			Purchase
		</button>
		<button danger on:click={_=> show_confirm.update(d => ({...d,show: false}))}>
			Close
		</button>
	</div>
</div>
{/if}
