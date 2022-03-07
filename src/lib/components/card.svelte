<script lang="ts">
	export let image_src = '/favicon.png';
	export let image_alt = 'Image alt';
</script>

<div>
	<div class="rounded border-2 overflow-hidden shadow-lg">
		<img class="w-full border-b-2" src={image_src} alt={image_alt} />
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">
				<slot name="heading">What even is a heading?</slot>
			</div>
			<p class="text-gray-700 text-base">
				<slot name="description">Who needs a description amirite?</slot>
			</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			<slot name="when">Does it matter when?</slot>
		</div>
	</div>
</div>
