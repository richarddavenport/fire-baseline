<script>
  import { Timestamp, firestore } from "./api/firebase";
  import { Collection } from "sveltefire";
  import Post from "./Post.svelte";

  let heading = "";
  let subHeading = "";
  let body = "";
  let shortDescription = "";
  let image = "";
  let publishEnd;
  let publishStart;
  let tags = [];

  $: post = {
    heading,
    subHeading,
    body,
    shortDescription,
    image,
    publishEndDate: !!publishEnd
      ? Timestamp.fromDate(new Date(publishEnd))
      : null,
    publishStartDate: !!publishStart
      ? Timestamp.fromDate(new Date(publishStart))
      : null,
    navigation: "home",
    order: -1,
    type: "text",
    tags
  };

  async function submit() {
    console.log("submiting", post);
    const ret = await firestore.collection("posts").add(post);
  }
</script>

<div>
  <h3>Create Post</h3>
  <label for="heading">Heading</label>
  <input id="heading" type="text" bind:value={heading} />

  <label for="subHeading">Sub Heading</label>
  <input id="subHeading" type="text" bind:value={subHeading} />

  <label for="body">Body</label>
  <textarea id="body" cols="50" rows="5" bind:value={body} />

  <label for="shortDescription">Short Description</label>
  <input id="shortDescription" type="text" bind:value={shortDescription} />

  <label for="image">Image link</label>
  <input id="image" type="url" bind:value={image} />

  <label for="publishStart">Publish on</label>
  <input id="publishStart" type="date" bind:value={publishStart} />

  <label for="publishEnd">Unpublish on</label>
  <input id="publishEnd" type="date" bind:value={publishEnd} />

  <label for="tags">Tags</label>
  <Collection path={'tags'} let:data={postTags}>
    {#each postTags as tag}
      <label>
        <input type="checkbox" bind:group={tags} value={tag.name} />
        {tag.name}
      </label>
    {/each}
  </Collection>
  <br />
  <button type="button" on:click={submit}>Submit</button>
</div>
<hr />
<div>
  <h3>Preview</h3>
  <Post {post} showDelete={false} />
</div>
