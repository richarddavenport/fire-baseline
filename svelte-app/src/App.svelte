<script>
  import { Collection, FirebaseApp, User } from "sveltefire";
  import { Router, Link, Route, links } from "svelte-routing";
  import { firebase } from "./api/firebase";
  import Login from "./Login.svelte";
  import CreatePost from "./CreatePost.svelte";
  import Post from "./Post.svelte";

  const { localStorage } = window;
</script>

<FirebaseApp {firebase}>
  <User persist={localStorage} let:user let:auth>
    <div slot="signed-out">
      <Login />
    </div>

    <nav use:links>
      <a href="/">Create Post</a>
      |
      <a href="posts">Posts</a>
      |
      <a href="/" on:click={() => auth.signOut()}>Sign out</a>
    </nav>
    <Router>
      <Route path="posts">
        <Collection path={'posts'} let:data={posts} let:ref={postsRef} log>

          {#each posts as post}
            <Post {post} />
          {/each}

          <hr />

          <span slot="loading">Loading comments...</span>

        </Collection>
      </Route>
      <Route path="/" component={CreatePost} />
    </Router>

  </User>

</FirebaseApp>
