// API e inicialización
const api_url = 'https://api.chucknorris.io/jokes/random'
const storage_key = 'chuckNorrisJokes';

// caputurar botones DOM
const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const clearAllButton = document.getElementById('clear-all-btn');

// array principal
let jokes = [];

// carga los chistes desde localStorage y actualiza el array principal
function loadJokesFromStorage() {
    const storedJokes = localStorage.getItem(storage_key);
    jokes = storedJokes ? JSON.parse(storedJokes) : [];
}

