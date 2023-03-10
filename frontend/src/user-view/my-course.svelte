<svelte:head>
	<style>
		html,body,#app{
			background-color: #282c35 !important;
		}

		#app{
			height: fit-content;
		}
	</style>
</svelte:head>
<style>
	.header{
		width: 100%;
		height: fit-content;
		padding: 20px 40px;
	}

	.header h1{
		margin: 0px;
		padding: 0px;
		color: silver;
	}
	.products{
	    width: 100%;
	    height: 100%;
	    display: grid;
	    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
	    gap: 20px;
	    justify-items: center;
	    background-color: #282c35;
	    padding: 20px 40px;
	    align-items: start;
	    justify-content: center;
/*	    margin-bottom:40px;*/
	    position: relative;
  }

  .container-cours {
    width: fit-content;
    height:fit-content;
    padding:10px;
    display: flex;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    margin: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  .container-cours h1{
    color:white;
    margin: 0px;
    padding: 0px;
    text-align: center;
  }

  .container-cours p{
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color:gray;
    margin: 0px;
    padding: 0px;
  }

  span[btn]{
		font-family: 'Poppins', sans-serif;
		font-size: 13px;
		color: white;
		cursor: pointer;
		background-color: #cbeae7;
		padding: 15px 10px;
		border-radius: 10px;
		color: #009688;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-wrap:wrap;
		gap: 10px;
	}

  .action{
		width:100%;
		height: fit-content;
		padding:20px 40px;
		display:flex;
		justify-content:flex-start;
		align-items:center;
		flex-wrap:wrap;
		gap: 20px;
		background-color: #282c35;
	}

	.action h2{
		cursor: pointer;
		color: white;
	}
</style>
<script>
	import {user_data} from '../lib/stores'
	import Card from './course-card.svelte';
	import {get} from 'svelte/store'
	import {onMount} from 'svelte'
	let cours = [];
	let userData = get(user_data);
	userData.order_history?.order_history?.forEach(d =>{
	  	cours = [...cours,...d.courses];
  })

	onMount(async () => {

		if(Object.keys(userData).length === 0){
		  

	        if(!localStorage.hasOwnProperty('daberdev-tokens')) return location.href = `http://${location.hostname}:5173/login`;  
	        const tokens = JSON.parse(localStorage.getItem("daberdev-tokens"));
	        
	        let data = await fetch("http://daberdev.id:8083/profile",{
	            method: "GET",
	            headers:{
	                "Content-Type":"application/json",
	                "Authorization":"Bearer "+tokens.token
	            }
	        }).catch(d => console.log(""));

	        if(data.ok){
	          userData = await data.json().catch(d => console.log(d));
	          user_data.update(d => userData);
	          userData.order_history?.order_history?.forEach(d =>{
						  cours = [...cours,...d.courses];
					  })
	          return;
	        }

	        data = await fetch("http://daberdev.id:8083/token",{
	            method: "GET",
	            headers:{
	                "Content-Type":"application/json",
	                "Authorization":"Bearer "+tokens.refreshToken
	            }
	        }).catch(d => console.log(""));

	        if(data.ok){
	          const result = await data.json().catch(d => console.log(d));
	          localStorage.setItem("daberdev-tokens",JSON.stringify({token: result.token,refreshToken: tokens.refreshToken}));
	          
	          data = await fetch("http://daberdev.id:8083/profile",{
	              method: "GET",
	              headers:{
	                  "Content-Type":"application/json",
	                  "Authorization":"Bearer "+tokens.token
	              }
	          }).catch(d => console.log(""));

	          if(data.ok){
	            userData = await data.json().catch(d => console.log(d));
	            user_data.update(d => userData);
	            location.reload();
	            return;
	          }else{
	            location.reload();
	          }

	        }else if(data.status === 403){
	          location.href = `http://${location.hostname}:5173/login`;
	        }

	        // location.reload();

		}

	});

</script>
<div class="action">
	<h2 data-link href="/">Daberdev</h2>
	<span btn data-link href="/profile">
		<i class="fa-solid fa-house"></i>
		Back to Profile
	</span>
	<span btn data-link href="/profile/order-history">
		<i class="fa-solid fa-note-sticky"></i>
		Order History
	</span>
</div>
<div class="header">
	<h1>Your course</h1>
</div>
<div class="products" data-aos="fade-up">
	{#if cours.length === 0}
	  <div class="container-cours">
	    <h1>There is no course yet</h1>
	    <p>
	      Please buy some course
	    </p>
	  </div>
	{:else}
	  {#each cours as _i}
	    <Card data={{_id: _i._id,thumbnail:_i.thumbnail,name: _i.owner.name,username:_i.owner.username,avatar:_i.owner.avatar,title: _i.course_name, description: _i.course_description,price: _i.course_price}}/>
	  {/each}
	{/if}
</div>