<script lang="ts">
    export let displayName: string;
    export let photoURL: string;
</script>

<div class="card">
    <div class="card-image">
        <figure class="image is-4by3">
            <img src={photoURL} alt="User profile pic" />
        </figure>
      </div>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-4">{displayName}</p>
            </div>
        </div>
    </div>
</div>
