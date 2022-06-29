<script>
  export let key;
  export let yellow;
  export let off;
  export let green;
  export let callback;
</script>

{#if key === "enter"}
  <button id="enter" on:click={() => callback(key)}>
    <p>ENTER</p>
  </button>
{:else if key === "backspace"}
  <button id="backspace" on:click={() => callback(key)}
    ><p>
      <i class="material-icons">backspace</i>
    </p>
  </button>
{:else}
  <button on:click={() => callback(key)} class:off class:yellow class:green>
    <p>
      {key.toUpperCase()}
    </p>
  </button>
{/if}

<style>
  @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v133/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)
      format("woff2");
  }

  .material-icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -moz-font-feature-settings: "liga";
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    color: black;
    background: lightgrey;
    border: none;
    margin: 1px;
    width: 2rem;
    height: 4rem;
    font-size: 1.25em;
    border-radius: 5px;
    font-weight: bold;
    position: relative;
  }
  button > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
  #enter {
    width: 3rem;
  }
  #enter > p {
    font-size: 0.75em;
  }
  #backspace {
    width: 3rem;
    font-size: 2.25em;
  }
  button:active {
    background: darkgrey;
  }
  .off {
    background: #4b4b4b;
  }
  .yellow {
    background: yellow;
  }
  .green {
    background: #00aa00;
  }
  .off:active {
    background: #2d2d2d;
  }
  .yellow:active {
    background: #b7b700;
  }
  .green:active {
    background: green;
  }
</style>
