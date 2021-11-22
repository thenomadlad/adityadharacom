<script lang="ts">
	import 'bulma/css/bulma.css';
	import Login from './account/Login.svelte';
	import ChatWindow from './chat/ChatWindow.svelte';

	let uid: string;
</script>


<main>
<<<<<<< Updated upstream
	<h1>Hi! My Name's Aditya, let's chat</h1>
	<Login bind:uid={uid} />
	{#if uid}
		<ChatWindow {uid} />
	{:else}
		<img src='public/assets/capybara.png' alt="Aditya capybara logo" />
	{/if}
=======
	<section class="section">
		<div class="container">
		  <h1 class="title">
			My name's {name}, 
		  </h1>
		  <p class="subtitle">
			Tell me what you need to work on today
		  </p>
		  
		  <Login bind:uid={uid} />
		  <p>Your UID is {uid}</p>
	  
		  {#if uid}
			  <Todos uid={uid} />
		  {/if}
		</div>
	  </section>
>>>>>>> Stashed changes
</main>
