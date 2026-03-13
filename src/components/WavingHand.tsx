import { createSignal, onCleanup, onMount } from "solid-js";

const WAVE_INTERVAL = 10000; // ms
const TRANSITION_TIME = 500; // ms

export default function WavingHand() {
  const [wave, setWave] = createSignal(false);

  function waveAndUnwave() {
    if (!wave()) {
      setWave(true);
      setTimeout(() => setWave(false), TRANSITION_TIME);
    }
  }

  onMount(() => {
    const timer = setInterval(waveAndUnwave, WAVE_INTERVAL);
    onCleanup(() => clearInterval(timer));
  });

  return (
    <div>
      <h1
        onMouseOver={() => setWave(true)}
        onFocus={waveAndUnwave}
        onMouseOut={() => setWave(false)}
        onBlur={() => setWave(false)}
      >
        <span
          data-testid="waving-hand"
          class={`inline-block transition-transform ease-in ${wave() ? "rotate-[15deg]" : "rotate-0"}`}
          style={{ "transition-duration": `${TRANSITION_TIME}ms` }}
        >
          👋
        </span>
        😊
      </h1>
    </div>
  );
}
