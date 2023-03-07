<style>
    .input-contain{
        width: 100%;
        height: fit-content;
        position: relative;
        background-color: #282c35;
    }
    input{
        width: 100%;
        padding: 15px;
        border: 2px solid rgba(255,255,255,0.25);
        border-radius: 1rem;
        background-color: #282c35;
        color: white;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
    }
    .placeholder-text{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 3px solid transparent;
        background-color: transparent;
        display: flex;
        align-items: center;
    }
    .placeholder-text{
        pointer-events: none;
    }
    .text{
        font-size: 15px;
        padding: 0 0.5rem;
        background-color: transparent;
        color: white;
        font-family: 'Poppins', sans-serif;
    }

    .placeholder-text{
        font-size: 13px;
        padding: 0 15px;
        color: #009688;
    }

    input:focus{
        outline: none;
        border-color: rgba(255,255,255,0.25);
    }

    input:focus + .placeholder-text .text{
        background-color: #282c35;
        font-size: 1.1rem;
        color: black;
        transform: translate(0, -170%);
        border-color: rgba(255,255,255,0.25);
        color: #009688;
    }

    .text{
        transform: translate(0);
        transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out;
    }

    input:focus + .placeholder-text .text, :not(input[mvalue=""]) + .placeholder-text .text{
        background-color: #282c35;
        font-size: 13px;
        color: white;
        transform: translate(0, -140%);
    }

    input:focus + .placeholder-text .text{
        border-color: rgba(255,255,255,0.25);
        color: white;
    }
</style>
<script>
   let value = "";
   export let label = ""
   export let width = null
   export let element = null;
   export let getValue = ()=>{};
</script>

<div search-courses id={$$props.id || ''} bind:this={element} class="input-contain" style={width? `width: ${width};` : ''}>
    <input on:input={d => getValue(d.target.value)} bind:value={value} type="text" id="fname" name="fname" autocomplete="off" mvalue={value} aria-labelledby="placeholder-fname">
    <label class="placeholder-text" for="fname" id="placeholder-fname">
        <div class="text">{label}</div>
    </label>
</div>