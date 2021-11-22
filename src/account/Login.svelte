<script lang="ts">
    import Profile from "./Profile.svelte";
    import { auth, googleProvider } from "../firebase";
    import { onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithPopup } from "firebase/auth";
    import { writable } from "svelte/store";

    export let uid: string = '';
    let userInfo = writable(null);

    onAuthStateChanged(auth, user => {
        userInfo.set(user);
        uid = user.uid;
    });

    function login() {
        setPersistence(auth, browserLocalPersistence).then(() => signInWithPopup(auth, googleProvider));
    }
</script>

<section>
    {#if $userInfo}
        <Profile {...$userInfo} />
        <button on:click={auth.signOut}>Logout</button>
    {:else}
        <button on:click={login}>Signin with Google</button>
    {/if}
</section>
