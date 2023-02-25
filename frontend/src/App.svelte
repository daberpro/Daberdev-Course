<script>
  import svelteLogo from './assets/svelte.svg'
  import Header from './lib/Header.svelte'
  import Card from './lib/CardProduct.svelte'
  import OrderItems from './lib/OrderItems.svelte'
  import Items from './lib/Items.svelte'
  import DetailProduct from './lib/DetailProduct.svelte'
  import Confirm from './lib/Confirm.svelte'
  import {get} from 'svelte/store'
  import {orderItems} from './lib/count'

  let items = [];
  orderItems.subscribe((data)=>{
    items = data;
  })
</script>

<style>
  .products{
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    gap: 20px;
    justify-items: center;
    background-color: #282c35;
    padding: 20px;
  }
  .title{
    width:100%;
    padding: 10px 40px;
    margin: 0px;
    color: white;
/*    font-family: 'Varela Round', sans-serif;*/
  }
</style>

<Header brand_name="Daberdev" />
<OrderItems />
<h2 class="title">My Products</h2>
<div class="products">
  {#each new Array(10).fill(0).map((d,i) => i+1) as _i}
    <Card data={{title: _i, description: `this is card ${_i}`,price: _i*1}}/>
  {/each}
</div>
<DetailProduct/>
<Items items={items}/>
<Confirm/>
