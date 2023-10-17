<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Main from "./Main.svelte";
</script>

<Header></Header>
<Main></Main>
<Footer></Footer>

<style global>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    min-width: 340px;
    max-width: 1400px;
    padding: 0 3% 3%;
  }
</style>
