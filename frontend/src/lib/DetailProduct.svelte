<style>
	.detail-product{
		min-width: 270px;
		max-width: 350px;
		min-height: fit-content;
		max-height: 90%;
		height: fit-content;
/*		height: 90%;*/
/*		overflow-y: auto;*/
		width: auto;
		position: fixed;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		margin: auto;
		z-index: 99999;
		background-color: #282c35;
/*		padding: 30px;*/
		border-radius: 20px;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		box-shadow: 0px 0px 0px 5000px rgba(0,0,0,0.5);
	}

	.detail-product:before{
		content: '';
		position: absolute;
		width: 100px;
		height: 50px;
		background-color: #009688;
		left: -22px;
		top: 25px;
		border-radius: 10px;
		transform: rotate(45deg);
		box-shadow: 0px 3px 10px #003c36;
	}

	.detail-product:after{
		content: 'Daberdev Course';
		font-family: 'Poppins', sans-serif;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: fit-content;
		padding:0px 20px;
		height: 50px;
		background-color: #009688;
		left: -21px;
		top: -14px;
		border-radius: 10px 10px 10px 0px;
		box-shadow: 0px 3px 10px #003c36;
	}

	.detail-product > *{
		font-family: 'Varela Round', sans-serif;
	}

	.detail-product .head{
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: #1e1e1e;
		border-radius: 20px 20px 0 0;
	}

	.detail-product .head .thumbnail{
		width: 100%;
		height: 200px;
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 20px 20px 0px 0px;
		position: relative;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='350' height='250' preserveAspectRatio='none' viewBox='0 0 350 250'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1040%26quot%3b)' fill='none'%3e%3crect width='350' height='250' x='0' y='0' fill='url(%23SvgjsLinearGradient1041)'%3e%3c/rect%3e%3cpath d='M350 0L344.69 0L350 96.06z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M344.69 0L350 96.06L350 131.61L238.86 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M238.86 0L350 131.61L350 198.25L149.88 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M149.88 0L350 198.25L350 221.07L107.66 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 250L148.13 250L0 219.11z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 219.11L148.13 250L200.93 250L0 107.35000000000001z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 107.35L200.93 250L253.98000000000002 250L0 58.209999999999994z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 58.20999999999998L253.98000000000002 250L289.85 250L0 55.15999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1040'%3e%3crect width='350' height='250' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='7.14%25' y1='-10%25' x2='92.86%25' y2='110%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1041'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 150%2c 136%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
	}

	.detail-product .head .thumbnail img{
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 20px 20px 0 0;
	}

	.detail-product .head .thumbnail #i{
		position: absolute;
		bottom: 20px;
		left: 20px;
		color: white;
		font-size: 20px;
	}

	.detail-product .head b{
		width: 100%;
		padding: 5px 20px;
		font-size: 16px;
		color: white;
		padding-top: 10px;
		font-family: 'Poppins', sans-serif;
		text-transform: uppercase;
		background-color: #282c35;
		border-radius: 20px 20px 0 0;
	}

	.detail-product .head .category{
		width: 100%;
		padding: 5px 20px;
		font-size: 13px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		font-weight: 300;
		background-color: #282c35;
		font-family: 'Poppins', sans-serif;
	}

	.detail-product .head .category span{
		width: fit-content;
		padding: 5px;
		color: white;
		border-radius: 5px;
		background-color: gray;
/*		font-size: 18px;*/
	}

	.detail-product .body{
		width: 100%;
		height: fit-content;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10px;
		padding-bottom: 20px;
	}

	.detail-product .body p{
		color: silver;
/*		text-align: justify;*/
		font-size: 13px;
		padding: 0px 10px;
		margin: 0px;
	}

	.detail-product .body .info{
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
	}

	.detail-product .body .info span{
		color: #cbeae7;
		padding: 0px 20px;
		padding-bottom: 20px;
/*		text-align: justify;*/
	}

	.detail-product .body .action {
		width: 100%;
		height:fit-content;
		flex-wrap: wrap;
		display: flex;
		justify-content: flex-start;
		align-items:center;
		gap: 10px;
		padding: 0px 10px;

	}

	.detail-product .body .action button:first-child{
		width: 48%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		background: #e5f4f3;
		color: #009688;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
	}

	.detail-product .body .action button:last-child{
		width: 48%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		color:#e91e63;
		background-color: #fce8ef;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
	}

	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0px;
		left: 0px;
		backdrop-filter: blur(1px);
		z-index: 9999;
		background-color: rgba(0,0,0,0.25);
	}

	#close-det{
		position: absolute;
		right: 12px;
		top: 12px;
		color: #e91e63;
		font-size: 1.2rem;
		cursor: pointer;
	}
	@media screen and (min-width: 0px) and (max-width: 650px){
		.detail-product{
			min-height: 100%;
			max-height: 100%;
			height: 100%;
			border-radius: 0px;
			padding: 20px;
			padding-top: 40px;
		}
	}
</style>

<script>
	import { elasticOut } from 'svelte/easing'
	import { fade,fly } from 'svelte/transition'
	import { get } from 'svelte/store'
	import { show_details, details_info } from './stores'
	import { orderItems } from "./count"
	let show_detail = false;
	let detail_info = {};

	show_details.subscribe(value => {
		show_detail = value;
	});

	details_info.subscribe(value =>{
		detail_info = value;
	});

	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}

</script>

{#if show_detail}
/*
custom animation

in:whoosh
out:fade
*/
<div on:click={_=> show_details.update(d => !d)} class="bg"></div>
<div 
	class="detail-product"
>
	<!-- <span on:click={_=> show_details.update(d => !d)}>
	<i id="close-det" class="fa-solid fa-circle-xmark"></i>
	</span> -->
	<div class="head">
		<div style={`background: ${detail_info.bgColor};`} class="thumbnail">
			<img src={'http://127.0.0.1:8085/course_thumbnail/'+(detail_info.thumbnail.length === 0? 'default.png' : detail_info.thumbnail)}/>
			<i id="i" class="fa-solid fa-image"></i>
		</div>
		<b>{detail_info.title}</b>
		<div class="category">
			<span>{detail_info.category || 'any'}</span>
		</div>
	</div>
	<div class="body">
		<p>{detail_info.description}</p>
		<div class="info">
			<span>
				{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(detail_info.price)}
			</span>
		</div>
		<div class="action">
			<button on:click={_=>{
				show_details.update(d => !d);
				orderItems.update(d => [...d,detail_info])
			}}>Add item</button>
			<button on:click={_=> show_details.update(d => !d)}>Close</button>
		</div>
	</div>
</div>
{/if}
