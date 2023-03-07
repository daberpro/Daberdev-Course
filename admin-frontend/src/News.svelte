
<TopAppBar bind:this={topAppBar} variant="short">
  <MRow>
    <Section>
      <IconButton class="material-icons" data-link link="/">arrow_back</IconButton>
      <Title>Courses</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" on:click={_=> dialog.update(d => true)}>add_circle</IconButton>
      <IconButton class="material-icons">check_box</IconButton>
    </Section>
  </MRow>
</TopAppBar>
<AutoAdjust style="height: fit-content;padding: 10px 20px;padding-top: 100px;" {topAppBar}>
  <DataTable table$aria-label="Todo list" style="width: 100%;">
  <Head>
    <Row>
      <Cell numeric>ID</Cell>
      <Cell style="width: 100%;">Title</Cell>
      <Cell>Price</Cell>
      <Cell numeric>Owner ID</Cell>
    </Row>
  </Head>
  <Body>
    {#each slice as item (item.id)}
      <Row>
        <Cell numeric>{item.id}</Cell>
        <Cell>{item.title}</Cell>
        <Cell>{item.price}</Cell>
        <Cell numeric>{item.ownerId}</Cell>
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
      {start + 1}-{end} of {items.length}
    </svelte:fragment>

    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => (currentPage = 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => currentPage--}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => currentPage++}
      disabled={currentPage === lastPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => (currentPage = lastPage)}
      disabled={currentPage === lastPage}>last_page</IconButton
    >
  </Pagination>
</DataTable>
</AutoAdjust>
<Modal {data}/>
<script>

  const data = {
    title: "Add New Courses",
    field: [
      {
        id: "title",
        detail: "this is course title",
        type: "password",
        label: "title"  
      },
      {
        id: "title",
        detail: "this is course title",
        type: "auto-complete",
        label: "title",
        list: ["Mentor","User"]
      },
      {
        id: "checkbox",
        type: "checkbox",
        label: "check"
      }
    ], 
  };

  import {dialog} from './store'
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

  let items = [];
  let rowsPerPage = 10;
  let currentPage = 0;

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, items.length);
  $: slice = items.slice(start, end);
  $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }

  if (typeof fetch !== 'undefined') {
    // Slice a few off the end to show how the
    // last page looks when it's not full.
    // fetch(
    //   'https://gist.githubusercontent.com/hperrin/e24a4ebd9afdf2a8c283338ae5160a62/raw/dcbf8e6382db49b0dcab70b22f56b1cc444f26d4/todos.json'
    // )
    //   .then((response) => response.json())
    //   .then((json) => (items = json.slice(0, 197)));
  }

  let topAppBar;
</script>

<style>
  /* Hide everything above this component. */
  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
