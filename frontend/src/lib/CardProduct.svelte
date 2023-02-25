
<style>
	
	.card{
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-radius: 20px;
		position: relative;
		z-index: 3;
		cursor: pointer;
		box-shadow: 0px 0px 20px rgba(0,0,0,0.25);
	}


	/*.card:before {
	    content: "";
	    z-index: -1;
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    background: linear-gradient(-45deg, #009688 0%, #130b44 100% );
	    transform: translate3d(0px, 20px, 0) scale(0.95);
	    filter: blur(20px);
	    opacity: 0.2;
	    transition: opacity 0.3s;
	    border-radius: inherit;
	}
	.card:after {
	    content: "";
	    z-index: -1;
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    background: inherit;
	    border-radius: inherit;
	}*/
        

	.card .head{
		width: 100%;
		height: 150px;
		border-radius: 20px 20px 0px 0px;
		position: relative;
		/*background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='350' height='250' preserveAspectRatio='none' viewBox='0 0 350 250'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1040%26quot%3b)' fill='none'%3e%3crect width='350' height='250' x='0' y='0' fill='url(%23SvgjsLinearGradient1041)'%3e%3c/rect%3e%3cpath d='M350 0L344.69 0L350 96.06z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M344.69 0L350 96.06L350 131.61L238.86 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M238.86 0L350 131.61L350 198.25L149.88 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M149.88 0L350 198.25L350 221.07L107.66 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 250L148.13 250L0 219.11z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 219.11L148.13 250L200.93 250L0 107.35000000000001z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 107.35L200.93 250L253.98000000000002 250L0 58.209999999999994z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 58.20999999999998L253.98000000000002 250L289.85 250L0 55.15999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1040'%3e%3crect width='350' height='250' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='7.14%25' y1='-10%25' x2='92.86%25' y2='110%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1041'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 150%2c 136%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
		*/
	}

	.card .head .fa-image {
		position: absolute;
		left: 10px;
		bottom: 10px;
		color: white !important;
	}

	.card .body{
		width: 100%;
		height: fit-content;
		padding: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		background: #282c35;
		border-radius: 0px 0px 20px 20px;
	}

	.card .body b{
		font-family: 'Poppins', sans-serif;
		width: 100%;
		color: #009688;
		text-transform: uppercase;
	}

	.card .body p{
		font-family: 'Varela Round', sans-serif;
		width: 100%;
		color: black;
		margin: 0px;
		padding: 0px;
		color: gray;
		font-weight: 300;
	}

	.card .body .icons{
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	.card .body .icons > *{
		color: gray !important;
	}

	.card .body .icons span{
		color: white !important;
		font-family: 'Poppins', sans-serif;
	}

</style>

<script>
	import {get} from "svelte/store"
	import {show_details,details_info} from './stores'

	export let data = {
		title: "title",
		description: "description",
		price: 0
	}

	let card_head = null;
</script>

<div class="card" on:click={_=>{
	show_details.update(d => !d);
	details_info.update(d =>({
		...data,
		bgColor: getComputedStyle(card_head).background
	}));
}}>
	<div bind:this={card_head} class="head" style={`background: linear-gradient(135deg, hsl(${Math.round(Math.random() * 360)},80%,80%),hsl(${Math.round(Math.random() * 360)},80%,80%));`}>
		<i class="fa-solid fa-image"></i>
	</div>
	<div class="body">
		<b>{data.title}</b>
		<p>{data.description}</p>
		<div class="icons">
			<i class="fa-solid fa-circle-info"></i>
			<span>
				{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.price)}
			</span>
		</div>
	</div>
</div>