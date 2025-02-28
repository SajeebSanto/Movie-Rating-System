let movies = [];
let editIndex = -1;

// Function to toggle between form and list
function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    const listContainer = document.getElementById('listContainer');
    formContainer.classList.toggle('active');
    listContainer.classList.toggle('active');
}

// Function to add/update movie
function submitMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const rating = parseInt(document.getElementById('rating').value);

    if (title && genre && releaseDate && rating) {
        const newMovie = { title, genre, releaseDate, rating };

        if (editIndex > -1) {
            movies[editIndex] = newMovie;
            editIndex = -1;
        } else {
            movies.push(newMovie);
        }

        resetForm();
        toggleForm();
        renderMovies();
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to render movies list
function renderMovies() {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';
    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.releaseDate}</td>
            <td>${movie.rating}</td>
            <td class="actions">
                <button onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </td>
        `;
        moviesList.appendChild(row);
    });
}

// Function to edit a movie
function editMovie(index) {
    const movie = movies[index];
    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('releaseDate').value = movie.releaseDate;
    document.getElementById('rating').value = movie.rating;
    editIndex = index;
    toggleForm();
}

// Function to delete a movie
function deleteMovie(index) {
    movies.splice(index, 1);
    renderMovies();
}

// Function to sort movies by rating
function sortMovies(by) {
    if (by === 'rating') {
        const sortedMovies = movies.sort((a, b) => a.rating - b.rating);
        movies = sortedMovies.reverse();
        renderMovies();
    }
}

// Function to search movies
function searchMovies() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
    renderFilteredMovies(filteredMovies);
}

// Function to render filtered movies
function renderFilteredMovies(filteredMovies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';
    filteredMovies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.releaseDate}</td>
            <td>${movie.rating}</td>
            <td class="actions">
                <button onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </td>
        `;
        moviesList.appendChild(row);
    });
}

// Reset form after submission
function resetForm() {
    document.getElementById('movieForm').reset();
}
