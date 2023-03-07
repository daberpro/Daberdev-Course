
<style>
	
	.card{
		max-width: calc(30% + 300px);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
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
		height: fit-content;
		border-radius: 20px 20px 0px 0px;
		position: relative;
	}

	.card .head img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px 20px 0 0;
	}

	.card .head .fa-image {
		position: absolute;
		left: 10px;
		bottom: 10px;
		color: white !important;
	}

	.card .body .mentor{
		width: 100%;
		height: fit-content;
		padding: 0px 0px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;

		background-color: #2f3e4c;
		padding: 15px;
		border-radius: 10px;
	}

	.card .body .mentor img{
		width: 50px;
		height: 50px;
		border-radius: 100%;
	}

	.card .body .mentor .detail{
		width: fit-content;
		height: fit-content;
		padding: 0px 0px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		gap: 2px;
	}

	.card .body .mentor .detail span:first-child{
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: bold;
		color: silver;
	}

	.card .body .mentor .detail span:last-child{
		font-family: 'Poppins', sans-serif;
		font-size: 12px;
		color: silver;
		width: 200px;
		word-break: break-word;
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
		gap: 10px;
		border-radius: 0px 0px 20px 20px;
	}

	.card .body b{
		font-family: 'Poppins', sans-serif;
		width: 100%;
		color: white;
		text-align: left;
		padding:0px 20px;
		text-transform: uppercase;
	}

	.card .body p{
		font-family: 'Varela Round', sans-serif;
		width: 90%;
		color: black;
		margin: 0px;
		padding: 10px 0px;
		color: gray;
		font-size: 15px;
		font-weight: 300;
	}

	.card .body .icons{
		margin-top: 30px;
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
		color: silver !important;
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

<div data-aos="fade-up" class="card" on:click={_=>{
	show_details.update(d => !d);
	details_info.update(d =>({
		...data,
		bgColor: getComputedStyle(card_head).background
	}));
}}>
	<!-- for gardient hsl background -->
	<!-- style={`background: linear-gradient(135deg, hsl(${Math.round(Math.random() * 360)},80%,80%),hsl(${Math.round(Math.random() * 360)},80%,80%));`} -->
	<div bind:this={card_head} class="head">
		<img src={'http://127.0.0.1:8085/course_thumbnail/'+(data.thumbnail.length === 0? 'default.png' : data.thumbnail)}/>
		<i class="fa-solid fa-image"></i>
	</div>
	<div class="body">
		<b>{data.title}</b>
		<div class="mentor">
			<span style="width:100%;font-family: 'Poppins',sans-serif;font-size: 12px;color:white;">mentor</span>
			<img src={data.avatar} alt={`${data.username} avatar`}/>
			<div class="detail">
				<span>{data.name}</span>
				<span>@{data.username}</span>
			</div>
		</div>
		<p>{(data.description ?? "").slice(0,44)+((data.description ?? "").length > 44 ? "..." : '')}</p>
		<div class="icons">
			<i class="fa-solid fa-circle-info"></i>
			<span>
				{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.price)}
			</span>
		</div>
	</div>
</div>