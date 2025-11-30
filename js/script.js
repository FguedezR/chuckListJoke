// API e inicialización
const api_url = 'https://api.chucknorris.io/jokes/random'
const storage_key = 'chuckNorrisJokes';

// caputurar botones DOM
const fetchJoke      = document.getElementById('fetchJoke');
const jokeList       = document.getElementById('jokeList');
const clearAllButton = document.getElementById('clear-all-btn');

// array principal
let jokes = [];

// carga los chistes desde localStorage y actualiza el array principal
function loadJokesFromStorage() {
    const storedJokes = localStorage.getItem(storage_key);
    jokes = storedJokes ? JSON.parse(storedJokes) : [];
}

function saveJokesToStorage() {
    localStorage.setItem(storage_key, JSON.stringify(jokes))
}

function renderJokes() {
    jokeList.innerHTML = '';

    if (jokes.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.classList.add('empty-message');
        emptyMessage.textContent = 'No hay chistes de Chuck Norris';
        jokeList.appendChild(emptyMessage);
        return;
    };

    jokes.forEach((joke) => {
      const listItem = document.createElement("li");
      listItem.classList.add("joke-list");
      listItem.innerHTML = `
            <span>${joke.text}</span>
            <button class="delete-joke-btn" data-id="${joke.id}">Eliminar</button>
        `;
      jokeList.appendChild(listItem);
    });

}

function fetchNewJoke() {
  fetch(api_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const newJoke = {
        id: data.id || Date.now(),
        text: data.value,
      };
      jokes.unshift(newJoke);
      saveJokesToStorage();
      renderJokes();
    })
    .catch((error) => {
      console.error("Error al obtener el chiste", error);
      alert("No se pudo obtener el chiste. Revisa la consola");
    });
}
fetchNewJoke();

function deleteJoke(id) {
  jokes = jokes.filter((joke) => joke.id !== id);
  saveJokesToStorage();
  renderJokes();
}

function init() {
  loadJokesFromStorage();
  renderJokes();

  // Asignamos el listener. Ahora fetchNewJoke es accesible.
  fetchJoke.addEventListener('click', fetchNewJoke);

  // Listener para eliminar todos
  clearAllButton.addEventListener("click", () => {
    jokes = [];
    localStorage.removeItem(storage_key);
    renderJokes();
  });

  // eventos para la eliminación individual
  jokeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-joke-btn")) {
      const jokeId = event.target.dataset.id;
      deleteJoke(jokeId);
    }
  });
}

init();