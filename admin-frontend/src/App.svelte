<script>
  import AppBar from './lib/AppBar.svelte'
  import Card from './lib/Card.svelte'
  import Paper, { Title, Subtitle, Content } from '@smui/paper';
  import LayoutGrid, { Cell } from '@smui/layout-grid';

  const content = [
    {
      title: "Courses",
      subtitle: "add or remove our course",
      media: "",
      href: "/courses",
      content: "manage our course, like add new course or change new information about course"
    },
    {
      title: "News",
      subtitle: "share information to users",
      media: "",
      href: "/news",
      content: "add new event or some promotion"
    },
    {
      title: "Terms and privacy policy",
      subtitle: "set our terms",
      media: "",
      href: "/terms",
      content: "this is just our terms and privacy policy"
    },
    {
      title: "Users",
      subtitle: "manage users access",
      media: "",
      href: "/users",
      content: "change user permission and access level"
    }
  ];
</script>

<style>
  .footer{
    width: 100%;
    height: fit-content;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .footer h1{
    color:silver;
    text-align: center;
  }
  .footer p{
    color: gray;
  }
  .footer > *{
    font-family: sans-serif;
  }
</style>

<AppBar>
  <Paper variant="unelevated">
    <Title style="font-size: calc(2rem + 1vw);font-weight: bold;padding:0px 30px;padding-top: 20px;">Admin dashboard</Title>
    <Subtitle style="font-size: calc(1rem + 0.3vw);padding:10px 30px">
      Manage Daberdev web
    </Subtitle>
    <Content>
      <LayoutGrid>
        {#each content as data}
          <Cell>
            <Card {data}/>
          </Cell>
        {/each}
      </LayoutGrid>
    </Content>
  </Paper>
  <div class="footer">
    <h1>Create By Daberdev</h1>
    <p>this site was created in 2023</p>
  </div>

</AppBar>