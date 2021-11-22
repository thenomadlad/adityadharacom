<script lang="ts">
	import 'bulma/css/bulma.css';
	import Login from './account/Login.svelte';
	import ChatWindow from './chat/ChatWindow.svelte';

	let uid: string;
</script>


<main>
	<h1>Hi! My Name's Aditya, let's chat</h1>
	<Login bind:uid={uid} />
	{#if uid}
		<ChatWindow {uid} />
	{:else}
		<img src='public/assets/capybara.png' alt="Aditya capybara logo" />
	{/if}
</main>
