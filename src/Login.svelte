<script lang="ts">
    import Profile from "./Profile.svelte";
    import { auth, googleProvider } from "./firebase";
    import { signInWithPopup } from "firebase/auth";
    import { writable } from "svelte/store";

    export let uid: string = '';
    let user = writable(null);

    function login() {
        signInWithPopup(auth, googleProvider).then((result) => {
            user.set(result.user);
            uid = result.user.uid;
        });
    }
</script>

<section>
    {#if $user}
        <Profile {...$user} />
        <button on:click={() => auth.signOut()}>Logout</button>
    {:else}
        <button on:click={login}>Signin with Google</button>
    {/if}
</section>
