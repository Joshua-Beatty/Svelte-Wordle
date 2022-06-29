<script>
  import Key from "./Key.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let off = [];
  export let yellow = [];
  export let green = [];
  function callback(key) {
    if (key == "enter") {
      dispatch("enter", key);
    } else if (key == "backspace") {
      dispatch("backspace", key);
    } else {
      dispatch("keypress", key);
    }
  }

  function handleKeydown(event) {
    if (event.keyCode < 65 || event.keyCode > 90) {
      if (![8, 13].includes(event.keyCode)) {
        return;
      }
    }
    callback(event.key.toLowerCase());
  }

  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ];
</script>

<svelte:window on:keydown={handleKeydown} />
<div id="keyboard">
  {#each keyboard as row}
    <div class="row">
      <div class="keys">
        {#each row as key}
          <Key
            {key}
            off={off.includes(key)}
            yellow={yellow.includes(key)}
            green={green.includes(key)}
            {callback}
          />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  #keyboard {
    width: 100%;
    margin-top: auto;
  }
  .row {
    width: 100%;
  }
  .keys {
    margin: auto;
    width: fit-content;
  }
</style>
