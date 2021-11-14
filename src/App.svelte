<script lang="ts">
	import 'bulma/css/bulma.css';
	import Login from './Login.svelte';
	import Todos from './Todos.svelte';

	export let name: string = "Aditya";

	let uid: string;
</script>


<main>
	<Login bind:uid={uid} />
	<h1>My name's {name}, tell me what you're working on</h1>
	<p>Your UID is {uid}</p>

	{#if uid}
		<Todos uid={uid} />
	{/if}
</main>
