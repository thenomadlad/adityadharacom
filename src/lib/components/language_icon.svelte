<script lang="ts">
	import 'devicon';

	export let language: string;

	function map_icon(language: string): string | null {
		switch (language.toLowerCase()) {
			case 'misc':
				return 'appwrite';
			case 'assembly':
				return 'aarch64';
			case 'vim script':
				return 'vim';
			case 'jupyter notebook':
				return 'jupyter';
			case 'javascript':
			case 'svelte':
			case 'python':
			case 'rust':
			case 'unity':
			case 'java':
			default:
				return language.toLowerCase();
		}
	}

	$: devicon = map_icon(language);
</script>

<p><i class="devicon-{devicon}-plain" /> {language}</p>
