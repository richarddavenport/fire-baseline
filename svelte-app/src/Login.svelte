<script>
  import { onMount } from "svelte";
  import { firebase, auth } from "./api/firebase";
  import firebaseui from "firebaseui";

  let element;

  const ui =
    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: authResult => false,
      signInFailure: () => {}
    }
  };

  onMount(() => ui.start(element, uiConfig));
</script>

<h1>Login</h1>

<div bind:this={element} />
