<style>
  .file-input{
    width:100%;
    margin-bottom: 20px;

    display: flex;
    justify-content: flex-start;
    align-items:center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .file-input input{
    display:none;
  }

  /*.input-file label[id=inputFile]{
    padding:10px;
    border-radius: 5px;
  }*/
</style>
<Dialog
  bind:this={mdialog}
  bind:open
  on:SMUIDialog:closed={_=> dialog.update(d => false)}
  aria-labelledby="large-scroll-title"
  aria-describedby="large-scroll-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <Title id="large-scroll-title">{data.title}</Title>
  <Content style="padding: 20px;height: calc(100vh - 100px);" id="large-scroll-content">
    {#each (data.field || []) as field, _i}
      {#if field.type === "default"}
        <TextField disabled={field.readonly} style="width: 100%;" bind:value={result[field.id]} variant="outlined" label={field.label}>
          <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
        </TextField>
      {/if}
      {#if field.type === "textarea"}
        <TextField disabled={data.readonly} textarea style="width: 100%;" bind:value={result[field.id]} variant="outlined" label={field.label}>
          <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
        </TextField>
      {/if}
      {#if field.type === "number"}
        <TextField disabled={data.readonly} type="number" style="width: 100%;" bind:value={result[field.id]} variant="outlined" label={field.label}>
          <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
        </TextField>
      {/if}
      {#if field.type === "password"}
        <TextField disabled={data.readonly} type="password" style="width: 100%;" bind:value={result[field.id]} variant="outlined" label={field.label}>
          <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
        </TextField>
      {/if}
      {#if field.type === "email"}
        <TextField disabled={data.readonly} type="email" style="width: 100%;" bind:value={result[field.id]} variant="outlined" label={field.label}>
          <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
        </TextField>
      {/if}
      {#if field.type === "auto-complete"}
        <Autocomplete
          style="margin-bottom: 10px;"
          options={field.list || []}
          textfield$variant="outlined"
          bind:value={result[field.id]}
          label={field.label}
        />
        <HelperText style="margin-bottom: 10px;" slot="helper">{field.detail}</HelperText>
      {/if}
      {#if field.type === "checkbox"}
        <div style="width:fit-content;height:fit-content;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">
          <Checkbox bind:value={result[field.id]}/>
          <span>{field.label}</span>
        </div>
      {/if}
      {#if field.type === "image"}
        <CircularProgress style={`height: 48px; width: 48px;display:${(closed[_i] ?? true)? 'none':'block'};`} progress={progress[_i]} closed={closed[_i] ?? true} />
        <img col={_i} style={`border-radius:10px;object-fit: contain;border: 1px solid rgba(0,0,0,0.25);margin-bottom:20px;display:${(field.current_image.length === 0)? 'none': 'block'}`} src={(field.current_image.length > 0) ? "http://127.0.0.1:8085/course_thumbnail/"+field.current_image : ''} width="300" height="200"/>
        <div class="file-input">
          <Button variant="raised">
            <Label>
              <label for="inputFile">{field.label}</label>
            </Label>
          </Button>
          <p>{Object.keys(result[field.id]).map(d => result[field.id][d].name)}</p>
          <input accept=".jpg,.jpeg,.png,.svg" on:input={d => readFile(d.target,_i)} id="inputFile" type="file" bind:files={result[field.id]} style="margin-bottom: 20px"/>
        </div>
      {/if}

    {/each}
    <p bind:this={warn} style="display: none;color: #e91e63;background: #fce8ef;padding:20px;border-radius: 5px;">
      
    </p>
    <Button on:click={_=>{
      warn.style.display = 'none'
      dialog.update(d => false);
    }} variant="outlined">
      <Label>
        close
      </Label>
    </Button>
    <Button on:click={async _=>{
      const _process = await data.callback(result,warn);
      // console.log(mdialog)
      mdialog.getElement().querySelectorAll('input[type="file"]').forEach(d => {
        d.value = null;
      });
      if(!_process){
        dialog.update(d => true);
        return;
      }
      dialog.update(d => false);
      data.field.forEach(d => result[d.id] = '');
      
    }} variant="outlined">
      <Label>
        {data.action_label}
      </Label>
    </Button>
  </Content>
</Dialog>
<script>
  import Autocomplete from '@smui-extra/autocomplete';
  import Checkbox from '@smui/checkbox';
  import {get} from 'svelte/store'
  import {dialog,input_data} from '../store'
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import TextField from '@smui/textfield'
  import HelperText from '@smui/textfield/helper-text'
  import CircularProgress from '@smui/circular-progress';
  
  export const result = {};

  let progress = [];
  let closed = [];
  function readFile(target,index) {
    let file = target.files[0];
    const reader = new FileReader();
    progress[index] = 0;
    closed[index] = false;
    const img = target
    .parentElement
    .parentElement
    .querySelector(`img[col="${index}"]`)
    img.style.display="none";

    reader.addEventListener('load', (event) => {
      const result = event.target.result;

      closed[index] = true;
      
      img.src = result;
      img.style.display="block";
    
    });

    reader.addEventListener('progress', (event) => {

      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total);
        progress[index] += percent;
      }
    });
    reader.readAsDataURL(file);
  }

  async function createFile(file){
    let response = await fetch('http://127.0.0.1:8085/course_thumbnail/'+(file || '')).catch(console.log);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    return new Promise((res) => res(new File([data], file, metadata)));
  }

  let mdialog = null;
  let warn = null;
  let data = get(input_data);
  input_data.subscribe(d => {
    data = d;
    data.field?.forEach(d =>{
      result[d.id] = d.default_value || '';
      if(d.type === "image" && d.current_image.length > 0){
        createFile(d.current_image)
        .then( e => result[d.id] = [e]);
      }
    });
  })

  let open = false;
  dialog.subscribe(d => {
    open = d;
  });
</script>