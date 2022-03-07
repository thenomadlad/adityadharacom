<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import WavingHand from '$lib/components/waving_hand.svelte';
</script>

<svelte:head>
	<title>Aditya makes things</title>
</svelte:head>

<div class="flex">
	<div class="m-auto inline-grid grid-rows-2 justify-center items-center">
		<WavingHand />
		<div class="inline-grid grid-cols-2 gap-x-4 text-3xl">
			<a
				class="text-center text-gray-400 hover:text-black"
				href="https://www.linkedin.com/in/adityadhara/"
			>
				<i class="fab fa-linkedin" />
			</a>
			<a class="text-center text-gray-400 hover:text-black" href="https://github.com/thenomadlad">
				<i class="fab fa-github" />
			</a>
		</div>
	</div>
</div>

<div class="columns-3">
	<Card />
</div>
