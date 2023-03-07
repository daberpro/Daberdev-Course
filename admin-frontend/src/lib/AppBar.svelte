<TopAppBar bind:this={topAppBar} variant="short">
  <Row>
    <Section>
      <IconButton class="material-icons">menu</IconButton>
      <Title>Daberdev</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons">logout</IconButton>
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust style="height: fit-content;padding: 10px 20px;padding-top: 100px;" {topAppBar}>
  <slot></slot>
</AutoAdjust>

<script>
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Button, {Label} from '@smui/button';

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
