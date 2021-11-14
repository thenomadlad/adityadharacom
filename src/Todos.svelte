<script lang="ts">
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collection, doc, setDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    const COLL_NAME = 'todos';

    export let uid: string;
    let text = '';

    const todosRef = collection(db, COLL_NAME);
    const queryRef = query(todosRef, orderBy("created"), where("uid", "==", uid))

    const todos = collectionData(queryRef, {idField: 'id'}).pipe(startWith([]));


    async function generateId(text: string, uid: string): Promise<string> {
        const msgBuffer = new TextEncoder().encode(uid + ":" + text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function add() {
        const id = await generateId(text, uid);
        await setDoc(doc(db, COLL_NAME, id), {
            id,
            text,
            uid,
            created: Date.now(),
            complete: false,
        });
        text = '';
    }

    async function updateStatus(event) {
        const { id, newStatus } = event.detail;
        await setDoc(doc(db, COLL_NAME, id), { complete: newStatus }, { merge: true });
    }

    async function removeItem(event) {
        const { id } = event.detail;
        await deleteDoc(doc(db, COLL_NAME, id));
    }

</script>

<ul>
    {#each $todos as todo}
        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />:
    {/each}
</ul>

<input bind:value={text}>
<hr>
<button on:click={add}>Add Task</button>