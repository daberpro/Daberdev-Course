<svelte:head>
  <style>
    #app{
      background-color: white;
      height: fit-content;
    }
  </style>
</svelte:head>
<style>
  a{
    text-decoration: none;
  }
  .tools{
    width: 100%;
    height: fit-content;
    padding: 20px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;

    gap: 10px;
  }
  .toolbar{
    width: 100%;
    height: fit-content;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 5px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  /*:global(.mdc-data-table__cell){
    color: white;
  }
*/
  /* Hide everything above this component. */
  :global(.mdc-top-app-bar--short-collapsed){
    width:160px !important;
  }

  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>

<TopAppBar bind:this={topAppBar} variant="short">
  <MRow>
    <Section>
      <IconButton class="material-icons" data-link link="/">arrow_back</IconButton>
      <Title>Courses</Title>
    </Section>
    <Section style="margin-left: 40px;" align="end" toolbar>
      <IconButton class="material-icons" on:click={_=>{
        input_data.update(d => data);
        dialog.update(d => true);
      }}>add_circle</IconButton>
      <IconButton class="material-icons" on:click={_=>{
        if (select[0]){
          select = [...select.map(d => false)]
          selected = [];
          return;
        };
        select = [...select.map(d => true)];
        selected = items.map(d => d._id);
      }}>check_box</IconButton>
    </Section>
  </MRow>
</TopAppBar>
<AutoAdjust style="height: fit-content;padding: 10px 20px;padding-top: 100px;" {topAppBar}>
  <div class="tools">
    <a on:click={({target})=> _download_csv(target.parentElement.parentElement,items)}>
      <Button style="background-color: #673ab7;" variant="raised">
        <Label>Download CSV</Label>
      </Button>
    </a>
    <Button on:click={_=> _delete(selected,rowsPerPage)} style="background-color: #e91e63;" variant="raised">
      <Label>Delete Selected</Label>
    </Button>
  </div>
  <div class="toolbar">
    <TextField on:keydown={async e =>{
      if(e.key === 'Enter'){
        await _search();
      }
    }} style="width:calc(100% - 60px);" label="search" variant="outlined" bind:value={toolbar.search}/>
    <IconButton on:click={async e =>{
        await _search();
    }} class="material-icons">search</IconButton>
  </div>
  <DataTable table$aria-label="Todo list" style="width: 100%;margin-bottom: 50px;">
  <Head>
    <Row>
      <Cell>No</Cell>
      <Cell>ID</Cell>
      <Cell>Title</Cell>
      <Cell>Price</Cell>
      <!-- <Cell>Description</Cell> -->
      <Cell>Owner ID</Cell>
      <Cell>Owner Avatar</Cell>
      <Cell> </Cell>
      <Cell>Action</Cell>
    </Row>
  </Head>
  <Body>
    {#each items as item, _i}
      <Row>
        <Cell>{start + _i+1}</Cell>
        <Cell no={_i}>{item._id}</Cell>
        <Cell style="font-weight: bold;"><span style="width: 150px !important;white-space: normal;word-wrap: break-word;display:inline-block;">{item.course_name}</span></Cell>
        <Cell style="color:#009688;font-weight: bold;">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.course_price)}</Cell>
        <!-- <Cell><span style="padding: 10px;text-align: justify;width: 250px !important;word-wrap: break-word;white-space: normal;display: inline-block;">{item.course_description}</span></Cell> -->
        <Cell>{item.owner?._id}</Cell>
        <Cell style="text-align: center;">
          <img style="margin: 10px 0px;width:50px;height:50px;border-radius: 100%;" src={item.owner?.avatar}/>
        </Cell>
        <Cell>
          <Checkbox 
            on:change={({target})=>{
              const id = target
                        .parentElement
                        .parentElement
                        .parentElement
                        .querySelector(`td[no="${_i}"]`)
                        .textContent;
              if(target.checked) return selected[_i] = id;
              delete selected[_i];

            }} 
            bind:checked={select[_i]}
          /></Cell>
        <Cell>
          <Button on:click={_=>{
            update.title = 'update '+item.course_name;
            update.field[0].default_value = item._id;
            update.field[1].default_value = item.course_name;
            update.field[2].default_value = item.course_price;
            update.field[3].default_value = item.course_description;
            update.field[update.field.length-1].current_image = item.thumbnail;
            input_data.update(d => update);
            dialog.update(d => true);
          }} variant="outlined">
            <Label>
              Update
            </Label>
          </Button>
        </Cell>
      </Row>
    {/each}
  </Body>

  <Pagination slot="paginate">
    <svelte:fragment slot="rowsPerPage">
      <Label>Rows Per Page</Label>
      <Select variant="outlined" bind:value={rowsPerPage} noLabel>
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={100}>100</Option>
      </Select>
    </svelte:fragment>
    <svelte:fragment slot="total">
      {start+1}-{end} of {lastPage}
    </svelte:fragment>

    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={async () => await page(_=> 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={async () => await page(_=> currentPage-=1)}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={async () => await page(_=> currentPage+=1)}
      disabled={currentPage === endPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={async () => await page(_=> endPage)}
      disabled={currentPage === endPage}>last_page</IconButton
    >
  </Pagination>
</DataTable>
</AutoAdjust>
<Modal/>
<script>
  import TextField from '@smui/textfield'
  import Checkbox from '@smui/checkbox';
  import {onMount} from 'svelte';
  import {dialog,input_data} from './store'
  import Modal from './lib/Modal.svelte'
  import TopAppBar, {
    Row as MRow,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Button, {Label} from '@smui/button';
  import Select, { Option } from '@smui/select';
  import DataTable, {
    Head,
    Body,
    Row,
    Cell,
    Pagination,
  } from '@smui/data-table';

  // for receive value of checkbox
  let select = [];
  // for get any data of field that was checked
  let selected = [];
  const toolbar = {
    search: ''
  }

  async function page(clb){
    currentPage = clb();
    start = rowsPerPage * currentPage;

    if(start+rowsPerPage <= lastPage){
      end = lastPage - (start+rowsPerPage);
    }else{
      end = lastPage;
    }

    if(start >= lastPage) return;

    const getData = await fetch(`http://127.0.0.1:8084/courses/`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
      },
      body: JSON.stringify({
        range: {
          start,
          count: rowsPerPage
        } 
      })
    }).catch(console.log);

    if(getData.ok){
      const {data,totalLength} = await getData.json().catch(console.log);
      items = [...data];
      lastPage = totalLength;
      
    }else{
      alert('somenthing wrong!');
    }

  }

  let items = [];
  let start = 0;
  let rowsPerPage = 10;
  let end = start+rowsPerPage;
  let currentPage = 0;
  let lastPage = 0; 
  let endPage = 0;

  const data = {
    action_label: "add",
    async callback(result){
      const data = await fetch(`http://127.0.0.1:8084/courses/add`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
        },
        body: JSON.stringify({input: result})
      }).catch(console.log);

      if(data.ok){

        const status = await data.json().catch(console.log);
        if (status.status === 'success'){
          await _callback();
          return true;
        }
      }else{
        alert('somenthing wrong!');
        return false;
      }

      return true;
    },
    title: "Add New Courses",
    field: [
      {
        id: "course_name",
        detail: "course name",
        type: "default",
        label: "name"  
      },
      {
        id: "course_price",
        detail: "course price",
        type: "number",
        label: 'price'  
      },
      {
        id: "course_description",
        detail: "course details",
        type: "textarea",
        label: "description"  
      },
    ], 
  };
  const update = {
    current_index: null,
    action_label: "save",
    async callback(result,warn){

      const _data = {...result};
      const input = new FormData();
      // console.log(_data);

      if(_data['course_thumbnail'] && _data['course_thumbnail'].hasOwnProperty('0') && (_data['course_thumbnail'][0].size / 1000) > 50){

        warn.style.display = 'block';
        warn.innerText = 'image size must <= 50KB but file input has size '+ Math.round(_data['course_thumbnail'][0].size / 1000) + 'KB';

        return false;
      }

      Object.keys(_data).forEach(d =>{
        if(d === 'course_thumbnail') return input.append(d,_data[d][0]);
        input.append(d,_data[d])
      });

      const data = await fetch(`http://127.0.0.1:8084/courses/update`,{
        method: 'POST',
        headers:{
          'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
        },
        body: input
      }).catch(console.log);

      if(data.ok){
        const status = await data.json().catch(console.log);
        if (status.status === 'success'){
          await _callback();
        }
        items[this.current_index] = {
          ...items[this.current_index],
          ..._data
        };
        return true;
      }else{
        alert('somenthing wrong!');
        return false;
      }
    },
    title: "Update Course",
    field: [
      {
        id: "_id",
        detail: "course id",
        type: "default",
        label: "course id",
        readonly: true
      },
      {
        id: "course_name",
        detail: "course name",
        type: "default",
        label: "name"
      },
      {
        id: "course_price",
        detail: "course price",
        type: "number",
        label: 'price'  
      },
      {
        id: "course_description",
        detail: "course details",
        type: "textarea",
        label: "description"  
      },
      {
        id: "course_thumbnail",
        detail: "course thumbnail",
        type: "image",
        label: "thumbnail",
        current_image: "" 
      }
    ], 
  };
  async function _search(){
    const _data = await fetch(`http://127.0.0.1:8084/courses/search`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
      },
      body: JSON.stringify({
        search: toolbar.search
      })
    }).catch(console.log);

    if(_data.ok){
      const {data,totalLength} = await _data.json().catch(console.log)
      items = [...data];
      
    }else{
      alert('somenthing wrong!');
    }
  }

  function _download_csv(target,data){
    const header = Object.keys(data[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName =>{
            const data = row[fieldName];
            if(typeof data !== 'object') return data;
            if(fieldName === "owner"){
              return row[fieldName]._id;
            }
        })
        .join(','))
    ].join('\r\n');

    const myblob = new Blob([csv],{type: "text/csv"});
    const url = URL.createObjectURL(myblob);
    target.href = url;
    target.download = "Course Data "+ new Date()+".csv";
    URL.revokeObjectURL(url);

  }

  async function _delete(cours,count){
    const _data = await fetch(`http://127.0.0.1:8084/courses/delete`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
      },
      body: JSON.stringify({
        ids: cours,
        count
      })
    }).catch(console.log);

    if(_data.ok){
      const {data,totalLength} = await _data.json().catch(console.log)
      items = [...data];
      lastPage = totalLength;
      endPage = parseInt(lastPage/rowsPerPage);
      selected = [];
      select = [...select.map(d => false)];

    }else{
      alert('somenthing wrong!');
    }
  }

  async function _callback(result){
    const _data = await fetch(`http://127.0.0.1:8084/courses/`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('daberdev-tokens')).token
      },
      body: JSON.stringify({
        range: {
          start,
          count: rowsPerPage
        } 
      })
    }).catch(console.log);

    if(_data.ok){
      const {data,totalLength} = await _data.json().catch(console.log);
      items = [...data];
      lastPage = totalLength;
      endPage = parseInt(lastPage/rowsPerPage);

      if(rowsPerPage > lastPage){
        rowsPerPage = lastPage;
        end = lastPage;
      }

    }else{
      alert('somenthing wrong!');
    }
  }

  onMount(async ()=>{
    await _callback();
    select = [...select.map(d => false)];
  });

  let topAppBar;
</script>
