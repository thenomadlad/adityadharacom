<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let id: number;
    export let text: string;
    export let complete: boolean;

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch('remove', { id });
    }

    function toggleStatus() {
        let newStatus = !complete;
        dispatch('toggle', {
            id,
            newStatus
        })
    }
</script>


<style>
    .complete {
        text-decoration: line-through;
        color: green;
    }
</style>


<li in:fly="{{ x: 900, duration: 500 }}" out:fade>
    <span class:complete>{ text }</span>
    {#if complete}
        <button on:click={toggleStatus}>✔️</button>
    {:else}
        <button on:click={toggleStatus}>❌</button>
    {/if}
    <button on:click={remove}>🗑</button>
</li>