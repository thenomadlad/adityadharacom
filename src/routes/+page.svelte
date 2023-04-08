<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import WavingHand from '$lib/components/waving_hand.svelte';
	import LanguageIcon from '$lib/components/language_icon.svelte';

	export let data;
</script>

<svelte:head>
	<title>Aditya makes things</title>
</svelte:head>

<div class="flex">
	<div class="m-auto inline-grid gap-y-20 justify-center items-center">
		<div class="flex mt-20 justify-center">
			<WavingHand />
		</div>
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

		<div class="inline-grid grid-cols-3 gap-x-4 gap-y-4">
			{#each data.repos as repo}
				<a class="block" href={repo.url}>
					<Card heading={repo.name} date={repo.created_at}>
						<LanguageIcon language={repo.language} />
					</Card>
				</a>
			{/each}
		</div>
	</div>
</div>
