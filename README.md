# scrabble
An online version of the classic board game

## Technology

JavaScript should be able to handle most of the UI functionality (using React). As described in the pseudo-code at `tmp/pseudocode.txt`, I'm hoping there's a API through [Dictionary.com](http://www.dictionary.com) or something similar to check if a submitted word is, in fact, a word. This would save me from having to create a database of all the words I can think of (and risk a player putting down a word I missed). For any backend processing, I'll use [Flask](https://github.com/pallets/flask), the Python web framework; if a need for persistence reveals itself, I'll use [MariaDB](https://mariadb.org/).