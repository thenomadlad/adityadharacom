<script lang="ts">
    export let displayName: string;
    export let photoURL: string;
</script>

<h3>Hi {displayName}</h3>
<img src={photoURL} width="100" alt="user profile pic" />
