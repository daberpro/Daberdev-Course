<script>
  import svelteLogo from './assets/svelte.svg'
  import Header from './lib/Header.svelte'
  import Card from './lib/CardProduct.svelte'
  import OrderItems from './lib/OrderItems.svelte'
  import Items from './lib/Items.svelte'
  import DetailProduct from './lib/DetailProduct.svelte'
  import Confirm from './lib/Confirm.svelte'
  import {get} from 'svelte/store'
  import {user_data} from './lib/stores'
  import {orderItems} from './lib/count'
  import {onMount} from 'svelte'
  import primaryBg from './assets/primary-bg.svg'
  import TextField from './lib/TextField.svelte'

  let items = [];
  orderItems.subscribe((data)=>{
    items = data;
  });

  let tokens = {};
  let search = null;
  let userData = get(user_data);
  let cours = [];

  async function getCours(){
    const {token} = JSON.parse(localStorage.getItem('daberdev-tokens'));
    const data = await fetch(`http://${location.hostname}:8083/cours`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      }
    }).catch(console.log);

    if(data.ok){
      const results = await data.json().catch(console.log);
      cours = results;

      // console.log(cours)
    }else{
      console.log('failed get Courses');
      location.reload();
    }
  }

  onMount(async () => {

    if(Object.keys(userData).length === 0){
      if(tokens.token){
        localStorage.setItem("daberdev-tokens",JSON.stringify(tokens));
        location.href = `http://${location.hostname}:5173/profile`;
      }else{

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
          await getCours();
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
            await getCours();
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
    }else{
      await getCours();
    }

    
  });


</script>

<style>
  .main .products{
    width: 95%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    gap: 20px;
    justify-items: center;
    background-color: #282c35;
    padding: 40px;
    border-radius: 20px;
    align-items: start;
    justify-content: center;
    margin-bottom:40px;
  }
  .main .title{
    width:90%;
    padding: 20px 40px;
    margin: 0px;
    color: #282c35;
    --image: '';
    z-index:3 !important;
    position: relative;
    height: fit-content;
    background-color: #e5f4f3;
    font-size: 2rem;
  /*    font-family: 'Varela Round', sans-serif;*/
  }
  .main .bg1{
    width: 100%;
    height: 240px;
    background-color: #282c35;
    background-image: var(--image);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .main{
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: #e5f4f3;
  }

  .main .banner{
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: #282c35;
    padding: 20px 0px;
  }

  .main .banner h1{
    color: white;
    margin: 0px;
    padding: 0px;
    font-size: calc(3rem + 1vw);
  }
  .main .banner p{
    font-family: 'Varela Round', sans-serif;
    color: white;
    font-size: calc(1rem + 0.3vw);
  }

  .main .banner .input{
    margin-top: 40px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .main .banner .input span[btn]{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #e5f4f3;
    color: #009688;
    cursor: pointer;
    border-radius: 10px;
  }

  :global([id=search]) {
      width: 300px !important;
  }

  .container-cours {
    width: 100%;
    height:fit-content;
    padding:10px;
    display: flex;
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

  @media screen and (min-width: 0px) and (max-width: 650px){
    .main .banner h1,.main .banner p{
      text-align: center;
      padding: 20px;
    }
    :global([id=search]) {
        width: 70% !important;
    }
    .main .products{
      padding: 40px 20px;
      border-radius: 10px;
    }
  }

  footer{
    width: 100%;
    height: fit-content;
    padding: 20px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: gray;
  }

  footer b{
    color: black;
  }

  footer span{
    color: rgba(0,0,0,0.75);
    font-weight: bold;
  }

  footer .alias{
    color: #009688;
  }
</style>
<div class="main">
  <Header brand_name="Daberdev" />
  <OrderItems />
  <div class="banner">
    <h1 data-aos="fade-left">Find out our courses</h1>
    <p data-aos="fade-right">" Your future is determined by what you start today. "</p>
    <div class="input" data-aos="fade-up">
      <TextField id="search" bind:element={search} label="Search" />
      <span btn>
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
  </div>
  <div class="bg1" style={`--image: url("${primaryBg}")`}></div>
  <h2 class="title" data-aos="fade-up"># Our Course</h2>
  <div class="products" data-aos="fade-up">
    {#if (cours.message || (cours instanceof Array && cours.length === 0))}
      <div class="container-cours">
        <h1>
          {
            cours.message? "Congratulations" :  "There is no content yet"
          }
        </h1>
        <p>
          {
            cours.message? cours.message :  "Please waiting.."
          }
        </p>
      </div>
    {:else}
      {#each cours as _i}
        <Card data={{_id: _i._id,thumbnail:_i.thumbnail,name: _i.owner.name,username:_i.owner.username,avatar:_i.owner.avatar,title: _i.course_name, description: _i.course_description,price: _i.course_price}}/>
      {/each}
    {/if}
  </div>
  <!-- <img class="bg1" src={primaryBg}/> -->
  <DetailProduct/>
  <Items items={items}/>
  <Confirm/>
</div>
<footer>
  <span>&copy;2023-2024</span> <br/>
  <p>Made By 
    <b>Ari Susanto</b>
    <span class="alias">(Daber)</span>
     with <i class="fa-regular fa-heart"></i>
   </p> 
</footer>