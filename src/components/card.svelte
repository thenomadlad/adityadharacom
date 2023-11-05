<script lang="ts">
	import { format } from 'date-fns';

	// export let image_src = '/favicon.png';
	// export let image_alt = 'Image alt';
	export let heading = 'What even is a heading?';
	export let date = new Date('2022-10-12');

	$: formattedDate = format(date, 'yyyy-MM-dd');
</script>

<div class="flex flex-col justify-between rounded border-2 overflow-hidden shadow-lg h-full">
	<!-- <img class="w-full border-b-2" src={image_src} alt={image_alt} /> -->
	<div class="px-6 py-4 font-bold text-xl mb-4 text-center">
		<slot name="heading">{heading}</slot>
	</div>
	<div class="px-6 mt-2 text-center">
		<p class="text-gray-700 text-base">
			<slot>Who needs a description amirite?</slot>
		</p>
	</div>
	<div class="px-6 pt-4 pb-2 text-center text-slate-800">
		<slot name="when">{formattedDate}</slot>
	</div>
</div>
