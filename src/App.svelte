<script>
	import Keyboard from "./Keyboard.svelte";
	import { range } from "./range.js";
	import { valid } from "./words.js";
	import { words } from "./words.js";
	let off = [];
	let yellow = [];
	let green = [];

	let guesses = [
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	];
	let guess = 0;
	const startDate = "2022-06-28";
	const endDate = new Date().toISOString().slice(0, 10);

	const diffInMs = new Date(endDate) - new Date(startDate);
	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

	const word = words[diffInDays];
	const wordArray = word.split("");
	let current = [];
	let correct = false;
	$: {
		if (guesses[guess])
			guesses[guess] = [
				...current,
				...Array(5 - current.length).fill(""),
			];
	}
	function keypress(event) {
		if (correct) {
			return;
		}
		if (current.length == 5 || guess == 6) return;
		current.push(event.detail);
		current = current;
	}
	let shake = false;
	function enter() {
		if (correct) {
			return;
		}
		if (current.length != 5) return;
		if (!valid.includes(current.join(""))) {
			shake = true;
			setTimeout(() => {
				shake = false;
			}, 500);
			return;
		}
		for (const key in current) {
			if (current[key] == word[key]) {
				green.push(current[key]);
			} else if (word.includes(current[key])) {
				yellow.push(current[key]);
			} else {
				off.push(current[key]);
			}
		}
		off = off;
		yellow = yellow;
		green = green;
		guess++;
		if (arrayEquals(current, wordArray)) {
			correct = true;
		}
		current = [];
	}

	function backspace() {
		current.pop();
		current = current;
		console.log("backspace");
	}
	function compare(given, correct) {
		const counts = {};
		const color = [0, 0, 0, 0, 0];
		for (const letter of correct) {
			if (!counts[letter]) counts[letter] = 0;
			counts[letter]++;
		}
		for (const i in given) {
			if (given[i] == correct[i]) {
				color[i] = 2;
				counts[given[i]]--;
			}
		}
		for (const i in given) {
			if (color[i] == 0 && counts[given[i]]) {
				color[i] = 1;
				counts[given[i]]--;
			}
		}
		return color;
	}
	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index])
		);
	}
</script>

<svelte:head
	><meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/></svelte:head
>
<div id="main">
	<div id="game">
		{#each range(0, 5) as i}
			{@const colors = compare(guesses[i], wordArray)}
			<div class="row">
				<div class="letters" class:shake={i == guess && shake}>
					{#each range(0, 5) as j}
						<div
							class="letter"
							ss
							class:grey={guesses[i][j] && i != guess}
							class:green={guesses[i][j] &&
								i != guess &&
								colors[j] == 2}
							class:yellow={guesses[i][j] &&
								i != guess &&
								colors[j] == 1}
						>
							<p>
								{guesses[i][j].toUpperCase()}
							</p>
						</div>{/each}
				</div>
			</div>{/each}
	</div>
	<div id="space" />
	<Keyboard
		on:keypress={keypress}
		on:enter={enter}
		on:backspace={backspace}
		{off}
		{yellow}
		{green}
	/>
</div>
<div id="author">Joshua Beatty</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
	* {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
	}
	#main {
		background: grey;
		color: white;
		max-width: 960px;
		margin: auto;
		height: 100%;
		display: flex;
		font-family: "Roboto", sans-serif;
		flex-direction: column;
	}
	:global(body) {
		background: black;
		margin: 0;
		padding: 0;
	}
	.row {
		display: flex;
	}
	.shake {
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}
	.letters {
		display: flex;
		margin: auto;
	}
	.letter {
		margin: auto;
		width: min(calc((100vh - 12rem) / 6), calc(95vw/6));
		height: min(calc((100vh - 12rem) / 6), calc(95vw/6));
		background: white;
		display: inline-block;
		outline: 1px solid white;
		margin: 0.2rem;
		color: black;
		font-weight: bold;
		font-size: min(calc((100vh - 12rem) / 8), calc(95vw/8));
		position: relative;
	}
	.letter > p {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
	}
	.grey {
		background: grey;
	}
	.yellow {
		background: yellow;
	}
	.green {
		background: green;
	}
	#author{
		position:absolute;
		bottom: 0;
		right: 0;
	}
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
