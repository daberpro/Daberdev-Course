<script>
  import { onMount } from 'svelte';
	
	export let codeValue;
	export let squareSize; 
	export let mt; 
	
  let qrcode;
			
	onMount(() => {

		qrcode = new QRCode("qrcode", {
			text: codeValue,
	  	width: squareSize,
      height: squareSize,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
		});					
	  
	});
</script>

<style>
  #qrcode {
    width:fit-content;
    height:fit-content;
    padding: 10px;
    background-color: white;
    z-index: 5;
    border-radius: 10px;
  }
</style>

<div id="qrcode" style={`margin-top:${mt}px;`}></div>