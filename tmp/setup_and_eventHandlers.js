/*
React components:
- Tile (a square containing a letter on the user's rack)
- Rack (a Rack holds Tiles)
- Cell (a Cell is either open or contains a Tile)
- Board (a Board is comprised of all the Cells on which Tiles can be played)
- ScoreBox (calling it ScoreBox instead of ScoreBoard so it's not confused with Board)
- ButtonBox (contains all the user action buttons - submitting a word, exchanging tiles, etc.)
- anything else? (For now, buttons can be boring old HTML. nothing fancy)
*/

/*
 *
 * PROCEDURAL CODE (vanilla JS)
 *
 */

const maxTiles = 7;
// Track how many players have marked their game as finished
// When this equals 2 (indicating both players are done), the game is done and special message displays
// Cannot be a constant because we will increase it
let finishedPlayers = 0;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

// TODO: write function to give control to other player. 
// Should it take the ID of the current player as a param?
const giveControl = () => {};

// `n` is the number of tiles being exchanged
// This function only gets new tiles; it is up to the calling code to put the tiles in the rack
const getNewTiles = (n) => {
	// Cannot exchange more than the max number of tiles that can be on the board
	if (n > maxTiles) { 
		throw new RangeError(`Player cannot exchange more than the max number of tiles (${maxTiles})`); 
	}

	let numAvailableTiles = bag.length;
	let tiles = [];

	let i = 0;
	while (i < n) {
		// Get random tile from `bag`
		let index = getRandomInt(numAvailableTiles);
		// Zero-base it
		index -= 1;

		// Remove tile from bag, and add it to array of new tiles
		let newTile = bag.splice(index, 1);
		tiles.push(newTile);

		i++;
	}

	return tiles;
};

// Letter-to-points mapping
const valuesAndFrequency = {
	'a': {'points': 1, 'frequency': 9},
	'b': {'points': 3, 'frequency': 2},
	'c': {'points': 3, 'frequency': 2},
	'd': {'points': 2, 'frequency': 4},
	'e': {'points': 1, 'frequency': 12},
	'f': {'points': 4, 'frequency': 2},
	'g': {'points': 2, 'frequency': 3},
	'h': {'points': 4, 'frequency': 2},
	'i': {'points': 1, 'frequency': 9},
	'j': {'points': 8, 'frequency': 1},
	'k': {'points': 5, 'frequency': 1},
	'l': {'points': 1, 'frequency': 4},
	'm': {'points': 3, 'frequency': 2},
	'n': {'points': 1, 'frequency': 6},
	'o': {'points': 1, 'frequency': 8},
	'p': {'points': 3, 'frequency': 2},
	'q': {'points': 10, 'frequency': 1},
	'r': {'points': 1, 'frequency': 6},
	's': {'points': 1, 'frequency': 4},
	't': {'points': 1, 'frequency': 6},
	'u': {'points': 1, 'frequency': 4},
	'v': {'points': 4, 'frequency': 2},
	'w': {'points': 4, 'frequency': 2},
	'x': {'points': 8, 'frequency': 1},
	'y': {'points': 4, 'frequency': 2},
	'z': {'points': 10, 'frequency': 1},
	'blank': {'points': 0, 'frequency': 2}
};

// Bag that holds all tiles
let bag = [];
for (letter in valuesAndFrequency) {
  // Calculate outside of loop to avoid re-accessing it on each iteration
  let freq = valuesAndFrequency[letter]['frequency'];
  let counter = 0;
  while (counter < freq) {
    bag.push(letter);

    counter++;
  }
}

// Get reference to buttons
let exchangeBtn = document.getElementById('exchange');
let skipTurnBtn = document.getElementById('skipTurn');
let submitBtn = document.getElementById('submit');
let done = document.getElementById('finishGame');

/**
 * Set up event handlers
 */

exchangeBtn.onclick = (e) => {
	// Player forgoes turn

	// TODO: get the number of letters player is exchanging
	let tiles;

	let newTiles = getNewTiles(tile.length);

	// TODO: populate player's rack with new tiles, so the client code doesn't always have to do it

	giveControl();
};

skipTurnBtn.onclick = (e) => {
	// Don't force player to exchange letters. 
	// Just relieve control from player, give control to opponent
	giveControl();
}; 

submitBtn.onclick = (e) => {

	let playedTiles = [];
	// TODO: Grab all newly played tiles from all cells, add to `playedTiles` array

	// Sort by cell number (A8, A9, A10, A11, A12)
	playedTiles.sort( (a,b) => {
		return a.slice(1, 3) - b.slice(1, 3);
	});

	// TODO: get values of each tile,
	// playedTiles.join('') won't work because that will just be a string of the cell numbers

	// TODO:
	// Send word to opponent for them to either accept or challenge

	let wordMultiplier = '';
	let wordScore = 0;

	// Calculate point value
	playedTiles.forEach( (v,i) => {
		// TODO get value of 'class' attribute of the <td>

		// Set word multiplier if there is one, for later compounding (after this loop)
		// Won't be overwritten because you can't get a double-word and a triple-word score in one play
		if (classStr.indexOf('triple-word') !== -1) {
			wordMultiplier = 'triple-word';
		} else if (classStr.indexOf('double-word') !== -1) {
			wordMultiplier = 'double-word';
		}

		let points = valuesAndFrequency[v];

		if (classStr.indexOf('triple-letter') !== -1) {
			points *= 3;
		} else if (classStr.indexOf('double-letter') !== -1) {
			points *= 2;
		}

		wordScore += points;
	});

	if (wordMultiplier === 'triple-word') {
		wordScore *= 3;
	} else if (wordMultiplier == 'double-word') {
		wordScore *= 2;
	}

	playerScore += wordScore;	

	// Replenish tiles in rack
	let newTiles = getNewTiles(playedTiles.length);

	// TODO: get reference to rack, and add each new tile to it
	// Probably a Rack component that holds other Tile components

	// TODO: update player score with `playerScore`, broadcasting this to player and opponent
	giveControl();

};

doneBtn.onclick = (e) => {
	
	let remainingTiles = [];

	// TODO: gather player's remaining tiles

	remainingTiles.forEach( (v,i) => {
		let pointValue = valuesAndFrequency[v]['points'];
		playerScore -= pointValue;
	});

	// TODO: update player score to show their final score
	// Doing ++varName instead of varName++ because we want new value to be reflected immediately, not after the handler function completes
	++finishedPlayers;

	if (finishedPlayers === 2) {
		// TODO: show special 'game is finished' graphic and/or message
	} else {
		giveControl();
	}

};

