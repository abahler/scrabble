# scrabble
An online version of the classic board game

## Technology

JavaScript should be able to handle most of the UI functionality (using React). As the pseudo-code at `tmp/pseudocode.txt`, I'm hoping there's a API through Dictionary.com or something similar to check if a submitted word is, in fact, a word, so I don't have to create a database of all the words I can think of (and risk a player putting down a word I missed). For any backend processing, I'll use [Flask](https://github.com/pallets/flask), the Python web framework, and for persistence, I'll use MariaDB.