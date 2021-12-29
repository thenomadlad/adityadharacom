<script lang="ts">
	const waveInterval = 10000; // in ms
	const transitionTime = 500; // in ms
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
			}, transitionTime);
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
		on:focus={waveAndUnWave}
		on:mouseout={setNotWave}
		on:blur={setNotWave}
	>
		<span
			class={'hand ' + (wave ? 'waveIn' : 'waveOut')}
			style="--transition-time: {transitionTime}ms"
		>
			👋
		</span>
		😊
	</h1>
</div>

<style>
	.hand {
		display: inline-block;
	}
	.waveOut {
		transition-property: transform;
		transition-duration: var(--transition-time, 500ms);
		transition-timing-function: ease-in;
		transform: rotate(0deg);
	}
	.waveIn {
		transition-property: transform;
		transition-duration: var(--transition-time, 500ms);
		transition-timing-function: ease-in;
		transform: rotate(15deg);
	}
</style>
