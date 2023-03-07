<style>
	.items {
		width: 400px;
		height: 370px;
		border-radius: 10px;
		padding: 10px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;

		background-color: #24272f;

		position: fixed;
		top: 0px;
		right: 0px;
		left: 0px;
		bottom: 0px;
		margin: auto;
		z-index: 9999;

/*		box-shadow: 0px 0px 40px rgba(0,0,0,0.25);*/
	}
	.items > *{
		font-family: 'Varela Round', sans-serif;
	}

	.items .list {
		width: 100%;
		height: calc(100% - 120px);
		overflow-y: auto;
		overflow-x: hidden;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		gap: 5px;
		border-radius: 10px;
	}

	.items .list .item{
		padding: 10px;
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		background-color: #1c1e25;
		border-radius: 10px;
/*		border-bottom: 1px solid rgba(0,0,0,0.25);*/
	}

	.items .list .item .thumbnail{
		width: fit-content;
		height: fit-content;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items:center;
		/*background-repeat: no-repeat;
		background-size: cover;*/
/*		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='350' height='250' preserveAspectRatio='none' viewBox='0 0 350 250'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1040%26quot%3b)' fill='none'%3e%3crect width='350' height='250' x='0' y='0' fill='url(%23SvgjsLinearGradient1041)'%3e%3c/rect%3e%3cpath d='M350 0L344.69 0L350 96.06z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M344.69 0L350 96.06L350 131.61L238.86 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M238.86 0L350 131.61L350 198.25L149.88 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M149.88 0L350 198.25L350 221.07L107.66 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 250L148.13 250L0 219.11z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 219.11L148.13 250L200.93 250L0 107.35000000000001z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 107.35L200.93 250L253.98000000000002 250L0 58.209999999999994z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 58.20999999999998L253.98000000000002 250L289.85 250L0 55.15999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1040'%3e%3crect width='350' height='250' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='7.14%25' y1='-10%25' x2='92.86%25' y2='110%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1041'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 150%2c 136%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");*/
	}

	.items .list .item .thumbnail img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.items .list .item b{
		color: white;
		font-size: 12px;
	}

	.items .list .item span{
		color: gray;
		font-size: 12px;
	}

	.items .list .item button{
		outline: none;
		background-color: transparent;
		color: #e91e63;
		border-radius: 10px;
		padding: 10px;
		border: none;
		font-size: 12px;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		cursor: pointer;
	}

	.items .info{
		width: 100%;
		height: 140px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		padding: 10px 0px;
		padding: 20px;
	}

	.items .info button[primary]{
		width: 45%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		background: #e5f6fd;
		color: #03a9f4 !important;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		color: black;
	}

	.items .info button[danger]{
		width: 45%;
		height: fit-content;
		padding: 15px;
		border-radius: 10px;
		outline: none;
		border: none;
		background: #fce8ef;
		color: #e91e63 !important;
		font-family: 'Varela Round', sans-serif;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		color: black;
	}

	.items .info span{
		width: 100%;
		padding: 10px 0px;
		color: white;
		font-size: 14px;
	}

	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0px;
		left: 0px;
		z-index: 9999;
/*		backdrop-filter: blur(0.2px);*/
		background-color: rgba(0,0,0,0.5);
	}

	@media screen and (min-width: 0px) and (max-width: 650px){
		.items{
			right:0px;
			left:0px;
			top:0px;
			bottom: 0px;
			margin: auto;
			position: fixed;
			height: 100%;
			width: 100%;
			max-height: 100%;
			min-height: fit-content;
		}

		.items .info{
			height: fit-content;
		}
	}

</style>

<script>

	export let items = [];
	import {onMount} from 'svelte'
	import {orderItems} from './count'
	import {show_basket, show_confirm} from './stores'
	let total = 0;
	let show = false;
	let item = [];
	orderItems.subscribe(d =>{
		total = 0;
		item = d;
		console.log(d);
		d.forEach( e=> total += e.price);
	});
	show_basket.subscribe(d =>{
		show = d;
	});

	// onMount(()=>{
	// 	console.log(items,item)
	// })

</script>

{#if show}
<div class="bg" on:click={_=> show_basket.update(d => false)}></div>
<div class="items">
	<div class="list">
		{#if items.length === 0}
			<h2 style="color: white;margin: 0px;padding: 0px; margin-top: 30%;">Nothing here..</h2>
			<span style="color: gray;">please add some item to checkout</span>
		{/if}
		{#each items as data, i}
			<div class="item">
				<div class="thumbnail">
					<img src={'http://127.0.0.1:8085/course_thumbnail/'+(data.thumbnail.length === 0? 'default.png' : data.thumbnail)}/>
				</div>
				<b>{data.title}</b>
				<span>
					{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.price)}
				</span>
				<button on:click={_=> orderItems.update(d =>{
					d.splice(i,1);
					return d;
				})}>
					delete
				</button>
			</div>
		{/each}
	</div>
	<div class="info">
		<span>
			<small>total</small><br/>
			{
				new Intl
				.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
				.format(total)
			}
		</span>
		<button style={total > 0? '' : `filter:blur(3px)`} primary on:click={async _=>{
			if(total !== 0){
				
				const user_data = {
					first_name: "Ari",
			        last_name: "Susanto",
			        email: "daber.programing@gmail.com",
			        phone: "082154733569",
			        total_biling: total,
			        item_details: item.map((d,i) =>{
		        	  return {
					    "id": i,
					    "price": d.price,
					    "quantity": 1,
					    "name": d.title,
					    "brand": "Daberdev",
					    "category": "programming",
					    "merchant_name": "Daberdev",
					    "url": `https://daberdev.dab/${d.title}#programming`
					  }
			        })
				}

				const response = await fetch(`http://${location.hostname}:8081/api/v1/pay`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(user_data)
				});

				if(response.ok){
					const result = await response.json();
					// console.log(result)
					localStorage.setItem("daberdev-payment",JSON.stringify({token: result.token, current_order: result.order_id}));
					const token = JSON.parse(localStorage.getItem("daberdev-tokens")).token

					const store = await fetch(`http://${location.hostname}:8083/new-order`,{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer "+ token
						},
						body: JSON.stringify({items: item,order_id: result.order_id})
					}).catch(console.log);

					show_confirm.update(d => ({
						...d,
						show: true,
						data:{
							title: "purchase",
							link: result.redirect_url,
						}
					}))
				}else{
					show_confirm.update(d => ({...d,show: false}))
				}
			}
		}}>checkout</button>
		<button danger on:click={_=> show_basket.update(d => false)}>close</button>
	</div>
</div>
{/if}