<script lang="ts">
	const waveInterval = 10000;
	let wave = false;

	function setWave() {
		wave = true;
	}

	function setNotWave() {
		wave = false;
	}

	function waveAndUnWave() {
		if (!wave) {
			setWave();
			setTimeout(() => {
				setNotWave();
			}, 500);
		}
	}

	// kick off the wave
	function wavePeriodically() {
		waveAndUnWave();
		setTimeout(wavePeriodically, waveInterval);
	}
	setTimeout(wavePeriodically, waveInterval);
</script>

<div>
	<h1
		class="text-8xl m-10"
		on:mouseover={setWave}
		on:focus={setWave}
		on:mouseout={setNotWave}
		on:blur={setNotWave}
		on:click={waveAndUnWave}
	>
		<span class={'hand ' + (wave ? 'waveIn' : 'waveOut')}> 👋 </span>
		😊
	</h1>
</div>

<style>
	.hand {
		display: inline-block;
	}
	.waveOut {
		transition: transform 0.5s ease-in;
		transform: rotate(0deg);
	}
	.waveIn {
		transition: transform 0.5s ease-in;
		transform: rotate(15deg);
	}
</style>
