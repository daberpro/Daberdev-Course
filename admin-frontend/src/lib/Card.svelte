<script>
  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
    ActionIcons,
  } from '@smui/card';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
 
</script>
<style>
  :global([card-media]){
    background-color: var(--mdc-theme-secondary);
  }
</style>
<Card style="box-shadow: 0px 0px 10px rgba(0,0,0,0.25);height: 100%;">
  <PrimaryAction >
    <Media card-media aspectRatio="16x9">
      <MediaContent>
        <div
          style="color: #fff; position: absolute; bottom: 16px; left: 16px;"
        >
          <h2 class="mdc-typography--headline6" style="margin: 0;">
            {$$props.data.title}
          </h2>
          <h3 class="mdc-typography--subtitle2" style="margin: 0;">
            {$$props.data.subtitle}
          </h3>
        </div>
      </MediaContent>
    </Media>
    <Content class="mdc-typography--body2">
      {$$props.data.content}
    </Content>
  </PrimaryAction>
  <Actions>
    <ActionButtons>
      <Button>
        <Label data-link link={$$props.data.href}>Manage</Label>
      </Button>
    </ActionButtons>
    <ActionIcons>
      <IconButton
        class="material-icons"
        title="info">info</IconButton
      >
    </ActionIcons>
  </Actions>
</Card>