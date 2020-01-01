<script>
  export let post;
  export let showDelete = true;
</script>

<h2>{post.heading || ''}</h2>
<h3>{post.subHeading || ''}</h3>
<p>{post.shortDescription || ''}</p>
{#if post.image}
  <div>
    <img src={post.image} alt="" />
  </div>
{/if}
<p>{post.body || ''}</p>
{#if post.tags}
  {#each post.tags as tag}
    <span>#{tag}</span>
    &nbsp;
  {/each}
{/if}
{#if showDelete}
  <div>
    <button disabled on:click={() => post.ref.delete()}>Delete</button>
  </div>
{/if}
