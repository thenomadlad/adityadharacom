<script lang="ts">
	export let name: string = "Aditya";
	let rando = 1.0;
	$: isWin = Math.round(rando) ? 'You win 🎉' : 'You lose 💩';

	function playGame() {
		rando = Math.random();
	}
</script>

<main>
	<h1>The name's {name}</h1>
	<button on:click={playGame}>Play my game</button>
	<p>Your random number is {rando}</p> 
	<h2 class="isWin">{isWin}</h2>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	h2.isWin {
		font-weight: bold;
	}
</style>