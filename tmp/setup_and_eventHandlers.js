/*
React components:
- Board
- Cell
- Tile
- Scoreboard
- Rack
- anything else?
*/

/*
 *
 * PROCEDURAL CODE (vanilla JS)
 *
 */

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

// Track how many players have marked their game as finished (cannot use any more letters)
// When this equals 2 (indicating both players are done), the game is done, and a special message can display
let finishedPlayers = 0;

/**
 * Set up event handlers
 */

exchangeBtn.onclick = (e) => {
	// Player forgoes turn
};

skipTurnBtn.onclick = (e) => {
	// Don't force player to exchange letters. 
	// Just relieve control from player, give control to opponent
}; 

submitBtn.onclick = (e) => {

	let tiles = [];

	// TODO:  Grab all newly played tiles from all cells, add to `tiles` array

	tiles.sort( (a,b) => {
		return a.slice(1, 3) - b.slice(1, 3);
	});

	let word = tiles.join('');

	// TODO:
	// Make ajax call to dictionary API to validate it's a true word
	// API returns true, then...

	let wordMultiplier = '';
	let wordScore = 0;

	// Calculate point value
	tiles.forEach( (v,i) => {
		// TODO get class string of cell

		// Set word multiplier if there is one, for later compounding
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

	// TODO: update player score with `playerScore`, broadcasting this to player and opponent

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
	}

};

